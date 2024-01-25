"use server";

import { getCurrentUser } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<User>) => {
  const currUser = await getCurrentUser();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: {
      id: currUser.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/u/${currUser.username}`);
  revalidatePath(`/${currUser.username}`);

  return user;
};
