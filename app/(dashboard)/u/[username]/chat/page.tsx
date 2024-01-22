import { getCurrentUser } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import ToggleCard from "./_components/toggle-card";

export default async function ChatPage() {
  const currUser = await getCurrentUser();
  const stream = await getStreamByUserId(currUser.id);

  if (!stream) throw new Error("Stream not found");

  return (
    <main className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">채팅 세팅</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="채팅 활성화"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="저속 모드"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="팔로워 채팅"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </main>
  );
}
