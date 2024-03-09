import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnKnownPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <p className="text-5xl font-bold">Server Error 404</p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
