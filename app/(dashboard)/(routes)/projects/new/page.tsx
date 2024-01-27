import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FormProject } from "./components/form-project";
import axios from "axios";
export default async function NewProject() {
  const restec = await axios.get(
    "https://backend.microtechdev.com/micro_tech/technology/index"
  );
  const restoo = await axios.get(
    "https://backend.microtechdev.com/micro_tech/tool/index"
  );
  const resmem = await axios.get(
    "https://backend.microtechdev.com/micro_tech/member/index"
  );
  const reswork = await axios.get(
    "https://backend.microtechdev.com/micro_tech/work_types/index"
  );
  const resplat = await axios.get(
    "https://backend.microtechdev.com/micro_tech/platform/index"
  );
  const technologies = await restec.data.data;
  const tools = await restoo.data.data;
  const members = await resmem.data.data;
  const work_types = await reswork.data.data;
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
