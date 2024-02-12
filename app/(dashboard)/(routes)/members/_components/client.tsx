"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import { useCreateModal } from "@/hooks/use-create-modal";
import { CreateModalMember } from "@/components/modals/create-member-modal";

export const Client = () => {
  const createModal = useCreateModal();

  return (
    <>
      <CreateModalMember />
      <Heading title="Members" description="Welcome in members page.">
        <Button onClick={() => createModal.onOpen()}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Heading>
    </>
  );
};
