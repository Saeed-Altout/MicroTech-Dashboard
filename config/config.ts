import {
  Code,
  Folder,
  Home,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Tag,
  Trash,
} from "lucide-react";
export const routes = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    links: [
      {
        label: "Home",
        href: "/",
        pathname: "/",
        icon: Home,
      },
      {
        label: "Add Project",
        href: "/projects/new",
        pathname: "/projects/new",
        icon: Plus,
      },
      {
        label: "Settings",
        href: "/settings",
        pathname: "/settings",
        icon: Settings,
      },
      {
        label: "Trash",
        href: "/trash",
        pathname: "/trash",
        icon: Trash,
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
        label: "Tools-kit",
        href: "/tools-kit",
        pathname: "/tools-kit",
        icon: Tag,
      },
    ],
  },
  {
    title: "Others",
    icon: Settings,
    links: [
      {
        label: "Logout",
        href: "/logout",
        pathname: "/logout",
        icon: LogOut,
      },
    ],
  },
];

interface Item {
  id: number | string;
  name: string;
  number_project: number | string;
  created_at: string;
  updated_at: string;
  icon_url: string;
}

export interface TechnologyColumn extends Item {}
