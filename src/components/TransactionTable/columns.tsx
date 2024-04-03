"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  description: string;
  account: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  createdAt: string;
  type: "expense" | "income";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const description = row.original.description;
      const createdAt = row.original.createdAt;
      return (
        <div className="font-medium">
          <p className="font-medium">{description}</p>
          <p className="text-xs text-gray-400">
            {dayjs(createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="">Cantidad</div>,
    cell: ({ row }) => {
      const isIncome = row.original.type === "income";
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="font-medium">{`${
          !isIncome ? "-" : ""
        }${formatted}`}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "account",
    header: "Cuenta",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
