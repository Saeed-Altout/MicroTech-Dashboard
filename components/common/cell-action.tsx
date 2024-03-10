"use client";

import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/ui/edit-dialog";
import { DeleteDialog } from "@/components/ui/delete-dialog";

import { Item } from "@/interface";
import { trash } from "@/actions";

export const CellAction = ({
  data,
  endpoint,
}: {
  data: Item;
  endpoint: string;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();

  const router = useRouter();

  const onConfirm = async () => {
    startTransition(() => {
      trash(endpoint, data?.id.toString()).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
          setIsDelete(false);
        }
      });
    });
  };

  return (
    <>
      <DeleteDialog
        isOpen={isDelete}
        loading={loading}
        onConfirm={onConfirm}
        onClose={() => setIsDelete(false)}
      />

      <EditDialog
        title={`Edit ${endpoint}`}
        description={`You can edit ${endpoint}.`}
        endpoint={endpoint}
        data={data}
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
