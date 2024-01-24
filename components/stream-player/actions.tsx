"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export default function Actions({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) {
  const { userId } = useAuth();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`${data.following.username}님을 팔로우합니다`)
        )
        .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
    });
  }
  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`${data.following.username}님을 언팔로우합니다`)
        )
        .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
    })
  }

  const toggleFollow = () => {
    if (!userId) return router.push("/sign-in");

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
      disabled={isPending || isHost}
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
}

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}