"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { codeSchema } from "@/schemas";
import { verification } from "@/actions/verification";

interface VerificationFormProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationForm = ({
  title,
  description,
  isOpen,
  onClose,
}: VerificationFormProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof codeSchema>) => {
    startTransition(() => {
      verification(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          router.push("/");
          router.refresh();
          window.localStorage.setItem("next__%&$", data?.token);
        }
      });
    });
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      loading={isLoading}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="text-center flex justify-center items-center flex-col">
                <FormLabel>Enter your code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 flex items-center justify-end gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Send{" "}
              {isLoading && <Spinner className="ml-2 text-muted-foreground" />}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
