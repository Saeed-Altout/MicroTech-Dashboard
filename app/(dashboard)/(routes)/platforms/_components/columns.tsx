"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { PlatformColumn } from "@/config/config";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<PlatformColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div className="w-8">
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
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
