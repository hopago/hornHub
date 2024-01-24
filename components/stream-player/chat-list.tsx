import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./chat-message";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export default function ChatList({ messages, isHidden }: ChatListProps) {
  if (isHidden || !messages || !messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "채팅이 비활성화 됐습니다" : "스트리머와 소통 해보세요!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col relative overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
}

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};