"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";
import { FormFooter } from "@/components/ui/form-footer";
import { DeleteDialog } from "@/components/ui/delete-dialog";

import { edit, trash, create } from "@/actions";

import { memberSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { MemberColumn } from "@/interface";

export const CellAction = ({ data }: { data: MemberColumn }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
  });

  const onCancel = () => {
    form.reset();
    setIsEdit(false);
  };

  const onConfirm = async () => {
    startTransition(() => {
      trash("member", data?.id.toString()).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
          setIsDelete(false);
        }
      });
    });
  };

  const onSubmit = async (values: z.infer<typeof memberSchema>) => {
    startTransition(() => {
      edit("member", {
        id: data.id.toString(),
        name: values.name,
        email: values.email,
        phone: values.phone,
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
    <>
      <DeleteDialog
        isOpen={isDelete}
        loading={loading}
        onConfirm={onConfirm}
        onClose={() => setIsDelete(false)}
      />
      <Modal
        title="Edit Member"
        description="edit a member"
        isOpen={isEdit}
        loading={loading}
        onClose={() => setIsEdit(false)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="name"
              placeholder="name"
              label="Name"
              loading={loading}
            />
            <FormInput
              name="email"
              placeholder="email"
              label="Email"
              type="email"
              loading={loading}
            />
            <FormInput
              name="phone"
              placeholder="phone number"
              label="Phone Number"
              loading={loading}
            />

            <FormFooter
              label="Save changes"
              onClose={onCancel}
              loading={loading}
            />
          </form>
        </Form>
      </Modal>

      <div className="flex items-center justify-center gap-5">
        <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)}>
          <span className="sr-only">Edit</span>
          <Edit className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsDelete(true)}>
          <span className="sr-only">Delete</span>
          <Trash className="h-5 w-5  text-red-500" />
        </Button>
      </div>
    </>
  );
};
