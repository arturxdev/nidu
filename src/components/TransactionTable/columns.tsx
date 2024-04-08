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

export type Transaction = {
  id: string;
  bankId: string;
  bank: string;
  userId: string;
  amount: number;
  date: string;
  status: "pending" | "processing" | "success" | "failed";
  type: string;
  origin: string;
  description: string;
  category: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const description = row.original.description;
      const createdAt = row.original.date;
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
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => {
      const noCategory = row.original.category === "uncategorized";

      return (
        <div className="font-medium">{`${
          noCategory ? "Sin categoría" : row.original.category
        }`}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      const deleteTransaction = (id: string) => {};

      return (
        <div>
          <UpdateTransactionSheet transaction={transaction} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Eliminar transaccion</DialogTitle>
                <DialogDescription>
                  Estas seguro de eliminar la transaccion?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      deleteTransaction(transaction.id);
                    }}
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
