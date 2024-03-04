import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateModal } from "@/components/modals/create-modal";
import { ClientButton } from "@/components/common/client-button";

import { getItems } from "@/data/item";
import { WorkTypeColumn } from "@/config/config";

export default async function WorkTypesPage() {
  const data: WorkTypeColumn[] = await getItems("work_types");

  return (
    <>
      <CreateModal
        title="Create Work_type"
        description="Add New Work Types"
        enterypoint="work_types"
      />
      <Heading title="Work Types" description="Welcome in work types page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
