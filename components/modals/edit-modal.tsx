"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
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
import { Check, ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useEditModal } from "@/hooks/use-edit-modal";

const formSchema = z.object({
  name: z.string(),
  icon: z.string(),
});
interface EditModalProps {
  title: string;
  description: string;
  url: string;
  data: any;
}
export const EditModal: React.FC<EditModalProps> = ({
  title,
  description,
  url,
  data,
}) => {
  const editModal = useEditModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onClose = () => {
    setFiles([]);
    editModal.onClose();
    form.reset({
      name: "",
      icon: "",
    });
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let newFormData = new FormData();
    newFormData.append("name", values.name);
    newFormData.append("icon", files[0]);

    try {
      setLoading(true);
      if (loading) {
        // toast.loading("Edit a new item...");
      }
      await axios.post(url, newFormData);
      // toast.success("New item created!");
      onClose();
      router.refresh();
    } catch (error) {
      //@ts-ignore
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="cursor-pointer h-[150px] w-full border-dashed border rounded-md flex justify-center items-center">
                      {field.value ? (
                        <div className="h-20 w-20">
                          <Image
                            src={field.value}
                            alt="Icon"
                            width={100}
                            height={100}
                            loading="eager"
                            className="object-contain"
                            style={{ width: "100%", height: "auto" }}
                            onError={(e: any) => {
                              e.target.src = "./logo-icon-dark.svg";
                            }}
                          />
                        </div>
                      ) : (
                        <ImageIcon
                          strokeWidth={0.5}
                          className="w-20 h-20 text-muted-foreground"
                        />
                      )}
                    </FormLabel>
                    <FormDescription>
                      {form.getValues("icon") === "" ? (
                        ""
                      ) : (
                        <p className="flex items-center justify-end text-sm text-muted-foreground">
                          Uploaded <Check className="h-4 w-4 ml-2" />
                        </p>
                      )}
                    </FormDescription>
                    <FormControl>
                      <Input
                        className="w-full h-[150px] hidden"
                        type="file"
                        accept="image/*"
                        placeholder="Upload a photo"
                        onChange={(e) => handleImage(e, field.onChange)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue {loading && <Spinner className="ml-2 text-white" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
