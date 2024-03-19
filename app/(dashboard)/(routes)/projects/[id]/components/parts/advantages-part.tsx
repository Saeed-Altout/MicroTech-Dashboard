"use client";

import { Minus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AdvantagesPart = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "advantages",
    control: control,
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <FormLabel className="text-lg whitespace-nowrap">Advantages</FormLabel>
        <Button
          type="button"
          variant="default"
          onClick={() => append({ value: "" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add advantage
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`advantages.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-5">
                <FormControl className="flex-1">
                  <Input placeholder="advantage" {...field} />
                </FormControl>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};
