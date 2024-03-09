import {
  Code,
  File,
  Folder,
  Home,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Settings,
  Tag,
  Users,
} from "lucide-react";

export interface Item {
  id: number | string;
  name: string;
  number_project: number | string;
  created_at: string;
  updated_at: string;
  icon_url: string;
}
export interface MemberColumn {
  id: number;
  name: string;
  email: string;
  phone: string;
  number_project: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectColumn {
  id: number | string;
  title: string;
  description: string;
  functionality: string;
  about: string;
  advantages: string[];
  links: {
    link: string;
    platform: string;
  }[];
  active: number | string;
  created_at: string;
  updated_at: string;
  cover_url: string;
  logo_url: string;
  images_hero: string[];
  features: {
    id: number | string;
    title: string;
    description: string;
    project_id: number | string;
    created_at: string;
    updated_at: string;
    images: {
      id: number | string;
      created_at: string;
      updated_at: string;
      image_url: string;
    }[];
  }[];
  images: {
    id: number | string;
    created_at: string;
    updated_at: string;
    image_url: string;
  }[];
  technologies: {
    id: number | string;
    name: string;
    number_project: number | string;
    created_at: string;
    updated_at: string;
    icon_url: string;
  }[];
  tools: {
    id: number | string;
    name: string;
    number_project: number | string;
    created_at: string;
    updated_at: string;
    icon_url: string;
  }[];
  work_types: {
    id: number | string;
    name: string;
    number_project: number | string;
    created_at: string;
    updated_at: string;
    icon_url: string;
  }[];
  platforms: {
    id: number | string;
    name: string;
    number_project: number | string;
    created_at: string;
    updated_at: string;
    icon_url: string;
  }[];
  members: {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    number_project: number | string;
    created_at: string;
    updated_at: string;
  }[];
}
export interface TechnologyColumn extends Item {}
export interface ToolColumn extends Item {}
export interface PlatformColumn extends Item {}
export interface WorkTypeColumn extends Item {}

export interface LinksProps {
  label: string;
  href: string;
  pathname: string;
  icon: LucideIcon;
}
export interface RoutesProps {
  title: string;
  icon: LucideIcon;
  links: LinksProps[];
}

export const routes: RoutesProps[] = [
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
      // {
      //   label: "Settings",
      //   href: "/settings",
      //   pathname: "/settings",
      //   icon: Settings,
      // },
      // {
      //   label: "Trash",
      //   href: "/trash",
      //   pathname: "/trash",
      //   icon: Trash,
      // },
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
        icon: Users,
      },
      {
        label: "Members",
        href: "/members",
        pathname: "/members",
        icon: Users,
      },
    ],
  },
  // {
  //   title: "Others",
  //   icon: Settings,
  //   links: [
  //     {
  //       label: "Logout",
  //       href: "/",
  //       pathname: "/",
  //       icon: LogOut,
  //     },
  //   ],
  // },
];
