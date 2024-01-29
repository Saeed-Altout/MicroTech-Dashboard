"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Check, ImageIcon } from "lucide-react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { itemSchema } from "@/schemas";

interface EditModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  entrypoint: string;
  data: any;
}

export const EditModal: React.FC<EditModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  entrypoint,
  data,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: data?.name || "",
      icon: data?.icon_url || "",
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
    setFiles([]);
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof itemSchema>) => {
    let newFormData = new FormData();

    if (files[0] !== undefined && data?.id) {
      newFormData.append("id", data?.id.toString());
      newFormData.append("name", values.name);
      newFormData.append("icon", files[0]);
    }

    newFormData.append("id", data?.id.toString());
    newFormData.append("name", values.name);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/edit`,
        newFormData
      );

      toast.success(`${data?.name} edited!`);
      onCancel();

      router.refresh();
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
      isOpen={isOpen}
      onClose={onCancel}
      loading={loading}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
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
                      {form.getValues("icon") === "" ? (
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
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Save {loading && <Spinner className="ml-2 text-white" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
