import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error("Unauthorized");
  }

  const currUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });

  if (!currUser) {
    throw new Error("Not found");
  }

  return currUser;
};

export const getCurrentUserByUsername = async (username: string) => {
  const currUser = await getCurrentUser();
  if (!currUser) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new Error("User not found");
  if (currUser.username !== user.username) throw new Error("Unauthorized");

  return user;
};
