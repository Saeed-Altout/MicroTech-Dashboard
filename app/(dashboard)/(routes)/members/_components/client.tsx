"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosData } from "@/lib/axios";

import { MembersForm } from "./form";
import { columns, MemberColumn } from "./columns";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

const axiosData = new AxiosData();

export const ClientMembers = () => {
  const [data, setData] = useState<MemberColumn[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    axiosData
      .fetchData("member/index")
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return (
    <>
      <Heading
        title="Members"
        description="You can added member from one place."
      >
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Heading>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create a new member.</SheetTitle>
            <SheetDescription>
              you can create a new member by added name and icon.
            </SheetDescription>
          </SheetHeader>
          <div className="pt-10">
            <MembersForm initialData={null} onClose={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
