import { Logo } from "@/components/common/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex justify-center items-center">
      <Logo className="fixed top-4 left-10" />
      {children}
    </div>
  );
}
