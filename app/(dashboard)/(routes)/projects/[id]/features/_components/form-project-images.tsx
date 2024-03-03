"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { ImagePlus, Minus, Plus } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      images: z.array(z.string()),
    })
  ),
});

export const FormProjectImages = ({ initialData }: { initialData: any }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: [],
    },
  });

  const {
    fields: featuresFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    name: "features",
    control: form.control,
  });

  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const newFiles: string[] = [];
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;
      filesUpload.push(file);
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        newFiles.push(imageDataUrl);
        setFiles([...files, ...newFiles]);
        fieldChange([...files, ...newFiles]);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newFormData = new FormData();

    newFormData.append("project_id", initialData?.id);
    values.features.map((feature) => {
      newFormData.append("title", feature.title);
      newFormData.append("description", feature.description);
      filesUpload.forEach((file, index) =>
        newFormData.append(`images[${index}]`, file)
      );
    });

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/add_features`,
        newFormData
      );
      setFiles([]);
      setFilesUpload([]);
      toast.success("Features Added");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      throw new Error("Error added images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between items-center">
            <FormLabel className="text-lg">Features:</FormLabel>
            <div className="w-full flex justify-end gap-5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeFeature(featuresFields.length - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="default"
                size="icon"
                onClick={() =>
                  appendFeature({
                    title: "",
                    description: "",
                    images: [""],
                  })
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-6">
            {featuresFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name={`features.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`features.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`features.${index}.images`}
                  render={({ field }) => (
                    <FormItem className="relative h-[150px]">
                      <FormLabel className="cursor-pointer flex justify-center items-center gap-3 border-dashed border rounded-md h-full">
                        <ImagePlus
                          strokeWidth={0.5}
                          className="w-5 h-5 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">Upload Image</p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
                  {field.images.length - 1 > 0 ? (
                    <>
                      {field?.images?.map((imageUrl, index) => (
                        <Image
                          key={index}
                          width={10}
                          height={10}
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          className="object-cover w-full"
                        />
                      ))}
                    </>
                  ) : (
                    <p>Not</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center">
            <Button type="submit">
              Upload
              {loading && <Spinner className="text-white ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
