"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";
import { FormFooter } from "@/components/ui/form-footer";

import { create } from "@/actions/create";
import { memberSchema } from "@/schemas";
import { useCreateModal } from "@/hooks/use-create-modal";

export const CreateMemberDialog = () => {
  const [isPending, startTransition] = useTransition();

  const createModal = useCreateModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onCancel = () => {
    createModal.onClose();
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof memberSchema>) => {
    startTransition(() => {
      create("member", {
        name: values?.name,
        email: values?.email,
        phone: values?.phone,
      }).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          onCancel();
          toast.success(data.success);
          router.refresh();
        }
      });
    });
  };

  return (
    <Modal
      title="Create Member"
      description="Add a new member for your team"
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
      loading={isPending}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            name="name"
            placeholder="name"
            label="Name"
            loading={isPending}
          />
          <FormInput
            name="email"
            placeholder="email"
            label="Email"
            type="email"
            loading={isPending}
          />
          <FormInput
            name="phone"
            placeholder="phone number"
            label="Phone Number"
            loading={isPending}
          />

          <FormFooter label="Create" onClose={onCancel} loading={isPending} />
        </form>
      </Form>
    </Modal>
  );
};
