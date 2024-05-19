import { ClientMembers } from "./_components/client";

export default async function MembersPage() {
  return (
    <div className="flex-1 w-full space-y-6 overflow-x-hidden">
      <ClientMembers />
    </div>
  );
}
