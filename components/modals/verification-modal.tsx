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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

import { AxiosAuth } from "@/lib/axios";
import { verificationSchema } from "@/schemas";
import { useVerificationModal } from "@/hooks/user-verification-modal";

const axiosAuth = new AxiosAuth();

export const VerificationModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const verificationModal = useVerificationModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const onCancel = () => {
    verificationModal.onClose();
    form.reset();
    router.refresh();
    router.push("/");
  };

  const onSubmit = async (values: z.infer<typeof verificationSchema>) => {
    setIsLoading(true);
    const endpoint = "auth/verify_code";
    const messageSuccess = "Login successfully!";
    const messageError = "Failed to login!";

    await axiosAuth
      .verification(
        endpoint,
        {
          ...values,
          user_name: verificationModal.userName,
        },
        messageSuccess,
        messageError
      )
      .then((data) => {
        if (data?.success) {
          onCancel();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      title="Verification Code"
      description="Check your email then copy code and past in one-time."
      isOpen={verificationModal.isOpen}
      onClose={verificationModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-flow-row grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Enter your code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
    </Modal>
  );
};
