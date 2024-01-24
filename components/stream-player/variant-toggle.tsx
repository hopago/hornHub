"use client";

import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MessageSquare, Users } from "lucide-react";

export default function VariantToggle() {
  const { variant, onChangeVariant } = useChatSideBar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  }

  const label = isChat ? "커뮤니티" : "채팅으로";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
}
