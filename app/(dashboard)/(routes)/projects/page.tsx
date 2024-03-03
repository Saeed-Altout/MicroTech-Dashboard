import { findMany } from "@/helpers/findMany";
import { Client } from "./_components/client";
import { DataTable } from "./_components/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./_components/columns";

export default async function Projects() {
  const data = await findMany({ entrypoint: "project" });

  return (
    <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)] ">
      <div className="space-y-6">
        <Client />
        <Separator />
        <DataTable columns={columns} data={data.data} searchKey="title" />
      </div>
    </div>
  );
}
