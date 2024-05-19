"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { RowActions } from "./row-actions";

interface Item {
  id: number;
  name: string;
  number_project: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  icon_url: string;
}

export type ProjectColumn = {
  id: number;
  title: string;
  description: string;
  functionality: string;
  category: string;
  about: string;
  advantages: string[];
  links: Array<{ link: string; platform: string }> | null;
  likes: number;
  comments: number;
  active: boolean;
  special: boolean;
  deleted_at: string | null;
  created_at: string;
  cover_url: string;
  logo_url: string;
  images: string[];
  technologies: Item[];
  tools: Item[];
  work_types: Item[];
  platforms: Item[];
  members: any[];
};

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) => (
      <Image
        src={row.original.logo_url}
        alt={row.original.title}
        width={30}
        height={30}
        onError={(e: any) => {
          e.target.src = "/logo-icon.svg";
        }}
        className="object-cover rounded-full overflow-hidden"
      />
    ),
  },
  {
    accessorKey: "cover_url",
    header: "Cover",
    cell: ({ row }) => (
      <Image
        src={row.original.cover_url}
        alt={row.original.title}
        width={30}
        height={30}
        onError={(e: any) => {
          e.target.src = "/logo-icon.svg";
        }}
        className="object-contain"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "about",
    header: "About",
    cell: ({ row }) => (
      <p className="truncate max-w-[300px]">{row.original.about}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="truncate max-w-[200px]">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center justify-start gap-2">
        {row.original.technologies.map((item, index) => (
          <Image
            key={index}
            src={item?.icon_url || ""}
            alt={`${row.original.title}-${index}`}
            width={30}
            height={30}
            onError={(e: any) => {
              e.target.src = "/logo-icon.svg";
            }}
            className="object-contain"
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "tools",
    header: "Toolskit",
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center justify-start gap-2">
        {row.original.tools.map((item, index) => (
          <Image
            key={index}
            src={item?.icon_url || ""}
            alt={`${row.original.title}-${index}`}
            width={30}
            height={30}
            onError={(e: any) => {
              e.target.src = "/logo-icon.svg";
            }}
            className="object-contain"
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <Badge
        className={cn(row.original.special && "bg-green-400")}
        variant={row.original.active ? "default" : "destructive"}
      >
        {row.original.active ? "Active" : "Disable"}
      </Badge>
    ),
  },
  {
    accessorKey: "special",
    header: "Special",
    cell: ({ row }) => (
      <Badge
        className={cn(row.original.special && "bg-yellow-400")}
        variant={row.original.special ? "default" : "destructive"}
      >
        {row.original.special ? "Special" : "UnSpecial"}
      </Badge>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
