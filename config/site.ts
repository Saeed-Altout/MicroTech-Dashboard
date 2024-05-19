import {
  Code,
  Home,
  Laptop,
  Settings,
  Stars,
  Mailbox,
  Target,
} from "lucide-react";

export const siteConfig = {
  name: "MicroTech Dashboard",
  description:
    "At MicroTech, we're dedicated to transforming your ideas into powerful digital experiences. As a leading application design and development company, we specialize in creating customized, cutting-edge solutions that propel your business forward. Discover Our Expertise",
};

export const routes = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Technologies",
    href: "/technologies",
    icon: Laptop,
  },
  {
    label: "Tools kit",
    href: "/tools-kit",
    icon: Stars,
  },
  {
    label: "Platforms",
    href: "/platforms",
    icon: Mailbox,
  },
  {
    label: "Work Types",
    href: "/work-types",
    icon: Target,
  },
];
