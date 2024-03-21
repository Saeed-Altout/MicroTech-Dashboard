import { ProjectClient } from "./components/client";
import { getProjectById } from "@/data";

export default async function NewProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(params.id);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <ProjectClient initialData={project} />
      </div>
    </div>
  );
}
