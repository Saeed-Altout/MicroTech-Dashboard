"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { axios } from "@/lib/axios";

export const UserButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      toast.error("Success.");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src="/logo-icon.svg"
            width={25}
            height={25}
            alt="Avatar"
            className="object-cover overflow-hidden rounded-full block dark:hidden"
          />
          <Image
            src="/logo-icon.svg"
            width={25}
            height={25}
            alt="Avatar"
            className="object-cover overflow-hidden rounded-full hidden dark:block"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
