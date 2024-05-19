"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosData } from "@/lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { MemberColumn } from "./columns";

const axiosData = new AxiosData();

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().min(2, {
    message: "Phone number is required",
  }),
});

export const MembersForm = ({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData: MemberColumn | null;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
  });

  const onCancel = () => {
    onClose();
    form.reset();
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);

    if (initialData) {
      data.append("id", initialData?.id.toString());
    }

    const endpoint = initialData ? "member/edit" : "member/create";
    const messageSuccess = initialData
      ? "Update successfully!"
      : "Create successfully!";
    const messageError = initialData
      ? "Failed to update data!"
      : "Failed to create!";

    try {
      setIsLoading(true);
      await axiosData.postData(endpoint, data, messageSuccess, messageError);
      onCancel();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
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
                    type="email"
                    disabled={isLoading}
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
        </div>
        <div className="flex justify-end items-center w-full pt-6 gap-x-5">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {initialData ? "Update" : "Create"}{" "}
            {isLoading && <Spinner className="text-background ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
