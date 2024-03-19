"use client";

import { toast } from "sonner";
import {
  Trash,
  Edit,
  ImagePlus,
  Eye,
  EyeOff,
  Star,
  StarOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteDialog } from "@/components/ui/delete-dialog";

import { trash } from "@/actions";
import { ProjectColumn } from "./columns";
import { activeProject } from "@/actions/project";
import axios, { AxiosRequestConfig } from "axios";
import { onError } from "@/lib/error";

interface CellActionProps {
  initialData: ProjectColumn;
}

export const CellAction = ({ initialData }: CellActionProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.active ? true : false
  );

  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onConfirm = async () => {
    startTransition(() => {
      trash("project", initialData?.id).then((data) => {
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
  const onActive = async () => {
    const token = window.localStorage.getItem("next__%&$");

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setIsLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_ACTIVATE_PROJECT}?id=${initialData?.id}`,
        {},
        config
      );

      toast.success(
        `${initialData?.active === 0 ? "Project active." : "project disabled."}`
      );
      setIsActive(initialData?.active ? false : true);
      router.refresh();
    } catch (error) {
      const message = onError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DeleteDialog
        isOpen={isDelete}
        loading={isPending}
        onConfirm={onConfirm}
        onClose={() => setIsDelete(false)}
      />

      <div className="flex item-center gap-5 mr-2">
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading || isPending}
          onClick={() => router.push(`/projects/${initialData.id}/images`)}
        >
          <span className="sr-only">Images</span>
          <ImagePlus className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading || isPending}
          onClick={() => router.push(`/projects/${initialData.id}`)}
        >
          <span className="sr-only">Edit</span>
          <Edit className="h-5 w-5" />
        </Button>
        <Button
          disabled={isLoading || isPending}
          variant="ghost"
          size="icon"
          onClick={() => setIsDelete(true)}
        >
          <span className="sr-only">Delete</span>
          <Trash className="h-5 w-5  text-red-500" />
        </Button>
        <Button
          disabled={isLoading || isPending}
          variant="ghost"
          size="icon"
          onClick={onActive}
        >
          {isActive ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
        <Button
          disabled={isLoading || isPending}
          variant="ghost"
          size="icon"
          onClick={() => setIsSpecial((prev) => !prev)}
        >
          {isSpecial ? (
            <Star className="h-5 w-5" />
          ) : (
            <StarOff className="h-5 w-5" />
          )}
        </Button>
      </div>
    </>
  );
};
