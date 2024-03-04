"use client";

import Image from "next/image";

import * as z from "zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Minus, Plus } from "lucide-react";

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

import { projectSchema } from "@/schemas";

import { useProjectStore } from "@/hooks/use-project-image";
import { FormSelect } from "@/components/common/form-select";

interface FormProjectProps {
  initialData?: any;
  constant?: any;
}

export const FormProject = ({ initialData, constant }: FormProjectProps) => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: getInitialValues(initialData),
  });

  const { handleImage } = useProjectStore();

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
  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden col-span-1 md:col-span-2">
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel className="cursor-pointer h-full flex justify-center items-center gap-3 border-dashed border rounded-md overflow-hidden py-3 relative">
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="Cover"
                        loading="eager"
                        fill
                        className="object-cover"
                        onError={(e: any) => {
                          e.target.src = "./logo-icon-dark.svg";
                        }}
                      />
                    ) : (
                      <>
                        <ImagePlus
                          strokeWidth={0.5}
                          className="w-8 h-8 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">Upload Cover</p>
                      </>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImage(e, field.onChange, "cover")}
                    />
                  </FormControl>
                  <FormMessage />
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
                      <div className="flex flex-col justify-center items-center text-center text-xs">
                        <ImagePlus
                          strokeWidth={0.5}
                          className="w-5 h-5 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">Upload Logo</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImage(e, field.onChange, "logo")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
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
                  <Input placeholder="functionality" {...field} />
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
                  <Textarea rows={6} placeholder="about" {...field} />
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
                  <Textarea rows={6} placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <FormLabel className="text-lg">Advantages:</FormLabel>
              <div className="w-full flex justify-end gap-5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeAdvantage(advantagesFields.length - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  onClick={() => appendAdvantage({ value: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-6">
              {advantagesFields.map((field, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`advantages.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="advantage" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <FormLabel className="text-lg">Links:</FormLabel>
              <div className="w-full flex justify-end gap-5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeLink(linksFields.length - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  onClick={() => appendLink({ platform: "", link: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
                              <SelectItem value={platform} key={index}>
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
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

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
  advantages: initialData?.advantages || [{ value: "" }],
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
