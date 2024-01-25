"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>무언가 잘못됐군요... 에러입니다</p>
      <Button variant="secondary" asChild>
        <Link href="/">홈 페이지로 이동</Link>
      </Button>
    </div>
  );
}
