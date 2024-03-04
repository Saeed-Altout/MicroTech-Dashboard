"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateModal } from "@/hooks/use-create-modal";

export const ClientButton = () => {
  const createModal = useCreateModal();

  return (
    <Button onClick={() => createModal.onOpen()}>
      <Plus className="h-4 w-4 mr-2" />
      Add New
    </Button>
  );
};
