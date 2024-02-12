import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { FormProject } from "./_components/form-project";

import { findUniq } from "@/helpers/findUniq";
import { findMany } from "@/helpers/findMany";

export default async function NewProject({ params }: { params: { id: any } }) {
  const constant = {
    technologies: await findMany({ entrypoint: "technology" }),
    tools: await findMany({ entrypoint: "tool" }),
    members: await findMany({ entrypoint: "member" }),
    work_types: await findMany({ entrypoint: "work_types" }),
    platforms: await findMany({ entrypoint: "platform" }),
  };

  const initialData = await findUniq({
    id: params.id,
    entrypoint: "project",
  });

  const title = initialData ? "Edit project" : "Create project";
  const description = initialData ? "Edit your project" : "Add a new Project.";

  return (
    <div className="space-y-6">
      <Heading title={title} description={description} />
      <Separator />
      <FormProject initialData={initialData} constant={constant} />
    </div>
  );
}
