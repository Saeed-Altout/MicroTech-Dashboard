"use client";

import * as z from "zod";

import { useStep } from "@/hooks/use-step";
import { Button } from "@/components/ui/button";

import { FormSelect } from "@/components/form-select";

const formSchema = z.object({
  technologies: z.array(z.number().min(1)),
  tools: z.array(z.number().min(1)),
  work_types: z.array(z.number().min(1)),
  platforms: z.array(z.number().min(1)),
  members: z.array(z.number().min(1)),
});

interface Step3Props {
  form: any;
  constant: any;
}

export const Step3 = ({ form, constant }: Step3Props) => {
  const step = useStep();

  const moveNext = () => {
    const values = {
      technologies: form.getValues("technologies"),
      tools: form.getValues("tools"),
      work_types: form.getValues("work_types"),
      platforms: form.getValues("platforms"),
      members: form.getValues("members"),
    };

    const validatedFields = formSchema.safeParse(values);
    if (validatedFields.success) {
      step.increase();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
        <FormSelect
          items={constant.technologies}
          form={form}
          name="technologies"
          heading="Technologies"
          href="/technologies"
          label="Create Technology"
        />
        <FormSelect
          items={constant.tools}
          form={form}
          name="tools"
          heading="Tools-Kit"
          href="/tools"
          label="Create Tool-kit"
        />
        <FormSelect
          items={constant.members}
          form={form}
          name="members"
          heading="Members"
          href="/members"
          label="Create Member"
        />
        <FormSelect
          items={constant.platforms}
          form={form}
          name="platforms"
          heading="Platforms"
          href="/platforms"
          label="Create Platform"
        />
        <FormSelect
          items={constant.work_types}
          form={form}
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
