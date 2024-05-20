"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Modal } from "@/components/ui/modal";

import { useModal } from "@/hooks/use-modal";

const axiosData = new AxiosData();

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required.",
  }),
  description: z.string().min(2, {
    message: "Description is required.",
  }),
  cover: z.string().min(2, {
    message: "Cover is required.",
  }),
});

export const ProjectModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      cover: "",
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
    modal.onClose();
    form.reset();
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("cover", files[0]);

    const endpoint = "project/create_fast";
    const messageSuccess = "Create successfully!";
    const messageError = "Failed to create!";

    try {
      setIsLoading(true);
      await axiosData.postData(endpoint, data, messageSuccess, messageError);
      onCancel();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Create a new project"
      description="You can create a new project easily."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      disabled={isLoading}
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer h-[200px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                    {field.value ? (
                      <div className="h-auto">
                        <Image
                          src={field.value}
                          alt="Cover"
                          width={1000}
                          height={1000}
                          className="object-cover"
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
              Create
              {isLoading && <Spinner className="text-background ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
