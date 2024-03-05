import Link from "next/link";
import { cookies } from "next/headers";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Heading = async () => {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");

  return (
    <div className="max-w-5xl space-y-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Projects, & Tools-kit. Welcome to{" "}
        <span className="underline">MicroTech</span>
      </h1>
      <h3 className="text-base sm:text-lg md:text-xl font-medium">
        MicroTech is the connected workspace where <br />
        better, faster work happens.
      </h3>

      {!hasToken && (
        <Button asChild>
          <Link href="/auth/login">
            Login <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
};
