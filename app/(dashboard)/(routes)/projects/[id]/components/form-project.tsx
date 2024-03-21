"use client";

import * as z from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { MainPart } from "./parts/main-part";
import { CheckPart } from "./parts/check-part";
import { LinksPart } from "./parts/links-part";
import { SelectPart } from "./parts/select-part";
import { AdvantagesPart } from "./parts/advantages-part";

import axios, { AxiosRequestConfig } from "axios";
import { onError } from "@/lib/error";

const formSchema = z.object({
  cover: z.string(),
  logo: z.string(),
  title: z.string(),
  functionality: z.string(),
  about: z.string(),
  description: z.string(),
  advantages: z.array(
    z.object({
      value: z.string(),
    })
  ),
  links: z.array(
    z.object({
      link: z.string(),
      platform: z.string(),
    })
  ),
  isSpecial: z.boolean(),
  isActive: z.boolean(),
  technologies: z.array(z.number()),
  tools: z.array(z.number()),
  work_types: z.array(z.number()),
  platforms: z.array(z.number()),
  members: z.array(z.number()),
});

interface FormProjectProps {
  initialData: any;
  constantData: any;
}

export const FormProject = ({
  initialData,
  constantData,
}: FormProjectProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<
    {
      name: string;
      file: File[];
    }[]
  >([]);

  let advantagesInitalValue: {
    value: string;
  }[] = [];

  if (initialData?.advantages) {
    initialData?.advantages.forEach((advantage: any | undefined) =>
      advantagesInitalValue.push({
        value: advantage as string,
      })
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...getInitialValues(initialData),
      advantages: advantagesInitalValue || [],
      isSpecial: false,
      isActive: false,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    name: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: name,
          file: Array.from(e.target.files || []),
        },
      ]);

      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const filterImage = (name: "cover" | "logo", images: any[]) => {
    if (images.length < 1) {
      return undefined;
    }
    const imagesOfFiles = images.filter(
      (image) => image.name === name && image.file
    );

    return imagesOfFiles[0]?.file[0];
  };

  const onCancel = () => {
    form.reset();
    router.push("/projects");
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let data = new FormData();
    let advantages: string[] = [];
    values.advantages.forEach((advantage) => advantages.push(advantage.value));
    const token = window.localStorage.getItem("next__%&$");
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    if (initialData) {
      !initialData?.logo_url && data.append("logo", filterImage("logo", files));
      !initialData?.cover_url &&
        data.append("cover", filterImage("cover", files));

      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_EDIT_PROJECT}`,
          {
            id: initialData.id,
            cover: data.get("cover"),
            logo: data.get("logo"),
            title: values.title,
            about: values.about,
            description: values.description,
            advantages: advantages,
            functionality: values.functionality,
            links: values.links,
            technology_ids: values.technologies,
            tool_ids: values.tools,
            platform_ids: values.platforms,
            member_ids: values.members,
            work_type_ids: values.work_types,
          },
          config
        );
        toast.success("Project edited.");
        onCancel();
      } catch (error) {
        const message = onError(error);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      data.append("cover", filterImage("cover", files));
      data.append("logo", filterImage("logo", files));
      try {
        setIsLoading(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_CREATE_PROJECT}`,
          {
            cover: data.get("cover"),
            logo: data.get("logo"),
            title: values.title,
            about: values.about,
            description: values.description,
            advantages: advantages,
            functionality: values.functionality,
            links: values.links,
            technology_ids: values.technologies,
            tool_ids: values.tools,
            platform_ids: values.platforms,
            member_ids: values.members,
            work_type_ids: values.work_types,
          },
          config
        );
        toast.success("Project created.");
        onCancel();
      } catch (error) {
        const message = onError(error);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-4xl mx-auto"
      >
        <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden col-span-1 md:col-span-2">
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="cursor-pointer h-[400px] lg:h-[500px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                  {field.value ? (
                    <div className="h-full w-full overflow-hidden">
                      <Image
                        src={field.value}
                        alt="Cover"
                        width={1000}
                        height={1000}
                        loading="eager"
                        className="object-cover"
                        style={{ width: "100%", height: "auto" }}
                        onError={(e: any) => {
                          e.target.src = "./logo-icon.svg";
                        }}
                      />
                    </div>
                  ) : (
                    <ImagePlus strokeWidth={0.2} className="w-20 h-20" />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[250px] hidden"
                    type="file"
                    // disabled={loading}
                    accept="image/*"
                    onChange={(e) => handleImage(e, field.onChange, "cover")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="absolute w-24 h-24 bottom-4 left-4 bg-transparent rounded-md">
                <FormLabel className="bg-background cursor-pointer h-full flex justify-center items-center gap-3 border-dashed border rounded-md overflow-hidden py-3">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="Logo"
                      loading="eager"
                      fill
                      className="object-contain max-w-16 max-h-16 m-auto"
                      onError={(e: any) => {
                        e.target.src = "./logo-icon-dark.svg";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center text-center gap-y-2 text-xs">
                      <ImagePlus strokeWidth={0.5} className="w-5 h-5" />
                      <p className="text-muted-foreground">Upload Logo</p>
                    </div>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    // disabled={loading}
                    className="hidden"
                    onChange={(e) => handleImage(e, field.onChange, "logo")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <MainPart />
        <AdvantagesPart />
        <LinksPart />
        <SelectPart constantData={constantData} />
        <CheckPart />
        <div className="pt-5 flex items-center justify-end gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            {initialData ? "Save changes" : "Create"}
            {isLoading && (
              <Spinner className="ml-2 text-white dark:text-primary" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const getInitialValues = (initialData?: any) => ({
  cover: initialData?.cover_url || "",
  logo: initialData?.logo_url || "",
  title: initialData?.title || "",
  functionality: initialData?.functionality || "",
  about: initialData?.about || "",
  description: initialData?.description || "",
  links: initialData?.links || [],
  technologies: initialData?.technologies.map((item: any) => item.id) || [""],
  tools: initialData?.tools.map((item: any) => item.id) || [""],
  work_types: initialData?.work_types.map((item: any) => item.id) || [""],
  platforms: initialData?.platforms.map((item: any) => item.id) || [""],
  members: initialData?.members.map((item: any) => item.id) || [""],
});
