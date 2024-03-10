"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProjectColumn } from "@/interface";
import { FormProjectImagesEdit } from "./form-project-images-edit";
import { FormProjectImages } from "./form-project-images";
import { Pencil, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ClientAction({ initialData }: { initialData: ProjectColumn }) {
  const [action, setAction] = useState<"create" | "edit">("create");
  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <p className="text-sm">you can Add a new images or edit 🧑‍🚀</p>
        <div className="flex justify-start items-center gap-5">
          <Button
            variant="outline"
            onClick={() => setAction("create")}
          >
            Add a new images
            <Plus className="h-4 w-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setAction("edit")}
          >
            Edit images
            <Pencil className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <Separator />
      {action == "edit" ? (
        <FormProjectImagesEdit initialData={initialData} />
      ) : (
        <FormProjectImages initialData={initialData} />
      )}
    </>
  );
}
