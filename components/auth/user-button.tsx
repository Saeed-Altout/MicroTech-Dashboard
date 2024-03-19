"use client";

import { useTransition } from "react";
import { FaUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { LogOut } from "lucide-react";
import { logout } from "@/actions/logout";
import { toast } from "sonner";

export const UserButton = () => {
  const [isLoading, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(() => {
      logout().then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          window.localStorage.setItem("next__%&$", "");
          window.location.reload();
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
          disabled={isLoading}
          onClick={onClick}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
