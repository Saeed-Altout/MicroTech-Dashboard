"use client";

import * as z from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { ImagePlus, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

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

import { ProjectColumn } from "../../../components/columns";
import axios, { AxiosRequestConfig } from "axios";
import { onError } from "@/lib/error";

const formSchema = z.object({
  images: z.array(
    z.object({
      id: z.optional(z.any()),
      imgUrl: z.string(),
    })
  ),
});

export const FormAdd = ({ initialData }: { initialData: ProjectColumn }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<
    {
      id: any;
      file: File;
    }[]
  >([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    router.refresh();
  };

  const onSubmit = async (_values: z.infer<typeof formSchema>) => {
    const data = new FormData();
    data.append("project_id", initialData?.id.toString());
    imagesToUpload.forEach((image) => {
      data.append(`images[${image.id}]`, image.file);
    });
    const token = window.localStorage.getItem("next__%&$");

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_ADD_IMAGES_PROJECT}`,
        data,
        config
      );
      toast.success("Images upload.");
      onCancel();
    } catch (error) {
      const message = onError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 max-w-7xl mx-auto"
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <FormLabel className="text-lg whitespace-nowrap">Images</FormLabel>
            <Button
              type="button"
              variant="default"
              onClick={() => append({ imgUrl: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`images.${index}.imgUrl`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="cursor-pointer group relative h-[250px] w-full border-dashed border rounded-md flex justify-center items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
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
                        className="w-full h-full hidden"
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
        <div className="pt-5 flex items-center justify-end gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Upload Images
            {isLoading && (
              <Spinner className="ml-2 text-white dark:text-primary" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
