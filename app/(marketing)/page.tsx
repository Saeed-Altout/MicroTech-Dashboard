import Image from "next/image";
import { cookies } from "next/headers";

import { Footer } from "./components/footer";
import { Heading } from "./components/heading";
import { redirect } from "next/navigation";

const MarketingPage = async () => {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");

  if (hasToken) {
    redirect("/home");
  }

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
          <Image
            src="/enter.svg"
            fill
            className="object-contain block dark:hidden"
            alt="Enter"
          />
          <Image
            src="/enter-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="Enter"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
