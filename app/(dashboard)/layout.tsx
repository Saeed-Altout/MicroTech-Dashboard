import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = cookies().has("access-token");

  if (!isLoggedIn) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}
