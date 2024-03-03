import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MicroTech",
  description:
    "The connected workspace where better, faster work mangment projects happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-icon.svg",
        href: "/logo-icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-icon.svg",
        href: "/logo-icon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "!font-poppins")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
