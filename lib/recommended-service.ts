import { db } from "./db";
import { getCurrentUser } from "./auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  let userId: string | null;

  try {
    const currUser = await getCurrentUser();

    userId = currUser.id;
  } catch (err) {
    userId = null;
  }

  let users: User[] = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  return users;
};