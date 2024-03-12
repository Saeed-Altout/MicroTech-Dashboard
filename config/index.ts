import {
  Code,
  File,
  Folder,
  Layers,
  LayoutDashboard,
  Tag,
  Users,
} from "lucide-react";
import { RoutesProps } from "@/interface";

export const routes: RoutesProps[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    links: [
      {
        label: "Home",
        href: "/",
        pathname: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Mangment",
    icon: Folder,
    links: [
      {
        label: "Projects",
        href: "/projects",
        pathname: "/projects",
        icon: Folder,
      },
      {
        label: "Technologies",
        href: "/technologies",
        pathname: "/technologies",
        icon: Code,
      },
      {
        label: "Tools",
        href: "/tools",
        pathname: "/tools",
        icon: Tag,
      },
      {
        label: "Platforms",
        href: "/platforms",
        pathname: "/platforms",
        icon: File,
      },
      {
        label: "Work Types",
        href: "/work-types",
        pathname: "/work-types",
        icon: Layers,
      },
      {
        label: "Members",
        href: "/members",
        pathname: "/members",
        icon: Users,
      },
    ],
  },
];
