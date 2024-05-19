"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosData } from "@/lib/axios";

import { WorkTypesForm } from "./form";
import { columns, WorkTypeColumn } from "./columns";

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

export const ClientWorkTypes = () => {
  const [data, setData] = useState<WorkTypeColumn[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    axiosData
      .fetchData("work_types/index")
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
        title="Work Types"
        description="You can added work type from one place."
      >
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Heading>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create a new work type.</SheetTitle>
            <SheetDescription>
              you can create a new work type by added name and icon.
            </SheetDescription>
          </SheetHeader>
          <div className="pt-10">
            <WorkTypesForm initialData={null} onClose={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
