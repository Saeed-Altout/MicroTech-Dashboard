import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FooterFormProps {
  backButtonLabel: string;
  backButtonHref: string;
  backButtonDescription: string;
}

export const FooterForm = ({
  backButtonLabel,
  backButtonHref,
  backButtonDescription,
}: FooterFormProps) => {
  return (
    <div className="w-full flex items-center gap-x-2">
      <p className="text-sm text-muted-foreground">{backButtonDescription}</p>
      <Button variant="link" size="sm" className="px-0" asChild>
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </Button>
    </div>
  );
};
