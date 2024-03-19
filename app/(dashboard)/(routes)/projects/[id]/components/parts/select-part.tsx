import { FormPopover } from "@/components/ui/form-popover";

interface SelectPartProps {
  constantData: any;
}

export const SelectPart = ({ constantData }: SelectPartProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <FormPopover
        items={constantData.technologies}
        name="technologies"
        heading="Technologies"
        href="/technologies"
        label="Create Technology"
      />
      <FormPopover
        items={constantData.toolsKit}
        name="tools"
        heading="Tools-Kit"
        href="/tools"
        label="Create Tool-kit"
      />
      <FormPopover
        items={constantData.members}
        name="members"
        heading="Members"
        href="/members"
        label="Create Member"
      />
      <FormPopover
        items={constantData.platforms}
        name="platforms"
        heading="Platforms"
        href="/platforms"
        label="Create Platform"
      />
      <FormPopover
        items={constantData.workTypes}
        name="work_types"
        heading="Work Types"
        href="/work_types"
        label="Create Work Type"
      />
    </div>
  );
};
