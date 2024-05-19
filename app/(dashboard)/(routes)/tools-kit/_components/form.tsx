"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AxiosData } from "@/lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { ToolkitColumn } from "./columns";

const axiosData = new AxiosData();

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  icon: z.string().min(2, {
    message: "Name is required",
  }),
});

export const ToolsKitForm = ({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData: ToolkitColumn | null;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      icon: initialData?.icon_url || "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files || []));
      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onCancel = () => {
    onClose();
    form.reset();
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    data.append("name", values.name);
    if (initialData) {
      data.append("id", initialData?.id.toString());
      files[0] !== undefined && data.append("icon", files[0]);
    } else {
      data.append("icon", files[0]);
    }

    const endpoint = initialData ? "tool/edit" : "tool/create";
    const messageSuccess = initialData
      ? "Update successfully!"
      : "Create successfully!";
    const messageError = initialData
      ? "Failed to update data!"
      : "Failed to create!";

    try {
      setIsLoading(true);
      await axiosData.postData(endpoint, data, messageSuccess, messageError);
      onCancel();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                  {field.value ? (
                    <div className="h-auto w-32 overflow-hidden">
                      <Image
                        src={field.value}
                        alt="Icon"
                        width={1000}
                        height={1000}
                        className="object-contain"
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
                    disabled={isLoading}
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-center w-full pt-6 gap-x-5">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {initialData ? "Update" : "Create"}{" "}
            {isLoading && <Spinner className="text-background ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
