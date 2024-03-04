import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { getProjectById } from "@/data/project";
import { FormProjectImages } from "./_components/form-project-images";
import { ProjectColumn } from "@/config/config";

export default async function Images({ params }: { params: { id: any } }) {
  const initialData: ProjectColumn = await getProjectById(params.id);

  const title = initialData.images.length > 0 ? "Edit images" : "Create images";
  const description =
    initialData.images.length > 0 ? "Edit your images." : "Add a new images.";

  return (
    <>
      <Heading title={title} description={description} />
      <Separator />
      <FormProjectImages initialData={initialData} />
    </>
  );
}
