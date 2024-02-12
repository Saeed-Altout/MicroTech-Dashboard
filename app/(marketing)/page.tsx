import Image from "next/image";

import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
          <Image
            src="/enter.svg"
            fill
            className="object-contain dark:hidden"
            alt="Enter"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
