import { FormTechnology } from "./_components/form-technology";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function NewTechnology({ params }: { params: { id: string } }) {
  // fetch item by id and then passing item to form technology

  return (
    <>
      <Heading
        title="Create Technology"
        description="Added new technology to your project."
      />
      <Separator />
      <FormTechnology />
    </>
  );
}
