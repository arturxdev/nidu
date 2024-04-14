"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import { UpdateTransactionSheet } from "../UpdateTransactionSheet";
import { Trash2 } from "lucide-react";
import { Transaction } from "@/entities/transaccions";



export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const createdAt = row.original.date;
      return (
        <div className="font-medium">
          <p className="text-xs">
            {dayjs(createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div className="font-medium">
          <p className="font-medium">{description}</p>
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
        <div className="font-medium">{`${!isIncome ? "-" : ""
          }${formatted}`}</div>
      );
    },
  },
  {
    accessorKey: "bank",
    header: "Banco",
  },
  {
    accessorKey: "card",
    header: "Tarjeta",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "descriptionUser",
    header: "Descripcion",
  },
  {
    accessorKey: "omit",
    header: "omitir",
    cell: ({ row }) => {
      const omit = row.original.omit;
      return (
        <div className="font-medium">{`${omit ? "Si" : "No"}`}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const noCategory = row.original.category === "uncategorized";

      return (
        <div className="font-medium">{`${noCategory ? "Sin categoría" : row.original.category
          }`}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      const deleteTransaction = (id: string) => { };

      return (
        <div>
          <UpdateTransactionSheet transaction={transaction} />
        </div>
      );
    },
  },
];
