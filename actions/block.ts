import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  try {
    // TODO: 실시간 차단
    // TODO: 강퇴 기능
    const blockedUser = await blockUser(id);

    // 클라이언트 컴포넌츠에서 사용할 경우 revalidate X
    // if (blockedUser) {
    //   revalidatePath(`/${blockedUser.blocked.username}`);
    // }

    revalidatePath("/");

    return blockedUser;
  } catch (err) {
    throw new Error(`Internal Error ${err}`);
  }
};

export async function onUnblock(id: string) {
  try {
    const blockedUser = await unblockUser(id);

    // 클라이언트 컴포넌츠에서 사용할 경우 revalidate X
    // if (blockedUser) {
    //   revalidatePath(`/${blockedUser.blocked.username}`);
    // }

    revalidatePath("/");

    return blockedUser;
  } catch (err) {
    throw new Error(`Internal ${err}`);
  }
}
