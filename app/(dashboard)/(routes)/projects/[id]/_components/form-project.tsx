"use client";

import * as z from "zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { useStep } from "@/hooks/use-step";
import { projectSchema } from "@/schemas";

import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";

interface FormProjectProps {
  initialData?: any;
  constant?: any;
}

export const FormProject = ({ initialData, constant }: FormProjectProps) => {
  const step = useStep();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: getInitialValues(initialData),
  });

  const renderStep = () => {
    switch (step.current) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 form={form} />;
      case 3:
        return <Step3 form={form} constant={constant} />;
      case 4:
        return <Step4 form={form} initialData={initialData} />;
      default:
        return <Step1 />;
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form>{renderStep()}</form>
      </Form>
    </FormProvider>
  );
};

const getInitialValues = (initialData?: any) => ({
  cover: initialData?.cover_url || "",
  logo: initialData?.logo_url || "",
  title: initialData?.title || "",
  functionality: initialData?.functionality || "",
  about: initialData?.about || "",
  description: initialData?.description || "",
  advantages: initialData?.advantages || [""],
  links: initialData?.links || [
    {
      link: "",
      platform: "",
    },
  ],
  technologies: initialData?.technologies.map((item: any) => item.id) || [""],
  tools: initialData?.tools.map((item: any) => item.id) || [""],
  work_types: initialData?.work_types.map((item: any) => item.id) || [""],
  platforms: initialData?.platforms.map((item: any) => item.id) || [""],
  members: initialData?.members.map((item: any) => item.id) || [""],
});
