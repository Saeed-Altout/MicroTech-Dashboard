import { columns } from "./components/columns";
import { getPlatforms } from "@/data";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CreateDialog } from "@/components/ui/create-dialog";
import { ClientButton } from "@/components/common/client-button";

export default async function PlatformsPage() {
  const data = await getPlatforms();

  return (
    <>
      <CreateDialog
        title="Create Platform"
        description="Add New Platform"
        endpoint="platform"
      />
      <Heading title="Platforms" description="Welcome in platforms page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
