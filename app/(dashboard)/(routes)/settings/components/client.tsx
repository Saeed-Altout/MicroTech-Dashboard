"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FormSettings } from "./form-settings";

interface SettingsClientProps {
  initialData: any[];
}

export const SettingsClient = ({ initialData }: SettingsClientProps) => {
  return (
    <>
      <Heading title="Settings" description="Welcome in settings page.">
        <Button size="icon" variant="destructive">
          <span className="sr-only">Delete</span>
          <Trash className="h-4 w-4" />
        </Button>
      </Heading>
      <Separator />
      <FormSettings initialData={initialData} />
    </>
  );
};
