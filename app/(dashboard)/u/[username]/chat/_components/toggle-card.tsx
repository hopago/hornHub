"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  field: FieldTypes;
  value: boolean;
}

export default function ToggleCard({
  label,
  field,
  value = false,
}: ToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() =>
          toast.success(`채팅이 ${value ? "비활성화" : "활성화"} 됐습니다`)
        )
        .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? "활성화" : "비활성화"}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}