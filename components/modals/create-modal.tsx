"use client";

import axios from "axios";
import Image from "next/image";

import { toast } from "sonner";
import { ChangeEvent, useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
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
import { useCreateModal } from "@/hooks/use-create-modal";
import { useHandleImage } from "@/hooks/use-handle-image";
interface CreateModalProps {
  title: string;
  description: string;
  enterypoint: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  title,
  description,
  enterypoint,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const createModal = useCreateModal();
  const router = useRouter();

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

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const onClose = () => {
    createModal.onClose();
    setFiles([]);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof itemSchema>) => {
    let data = new FormData();
    data.append("icon", files[0]);
    data.append("name", values.name);

    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/technology/create", data);
      toast.success("New item created!");
      onClose();
    } catch (error) {
      toast.success("Something went wrong!");
      console.log(error);
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
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
      loading={loading}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormLabel className="cursor-pointer h-[250px] w-full border-dashed border rounded-md flex justify-center items-center">
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
                          e.target.src = "./logo-icon.svg";
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
          <div className="pt-6 flex gap-4 items-center justify-end w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Save {loading && <Spinner className="ml-2 text-white" />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
