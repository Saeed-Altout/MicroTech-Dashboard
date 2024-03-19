import { Logo } from "@/components/logo";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex justify-center items-center">
      <Logo className="fixed top-0 left-8" />
      {children}
    </div>
  );
}
