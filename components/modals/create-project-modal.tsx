"use client";

import axios from "axios";
import Image from "next/image";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, ImageIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
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

interface CreateModalProjectProps {
  title: string;
  description: string;
}

export const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
});

export const CreateModalProject: React.FC<CreateModalProjectProps> = ({
  title,
  description,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const createProjectModal = useCreateProjectModal();
  const router = useRouter();

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
    form.reset({
      title: "",
      description: "",
      cover: "",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let newFormData = new FormData();
    newFormData.append("title", values.title);
    newFormData.append("description", values.description);
    newFormData.append("cover", files[0]);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/create_fast`,
        newFormData
      );
      toast.success("Project Created!");
      onCancel();
      router.refresh();
      router.push("/projects");
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
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
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
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
                        disabled={loading}
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormLabel>Cover</FormLabel>
                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="cursor-pointer h-[150px] w-full border-dashed border rounded-md flex justify-center items-center">
                        {field.value ? (
                          <div className="h-20 w-20">
                            <Image
                              src={field.value}
                              alt="Icon"
                              width={100}
                              height={100}
                              loading="eager"
                              className="object-contain"
                              style={{ width: "100%", height: "auto" }}
                              onError={(e: any) => {
                                e.target.src = "./logo-icon-dark.svg";
                              }}
                            />
                          </div>
                        ) : (
                          <ImageIcon
                            strokeWidth={0.5}
                            className="w-20 h-20 text-muted-foreground"
                          />
                        )}
                      </FormLabel>
                      <FormDescription>
                        {form.getValues("cover") === "" ? (
                          ""
                        ) : (
                          <p className="flex items-center justify-end text-sm text-muted-foreground">
                            Uploaded <Check className="h-4 w-4 ml-2" />
                          </p>
                        )}
                      </FormDescription>
                      <FormControl>
                        <Input
                          className="w-full h-[150px] hidden"
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

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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
        </div>
      </div>
    </Modal>
  );
};
