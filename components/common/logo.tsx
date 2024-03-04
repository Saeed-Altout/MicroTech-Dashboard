import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <>
      <Link
        href="/home"
        className={cn("relative w-40 h-16 block dark:hidden", className)}
      >
        <Image src="/logo.svg" fill alt="Logo" className="object-contain " />
      </Link>
      <Link
        href="/home"
        className={cn("relative w-40 h-16 hidden dark:block", className)}
      >
        <Image
          src="/logo-dark.svg"
          fill
          alt="Logo"
          className="object-contain"
        />
      </Link>
    </>
  );
};
