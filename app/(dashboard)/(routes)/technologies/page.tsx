import axios from "axios";
import { TechnologyColumn } from "@/config/config";

import { columns } from "./components/columns";
import { Client } from "./components/client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default async function Technologies() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/technology/index`
  );
  const data: TechnologyColumn[] = await res.data.data;

  return (
    <>
      <Client />
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
