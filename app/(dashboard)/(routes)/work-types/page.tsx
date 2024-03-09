import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateDialog } from "@/components/ui/create-dialog";
import { ClientButton } from "@/components/common/client-button";
import { getWorkTypes } from "@/data/worktype";

export default async function WorkTypesPage() {
  const data = await getWorkTypes();

  return (
    <>
      <CreateDialog
        title="Create Work Type"
        description="Add New Work Type"
        endpoint="work_types"
      />
      <Heading title="Work Types" description="Welcome in work types page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
