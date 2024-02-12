import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="grow flex-1 flex flex-col transition-all">
        <Navbar />
        <div className="flex flex-wrap flex-1 grow transition-all h-[calc(100vh-64px)]">
          <ScrollArea className="w-full h-full">
            <div className="space-y-5 px-4 py-6 relative">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
