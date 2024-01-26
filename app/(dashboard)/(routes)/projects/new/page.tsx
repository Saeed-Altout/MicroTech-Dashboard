import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FormProject } from "./components/form-project";

export default function NewProject() {
  // fetch data here
  return (
    <>
      <Heading title="Create project" description="Add a new Project." />
      <Separator />
      <FormProject />
    </>
  );
}
