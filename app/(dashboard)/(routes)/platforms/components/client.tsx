"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { PlatformColumn, columns } from "./columns";
import { CreateDialog } from "./create-dialog";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface PlatformClientProps {
  initialData: PlatformColumn[];
}

export const PlatformClient = ({ initialData }: PlatformClientProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <CreateDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Heading title="Platforms" description="Welcome in platforms page.">
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={initialData} />
    </>
  );
};
