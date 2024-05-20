"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { RowActions } from "./row-actions";

export type MemberColumn = {
  id: number;
  name: string;
  email: string;
  phone: string;
  number_project: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  icon_url: string;
};

export const columns: ColumnDef<MemberColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p className="text-nowrap">{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-nowrap">{row.original.email}</p>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <p className="text-nowrap">{row.original.phone}</p>,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <RowActions data={row.original} />,
  },
];
