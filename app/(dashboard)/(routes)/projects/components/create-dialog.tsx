"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { useCreateModal } from "@/hooks/use-create-modal";
import { createFastProject } from "@/actions/project";

export const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
});

export const CreateDialog = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const createModal = useCreateModal();

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
    createModal.onClose();
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    data.append("cover", files[0]);
    data.append("title", values.title);
    data.append("description", values.description);

    startTransition(() => {
      createFastProject(data).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          router.refresh();
          createModal.onClose();
        }
      });
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Create A New Project"
      description="Add a new project to your projects."
      loading={isLoading}
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="title" {...field} />
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
                  <Input
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
                <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center">
                  {field.value ? (
                    <div className="h-32 w-32 overflow-hidden">
                      <Image
                        src={field.value}
                        alt="Icon"
                        width={1000}
                        height={1000}
                        loading="eager"
                        className="object-contain"
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
                    disabled={isLoading}
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              Create{" "}
              {isLoading && (
                <Spinner className="ml-2 text-white dark:text-primary" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
