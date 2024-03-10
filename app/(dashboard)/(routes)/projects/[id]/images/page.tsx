import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ProjectColumn } from "@/interface";
import { getProjectById } from "@/data";
import { ClientAction } from "./components/client";

export default async function Images({ params }: { params: { id: any } }) {
  const initialData: ProjectColumn = await getProjectById(params.id);

  const title = "Gallary";
  const description = "Add a new images.";

  return (
    <>
      <Heading title={title} description={description} />
      <Separator />
      <ClientAction initialData={initialData} />
    </>
  );
}
