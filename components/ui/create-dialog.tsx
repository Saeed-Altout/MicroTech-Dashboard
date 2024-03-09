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
import { create } from "@/actions/create";
import { useCreateModal } from "@/hooks/use-create-modal";
import { useImageContext } from "@/contexts/image-contex";

interface CreateDialogProps {
  title: string;
  description: string;
  endpoint: string;
}

export const CreateDialog = ({
  title,
  description,
  endpoint,
}: CreateDialogProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();
  const { files, setFiles } = useImageContext();
  const createModal = useCreateModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const onClose = () => {
    createModal.onClose();
    form.reset();
    setFiles([]);
  };

  const onSubmit = (values: z.infer<typeof itemSchema>) => {
    let newData = new FormData();
    newData.append("icon", files[0]);
    newData.append("name", values.name);

    startTransition(() => {
      create(endpoint, newData).then((data) => {
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
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
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
          <FormFooter label="Create" loading={loading} onClose={onClose} />
        </form>
      </Form>
    </Modal>
  );
};
