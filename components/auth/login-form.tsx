"use client";

import { useState } from "react";

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
import { Spinner } from "@/components/ui/spinner";
import { WrapperForm } from "@/components/auth/wrapper-form";
import { VerificationModal } from "@/components/modals/verification-modal";

import { loginForm } from "@/schemas";
import { AxiosAuth } from "@/lib/axios";
import { useVerificationModal } from "@/hooks/user-verification-modal";

const axiosAuth = new AxiosAuth();

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const verificationModal = useVerificationModal();

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginForm>) => {
    setIsLoading(true);
    const endpoint = "auth/login";
    const messageSuccess = "Please, check your email.";
    const messageError = "";

    await axiosAuth
      .login(endpoint, values, messageSuccess, messageError)
      .then((data) => {
        if (data?.success) {
          verificationModal.setUsername(values.user_name || "");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <WrapperForm
      title="Login"
      description="Sign in and enjoy."
      backButtonDescription=""
      backButtonHref=""
      backButtonLabel=""
    >
      <VerificationModal />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="username"
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
            <Button
              size="sm"
              disabled={isLoading}
              type="button"
              variant="link"
              onClick={() => verificationModal.onOpen()}
            >
              Do you have code?
            </Button>
          </div>
          <Button
            size="sm"
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            Login {isLoading && <Spinner className="text-background ml-2" />}
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
};
