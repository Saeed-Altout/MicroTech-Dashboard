"use client";

import { ChangeEvent, Key, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Members = ({ form, data }: { form: any; data: any }) => {
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
                  {data?.map(({ id, name }, index) => (
                    <SelectItem
                      key={index}
                      value={name}
                      className="cursor-pointer"
                    >
                      {name}
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
export const Platforms = ({ form, data }: { form: any; data: any }) => {
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
                  {data?.map(({ id, name }, index) => (
                    <SelectItem
                      key={index}
                      value={name}
                      className="cursor-pointer"
                    >
                      {name}
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
export const WorkTypes = ({ form, data }: { form: any; data: any }) => {
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
                  {data?.map(({ id, name }, index) => (
                    <SelectItem
                      key={index}
                      value={name}
                      className="cursor-pointer"
                    >
                      {name}
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
export const Tools = ({ form, data }: { form: any; data: any }) => {
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
                  {data?.map(({ id, name }, index) => (
                    <SelectItem
                      key={index}
                      value={name}
                      className="cursor-pointer"
                    >
                      {name}
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
export const Technologies = ({ form, data }: { form: any; data: any }) => {
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
                  {data?.map(({ id, name }, index) => (
                    <SelectItem
                      key={index}
                      value={name}
                      className="cursor-pointer"
                    >
                      {name}
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
export const Links = ({ form }: { form: any }) => {
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
export const Advantages = ({ form }: { form: any }) => {
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
export const Main = ({ form }: { form: any }) => {
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
