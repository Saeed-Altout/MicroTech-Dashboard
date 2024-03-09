"use client";

import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateModal } from "@/hooks/use-create-modal";

export const ClientButton = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const createModal = useCreateModal();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Button onClick={() => createModal.onOpen()}>
      <Plus className="h-4 w-4 mr-2" />
      Add New
    </Button>
  );
};
