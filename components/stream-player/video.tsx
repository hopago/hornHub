"use client"

import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks
} from "@livekit/components-react";

interface VideoProps {
  hostname: string;
  hostIdentity: string;
}

export default function Video({ hostIdentity, hostname }: VideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p>생방송 중이 아닙니다</p>;
  } else if (!participant || tracks.length === 0) {
    content = <p>로딩 중입니다</p>;
  } else {
    content = <p>라이브 중 입니다</p>;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
}
