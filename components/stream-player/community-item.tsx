"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { Hint } from "../hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export default function CommunityItem({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) {
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const [isPending, startTransition] = useTransition();

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) {
      startTransition(() => {
        onBlock(participantIdentity)
          .then(() => toast.success(`${participantName}님이 차단 되었습니다`))
          .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
      })
    }
  };

  const color = stringToColor(participantName || "");

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="차단">
          <Button
            variant="ghost"
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}
