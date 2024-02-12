import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export const Client = () => {
  return (
    <Heading title="Projects" description="Welcome in projects page.">
      <Link href="/projects/new">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </Link>
    </Heading>
  );
};
