import { WorkTypesClient } from "./components/client";
import { WorkTypesColumn } from "./components/columns";
import { getWorkTypes } from "@/data";

export default async function WorkTypesPage() {
  const workTypes = await getWorkTypes();

  const formattedWorkTypes: WorkTypesColumn[] = workTypes.map((item: any) => ({
    id: item.id,
    name: item.name,
    icon: item.icon_url,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <WorkTypesClient initialData={formattedWorkTypes} />
      </div>
    </div>
  );
}
