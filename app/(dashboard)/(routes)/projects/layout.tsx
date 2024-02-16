import { ProjectContext } from "@/providers/project-provider";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectContext>{children}</ProjectContext>;
}
