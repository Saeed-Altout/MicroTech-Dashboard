"use client";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, Key, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  functionality: z.string(),
  description: z.string(),
  about: z.string(),

  advantages: z.array(
    z.object({
      value: z.string(),
    })
  ),
  links: z.array(
    z.object({
      value: z.string(),
    })
  ),

  technologies: z.array(z.string()),
  tools: z.array(z.string()),
  work_types: z.array(z.string()),
  platforms: z.array(z.string()),
  members: z.array(z.string()),
});

export const FormProject = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      functionality: "",
      description: "",
      about: "",

      advantages: [{ value: "" }, { value: "" }],
      links: [{ value: "" }, { value: "" }],

      technologies: [],
      tools: [],
      work_types: [],
      platforms: [],
      members: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const [stepPage, setStepPage] = useState(0);
  const renderStepPage = () => {
    switch (stepPage) {
      case 0:
        return <Main form={form} />;
      case 1:
        return (
          <div className="space-y-8">
            <Advantages form={form} />
            <Separator />
            <Links form={form} />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-8 mb-8">
            <Technologies form={form} />
            <Tools form={form} />
            <WorkTypes form={form} />
            <Platforms form={form} />
            <Members form={form} />
          </div>
        );
      case 3:
        return (
          <div className="text-center flex flex-col items-center justify-center gap-5">
            <Check className="text-green-500 h-10 w-10" />
            <p className="font-semibold">
              Thank you for create a new project, now you can{" "}
              <span className="underline cursor-pointer">show</span> last
              project you added.
            </p>
          </div>
        );

      default:
        return <div>mian</div>;
    }
  };

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-4 gap-10">
        <div className="space-y-5 col-span-1 xl:col-span-3">
          <Progress value={(stepPage * 100) / 3} className={cn("h-2")} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStepPage()}
              <div className="flex justify-end">
                {stepPage == 2 && <Button type="submit">Create</Button>}
              </div>
            </form>
          </Form>
          <Separator />
          <div className="w-full flex justify-end gap-5">
            <Button
              variant="outline"
              disabled={stepPage === 0}
              onClick={() => setStepPage((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-5 mr-2" /> Prev
            </Button>

            <Button
              variant="default"
              disabled={stepPage === 3}
              onClick={() => setStepPage((prev) => prev + 1)}
            >
              Next
              <ChevronRight className="h-4 w-5 ml-2" />
            </Button>
          </div>
        </div>

        <div className="space-y-3 col-span-1">
          <p className="font-semibold">
            Title:{" "}
            <span className="font-normal text-muted-foreground">
              {form.getValues("name")}
            </span>
          </p>
          <p className="font-semibold">
            Functionality:{" "}
            <span className="font-normal text-muted-foreground">
              {form.getValues("functionality")}
            </span>
          </p>
          <p className="font-semibold">
            Description:{" "}
            <span className="font-normal text-muted-foreground">
              {form.getValues("description")}
            </span>
          </p>
          <p className="font-semibold">
            About:{" "}
            <span className="font-normal text-muted-foreground">
              {form.getValues("about")}
            </span>
          </p>
          <div>
            <h5 className="font-semibold">Advantages: </h5>
            {form.getValues("advantages").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item.value}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">Links: </h5>
            {form.getValues("links").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item.value}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">Technologies: </h5>
            {form.getValues("technologies").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">Tools-kit: </h5>
            {form.getValues("tools").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">Work Types: </h5>
            {form.getValues("work_types").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">platforms: </h5>
            {form.getValues("platforms").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="font-semibold">Members: </h5>
            {form.getValues("members").map((item, index) => (
              <p className="font-semibold" key={index}>
                {index + 1} -{" "}
                <span className="font-normal text-muted-foreground">
                  {item}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Members = ({ form }: { form: any }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement> | any,
    fieldChange: (value: string[]) => void
  ) => {
    if (!selected.includes(event)) {
      selected.push(event);
      router.refresh();
    }
    fieldChange(selected);
  };
  const data = ["Next js", "React js", "Python", "Nuxt js"];

  return (
    <div>
      <FormField
        control={form.control}
        name="members"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Members</FormLabel>
            <Select onValueChange={(e: any) => handleSelect(e, field.onChange)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item}
                      className="cursor-pointer"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-5 flex items-center gap-5">
        {form?.getValues("members").map((item: any, index: Key) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
const Platforms = ({ form }: { form: any }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement> | any,
    fieldChange: (value: string[]) => void
  ) => {
    if (!selected.includes(event)) {
      selected.push(event);
      router.refresh();
    }
    fieldChange(selected);
  };
  const data = ["Next js", "React js", "Python", "Nuxt js"];

  return (
    <div>
      <FormField
        control={form.control}
        name="platforms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platforms</FormLabel>
            <Select onValueChange={(e: any) => handleSelect(e, field.onChange)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item}
                      className="cursor-pointer"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-5 flex items-center gap-5">
        {form?.getValues("platforms").map((item: any, index: Key) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
const WorkTypes = ({ form }: { form: any }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement> | any,
    fieldChange: (value: string[]) => void
  ) => {
    if (!selected.includes(event)) {
      selected.push(event);
      router.refresh();
    }
    fieldChange(selected);
  };
  const data = ["Next js", "React js", "Python", "Nuxt js"];

  return (
    <div>
      <FormField
        control={form.control}
        name="work_types"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Work Types</FormLabel>
            <Select onValueChange={(e: any) => handleSelect(e, field.onChange)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item}
                      className="cursor-pointer"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-5 flex items-center gap-5">
        {form?.getValues("work_types").map((item: any, index: Key) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
const Tools = ({ form }: { form: any }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement> | any,
    fieldChange: (value: string[]) => void
  ) => {
    if (!selected.includes(event)) {
      selected.push(event);
      router.refresh();
    }
    fieldChange(selected);
  };
  const data = ["Next js", "React js", "Python", "Nuxt js"];

  return (
    <div>
      <FormField
        control={form.control}
        name="tools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tools</FormLabel>
            <Select onValueChange={(e: any) => handleSelect(e, field.onChange)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item}
                      className="cursor-pointer"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-5 flex items-center gap-5">
        {form?.getValues("tools").map((item: any, index: Key) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
const Technologies = ({ form }: { form: any }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const handleSelect = (
    event: ChangeEvent<HTMLInputElement> | any,
    fieldChange: (value: string[]) => void
  ) => {
    if (!selected.includes(event)) {
      selected.push(event);
      router.refresh();
    }
    fieldChange(selected);
  };
  const data = ["Next js", "React js", "Python", "Nuxt js"];

  return (
    <div>
      <FormField
        control={form.control}
        name="technologies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technologies</FormLabel>
            <Select onValueChange={(e: any) => handleSelect(e, field.onChange)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item}
                      className="cursor-pointer"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-5 flex items-center gap-5">
        {form?.getValues("technologies").map((item: any, index: Key) => (
          <p key={index} className="text-sm text-muted-foreground">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
const Links = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    name: "links",
    control: form.control,
  });
  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-8 mb-8">
        {fields.map((field, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`links.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Links (${index + 1})`}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      <div className="w-full flex justify-end gap-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => remove(fields.length - 1)}
        >
          <Minus className="h-4 w-4 mr-2" /> Remove
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => append({ value: "" })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </>
  );
};
const Advantages = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    name: "advantages",
    control: form.control,
  });
  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-8 mb-8">
        {fields.map((field, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`advantages.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Advantage (${index + 1})`}</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      <div className="w-full flex justify-end gap-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => remove(fields.length - 1)}
        >
          <Minus className="h-4 w-4 mr-2" /> Remove
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => append({ value: "" })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </>
  );
};
const Main = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
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
              <Input placeholder="" {...field} />
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
              <Textarea placeholder="" {...field} />
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
              <Textarea placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
