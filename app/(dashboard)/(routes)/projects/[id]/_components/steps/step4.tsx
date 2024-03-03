"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useStep } from "@/hooks/use-step";
import { useProjectStore } from "@/hooks/use-project-image";
import { useFormContext } from "react-hook-form";

interface Step4Props {
  initialData?: any;
}

export const Step4 = ({ initialData }: Step4Props) => {
  const [loading, setLoading] = useState(false);
  const { files } = useProjectStore();
  const { getValues } = useFormContext();

  const step = useStep();
  const router = useRouter();

  const label = initialData ? "Save" : "Create";
  const message = initialData ? "Saved ✉️" : "Created 👏";

  const onClick = async () => {
    try {
      setLoading(true);

      const values = await getValues();
      let newFormData = new FormData();

      newFormData.append("cover", files.cover[0]);
      newFormData.append("logo", files.logo[0]);

      if (initialData) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/edit`,
          {
            id: initialData.id,
            cover: newFormData.get("cover"),
            logo: newFormData.get("logo"),
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
          },
          {
            headers: {
              "Content-Type": "multipart/form-data", // Make sure to set the proper content type
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/create`,
          {
            cover: newFormData.get("cover"),
            logo: newFormData.get("logo"),
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
          },
          {
            headers: {
              "Content-Type": "multipart/form-data", // Make sure to set the proper content type
            },
          }
        );
      }

      toast.success(
        initialData ? `${initialData.title} edited!` : "New project created!"
      );

      router.push("/projects");
      router.refresh();
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
