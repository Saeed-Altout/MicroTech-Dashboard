import Link from "next/link";
import { Plus } from "lucide-react";

import { Table } from "./_components/table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function TechnologiesPage() {
  // fetch data then passing data to table

  return (
    <div className="space-y-6 flex-1 w-full">
      <Heading
        title="Technologies"
        description="You added technologies and edit from one place."
      >
        <Button asChild>
          <Link href="/dashboard/technologies/new">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Link>
        </Button>
      </Heading>
      <Separator />
      <Table />
    </div>
  );
}
