"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface ProjectColumn {
  id: string;
  title: string;
  description: string;
  functionality: string;
  about: string;
  likes: number;
  category: string;
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

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => {
      return (
        <div className="w-7">
          <Image
            src={row.original.logo_url}
            alt="Logo"
            width={100}
            height={100}
            loading="eager"
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
            onError={(e: any) => {
              e.target.src = "./logo-icon.svg";
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <p className="truncate whitespace-nowrap">{row.original.title}</p>
    ),
  },
  {
    accessorKey: "functionality",
    header: "Functionality",
    cell: ({ row }) => (
      <p className="truncate whitespace-nowrap">{row.original.functionality}</p>
    ),
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-5">
          {row.original.technologies.map((tech, i) => (
            <div className="w-7" key={i}>
              <Image
                src={tech.icon_url}
                alt={tech.name}
                width={100}
                height={100}
                loading="eager"
                className="object-contain"
                style={{ width: "100%", height: "auto" }}
                onError={(e: any) => {
                  e.target.src = "./logo-icon.svg";
                }}
              />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "tools",
    header: "Toolskit",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-5">
          {row.original.tools.map((tool, i) => (
            <div className="w-7" key={i}>
              <Image
                src={tool.icon_url}
                alt={tool.name}
                width={100}
                height={100}
                loading="eager"
                className="object-contain"
                style={{ width: "100%", height: "auto" }}
                onError={(e: any) => {
                  e.target.src = "./logo-icon.svg";
                }}
              />
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "about",
    header: "About",
    cell: ({ row }) => (
      <div className="w-60">
        <p className="truncate whitespace-nowrap">{row.original.about}</p>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction initialData={row.original} />,
  },
];
