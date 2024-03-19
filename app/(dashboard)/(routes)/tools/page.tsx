import { ToolKitClient } from "./components/client";
import { ToolKitColumn } from "./components/columns";
import { getToolsKit } from "@/data";

export default async function ToolKitPage() {
  const toolsKit = await getToolsKit();

  const formattedToolsKit: ToolKitColumn[] = toolsKit.map((item: any) => ({
    id: item.id,
    name: item.name,
    icon: item.icon_url,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <ToolKitClient initialData={formattedToolsKit} />
      </div>
    </div>
  );
}
