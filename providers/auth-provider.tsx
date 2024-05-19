"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    console.log(token);

    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
