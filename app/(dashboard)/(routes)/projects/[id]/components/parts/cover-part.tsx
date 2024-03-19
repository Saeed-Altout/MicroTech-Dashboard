import Image from "next/image";

import { ImagePlus } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/ui/form-input";
import { useFormContext } from "react-hook-form";
import { ChangeEvent, useState } from "react";

export const CoverPart = () => {
  const { control } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files || []));
      if (!file.type.includes("image")) return;
      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden col-span-1 md:col-span-2">
      <FormField
        control={control}
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
                accept="image/*"
                onChange={(e) => handleImage(e, field.onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
