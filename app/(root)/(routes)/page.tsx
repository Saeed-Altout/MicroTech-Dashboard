import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function RootPage() {
  const isLoggedIn = cookies().has("access-token");

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
}
