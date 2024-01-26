import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all">
        <Navbar />
        <ScrollArea>
          <div className="space-y-5 px-4 py-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
