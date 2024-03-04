"use client";

import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProjectModal } from "@/hooks/use-create-project-modal";
import { projectFastSchema } from "@/schemas";

interface CreateModalProjectProps {
  title: string;
  description: string;
}

export const CreateModalProject: React.FC<CreateModalProjectProps> = ({
  title,
  description,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const createProjectModal = useCreateProjectModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof projectFastSchema>>({
    resolver: zodResolver(projectFastSchema),
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
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onCancel = () => {
    createProjectModal.onClose();
    setFiles([]);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof projectFastSchema>) => {
    let newData = new FormData();
    newData.append("title", values.title);
    newData.append("description", values.description);
    newData.append("cover", files[0]);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/create_fast`,
        newData
      );
      toast.success("Project Created!");
      onCancel();
      router.refresh();
    } catch (error) {
      toast.error("Somethig went wrong!");
    } finally {
      setLoading(false);
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
      title={title}
      description={description}
      isOpen={createProjectModal.isOpen}
      onClose={createProjectModal.onClose}
      loading={loading}
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
                  <Input disabled={loading} placeholder="title" {...field} />
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
                    disabled={loading}
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <FormLabel>Cover</FormLabel>
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                    {field.value ? (
                      <div className="h-full w-full overflow-hidden">
                        <Image
                          src={field.value}
                          alt="Cover"
                          width={100}
                          height={100}
                          loading="eager"
                          className="object-contain"
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
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-6 flex items-center justify-end gap-4 w-full">
            <Button
              disabled={loading}
              variant="outline"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Create {loading && <Spinner className="ml-2 text-white" />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
