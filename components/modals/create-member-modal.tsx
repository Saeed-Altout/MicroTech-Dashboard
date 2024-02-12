"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useCreateModal } from "@/hooks/use-create-modal";
import { memberSchema } from "@/schemas";

export const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
});

export const CreateModalMember = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const createModal = useCreateModal();

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
    form.reset({
      name: "",
      email: "",
      phone: "",
    });
  };

  const onSubmit = async (values: z.infer<typeof memberSchema>) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/member/create`, {
        name: values?.name,
        email: values?.email,
        phone: values?.phone,
      });

      toast.success("New member created!");
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
      title="Create Member"
      description="Add a new member for your team"
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
        </div>
      </div>
    </Modal>
  );
};
