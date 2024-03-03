"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  imgUrl: z.array(z.string()),
});

export const FormProjectImages = ({ initialData }: { initialData: any }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imgUrl: initialData?.images?.map((img: any) => img?.image_url) || [],
    },
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
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newFormData = new FormData();

    filesUpload.forEach((file, index) =>
      newFormData.append(`images[${index}]`, file)
    );
    newFormData.append("project_id", initialData?.id);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/add_images`,
        newFormData
      );
      setFiles([]);
      setFilesUpload([]);
      toast.success("Images Uploaded");
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
          <FormField
            control={form.control}
            name="imgUrl"
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
          <div className="flex justify-end items-center">
            <Button type="submit">
              Upload
              {loading && <Spinner className="text-white ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
      {files.length > 0 && (
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {files.map((imageUrl, index) => (
            <Image
              key={index}
              width={300}
              height={300}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="object-cover w-full"
            />
          ))}
        </div>
      )}
    </>
  );
};
