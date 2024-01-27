import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectColumn } from "./columns";

export const CellAction = ({ data }: { data: ProjectColumn }) => {
  return (
    <div className="w-fit ml-auto flex items-center gap-5">
      <Button variant="ghost" size="icon" onClick={() => {}}>
        <span className="sr-only">Edit</span>
        <Edit className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => {}}>
        <span className="sr-only">Delete</span>
        <Trash className="h-5 w-5 text-red-500" />
      </Button>
    </div>
  );
};
