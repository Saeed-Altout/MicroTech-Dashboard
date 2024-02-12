"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MemberColumn } from "@/config/config";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<MemberColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="whitespace-nowrap">{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
