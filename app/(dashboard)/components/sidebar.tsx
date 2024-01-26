"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { routes } from "@/config/config";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Item } from "./item";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <aside className="border-r h-full">
      <div className="w-60 hidden md:flex flex-col">
        <div className="h-16 flex justify-center items-center">
          <Logo />
        </div>

        <div className="flex-1 flex flex-col justify-start items-start py-6 md:px-4 gap-6">
          {routes.map(({ title, links }, index) => (
            <div className="w-full" key={index}>
              <h3 className="font-semibold text-lg mb-3 w-full">{title}</h3>
              <div className="w-full flex flex-col gap-3">
                {links.map(({ label, href, icon: Icon, pathname }, index) => (
                  <Item
                    key={index}
                    label={label}
                    href={href}
                    icon={Icon}
                    pathname={pathname}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={onChange}>
        <SheetContent side="left" className="w-full">
          <div className="h-16 flex justify-center items-center">
            <Logo />
          </div>

          <div className="flex-1 flex flex-col justify-start items-start py-6 md:px-4 gap-6">
            {routes.map(({ title, links }, index) => (
              <div className="w-full" key={index}>
                <h3 className="font-semibold text-lg mb-3 w-full">{title}</h3>
                <ul className="w-full flex flex-col gap-3">
                  {links.map(({ label, href, icon: Icon, pathname }, index) => (
                    <Item
                      key={index}
                      label={label}
                      href={href}
                      icon={Icon}
                      pathname={pathname}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </ul>
              </div>
            ))}
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
    </aside>
  );
};
