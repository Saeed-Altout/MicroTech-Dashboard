"use client";

import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

export const Heading = ({
  title,
  description,
  className,
  children,
}: Readonly<{
  title: string;
  description: string;
  className?: HTMLAttributes<HTMLElement>;
  children?: React.ReactNode;
}>) => {
  return (
    <div className={cn("w-full flex justify-between items-center", className)}>
      <div className="flex-1 space-y-1">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};
