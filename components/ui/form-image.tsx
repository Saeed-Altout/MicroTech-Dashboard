"use client";

import Image from "next/image";
import { ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useImageContext } from "@/contexts/image-contex";

interface FormImageProps {
  name: string;
  label?: string;
  loading?: boolean;
  placeholder?: string;
}

export const FormImage = ({
  name,
  label,
  loading,
  placeholder,
}: FormImageProps) => {
  const { control } = useFormContext();
  const { handleImage } = useImageContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center">
            {field.value ? (
              <div className="h-20 w-20 overflow-hidden">
                <Image
                  src={field.value}
                  alt="Icon"
                  width={100}
                  height={100}
                  loading="eager"
                  className="object-contain"
                  style={{ width: "100%", height: "auto" }}
                  onError={(e: any) => {
                    e.target.src = "./logo-icon.svg";
                  }}
                />
              </div>
            ) : (
              <ImagePlus
                strokeWidth={0.5}
                className="w-20 h-20 text-muted-foreground"
              />
            )}
          </FormLabel>
          <FormControl>
            <Input
              className="w-full h-[250px] hidden"
              type="file"
              accept="image/*"
              disabled={loading}
              placeholder={placeholder}
              onChange={(e) => handleImage(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
