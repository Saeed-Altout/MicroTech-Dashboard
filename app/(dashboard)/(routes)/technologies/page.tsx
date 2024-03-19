import { TechnologyClient } from "./components/client";
import { TechnologyColumn } from "./components/columns";
import { getTechnologies } from "@/data";

export default async function TechnologiesPage() {
  const technologies = await getTechnologies();

  const formattedTechnologies: TechnologyColumn[] = technologies.map(
    (item: any) => ({
      id: item.id,
      name: item.name,
      icon: item.icon_url,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <TechnologyClient initialData={formattedTechnologies} />
      </div>
    </div>
  );
}
