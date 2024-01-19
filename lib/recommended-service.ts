import { db } from "./db";
import { getCurrentUser } from "./auth-service";

export const getRecommended = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return users;
};