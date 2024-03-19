"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface MemberColumn {
  id: string;
  name: string;
  email: string;
  phone: string;
}

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
    header: "Actions",
    cell: ({ row }) => <CellAction initialData={row.original} />,
  },
];
