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
