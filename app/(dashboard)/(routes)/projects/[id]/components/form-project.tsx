"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormPopover } from "@/components/ui/form-popover";
import { FormFooter } from "@/components/ui/form-footer";

import { Heading } from "./heading";
import { projectSchema } from "@/schemas";
import { ProjectColumn } from "@/interface";
import { onError } from "@/lib/error";

interface FormProjectProps {
  initialData: ProjectColumn;
  constant: any;
}

export const FormProject = ({ initialData, constant }: FormProjectProps) => {
  const [filesCover, setFilesCover] = useState<File[]>([]);
  const [filesLogo, setFilesLogo] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const platforms = ["Github", "Facebook", "Instgram", "Other"];

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

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...getInitialValues(initialData),
      advantages: advantagesInitalValue || [],
    },
  });

  const handleImageCover = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilesCover(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  const handleImageLogo = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilesLogo(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const {
    fields: advantagesFields,
    append: appendAdvantage,
    remove: removeAdvantage,
  } = useFieldArray({
    name: "advantages",
    control: form.control,
  });

  const {
    fields: linksFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const onCancel = () => {
    form.reset();
    setFilesCover([]);
    setFilesLogo([]);
    router.push("/projects");
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    let data = new FormData();
    let advantages: string[] = [];
    values.advantages.forEach((advantage) => advantages.push(advantage.value));

    try {
      setLoading(true);
      if (initialData) {
        filesLogo[0] !== undefined && data.append("logo", filesLogo[0]);
        filesCover[0] !== undefined && data.append("cover", filesCover[0]);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/edit`,
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
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(`${initialData?.title} edited!`);
      } else {
        data.append("logo", filesLogo[0]);
        data.append("cover", filesCover[0]);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/project/create`,
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
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("New project created!");
      }

      onCancel();
      router.refresh();
    } catch (error) {
      const message = onError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 max-w-7xl mx-auto"
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
                      disabled={loading}
                      accept="image/*"
                      onChange={(e) => handleImageCover(e, field.onChange)}
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
                      disabled={loading}
                      className="hidden"
                      onChange={(e) => handleImageLogo(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormInput
            name="title"
            label="Title"
            placeholder="title"
            loading={loading}
          />
          <FormInput
            name="functionality"
            label="Functionality"
            placeholder="functionality"
            loading={loading}
          />
          <FormInput
            name="about"
            label="About"
            placeholder="about"
            loading={loading}
            textarea
          />
          <FormInput
            name="description"
            label="Description"
            placeholder="description"
            loading={loading}
            textarea
          />
          <Separator />
          <div className="space-y-5">
            <Heading
              label="Advantages:"
              onRemove={() => removeAdvantage(advantagesFields.length - 1)}
              onAppend={() => appendAdvantage({ value: "" })}
            />

            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-6">
              {advantagesFields.map((field, index) => (
                <FormInput
                  key={index}
                  name={`advantages.${index}.value`}
                  placeholder="advantage"
                  loading={loading}
                />
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-5">
            <Heading
              label="Links:"
              onRemove={() => removeLink(linksFields.length - 1)}
              onAppend={() => appendLink({ platform: "", link: "" })}
            />

            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 items-start gap-6">
              {linksFields.map((field, index) => (
                <div key={index} className="flex gap-5">
                  <FormSelect
                    name={`links.${index}.link`}
                    placeholder="Select"
                    loading={loading}
                    items={platforms}
                  />
                  <FormInput
                    name={`links.${index}.platform`}
                    placeholder="url"
                    loading={loading}
                  />
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormPopover
              items={constant.technologies}
              name="technologies"
              heading="Technologies"
              href="/technologies"
              label="Create Technology"
            />
            <FormPopover
              items={constant.toolsKit}
              name="tools"
              heading="Tools-Kit"
              href="/tools"
              label="Create Tool-kit"
            />
            <FormPopover
              items={constant.members}
              name="members"
              heading="Members"
              href="/members"
              label="Create Member"
            />
            <FormPopover
              items={constant.platforms}
              name="platforms"
              heading="Platforms"
              href="/platforms"
              label="Create Platform"
            />
            <FormPopover
              items={constant.workTypes}
              name="work_types"
              heading="Work Types"
              href="/work_types"
              label="Create Work Type"
            />
          </div>
          <FormFooter
            label={initialData ? "Save Changes" : "Create Project"}
            onClose={onCancel}
            loading={loading}
          />
        </form>
      </Form>
    </FormProvider>
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
