"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useStep } from "@/hooks/use-step";
import { useHandleImage } from "@/hooks/use-handle-image";

const formSchema = z.object({
  logo: z.string(),
  cover: z.string(),
});

interface Step0Props {
  initialData: any;
}

export const Step0: React.FC<Step0Props> = ({ initialData }) => {
  const step = useStep();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: initialData?.logo_url || "",
      cover: initialData?.cover_url || "",
    },
  });

  const moveNext = () => {
    const values = {
      logo: form.getValues("logo"),
      cover: form.getValues("cover"),
    };

    const validatedFields = formSchema.safeParse(values);
    if (validatedFields.success) {
      step.increase();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldCover form={form} />
          <FormFieldLogo form={form} />
        </div>
        <div className="pt-6 flex justify-end items-center gap-5">
          <Button
            type="button"
            variant="outline"
            disabled={step.current === 0}
            onClick={() => step.decrease()}
          >
            Prev
          </Button>
          <Button type="button" onClick={moveNext}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

interface FormFieldCoverProps {
  form: any;
}
const FormFieldCover = ({ form }: FormFieldCoverProps) => {
  const { handleImage } = useHandleImage();
  return (
    <div className="space-y-2 col-span-1 md:col-span-2">
      <FormLabel>Cover</FormLabel>
      <div className="w-full h-[400px]">
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="cursor-pointer w-full h-full border-dashed hover:border-solid transition border rounded-md overflow-hidden flex justify-center items-center relative">
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
                  <ImageIcon
                    strokeWidth={0.5}
                    className="w-20 h-20 text-muted-foreground"
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full h-[350px] hidden"
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
interface FormFieldLogoProps {
  form: any;
}
const FormFieldLogo = ({ form }: FormFieldLogoProps) => {
  const { handleImage } = useHandleImage();
  return (
    <div className="space-y-2 col-span-1">
      <FormLabel>Logo</FormLabel>
      <div className="w-full h-[400px]">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel className="cursor-pointer w-full h-full border-dashed hover:border-solid transition border rounded-md overflow-hidden flex justify-center items-center relative">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Cover"
                    loading="eager"
                    width={100}
                    height={100}
                    className="object-contain"
                    onError={(e: any) => {
                      e.target.src = "./logo-icon-dark.svg";
                    }}
                  />
                ) : (
                  <ImageIcon
                    strokeWidth={0.5}
                    className="w-20 h-20 text-muted-foreground"
                  />
                )}
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full h-[350px] hidden"
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
