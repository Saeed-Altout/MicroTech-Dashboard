import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 h-full w-full">
      <p className="text-7xl font-semibold">Error 404</p>
      <Button asChild variant="outline">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" /> Go back to home
        </Link>
      </Button>
    </div>
  );
}
