"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { RowActions } from "./row-actions";

export type TechnologyColumn = {
  id: number;
  name: string;
  number_project: number;
  deleted_at: string | null;
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
    accessorKey: "icon_url",
    header: "Icon",
    cell: ({ row }) => (
      <Image
        src={row.original.icon_url}
        alt={row.original.name}
        width={50}
        height={50}
        onError={(e: any) => {
          e.target.src = "/logo-icon.svg";
        }}
        className="object-contain"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
