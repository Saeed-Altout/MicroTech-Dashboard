import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Client } from "./_components/client";

import { Separator } from "@/components/ui/separator";

import { ProjectColumn } from "@/config/config";
import { findMany } from "@/helpers/findMany";

export default async function Projects() {
  const data: ProjectColumn[] = await findMany({ entrypoint: "project" }).then(
    (res) => res.data
  );

  return (
    <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)] ">
      <div className="space-y-6">
        <Client />
        <Separator />
        <DataTable columns={columns} data={data} searchKey="title" />
      </div>
    </div>
  );
}
