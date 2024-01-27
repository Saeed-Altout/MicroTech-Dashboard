import axios from "axios";

import { Client } from "./components/client";
import { columns } from "./components/columns";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
export default async function Technologies() {
  const res = await axios.get("http://127.0.0.1:8000/technology/index");
  const data = await res.data.data;
  return (
    <>
      <Client />
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
