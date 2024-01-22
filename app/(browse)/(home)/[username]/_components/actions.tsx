"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
  isBlocked: boolean;
}

export const Actions = ({ isFollowing, userId, isBlocked }: ActionsProps) => {
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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`${data.blocked.username}님이 차단되었습니다`)
        )
        .catch((err) => {
          console.log(err);
          toast.error(`서버 오류입니다, 다시 시도해주세요`);
        });
    });
  };

  const handleUnblock = () => {
    onUnblock(userId)
      .then((data) =>
        toast.success(`${data.blocked.username}님이 차단 해제 되었습니다`)
      )
      .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? <p>언팔로우</p> : <p>팔로우</p>}
      </Button>
      <Button
        disabled={isPending}
        onClick={handleUnblock}
        variant="destructive"
      >
        {isBlocked ? "isBlocked=true" : "isBlocked=false"}
      </Button>
    </>
  );
};
