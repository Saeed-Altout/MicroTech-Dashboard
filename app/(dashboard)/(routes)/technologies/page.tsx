import { columns } from "./components/columns";
import { Client } from "./components/client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { getData } from "@/helpers/get-data";
import { TechnologyColumn } from "@/config/config";

export default async function Technologies() {
  const res = await getData("technology");
  const data: TechnologyColumn[] = await res.data;

  return (
    <>
      <Client />
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
