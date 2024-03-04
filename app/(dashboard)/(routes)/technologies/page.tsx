import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateModal } from "@/components/modals/create-modal";
import { ClientButton } from "@/components/common/client-button";

import { getItems } from "@/data/item";
import { TechnologyColumn } from "@/config/config";

export default async function Technologies() {
  const data: TechnologyColumn[] = await getItems("technology");

  return (
    <>
      <CreateModal
        title="Create Technology"
        description="Add New technology"
        enterypoint="technology"
      />
      <Heading title="Technologies" description="Welcome in technologies page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
