"use server";

import { db } from "./db";
import { getCurrentUser } from "./auth-service";

export const isBlockedUser = async (id: string) => {
  const currUser = await getCurrentUser();

  const targetUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!targetUser) throw new Error("User not found");
  if (targetUser.id === currUser.id) return false;

  {
    /* currUser가 차단 당했는지 체크 해주는 로직 */
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: targetUser.id,
        blockedId: currUser.id,
      },
    },
  });

  return !!existingBlock;
};

export const blockUser = async (id: string) => {
  const currUser = await getCurrentUser();

  if (currUser.id === id) {
    throw new Error("Invalid request");
  }

  const targetUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!targetUser) throw new Error("User not found");

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: currUser.id,
        blockedId: targetUser.id,
      },
    },
  });
  if (existingBlock) throw new Error("Already block");

  const block = await db.block.create({
    data: {
      blockerId: currUser.id,
      blockedId: targetUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const currUser = await getCurrentUser();

  if (currUser.id === id) throw new Error("Invalid request");

  const targetUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!targetUser) throw new Error("User not found");

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: targetUser.id,
        blockerId: currUser.id
      }
    },
  });
  if (!existingBlock) throw new Error("Blocked user not found");

  const unBlock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unBlock;
};
