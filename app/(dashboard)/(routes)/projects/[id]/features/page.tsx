import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { findUniq } from "@/helpers/findUniq";
import { FormProjectImages } from "./_components/form-project-images";

export default async function Images({ params }: { params: { id: any } }) {
  const initialData = await findUniq({
    id: params.id,
    entrypoint: "project",
  });

  const title = initialData ? "Edit features" : "Create features";
  const description = initialData
    ? "Edit your features."
    : "Add a new features.";

  return (
    <div className="space-y-6">
      <Heading title={title} description={description} />
      <Separator />
      <FormProjectImages initialData={initialData} />
    </div>
  );
}
