"use client";

import Link from "next/link";
import axios from "axios";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { AlertModal } from "@/components/modals/alert-modal";
import { ProjectColumn } from "@/config/config";

export const CellAction = ({ data }: { data: ProjectColumn }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/delete?id=${data?.id}`
      );

      toast.success(`${data?.title} deleted!`);
      setIsOpen(false);

      router.refresh();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onChecked = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/activate?id=${data?.id}`
      );
      toast.success(
        `${data?.title} ${data?.active !== 1 ? "Active!" : "Disabled!"}`
      );

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
        isOpen={isOpen}
        loading={loading}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
      />

      <div className="flex items-center gap-4">
        <Link href={`/projects/${data?.id}`}>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Edit</span>
            <Edit className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <span className="sr-only">Delete</span>
          <Trash className="h-5 w-5  text-red-500" />
        </Button>

        <Switch
          checked={data?.active === 1 ? true : false}
          onCheckedChange={onChecked}
        />
      </div>
    </>
  );
};
