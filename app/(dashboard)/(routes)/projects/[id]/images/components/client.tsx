"use client";

import { Pen, Plus } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FormAdd } from "./form-add";
import { ProjectColumn } from "../../../components/columns";
import { FormEdit } from "./form-edit";

export function ImagesClient({ initialData }: { initialData: ProjectColumn }) {
  return (
    <>
      <Heading title="Gallery" description="You can add and edit images." />
      <Separator />
      <Tabs
        defaultValue={initialData.images.length > 0 ? "edit" : "add"}
        className="w-full bg-transparent"
      >
        <TabsList>
          <TabsTrigger value="add">
            <Plus className="h-4 w-4 mr-2" /> Add images
          </TabsTrigger>
          <TabsTrigger value="edit">
            <Pen className="h-4 w-4 mr-2" /> Edit images
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <FormAdd initialData={initialData} />
        </TabsContent>
        <TabsContent value="edit">
          <FormEdit initialData={initialData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
