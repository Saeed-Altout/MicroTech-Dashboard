"use client";

import axios from "axios";
import Image from "next/image";

import { toast } from "sonner";
import { useState } from "react";
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
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { files, setFiles, handleImage } = useHandleImage();

  const createModal = useCreateModal();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const onCancel = () => {
    createModal.onClose();
    setFiles([]);
    form.reset({
      name: "",
      icon: "",
    });
  };

  const onSubmit = async (values: z.infer<typeof itemSchema>) => {
    let newFormData = new FormData();

    newFormData.append("name", values.name);
    newFormData.append("icon", files[0]);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${enterypoint}/create`,
        newFormData
      );

      toast.success("New item created!");
      onCancel();

      router.refresh();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
              onClick={onCancel}
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
