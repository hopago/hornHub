import { StreamPlayer } from "@/components/stream-player";
import { getCurrentUser } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";

interface CreatorPageProps {
  params: {
    username: string;
  }
}

export default async function Dashboard({ params }: CreatorPageProps) {
  const externalUser = await getCurrentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user?.id !== externalUser?.id || !user.stream)
    throw new Error("Unauthorized");

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
