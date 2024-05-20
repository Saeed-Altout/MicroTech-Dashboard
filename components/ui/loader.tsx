"use client";

import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
