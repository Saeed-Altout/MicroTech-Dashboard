"use client";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Stars } from "lucide-react";

export const CheckPart = () => {
  const { control } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FormField
        control={control}
        name="isSpecial"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                // @ts-ignore
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center">
                <Stars className="h-4 w-4 mr-2" />
                Special
              </FormLabel>
              <FormDescription>
                This project will appear on the home page.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                // @ts-ignore
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center">
                {field.value ? (
                  <Eye className="h-4 w-4 mr-2" />
                ) : (
                  <EyeOff className="h-4 w-4 mr-2" />
                )}
                Active
              </FormLabel>
              <FormDescription>
                This project will appear for public.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
