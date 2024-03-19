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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LinksPart = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: control,
  });

  const platforms = ["Github", "Facebook", "Instgram", "Other"];

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <FormLabel className="text-lg whitespace-nowrap">Links</FormLabel>
        <Button
          type="button"
          variant="default"
          onClick={() => append({ platform: "", link: "" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add link
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center justify-start gap-5">
            <FormField
              control={control}
              name={`links.${index}.platform`}
              render={({ field }) => (
                <FormItem className="w-32">
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
                      {platforms.map((item, index) => (
                        <SelectItem value={item} key={index}>
                          {item}
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
              name={`links.${index}.link`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => remove(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
