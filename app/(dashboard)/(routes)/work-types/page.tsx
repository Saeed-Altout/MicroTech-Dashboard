import { columns } from "./_components/columns";
import { Client } from "./_components/client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { WorkTypeColumn } from "@/config/config";
import { findMany } from "@/helpers/findMany";

export default async function WorkTypes() {
  const data: WorkTypeColumn[] = await findMany({ entrypoint: "work_types" });

  return (
    <div className="space-y-6">
      <Client />
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </div>
  );
}
