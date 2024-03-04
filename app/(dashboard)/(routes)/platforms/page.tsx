import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateModal } from "@/components/modals/create-modal";
import { ClientButton } from "@/components/common/client-button";

import { getItems } from "@/data/item";
import { PlatformColumn } from "@/config/config";

export default async function PlatformsPage() {
  const data: PlatformColumn[] = await getItems("platform");

  return (
    <>
      <CreateModal
        title="Create Platform"
        description="Add New Platform"
        enterypoint="platform"
      />
      <Heading title="Platforms" description="Welcome in paltforms page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
