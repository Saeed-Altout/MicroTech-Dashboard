"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useStep } from "@/hooks/use-step";

interface Step4Props {
  form: any;
  initialData: any;
}

export const Step4 = ({ form, initialData }: Step4Props) => {
  const [loading, setLoading] = useState(false);

  const step = useStep();
  const router = useRouter();

  const label = initialData ? "Save" : "Create";
  const message = initialData ? "Saved ✉️" : "Created 👏";

  const onClick = async () => {
    try {
      setLoading(true);

      const values = await form.getValues();
      initialData
        ? await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/project/edit`, {
            id: initialData.id,
            title: values.title,
            about: values.about,
            description: values.description,
            advantages: values.advantages,
            functionality: values.functionality,
            links: values.links,
            technology_ids: values.technologies,
            tool_ids: values.tools,
            platform_ids: values.platforms,
            member_ids: values.members,
            work_type_ids: values.work_types,
          })
        : await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/project/create`,
            {
              title: values.title,
              about: values.about,
              description: values.description,
              advantages: values.advantages,
              functionality: values.functionality,
              links: values.links,
              technology_ids: values.technologies,
              tool_ids: values.tools,
              platform_ids: values.platforms,
              member_ids: values.members,
              work_type_ids: values.work_types,
            }
          );

      toast.success(
        initialData ? `${initialData.title} edited!` : "New project created!"
      );

      router.push("/projects");
      step.reset();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="w-full py-10 border flex justify-center items-center border-dashed rounded-md">
          <h1 className="text-3xl font-semibold">{message}</h1>
        </div>
      </div>
      <div className="py-6 flex md:justify-center justify-end items-center gap-5">
        <Button type="button" variant="outline" onClick={() => step.decrease()}>
          Prev
        </Button>
        <Button type="button" onClick={onClick}>
          {label} {loading && <Spinner className="ml-2 text-white" />}
        </Button>
      </div>
    </div>
  );
};
