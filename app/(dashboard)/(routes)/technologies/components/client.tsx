"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CreateModal } from "@/components/modals/create-modal";
import { useCreateModal } from "@/hooks/use-create-modal";

export const Client = () => {
  const createModal = useCreateModal();
  return (
    <>
      <CreateModal
        title="Create Technology"
        description="Add a new technology"
        url="http://127.0.0.1:8000/technology/create"
      />
      <Heading
        title="Technologies"
        description="Wellcome in technologies page."
      >
        <Button onClick={() => createModal.onOpen()}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Heading>
    </>
  );
};
