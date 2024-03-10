"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onLogout = async () => {
    startTransition(() => {
      logout().then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
        }
      });
    });

  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="/" />
          <AvatarFallback className="bg-primary">
            <FaUser className="text-background h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem
          disabled={isPending}
          className="cursor-pointer"
          onClick={onLogout}
        >
          <ExitIcon className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
