import { db } from "./db";
import { getCurrentUser } from "./auth-service";
import { Stream, User } from "@prisma/client";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    const currUser = await getCurrentUser();
    userId = currUser.id;
  } catch (err) {
    userId = null;
  }

  let streams: any[] = [];

  if (userId) {
    try {
      streams = await db.stream.findMany({
        where: {
          user: {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
          OR: [
            {
              name: {
                contains: term,
              }
            },
            // {
            //   user: {
            //     username: {
            //       contains: term,
            //     },
            //   },
            // }, //TODO: user 검색 or 스트림 검색
          ],
        },
        select: {
          user: true,
          id: true,
          name: true,
          isLive: true,
          thumbnailUrl: true,
          updatedAt: true
        },
        orderBy: [
          {
            isLive: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      streams = await db.stream.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
              },
            },
            // {
            //   user: {
            //     username: {
            //       contains: term,
            //     },
            //   },
            // },
          ],
        },
        select: {
          user: true,
          id: true,
          name: true,
          isLive: true,
          thumbnailUrl: true,
          updatedAt: true
        },
        orderBy: [
          {
            isLive: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }

  return streams;
};