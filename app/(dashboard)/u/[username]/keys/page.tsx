import UrlCard from "./_components/url-card";
import { getCurrentUser } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_modal/connect-modal";

export default async function StreamKeysPage() {
  const currUser = await getCurrentUser();
  const stream = await getStreamByUserId(currUser.id);

  if (!stream) throw new Error("Stream not found");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
