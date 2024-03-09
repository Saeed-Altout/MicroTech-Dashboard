"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";
import { FormImage } from "@/components/ui/form-image";
import { FormFooter } from "@/components/ui/form-footer";

import { itemSchema } from "@/schemas";
import { edit } from "@/actions/edit";
import { useImageContext } from "@/contexts/image-contex";

interface EditDialogProps {
  title: string;
  description: string;
  endpoint: string;
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

export const EditDialog = ({
  title,
  description,
  endpoint,
  data,
  isOpen,
  onClose,
}: EditDialogProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();
  const { files, setFiles } = useImageContext();
  const router = useRouter();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: data?.name || "",
      icon: data?.icon_url || "",
    },
  });

  const onCancel = () => {
    onClose();
    form.reset();
    setFiles([]);
  };

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    let newData = new FormData();
    newData.append("id", data?.id.toString());
    newData.append("name", values.name);
    files[0] !== undefined && newData.append("icon", files[0]);

    startTransition(() => {
      edit(endpoint, newData).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          onClose();
          toast.success(data.success);
          router.refresh();
        }
      });
    });
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      loading={loading}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="name"
            label="Name"
            placeholder="name"
            loading={loading}
          />
          <FormImage
            name="icon"
            label="Icon"
            placeholder="uplaod image"
            loading={loading}
          />
          <FormFooter
            label="Save changes"
            loading={loading}
            onClose={onCancel}
          />
        </form>
      </Form>
    </Modal>
  );
};
