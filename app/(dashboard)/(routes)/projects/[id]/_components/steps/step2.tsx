"use client";

import * as z from "zod";
import { Minus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useStep } from "@/hooks/use-step";

export const Step2 = () => {
  const step = useStep();
  const { getValues, control, setError, clearErrors } = useFormContext();

  const platforms = ["Github", "Facebook", "Instgram", "Other"];

  const {
    fields: advantagesFields,
    append: appendAdvantage,
    remove: removeAdvantage,
  } = useFieldArray({
    name: "advantages",
    control: control,
  });

  const {
    fields: linksFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: "links",
    control: control,
  });

  const moveNext = async () => {
    const values = {
      advantages: getValues("advantages"),
      links: getValues("links"),
    };
    const formSchema = z.object({
      advantages: z.array(z.string().min(1)),
      links: z.array(
        z.object({
          link: z.string().min(1),
          platform: z.string().min(1),
        })
      ),
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
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-lg">Advantages:</FormLabel>
          <div className="w-full flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeAdvantage(advantagesFields.length - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              onClick={() => appendAdvantage("")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-6">
          {advantagesFields.map((field, index) => (
            <FormField
              key={index}
              control={control}
              name={`advantages[${index}]`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="advantage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel className="text-lg">Links:</FormLabel>
          <div className="w-full flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeLink(linksFields.length - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              onClick={() => appendLink({ platform: "", link: "" })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 items-start gap-6">
          {linksFields.map((field, index) => (
            <div key={index} className="flex gap-5">
              <FormField
                control={control}
                name={`links.${index}.link`}
                render={({ field }) => (
                  <FormItem className="w-36">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {platforms?.map((platform, index) => (
                          <SelectItem value={platform} key={index}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`links.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
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
