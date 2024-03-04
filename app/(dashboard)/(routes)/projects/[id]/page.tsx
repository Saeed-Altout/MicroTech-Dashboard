import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { FormProject } from "./components/form-project";
import { getConstData, getProjectById } from "@/data/project";

export default async function NewProject({
  params,
}: {
  params: { id: string };
}) {
  const constData = await getConstData();
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
