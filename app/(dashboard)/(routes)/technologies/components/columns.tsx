"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

export type TechnologyColumn = {
  id: number | string;
  name: string;
  number_project: number | string;
  created_at: string;
  updated_at: string;
  icon_url: string;
};

export const columns: ColumnDef<TechnologyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div className="w-7">
          <Image
            src={row.original.icon_url}
            alt="Icon"
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
