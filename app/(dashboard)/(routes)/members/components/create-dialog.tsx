"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { create } from "@/actions";

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

interface CreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateDialog = ({ isOpen, onClose }: CreateDialogProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onCancel = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);

    startTransition(() => {
      create("member", data).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          router.refresh();
          onCancel();
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
      title="Create A New Member"
      description="Add a new member to your projects."
      loading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="name" {...field} />
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
                    disabled={isLoading}
                    type="email"
                    placeholder="email"
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-5 flex items-center justify-end gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Create
              {isLoading && <Spinner className="ml-2 text-muted-foreground" />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
