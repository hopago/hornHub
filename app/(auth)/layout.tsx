import { Logo } from "./_components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <Logo />
      {children}
    </main>
  );
}
