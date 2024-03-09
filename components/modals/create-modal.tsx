"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";

import { itemSchema } from "@/schemas";
import { useCreateModal } from "@/hooks/use-create-modal";
import { create } from "@/actions/create";
import { FormInput } from "@/components/ui/form-input";
import { useImageContext } from "@/contexts/image-contex";
import { FormImage } from "../ui/form-image";
import { FormFooter } from "../ui/form-footer";
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
  const { files, setFiles } = useImageContext();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

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
      create(enterypoint, newData).then((data) => {
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
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      loading={isPending}
      description={description}
      isOpen={false}
      onClose={createModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="name"
            label="Name"
            placeholder="name"
            loading={isPending}
          />
          <FormImage
            name="icon"
            label="Icon"
            placeholder="uplaod image"
            loading={isPending}
          />
          <FormFooter label="Create" loading={isPending} onClose={onClose} />
        </form>
      </Form>
    </Modal>
  );
};
