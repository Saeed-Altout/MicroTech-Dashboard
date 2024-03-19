import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProjectsClientProps {
  initialData: ProjectColumn[];
}

export const ProjectsClient = ({ initialData }: ProjectsClientProps) => {
  return (
    <>
      <Heading title="Projects" description="Welcome in projects page.">
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="title" data={initialData} />
    </>
  );
};
