"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { useStateContext } from "@/providers/project-provider";

export const Client = () => {
  const { data } = useStateContext();

  return (
    <>
      <Heading title="Projects" description="Welcome in projects page.">
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </Link>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};
