"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";

import { AlertModal } from "@/components/modals/alert-modal";
import { MemberColumn } from "@/config/config";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import { memberSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export const CellAction = ({ data }: { data: MemberColumn }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
  });

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/member/delete?id=${data?.id}`
      );
      toast.success(`${data?.name} deleted!`);

      setIsDelete(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    form.reset();
    setIsEdit(false);
  };

  const onSubmit = async (values: z.infer<typeof memberSchema>) => {
    try {
      setLoading(true);

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/member/edit`, {
        id: data.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
      });

      toast.success(`${data.name} edited!`);
      onCancel();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
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
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="name"
                          {...field}
                        />
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
                    Save Changes
                    {loading && <Spinner className="ml-2 text-white" />}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
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
