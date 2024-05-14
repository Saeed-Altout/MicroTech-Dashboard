"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
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
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";

import { verificationSchema } from "@/schemas";
import { axios } from "@/lib/axios";
import { useVerificationModal } from "@/hooks/user-verification-modal";

export const VerificationModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_cookies, setCookie] = useCookies(["access-token"]);

  const router = useRouter();
  const verificationModal = useVerificationModal();

  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const setIsLoggedIn = async (token: string) => {
    setCookie("access-token", token);
  };

  const onCancel = () => {
    verificationModal.onClose();
    form.reset();
    router.push("/");
  };

  const onSubmit = async (values: z.infer<typeof verificationSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.post("auth/verify_code", {
        ...values,
        user_name: verificationModal.userName,
      });

      if (res.data) {
        localStorage.setItem("access-token", res?.data?.data?.token || "");
        localStorage.setItem("user", JSON.stringify(res?.data?.data) || "{}");
        setIsLoggedIn(res?.data?.data?.token || "");
      }
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
    <Modal
      title="Verification Code"
      description="Check your email then copay our code and past in fields here."
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
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="******"
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
    </Modal>
  );
};
