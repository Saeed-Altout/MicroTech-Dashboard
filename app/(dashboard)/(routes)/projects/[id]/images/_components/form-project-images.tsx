"use client";

import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { ProjectColumn } from "@/config/config";
import { Heading } from "../../components/heading";

const formSchema = z.object({
  images: z.array(
    z.object({
      imgUrl: z.string(),
    })
  ),
});

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

  let imagesInitalValue: {
    imgUrl: string;
  }[] = [];

  initialData?.images.forEach((image: any | undefined) =>
    imagesInitalValue.push({
      imgUrl: image.image_url as string,
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: imagesInitalValue || [],
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newData = new FormData();

    newData.append("project_id", initialData?.id.toString());

    try {
      setLoading(true);
      if (initialData.images.length > 0) {
        imagesToUpload.forEach((image, index) => {
          newData.append(
            `images[${index}]`,
            initialData.images[index].id.toString()
          );
          newData.append(`images[${index}]`, image.file);
        });

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/edit_images`,
          newData
        );
        toast.success("Images Edited!");
      } else {
        imagesToUpload.forEach((image, index) => {
          newData.append(`images[${index}]`, image.file);
        });
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/add_images`,
          newData
        );
        toast.success("Images Uploaded!");
      }

      setFiles([]);
      router.refresh();
      router.push("/projects");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          onChange={(e) =>
                            handleImage(e, field.onChange, index)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex pt-20">
            <Button type="submit">
              {initialData.images.length > 0 ? "Save Changes" : "Upload Images"}
              {loading && <Spinner className="text-white ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
