"use client";

import Link from "next/link";
import { useState } from "react";
import { AxiosData } from "@/lib/axios";
import { Edit, ImagePlus, Trash } from "lucide-react";

import { ProjectColumn } from "./columns";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

const axiosData = new AxiosData();

export const RowActions = ({ data }: { data: ProjectColumn }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axiosData.deleteData(`project/delete?id=${data.id}`);
      setOpen(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />

      <div className="flex items-center gap-x-4">
        <Button
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          asChild
        >
          <Link href={`/projects/${data.id}/gallery`}>
            <span className="sr-only">Images</span>
            <ImagePlus className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          asChild
        >
          <Link href={`/projects/${data?.id}`}>
            <span className="sr-only">Edit</span>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          disabled={isLoading}
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Trash</span>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
