"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { VerificationForm } from "@/components/auth/verification-form";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          setIsOpen(true);
        }
      });
    });
  };

  return (
    <>
      <VerificationForm
        title="Do you have code."
        description="Please, check your email."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Card className="max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle>Login 🔐</CardTitle>
          <CardDescription>Sign in to Dashboard & Enjoy. </CardDescription>
        </CardHeader>
        <CardContent>
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
                        disabled={isLoading}
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
                onClick={() => setIsOpen(true)}
              >
                Do you have a code?
              </Button>
              <Button disabled={isLoading} type="submit" className="w-full">
                Login{" "}
                {isLoading && (
                  <Spinner className="ml-2 dark:text-primary-foreground" />
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
