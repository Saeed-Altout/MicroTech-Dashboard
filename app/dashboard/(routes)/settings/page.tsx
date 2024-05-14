import { FormSettings } from "./_components/form-settings";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6 flex-1 w-full">
      <Heading
        title="Settings"
        description="You can edit and control in your settings from one place."
      />
      <Separator />
      <FormSettings />
    </div>
  );
}
