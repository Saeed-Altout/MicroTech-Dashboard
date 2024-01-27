import axios from "axios";

import { Client } from "./components/client";
import { columns } from "./components/columns";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
export default async function Technologies() {
  const res = axios.get(
    "https://backend.microtechdev.com/micro_tech/technology/index"
  );
  const data = res;

  return (
    <>
      <Client />
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
