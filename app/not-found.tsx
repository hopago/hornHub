import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>요청하신 페이지를 찾지 못했어요</p>
      <Button variant="secondary" asChild>
        <Link href="/">홈 페이지로 이동</Link>
      </Button>
    </div>
  );
}
