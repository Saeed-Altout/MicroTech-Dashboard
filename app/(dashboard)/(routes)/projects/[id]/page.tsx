import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { FormProject } from "./components/form-project";
import { getConstDataProject, getProjectById } from "@/data";

export default async function NewProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const constData = await getConstDataProject();
  const initialData = await getProjectById(params.id);

  const title = initialData ? "Edit project" : "Create Project";
  const description = initialData ? "Edit your project" : "Add New Project.";

  return (
    <>
      <Heading title={title} description={description} />
      <Separator />
      <FormProject initialData={initialData} constant={constData} />
    </>
  );
}
