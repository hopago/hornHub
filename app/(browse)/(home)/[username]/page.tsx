import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { Actions } from "./_components/actions";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params;

  const user = await getUserByUsername(username);

  if (!user) return;

  const isFollowing = await isFollowingUser(user.id);

  return (
    <main>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </main>
  );
}
