import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateModal } from "@/components/modals/create-modal";
import { ClientButton } from "@/components/common/client-button";

import { getItems } from "@/data/item";
import { ToolColumn } from "@/config/config";

export default async function ToolsKitPage() {
  const data: ToolColumn[] = await getItems("tool");

  return (
    <>
      <CreateModal
        title="Create Tool"
        description="Add New Tool"
        enterypoint="tool"
      />
      <Heading title="Tools kit" description="Welcome in tools kit page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
