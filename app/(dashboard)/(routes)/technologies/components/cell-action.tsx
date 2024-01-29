"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { EditModal } from "@/components/modals/edit-modal";
import { TechnologyColumn } from "@/config/config";

export const CellAction = ({ item }: { item: TechnologyColumn }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/technology/delete?id=${item?.id}`
      );

      toast.success(`${item?.name} deleted!`);
      setIsDelete(false);

      router.refresh();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isDelete}
        loading={loading}
        onClose={() => setIsDelete(false)}
        onConfirm={onConfirm}
      />

      <EditModal
        title="Edit Technology"
        description="you can edit technology."
        entrypoint="technology"
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        data={item}
      />

      <div className="flex items-center justify-center gap-5">
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
