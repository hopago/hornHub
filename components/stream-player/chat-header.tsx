"use client"

import { Skeleton } from "../ui/skeleton"
import ChatToggle from "./chat-toggle";
import VariantToggle from "./variant-toggle";

export default function ChatHeader() {
  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
      </div>
      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
      <p className="font-semibold text-primary text-center">실시간 채팅</p>
    </div>
  );
}

export const ChatHeaderSkeleton = () => {
    return (
      <div className="relative p-3 border-b hidden md:visible">
        <Skeleton className="absolute h-6 w-6 left-3 top-3" />
        <Skeleton className="w-28 h-6 mx-auto" />
      </div>
    );
}