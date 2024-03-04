"use client";

import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignCenterHorizontalIcon,
  AlignHorizontalDistributeCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalSpaceBetween,
  ArrowDownWideNarrow,
  ArrowLeftRight,
  ArrowUpNarrowWide,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  ImagePlus,
  LucideArrowUpNarrowWide,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import * as z from "zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/common/form-select";
import { Heading } from "./heading";
import { projectSchema } from "@/schemas";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface FormProjectProps {
  initialData?: any;
  constant?: any;
}

export const FormProject = ({ initialData, constant }: FormProjectProps) => {
  const [filesCover, setFilesCover] = useState<File[]>([]);
  const [filesLogo, setFilesLogo] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [align, setAlign] = useState<
    "center" | "left" | "right" | "wide" | "narrow"
  >("center");
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
      advantages: advantagesInitalValue || "",
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
    let advantages: string[] = [];
    let data = new FormData();

    try {
      setLoading(true);

      values.advantages.forEach((advantage) =>
        advantages.push(advantage.value)
      );

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
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center gap-x-5">
        <Button size="icon" variant="outline" onClick={() => setAlign("left")}>
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">left</span>
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setAlign("center")}
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">center</span>
        </Button>
        <Button size="icon" variant="outline" onClick={() => setAlign("right")}>
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">right</span>
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setAlign("narrow")}
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span className="sr-only">narrow</span>
        </Button>
        <Button size="icon" variant="outline" onClick={() => setAlign("wide")}>
          <ChevronLeft className="h-4 w-4 " />
          <ChevronRight className="h-4 w-4 " />
          <span className="sr-only">wide</span>
        </Button>
      </div>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "flex flex-col w-full gap-y-6 items-start justify-start",
              align === "center" && "items-center",
              align === "left" && "items-start",
              align === "right" && "items-end"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-y-6 max-w-4xl",
                align === "wide" && "max-w-7xl mx-auto",
                align === "narrow" && "max-w-2xl mx-auto"
              )}
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
              <Separator />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="functionality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Functionality</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="functionality"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={6}
                        placeholder="about"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={6}
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                    <FormField
                      key={index}
                      control={form.control}
                      name={`advantages.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="advantage"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <Heading
                  label="Links:"
                  onRemove={() => removeLink(linksFields.length - 1)}
                  onAppend={() => appendLink({ platform: "", link: "" })}
                />

                <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 items-start gap-6">
                  {linksFields.map((field, index) => (
                    <div key={index} className="flex gap-5">
                      <FormField
                        control={form.control}
                        name={`links.${index}.link`}
                        render={({ field }) => (
                          <FormItem className="w-36">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {platforms?.map((platform, index) => (
                                  <SelectItem
                                    disabled={loading}
                                    value={platform}
                                    key={index}
                                  >
                                    {platform}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`links.${index}.platform`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Url"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Separator />

              <FormSelect
                items={constant.technologies}
                name="technologies"
                heading="Technologies"
                href="/technologies"
                label="Create Technology"
              />
              <FormSelect
                items={constant.toolsKit}
                name="tools"
                heading="Tools-Kit"
                href="/tools"
                label="Create Tool-kit"
              />
              <FormSelect
                items={constant.members}
                name="members"
                heading="Members"
                href="/members"
                label="Create Member"
              />
              <FormSelect
                items={constant.platforms}
                name="platforms"
                heading="Platforms"
                href="/platforms"
                label="Create Platform"
              />
              <FormSelect
                items={constant.workTypes}
                name="work_types"
                heading="Work Types"
                href="/work_types"
                label="Create Work Type"
              />
              <div className="flex items-center gap-4 w-full pt-20">
                <Button
                  disabled={loading}
                  variant="outline"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {initialData ? "Save Changes" : "Create Project"}
                  {loading && <Spinner className="ml-2 text-white" />}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FormProvider>
    </>
  );
};

const getInitialValues = (initialData?: any) => ({
  cover: initialData?.cover_url || "",
  logo: initialData?.logo_url || "",
  title: initialData?.title || "",
  functionality: initialData?.functionality || "",
  about: initialData?.about || "",
  description: initialData?.description || "",
  links: initialData?.links || [
    {
      link: "",
      platform: "",
    },
  ],
  technologies: initialData?.technologies.map((item: any) => item.id) || [""],
  tools: initialData?.tools.map((item: any) => item.id) || [""],
  work_types: initialData?.work_types.map((item: any) => item.id) || [""],
  platforms: initialData?.platforms.map((item: any) => item.id) || [""],
  members: initialData?.members.map((item: any) => item.id) || [""],
});
const platforms = ["Github", "Facebook", "Instgram", "Other"];
