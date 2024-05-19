"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, Key } from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface FormPopoverProps extends PopoverTriggerProps {
  items: Record<string, number>[];
  name: string;
  label?: string;
  heading?: string;
}

export const FormPopover = ({
  className,
  items = [],
  name,
  heading,
}: FormPopoverProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { getValues, control } = useFormContext();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const handleSelect = (
    item: number,
    fieldChange: (value: number[]) => void
  ) => {
    const isItemSelected = selected.includes(item);
    const updatedSelected = isItemSelected
      ? selected.filter((selectedItem) => selectedItem !== item)
      : [...selected, item];
    setSelected(updatedSelected);
    fieldChange(updatedSelected);
  };

  useEffect(() => {
    if (getValues(name) != "") {
      setSelected(getValues(name));
    }
  }, [getValues, name]);

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select a item"
                  className={cn("w-full justify-between", className)}
                >
                  Select {heading}
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command className="w-full">
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup heading={heading}>
                      {formattedItems.map((item) => (
                        <CommandItem
                          key={item.value}
                          className="text-sm"
                          onSelect={() =>
                            handleSelect(+item.value, field.onChange)
                          }
                        >
                          {selected?.map((current, index) => (
                            <span key={index}>
                              {+current === +item.value && (
                                <Check className="mr-2 h-4 w-4" />
                              )}
                            </span>
                          ))}
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
            <div className="min-h-5 w-full rounded-md flex flex-wrap items-center justify-start gap-2">
              {formattedItems.map((item) =>
                field.value.map((selected: number, index: Key) => (
                  <>
                    {selected === item.value && (
                      <Badge
                        key={index}
                        className="font-medium rounded-md bg-purple-600"
                      >
                        {item.label}
                      </Badge>
                    )}
                  </>
                ))
              )}
            </div>
          </FormItem>
        )}
      />
    </>
  );
};
