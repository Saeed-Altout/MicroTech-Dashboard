"use client";

import * as z from "zod";

import { useStep } from "@/hooks/use-step";
import { Button } from "@/components/ui/button";

import { FormSelect } from "@/components/form-select";
import { useFormContext } from "react-hook-form";

interface Step3Props {
  constant: any;
}

export const Step3 = ({ constant }: Step3Props) => {
  const step = useStep();
  const { getValues, setError, clearErrors } = useFormContext();

  const moveNext = async () => {
    const values = {
      technologies: getValues("technologies"),
      tools: getValues("tools"),
      work_types: getValues("work_types"),
      platforms: getValues("platforms"),
      members: getValues("members"),
    };
    const formSchema = z.object({
      technologies: z.array(z.number().min(1)),
      tools: z.array(z.number().min(1)),
      work_types: z.array(z.number().min(1)),
      platforms: z.array(z.number().min(1)),
      members: z.array(z.number().min(1)),
    });

    try {
      await formSchema.parseAsync(values);
      Object.keys(values).forEach((field) => {
        clearErrors(field);
      });
      step.increase();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setError(err.path[0] as string, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
        <FormSelect
          items={constant.technologies}
          name="technologies"
          heading="Technologies"
          href="/technologies"
          label="Create Technology"
        />
        <FormSelect
          items={constant.toolsKit}
          name="tools"
          heading="Tools-Kit"
          href="/tools"
          label="Create Tool-kit"
        />
        <FormSelect
          items={constant.members}
          name="members"
          heading="Members"
          href="/members"
          label="Create Member"
        />
        <FormSelect
          items={constant.platforms}
          name="platforms"
          heading="Platforms"
          href="/platforms"
          label="Create Platform"
        />
        <FormSelect
          items={constant.workTypes}
          name="work_types"
          heading="Work Types"
          href="/work_types"
          label="Create Work Type"
        />
      </div>
      <div className="pt-6 flex justify-end items-center gap-5">
        <Button type="button" variant="outline" onClick={() => step.decrease()}>
          Prev
        </Button>
        <Button type="button" onClick={moveNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
