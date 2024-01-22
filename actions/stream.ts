"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const currUser = await getCurrentUser();
    const currStream = await db.stream.findUnique({
      where: {
        userId: currUser.id,
      },
    });
    if (!currStream) throw new Error("Stream not found");

    const validDate = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: currStream.id,
      },
      data: {
        ...validDate,
      },
    });

    revalidatePath(`/u/${currUser.username}/chat`);
    revalidatePath(`/u/${currUser.username}`);
    revalidatePath(`/${currUser.username}`);
  } catch (err) {
    throw new Error(`Internal ${err}`);
  }
};
