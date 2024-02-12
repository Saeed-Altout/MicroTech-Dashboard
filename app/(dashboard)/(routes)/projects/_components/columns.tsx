"use client";

import Image from "next/image";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { ProjectColumn } from "@/config/config";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "logo_url",
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
    header: "Name",
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
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => (
      <p className="whitespace-nowrap truncate">
        {format(row.original.created_at, "yyyy-MM-dd")}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
