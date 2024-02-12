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
        title="Create Work type"
        description="Add a new work type"
        enterypoint="work_types"
      />
      <Heading title="Work Types" description="Welcome in work types page.">
        <Button onClick={() => createModal.onOpen()}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Heading>
    </>
  );
};
