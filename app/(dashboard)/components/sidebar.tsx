"use client";

import Link from "next/link";
import { Key, useState } from "react";
import { LogOut, LucideIcon, Menu, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Logo } from "@/components/logo";

import { LinksProps, RoutesProps, routes } from "@/config";
import { useCreateModal } from "@/hooks/use-create-modal";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const createModal = useCreateModal();

  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <aside className="w-60 hidden md:flex flex-col border-r">
        <div className="h-16 flex justify-center items-center">
          <Logo />
        </div>
        <ScrollArea>
          <div className="flex-1 flex flex-col justify-start items-start py-6 md:px-4 gap-6">
            {routes.map(({ title, links }: RoutesProps, index: Key) => (
              <div className="w-full" key={index}>
                <h3 className="font-semibold text-lg mb-3 w-full">{title}</h3>
                <div className="w-full flex flex-col gap-3">
                  {links.map(
                    ({ label, href, icon: Icon }: LinksProps, index: Key) => (
                      <Item
                        key={index}
                        label={label}
                        href={href}
                        icon={Icon}
                        onClick={() => setIsOpen(false)}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
            <Separator />
            <Button
              variant="ghost"
              className="flex justify-start items-center gap-3 w-full text-sm font-medium"
              onClick={() => createModal.onOpen()}
            >
              <Plus className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
              Add Project
            </Button>
          </div>
        </ScrollArea>
      </aside>

      <Sheet open={isOpen} onOpenChange={onChange}>
        <SheetContent side="left" className="w-full px-0">
          <div className="h-16 flex justify-center items-center">
            <Logo />
          </div>
          <div className="h-[calc(100vh-64px)] ">
            <ScrollArea className="h-full">
              <div className="flex-1 flex px-4 flex-col justify-start items-start py-6 md:px-4 gap-6">
                {routes.map(({ title, links }: RoutesProps, index: Key) => (
                  <div className="w-full" key={index}>
                    <h3 className="font-semibold text-lg mb-3 w-full">
                      {title}
                    </h3>
                    <ul className="w-full flex flex-col gap-3">
                      {links.map(
                        (
                          { label, href, icon: Icon, pathname }: LinksProps,
                          index: Key
                        ) => (
                          <Item
                            key={index}
                            label={label}
                            href={href}
                            icon={Icon}
                            onClick={() => setIsOpen(false)}
                          />
                        )
                      )}
                    </ul>
                  </div>
                ))}
                <Separator />
                <Button
                  variant="ghost"
                  className="flex justify-start items-center gap-3 w-full text-sm font-medium"
                  onClick={() => createModal.onOpen()}
                >
                  <Plus className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  Add Project
                </Button>
                <Button
                  variant="ghost"
                  className="flex justify-start items-center gap-3 w-full text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
                  Logout
                </Button>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      <div className="h-16 md:hidden flex justify-center items-center fixed left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Menu />
        </Button>
      </div>
    </>
  );
};

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
        variant="ghost"
        className="flex justify-start items-center gap-3 w-full text-sm font-medium"
      >
        <Icon className="h-4 w-4 mr-2 md:mr-0 lg:mr-2" />
        {label}
      </Button>
    </Link>
  );
};
