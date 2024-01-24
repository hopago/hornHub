"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from '../ui/scroll-area';
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export default function ChatCommunity({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduplicated = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduplicated.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    })
  }, [debouncedValue, participants]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          커뮤니티가 비활성화 됐습니다
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="커뮤니티 검색"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt04">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          검색 결과가 없습니다
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
