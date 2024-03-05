"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

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
import { CardWrapper } from "@/components/auth/card-wrapper";
import { VerificationForm } from "@/components/auth/verification-form";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          setUsername(values.username);
          setOpen(true);
        }
      });
    });
  };

  return (
    <>
      <VerificationForm
        title="Do you have code."
        description="Please, check your email."
        isOpen={open}
        onClose={() => setOpen(false)}
        username={username}
      />
      <CardWrapper
        title="Login"
        description="Sign in to Dashboard 😉 & Enjoy. "
        labelBackButton="Dashboard"
        hrefBackButton="/"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
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
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setOpen(true)}
            >
              Do you have code?
            </Button>
            <Button disabled={isPending} type="submit" className="w-full">
              Login {isPending && <Spinner className="ml-2" />}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
