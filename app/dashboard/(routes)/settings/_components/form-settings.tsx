"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Button } from "@/components/ui/button";

import { settingsSchema } from "@/schemas";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { axios } from "@/lib/axios";

export const FormSettings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      password: "",
    },
  });

  const onCancel = () => {
    router.push("/dashboard");
  };

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("auth/reset_password", values);
      toast.success("Success!");
      onCancel();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-flow-row grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="password"
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
            Send {isLoading && <Spinner className="text-background ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
