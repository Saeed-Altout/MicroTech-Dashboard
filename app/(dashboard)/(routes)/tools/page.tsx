import { columns } from "./components/columns";
import { getToolsKit } from "@/data/toolkit";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateDialog } from "@/components/ui/create-dialog";
import { ClientButton } from "@/components/common/client-button";

export default async function Technologies() {
  const data = await getToolsKit();

  return (
    <>
      <CreateDialog
        title="Create Tool-kit"
        description="Add New Tool-kit"
        endpoint="tool"
      />
      <Heading title="Tools-kit" description="Welcome in tools-kit page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
