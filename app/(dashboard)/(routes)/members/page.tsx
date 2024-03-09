import { columns } from "./components/columns";
import { getMembers } from "@/data/member";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ClientButton } from "@/components/common/client-button";
import { CreateMemberDialog } from "@/components/ui/create-member-dialog";

export default async function MembersPage() {
  const data = await getMembers();

  return (
    <>
      <CreateMemberDialog />
      <Heading title="Members" description="Welcome in members page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
