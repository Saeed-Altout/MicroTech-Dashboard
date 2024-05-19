"use client";

import { useState } from "react";
import { AxiosData } from "@/lib/axios";
import { Edit, Trash } from "lucide-react";

import { MemberColumn } from "./columns";
import { MembersForm } from "./form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

const axiosData = new AxiosData();

export const RowActions = ({ data }: { data: MemberColumn }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axiosData.deleteData(`member/delete?id=${data.id}`);
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
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Update info member.</SheetTitle>
              <SheetDescription>
                you can update information member by edit name or icon or both.
              </SheetDescription>
            </SheetHeader>
            <div className="pt-10">
              <MembersForm
                onClose={() => setOpenSheet(false)}
                initialData={data}
              />
            </div>
          </SheetContent>
        </Sheet>
        <Button
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setOpenSheet(true)}
        >
          <span className="sr-only">Edit</span>
          <Edit className="h-4 w-4" />
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
