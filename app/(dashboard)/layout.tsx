import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateDialog } from "./(routes)/projects/components/create-dialog";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full">
      <CreateDialog />
      <Sidebar />
      <div className="grow flex-1 flex flex-col transition-all">
        <Navbar />
        <main className="flex flex-1 transition-all h-[calc(100vh-64px)]">
          <ScrollArea className="w-full h-full">
            <div className="px-4 py-6">
              <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)] space-y-6">
                {children}
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
