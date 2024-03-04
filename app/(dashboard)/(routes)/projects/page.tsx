import Link from "next/link";
import { Plus } from "lucide-react";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { getItems } from "@/data/item";
import { ProjectColumn } from "@/config/config";

export default async function ProjectsPage() {
  const data = await getItems("project");
  const projects: ProjectColumn[] = data.data;

  return (
    <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)] space-y-6">
      <Heading title="Projects" description="Welcome in projects page.">
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </Link>
      </Heading>
      <Separator />
      <DataTable columns={columns} data={projects} searchKey="title" />
    </div>
  );
}
