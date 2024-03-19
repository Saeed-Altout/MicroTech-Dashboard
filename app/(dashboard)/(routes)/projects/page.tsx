import { ProjectsClient } from "./components/client";
import { getProjects } from "@/data";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <ProjectsClient initialData={projects} />
      </div>
    </div>
  );
}
