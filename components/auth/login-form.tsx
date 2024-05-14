"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";
import { WrapperForm } from "@/components/auth/wrapper-form";

import { axios } from "@/lib/axios";
import { loginForm } from "@/schemas";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginForm>) => {
    try {
      setIsLoading(true);
      const res = await axios.post("user/auth/login", values);

      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data.data || ""));
        localStorage.setItem("access_token", res.data.data.token || "");
      }

      toast.error("Success!");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WrapperForm
      title="Login"
      description="Sign in and enjoy."
      backButtonDescription="Don't have an account ?!"
      backButtonHref="/auth/register"
      backButtonLabel="Register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
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
          <Button
            size="sm"
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
};
