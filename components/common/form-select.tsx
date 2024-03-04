"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, ChevronsUpDown, PlusCircle } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, number>[];
  name: string;
  label?: string;
  heading?: string;
  href: string;
}

export const FormSelect = ({
  className,
  items = [],
  name,
  heading,
  href,
  label,
}: StoreSwitcherProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { getValues, control } = useFormContext();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const [selected, setSelected] = useState<number[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a item"
                className={cn("w-full justify-between", className)}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                Select {heading}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="col-span-1 w-full p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search item..." />
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
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        router.push(href);
                      }}
                      className="cursor-pointer"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
                      {label}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
