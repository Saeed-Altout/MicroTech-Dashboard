"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFooter } from "@/components/ui/form-footer";
import { Heading } from "../../components/heading";

import { onError } from "@/lib/error";
import { imagesSchema } from "@/schemas";
import { ProjectColumn } from "@/config/config";

export const FormProjectImages = ({
  initialData,
}: {
  initialData: ProjectColumn;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<
    {
      id: any;
      file: File;
    }[]
  >([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof imagesSchema>>({
    resolver: zodResolver(imagesSchema),
    defaultValues: {
      images: [],
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    index: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagesToUpload([
        ...imagesToUpload,
        {
          id: index,
          file: Array.from(e.target.files)[0],
        },
      ]);
      setFiles([...files]);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onCancel = () => {
    form.reset();
    setFiles([]);
    router.push("/projects");
  };

  const onSubmit = async (values: z.infer<typeof imagesSchema>) => {
    const newData = new FormData();

    newData.append("project_id", initialData?.id.toString());
    imagesToUpload.forEach((image, index) => {
      newData.append(`images[${image.id}]`, image.file);
    });

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/add_images`,
        newData
      );

      toast.success("Images Uploaded!");
      onCancel();
      router.refresh();
    } catch (error) {
      const message = onError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 max-w-7xl mx-auto"
      >
        <div className="space-y-6">
          <Heading
            label="Images:"
            onRemove={() => remove(fields.length - 1)}
            onAppend={() => append({ imgUrl: "" })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`images.${index}.imgUrl`}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center">
                      {field.value ? (
                        <div className="h-full w-full overflow-hidden">
                          <Image
                            src={field.value}
                            alt="Icon"
                            width={1000}
                            height={1000}
                            loading="eager"
                            className="object-cover"
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
                        placeholder="Upload a photo"
                        onChange={(e) => handleImage(e, field.onChange, index)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <FormFooter
          label="Upload Images"
          onClose={onCancel}
          loading={loading}
        />
      </form>
    </Form>
  );
};
