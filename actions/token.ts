"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getCurrentUser } from "@/lib/auth-service";
import { getUserByUserId } from "@/lib/user-service";
import { isBlockedUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  let currUser;

  try {
    currUser = await getCurrentUser();
  } catch (err) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 10000)}`;

    currUser = {
      id,
      username,
    };
  }

  const host = await getUserByUserId(hostIdentity);
  if (!host) throw new Error("User not found");

  const isBlocked = await isBlockedUser(host.id);
  if (isBlocked) throw new Error("User is blocked");

  const isHost = currUser.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${currUser.id}` : currUser.id,
      name: currUser.username,
    }
  );

  token.addGrant({
    room: currUser.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
