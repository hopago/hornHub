"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err: unknown) {
    throw new Error(`Internal Error ${err}`);
  }
}

export async function onUnFollow(id: string) {
  try {
    const unFollowedUser = await unFollowUser(id);

    revalidatePath("/");

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }

    return unFollowedUser;
  } catch (err) {
    throw new Error(`Internal Error ${err}`);
  }
}
