import { getCurrentUserByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import Container from "./_components/sidebar/container";

interface CreatorLayoutProps {
  params: {
    username: string
  },
  children: React.ReactNode
}

export default async function CreatorLayout({
  params,
  children,
}: CreatorLayoutProps) {
  const currUser = await getCurrentUserByUsername(params.username);

  if (!currUser) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
