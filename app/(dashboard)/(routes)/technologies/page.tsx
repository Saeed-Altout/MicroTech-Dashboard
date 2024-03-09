import { columns } from "./components/columns";
import { getTechnologies } from "@/data/technology";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateDialog } from "@/components/ui/create-dialog";
import { ClientButton } from "@/components/common/client-button";

export default async function Technologies() {
  const data = await getTechnologies();

  return (
    <>
      <CreateDialog
        title="Create Technology"
        description="Add New Technology"
        endpoint="technology"
      />
      <Heading title="Technologies" description="Welcome in technologies page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
