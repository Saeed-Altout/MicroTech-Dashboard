"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface ToolKitColumn {
  id: string;
  name: string;
  icon: string;
}

export const columns: ColumnDef<ToolKitColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div className="w-10">
        <Image
          src={row.original.icon}
          alt="Icon"
          width={1000}
          height={1000}
          loading="eager"
          className="object-contain"
          style={{ width: "100%", height: "auto" }}
          onError={(e: any) => {
            e.target.src = "./logo-icon.svg";
          }}
        />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction initialData={row.original} />,
  },
];
