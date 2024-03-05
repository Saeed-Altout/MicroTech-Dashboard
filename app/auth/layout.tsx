import { Logo } from "@/components/common/logo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  if (hasToken) {
    redirect("/home");
  }
  return (
    <div className="h-full flex justify-center items-center">
      <Logo className="fixed top-4 left-10" />
      {children}
    </div>
  );
}
