"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ItemProps {
  label: string;
  href: string;
  pathname: string | any;
  icon: LucideIcon;
  onClick?: () => void;
}
export const Item: React.FC<ItemProps> = ({
  label,
  href,
  pathname,
  icon: Icon,
  onClick,
}) => {
  const currentPathname = usePathname();
  return (
    <Link href={href} className="w-full" onClick={onClick}>
      <Button
        variant={currentPathname === pathname ? "default" : "ghost"}
        className="flex justify-start items-center gap-3 w-full text-base font-medium"
      >
        <Icon className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
        {label}
      </Button>
    </Link>
  );
};
