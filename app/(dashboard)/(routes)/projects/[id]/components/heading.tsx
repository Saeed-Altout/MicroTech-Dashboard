import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

interface HeadingProps {
  label: string;
  onRemove: () => void;
  onAppend: () => void;
}
export const Heading = ({ label, onRemove, onAppend }: HeadingProps) => {
  return (
    <div className="flex justify-between items-center">
      <FormLabel className="text-lg whitespace-nowrap">{label}</FormLabel>
      <div className="w-full flex justify-end gap-5">
        <Button type="button" variant="outline" size="icon" onClick={onRemove}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button type="button" variant="default" size="icon" onClick={onAppend}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
