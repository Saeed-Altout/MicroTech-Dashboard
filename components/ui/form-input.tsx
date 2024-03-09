"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends HTMLAttributes<HTMLElement> {
  name: string;
  label?: string;
  loading?: boolean;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}
export const FormInput = ({
  name,
  label,
  loading,
  placeholder,
  type,
  textarea = false,
  className,
}: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {textarea ? (
              <Textarea
                rows={6}
                disabled={loading}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                type={type}
                disabled={loading}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
