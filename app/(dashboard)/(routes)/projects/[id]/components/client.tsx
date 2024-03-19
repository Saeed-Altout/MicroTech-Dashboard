import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ProjectColumn } from "../../components/columns";
import { FormProject } from "./form-project";
import { getConstDataProject } from "@/data";

interface ProjectClientProps {
  initialData: ProjectColumn;
}

export const ProjectClient = async ({ initialData }: ProjectClientProps) => {
  const constData = await getConstDataProject();
  const title = initialData ? "Edit project" : "Create project";
  const description = initialData
    ? "you can edit your project"
    : "you can create a new project";

  return (
    <>
      <Heading title={title} description={description} />
      <Separator />
      <FormProject initialData={initialData} constantData={constData} />
    </>
  );
};
