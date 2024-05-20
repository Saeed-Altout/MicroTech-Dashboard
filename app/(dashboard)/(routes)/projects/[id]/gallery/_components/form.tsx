"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ImagePlus, Plus, Trash } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { AxiosData } from "@/lib/axios";

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
import { Spinner } from "@/components/ui/spinner";

const axiosData = new AxiosData();

const formSchema = z.object({
  images: z.array(
    z.object({
      id: z.optional(z.any()),
      imgUrl: z.string().min(2, {
        message: "Image is required.",
      }),
    })
  ),
});

export const GalleryForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<
    {
      id: any;
      file: File;
    }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [
        {
          id: 0,
          imgUrl: "",
        },
      ],
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const endpoint = "project/add_images";
    const messageSuccess = "Images uploaded successfully!";
    const messageError = "Failed to upload images!";
    const data = new FormData();

    setIsLoading(true);

    data.append("project_id", params?.id.toString());
    imagesToUpload.forEach((image) => {
      data.append(`images[${image.id}]`, image.file);
    });

    await axiosData
      .postData(endpoint, data, messageSuccess, messageError)
      .then((data) => {
        if (data?.success) {
          onCancel();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <FormLabel className="text-lg whitespace-nowrap">
              Upload Images
            </FormLabel>
            <Button
              type="button"
              variant="default"
              onClick={() => append({ imgUrl: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Image
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                        variant="destructive"
                        size="icon"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      {field.value ? (
                        <div className="h-full w-full overflow-hidden">
                          <Image
                            src={field.value}
                            alt="image"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center w-full pt-6 gap-x-5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Upload
            {isLoading && (
              <Spinner className="ml-2 text-white dark:text-primary" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
