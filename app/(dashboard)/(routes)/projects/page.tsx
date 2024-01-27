import axios from "axios";
import Link from "next/link";

import { toast } from "sonner";
import { Plus } from "lucide-react";

import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "./components/data-table";

export default async function Projects() {
  const res = await axios.get("http://127.0.0.1:8000/project/index");
  const data = await res.data.data.data;

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

      <DataTable
        columns={columns}
        data={data}
        loading={false}
        searchKey="title"
      />
    </>
  );
}
