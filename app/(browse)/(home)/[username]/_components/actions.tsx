"use client";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      isFollowing
        ? onUnFollow(userId)
            .then((data) =>
              toast.success(`${data.following.username}님을 언팔로우 합니다`)
            )
            .catch((err) => {
              console.log(err);
              toast.error(`서버 에러입니다, 다시 시도해주세요`);
            })
        : onFollow(userId)
            .then((data) => {
              toast.success(`${data.following.username}님을 팔로우 합니다`);
            })
            .catch((err) => {
              console.log(err);
              toast.error(`서버 에러입니다, 다시 시도해주세요`);
            });
    });
  };

  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? <p>언팔로우</p> : <p>팔로우</p>}
    </Button>
  );
};
