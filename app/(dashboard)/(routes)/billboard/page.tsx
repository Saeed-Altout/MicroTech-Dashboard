"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  imgUrl: z.array(z.string()),
});

export default function Page() {
  const [files, setFiles] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imgUrl: [],
    },
  });

  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const newFiles: string[] = [];
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        newFiles.push(imageDataUrl);
        setFiles([...files, ...newFiles]);
        fieldChange([...files, ...newFiles]);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="cursor-pointer flex justify-center items-center gap-3 border-dashed border rounded-md py-3">
                  <ImagePlus
                    strokeWidth={0.5}
                    className="w-5 h-5 text-muted-foreground"
                  />
                  <p className="text-muted-foreground">Upload Image</p>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
                <Button type="submit">Submit</Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
      {files.length > 0 && (
        <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {files.map((imageUrl, index) => (
            <Image
              key={index}
              width={300}
              height={300}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="object-cover w-full"
            />
          ))}
        </ul>
      )}
    </>
  );
}
