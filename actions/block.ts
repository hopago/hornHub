import { getCurrentUser } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
  );

  try {
    const currUser = await getCurrentUser();

    let blockedUser;

    try {
      blockedUser = await blockUser(id);
    } catch (err) {}

    try {
      await roomService.removeParticipant(currUser.id, id);
    } catch (err) {}

    revalidatePath(`/u/${currUser.username}/community`);

    return blockedUser;
  } catch (err) {
    throw new Error(`Internal Error ${err}`);
  }
};

export async function onUnblock(id: string) {
  const currUser = await getCurrentUser();

  const blockedUser = await unblockUser(id);

  revalidatePath(`/u/${currUser.username}/community`);

  return blockedUser;
}
