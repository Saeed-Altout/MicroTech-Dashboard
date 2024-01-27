"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch";

import { CellAction } from "./cell-action";

export type ProjectColumn = {
  id: number | string;
  title: string;
  description: string;
  functionality: string;
  about: string;
  advantages: string[];
  links: string[];
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
};

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) => {
      return (
        <div className="space-y-3">
          <Image
            src={row.original?.logo_url}
            alt="logo"
            priority
            width={50}
            height={50}
            onError={(e: any) => {
              e.target.src = "/logo-icon-dark.svg";
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "functionality",
    header: "Functionality",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
