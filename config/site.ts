import { Code, Home, Laptop, Settings } from "lucide-react";

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
];
