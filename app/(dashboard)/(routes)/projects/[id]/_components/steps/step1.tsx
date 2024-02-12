"use client";

import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useStep } from "@/hooks/use-step";

const formSchema = z.object({
  title: z.string().min(1),
  functionality: z.string().min(1),
  about: z.string().min(1),
  description: z.string().min(1),
});

interface Step1Props {
  form: any;
}

export const Step1 = ({ form }: Step1Props) => {
  const step = useStep();

  const moveNext = () => {
    const values = {
      title: form.getValues("title"),
      functionality: form.getValues("functionality"),
      about: form.getValues("about"),
      description: form.getValues("description"),
    };

    const validatedFields = formSchema.safeParse(values);
    if (validatedFields.success) {
      step.increase();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="functionality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Functionality</FormLabel>
              <FormControl>
                <Input placeholder="functionality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="about" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
