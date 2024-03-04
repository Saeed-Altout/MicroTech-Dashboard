import { columns } from "./components/columns";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ClientButton } from "@/components/common/client-button";
import { CreateModalMember } from "@/components/modals/create-member-modal";

import { getItems } from "@/data/item";
import { MemberColumn } from "@/config/config";

export default async function MembersPage() {
  const data: MemberColumn[] = await getItems("member");

  return (
    <>
      <CreateModalMember />
      <Heading title="Members" description="Welcome in members page.">
        <ClientButton />
      </Heading>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
}
