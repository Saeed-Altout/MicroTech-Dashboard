import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  return (
    <>
      <Heading title="Projects" description="Wellcome in projects page.">
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </Link>
      </Heading>

      <Separator />

      <p>Data Table here</p>
    </>
  );
}
