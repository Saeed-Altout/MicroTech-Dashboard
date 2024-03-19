import { MemberClient } from "./components/client";
import { MemberColumn } from "./components/columns";
import { getMembers } from "@/data";

export default async function MembersPage() {
  const members = await getMembers();

  const formattedMember: MemberColumn[] = members.map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <MemberClient initialData={formattedMember} />
      </div>
    </div>
  );
}
