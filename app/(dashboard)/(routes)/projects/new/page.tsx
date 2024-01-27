import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FormProject } from "./components/form-project";
import axios from "axios";
export default async function NewProject() {
  const restec = await axios.get("http://127.0.0.1:8000/technology/index");
  const restoo = await axios.get("http://127.0.0.1:8000/technology/index");
  const resmem = await axios.get("http://127.0.0.1:8000/member/index");
  const reswork = await axios.get("http://127.0.0.1:8000/work_types/index");
  const resplat = await axios.get("http://127.0.0.1:8000/platform/index");
  const technologies = await restec.data.data;
  const tools = await restoo.data.data;
  const members = await resmem.data.data;
  const work_types = await resplat.data.data;
  const platforms = await resplat.data.data;

  return (
    <>
      <Heading title="Create project" description="Add a new Project." />
      <Separator />
      <FormProject
        technologies={technologies}
        tools={tools}
        members={members}
        work_types={work_types}
        platforms={platforms}
      />
    </>
  );
}
