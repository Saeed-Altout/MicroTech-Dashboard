import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MicroTech - Error",
  description: "There some error, pelase sure form your internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      {children}
    </div>
  );
}
