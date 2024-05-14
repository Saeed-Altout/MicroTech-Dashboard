import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = cookies().get("access-token");

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}
