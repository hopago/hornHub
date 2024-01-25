"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export default function UnblockButton({ userId }: UnblockButtonProps) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((res) =>
          toast.success(`${res.blocked.username}님이 차단 해제 되었습니다`)
        )
        .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      차단 해제
    </Button>
  );
}
