"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const Item: React.FC<ItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
}) => {
  const currentPathname = usePathname();
  return (
    <Link href={href} className="w-full" onClick={onClick}>
      <Button
        variant={currentPathname.includes(href) ? "default" : "ghost"}
        className="flex justify-start items-center gap-3 w-full text-sm font-medium"
      >
        <Icon className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
        {label}
      </Button>
    </Link>
  );
};
