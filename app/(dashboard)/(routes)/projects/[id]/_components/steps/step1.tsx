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
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useProjectStore } from "@/hooks/use-project-store";
import { useFormContext } from "react-hook-form";

export const Step1 = () => {
  const step = useStep();
  const { handleImage } = useProjectStore();
  const { getValues, control, setError, clearErrors } = useFormContext();

  const moveNext = async () => {
    const values = {
      cover: getValues("cover"),
      logo: getValues("logo"),
      title: getValues("title"),
      functionality: getValues("functionality"),
      about: getValues("about"),
      description: getValues("description"),
    };
    const formSchema = z.object({
      cover: z.string(),
      logo: z.string(),
      title: z.string(),
      functionality: z.string(),
      about: z.string(),
      description: z.string(),
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
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
        <FormField
          control={control}
          name="cover"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="cursor-pointer h-full flex justify-center items-center gap-3 border-dashed border rounded-md overflow-hidden py-3 relative">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Cover"
                    loading="eager"
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                      e.target.src = "./logo-icon-dark.svg";
                    }}
                  />
                ) : (
                  <>
                    <ImagePlus
                      strokeWidth={0.5}
                      className="w-8 h-8 text-muted-foreground"
                    />
                    <p className="text-muted-foreground">Upload Cover</p>
                  </>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e, field.onChange, "cover")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="logo"
          render={({ field }) => (
            <FormItem className="absolute w-24 h-24 bottom-4 left-4 bg-transparent rounded-md">
              <FormLabel className="bg-background cursor-pointer h-full flex justify-center items-center gap-3 border-dashed border rounded-md overflow-hidden py-3">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Logo"
                    loading="eager"
                    fill
                    className="object-contain max-w-16 max-h-16 m-auto"
                    onError={(e: any) => {
                      e.target.src = "./logo-icon-dark.svg";
                    }}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center text-center text-xs">
                    <ImagePlus
                      strokeWidth={0.5}
                      className="w-5 h-5 text-muted-foreground"
                    />
                    <p className="text-muted-foreground">Upload Logo</p>
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e, field.onChange, "logo")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
