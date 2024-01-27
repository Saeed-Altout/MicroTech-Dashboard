"use client";

import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditModal } from "@/hooks/use-edit-modal";

export const CellAction = ({ data }: { data: any }) => {
  const editModal = useEditModal();
  return (
    <>
      <div className="w-fit ml-auto flex items-center gap-5">
        <Button variant="ghost" size="icon" onClick={() => editModal.onOpen()}>
          <span className="sr-only">Edit</span>
          <Edit className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {}}>
          <span className="sr-only">Delete</span>
          <Trash className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </>
  );
};
