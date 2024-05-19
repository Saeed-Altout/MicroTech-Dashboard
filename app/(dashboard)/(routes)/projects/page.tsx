import { ClientProjects } from "./_components/client";

export default async function ProjectsPage() {
  return (
    <div className="flex-1 w-full space-y-6 overflow-x-hidden">
      <ClientProjects />
    </div>
  );
}
