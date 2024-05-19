"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosData } from "@/lib/axios";

import { columns, ProjectColumn } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

const axiosData = new AxiosData();

export const ClientProjects = () => {
  const [data, setData] = useState<ProjectColumn[]>([]);

  useEffect(() => {
    axiosData
      .fetchData("project/index")
      .then((fetchedData) => {
        setData(fetchedData.data);
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  return (
    <>
      <Heading
        title="Projects"
        description="You can added project from one place."
      >
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
