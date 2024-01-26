import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="relative w-40 h-16">
      <Image src="/logo.svg" fill alt="Logo" className="object-contain" />
    </Link>
  );
};
