import { PlatformClient } from "./components/client";
import { PlatformColumn } from "./components/columns";
import { getPlatforms } from "@/data";

export default async function PlatformsPage() {
  const platforms = await getPlatforms();

  const formattedPlatforms: PlatformColumn[] = platforms.map((item: any) => ({
    id: item.id,
    name: item.name,
    icon: item.icon_url,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <PlatformClient initialData={formattedPlatforms} />
      </div>
    </div>
  );
}
