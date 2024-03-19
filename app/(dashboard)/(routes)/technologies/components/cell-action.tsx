"use client";

import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";

import { trash } from "@/actions";
import { EditDialog } from "./edit-dialog";
import { TechnologyColumn } from "./columns";

interface CellActionProps {
  initialData: TechnologyColumn;
}

export const CellAction = ({ initialData }: CellActionProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const onConfirm = async () => {
    startTransition(() => {
      trash("technology", initialData?.id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          setIsDelete(false);
          toast.success(data.success);
          router.refresh();
        }
      });
    });
  };

  return (
    <>
      <DeleteDialog
        isOpen={isDelete}
        loading={isLoading}
        onConfirm={onConfirm}
        onClose={() => setIsDelete(false)}
      />

      <EditDialog
        initialData={initialData}
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
      />

      <div className="flex item-center gap-5">
        <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)}>
          <span className="sr-only">Edit</span>
          <Edit className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsDelete(true)}>
          <span className="sr-only">Delete</span>
          <Trash className="h-5 w-5  text-red-500" />
        </Button>
      </div>
    </>
  );
};
