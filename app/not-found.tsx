import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-y-4">
      <h1 className="text-3xl font-semibold">Not Found 404</h1>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back home
        </Link>
      </Button>
    </div>
  );
}
