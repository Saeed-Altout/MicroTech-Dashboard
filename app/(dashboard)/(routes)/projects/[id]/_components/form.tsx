"use client";

import Image from "next/image";
import { Eye, ImagePlus, Minus, Plus, Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { FormPopover } from "@/components/ui/form-popover";
import { Checkbox } from "@/components/ui/checkbox";

import { AxiosData } from "@/lib/axios";
import { ProjectColumn } from "../../_components/columns";

const axiosData = new AxiosData();

const formSchema = z.object({
  cover_url: z.string(),
  logo_url: z.string(),
  title: z.string(),
  description: z.string(),
  about: z.string(),
  functionality: z.string(),
  category: z.string(),
  active: z.boolean(),
  special: z.boolean(),
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
  technologies: z.array(z.number()),
  tools: z.array(z.number()),
  work_types: z.array(z.number()),
  platforms: z.array(z.number()),
  members: z.array(z.number()),
});

export const ProjectForm = ({
  initialData,
  constData,
}: {
  initialData: ProjectColumn | null;
  constData: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filesLogo, setFilesLogo] = useState<File[]>([]);
  const [filesCover, setFilesCover] = useState<File[]>([]);
  const router = useRouter();

  const advantagesFormatted = (advantages: string[] | undefined) => {
    const newData: { value: string }[] = [];

    if (advantages) {
      advantages.map((val) => {
        newData.push({ value: val });
      });
    }

    return newData;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo_url: initialData?.logo_url || "",
      cover_url: initialData?.cover_url || "",
      title: initialData?.title || "",
      functionality: initialData?.functionality || "",
      about: initialData?.about || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      links: initialData?.links || [],
      advantages: advantagesFormatted(initialData?.advantages) || [],

      technologies:
        (initialData?.technologies &&
          initialData?.technologies.map((item) => item.id)) ||
        [],
      tools:
        (initialData?.tools && initialData?.tools.map((item) => item.id)) || [],
      work_types:
        (initialData?.work_types &&
          initialData?.work_types.map((item) => item.id)) ||
        [],
      platforms:
        (initialData?.platforms &&
          initialData?.platforms.map((item) => item.id)) ||
        [],
      members:
        (initialData?.members && initialData?.members.map((item) => item.id)) ||
        [],
      active: initialData?.active ? true : false,
      special: initialData?.special ? true : false,
    },
  });

  const handleImageLogo = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilesLogo(Array.from(e.target.files || []));
      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleImageCover = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilesCover(Array.from(e.target.files || []));
      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const {
    fields: fieldsAdvantages,
    append: appendAdvantage,
    remove: removeAdvantage,
  } = useFieldArray({
    name: "advantages",
    control: form.control,
  });

  const {
    fields: fieldsLinks,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const platforms = ["Github", "Facebook", "Instagram", "Other"];

  const onCancel = () => {
    form.reset();
    router.refresh();
    router.push("/projects");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    let data = new FormData();
    let newAdvantages: string[] = [];

    const endpoint = initialData ? "project/edit" : "project/create";
    const messageSuccess = initialData
      ? "Update successfully!"
      : "Create successfully!";
    const messageError = initialData
      ? "Failed to update data!"
      : "Failed to create!";

    values.advantages.forEach((advantage) =>
      newAdvantages.push(advantage.value)
    );

    if (initialData) {
      filesCover[0] !== undefined && data.append("cover", filesCover[0]);
      filesLogo[0] !== undefined && data.append("logo", filesLogo[0]);
    } else {
      data.append("cover", filesCover[0]);
      data.append("logo", filesLogo[0]);
    }
    data.append("active", "true");
    data.append("special", "false");

    await axiosData
      .postData(
        endpoint,
        {
          id: initialData?.id,
          cover: data.get("cover"),
          logo: data.get("logo"),
          title: values.title,
          about: values.about,
          description: values.description,
          category: values.category,
          advantages: newAdvantages,
          functionality: values.functionality,
          links: values.links,
          technology_ids: values.technologies,
          tool_ids: values.tools,
          platform_ids: values.platforms,
          member_ids: values.members,
          work_type_ids: values.work_types,
          active: values.active ? 1 : 0,
          special: values.special ? 1 : 0,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Logo and Cover */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="cover_url"
              render={({ field }) => (
                <FormItem className="col-span-1 lg:col-span-2">
                  <FormLabel className="cursor-pointer h-[500px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                    {field.value ? (
                      <div className="h-auto">
                        <Image
                          src={field.value}
                          alt="Cover"
                          width={4000}
                          height={4000}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-y-4">
                        <ImagePlus
                          strokeWidth={0.5}
                          className="w-20 h-20 text-muted-foreground"
                        />
                        <p>Upload Cover</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-full hidden"
                      type="file"
                      accept="image/*"
                      disabled={isLoading}
                      onChange={(e) => handleImageCover(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer h-[500px] w-full border-dashed border rounded-md flex justify-center items-center overflow-hidden">
                    {field.value ? (
                      <div className="h-auto w-32 overflow-hidden">
                        <Image
                          src={field.value}
                          alt="Logo"
                          width={1000}
                          height={1000}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-y-4">
                        <ImagePlus
                          strokeWidth={0.5}
                          className="w-20 h-20 text-muted-foreground"
                        />
                        <p>Upload Logo</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-full hidden"
                      type="file"
                      accept="image/*"
                      disabled={isLoading}
                      onChange={(e) => handleImageLogo(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Title, Functionality, Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
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
                      disabled={isLoading}
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="frontend" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="ui&ux">Ui&UX</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Description, About */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      disabled={isLoading}
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
                      rows={6}
                      disabled={isLoading}
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Advantages */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <FormLabel className="text-lg whitespace-nowrap">
                Advantages
              </FormLabel>
              <Button
                type="button"
                variant="default"
                onClick={() => appendAdvantage({ value: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Advantage
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fieldsAdvantages.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`advantages.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-start gap-5">
                      <FormControl className="flex-1">
                        <Input placeholder="advantage" {...field} />
                      </FormControl>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => removeAdvantage(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          {/* Links */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <FormLabel className="text-lg whitespace-nowrap">Links</FormLabel>
              <Button
                type="button"
                variant="default"
                onClick={() => appendLink({ platform: "", link: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Link
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {fieldsLinks.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-start gap-5"
                >
                  <FormField
                    control={form.control}
                    name={`links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="w-32">
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
                            {platforms.map((item, index) => (
                              <SelectItem value={item} key={index}>
                                {item}
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
                    name={`links.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => removeLink(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {/* Technologies, Tools-Kit, Members, Platforms, Work Types */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <FormPopover
              items={constData?.technologies || []}
              name="technologies"
              heading="Technologies"
            />
            <FormPopover
              items={constData?.toolsKit || []}
              name="tools"
              heading="Tools-Kit"
            />
            <FormPopover
              items={constData?.members || []}
              name="members"
              heading="Members"
            />
            <FormPopover
              items={constData?.platforms || []}
              name="platforms"
              heading="Platforms"
            />
            <FormPopover
              items={constData?.workTypes || []}
              name="work_types"
              heading="Work Types"
            />
          </div>
          {/* Active, Special */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="special"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value ? true : false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center">
                      <Stars className="h-4 w-4 mr-2" />
                      Special
                    </FormLabel>
                    <FormDescription>
                      This project will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value ? true : false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Active
                    </FormLabel>
                    <FormDescription>
                      This project will appear for public.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
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
            {initialData ? "Update" : "Create"}{" "}
            {isLoading && <Spinner className="text-background ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
