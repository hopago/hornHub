import { db } from "./db";
import { getCurrentUser } from "./auth-service";

export async function isFollowingUser(id: string) {
  try {
    const currUser = await getCurrentUser();

    const targetUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!targetUser) throw new Error("User not found");

    if (targetUser.id === currUser.id) return true;

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: currUser.id,
        followingId: targetUser.id,
      },
    });

    return !!existingFollow;
  } catch (err) {
    return false;
  }
}

export async function followUser(id: string) {
  const currUser = await getCurrentUser();

  const targetUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!targetUser) throw new Error("User not found");
  if (targetUser.id === currUser.id) throw new Error("Invalid request");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currUser.id,
      followingId: targetUser.id,
    },
  });

  if (existingFollow) throw new Error("Already Following");

  const follow = await db.follow.create({
    data: {
      followerId: currUser.id,
      followingId: targetUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
}

export async function unFollowUser(id: string) {
  const currUser = await getCurrentUser();

  const targetUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!targetUser) throw new Error("User not found");
  if (currUser.id === targetUser.id) throw new Error("Invalid request");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currUser.id,
      followingId: targetUser.id
    }
  });
  if (!existingFollow) throw new Error("Not following");

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
}