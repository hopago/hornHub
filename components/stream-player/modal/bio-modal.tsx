"use client";

interface BioModalProps {
  initialValue: string | null;
}

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Textarea } from "@/components/ui/textarea";
import { ElementRef, FormEvent, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

export default function BioModal({ initialValue }: BioModalProps) {
  const [value, setValue] = useState(initialValue || "");

  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === initialValue) return;

    startTransition(() => {
      updateUser({
        bio: value,
      })
        .then(() => {
          toast.success("유저 정보가 업데이트 되었어요");
          closeRef.current?.click();
        })
        .catch(() => toast.error("서버 에러입니다, 다시 시도해주세요"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>소개글 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="유저 소개글"
            onChange={(e) => setValue(e.target.value)}
            value={value || ""}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef}>
              <Button type="button" variant="ghost">
                취소
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary">
              저장
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
