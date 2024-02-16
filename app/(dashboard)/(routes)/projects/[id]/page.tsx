import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { FormProject } from "./_components/form-project";

import { findUniq } from "@/helpers/findUniq";

export default async function NewProject({ params }: { params: { id: any } }) {
  const constant = await axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/get_groups`)
    .then((res) => res.data.data);

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
