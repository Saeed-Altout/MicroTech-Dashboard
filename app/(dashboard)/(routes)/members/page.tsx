import { columns } from "./_components/columns";
import { Client } from "./_components/client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { MemberColumn } from "@/config/config";
import { findMany } from "@/helpers/findMany";

export default async function Members() {
  const data: MemberColumn[] = await findMany({ entrypoint: "member" });

  return (
    <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)]">
      <div className="space-y-6">
        <Client />
        <Separator />
        <DataTable columns={columns} searchKey="name" data={data} />
      </div>
    </div>
  );
}
