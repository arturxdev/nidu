"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { Pencil } from "lucide-react";
import { Transaction } from "@/entities/transaccions";
import { categoryArrayWithId } from "@/utils/dictionaries/categoryDictionary";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useGetTransactions } from "@/services/hooks/useGetTransactions";

type UpdateTransactionSheetProps = {
  transaction: Transaction;
};
export function UpdateOmitTransaction({
  transaction,
}: UpdateTransactionSheetProps) {
  const [omit, setOmit] = useState(transaction.omit);
  const updateOmit = async () => {
    try {
      setOmit(!omit);
      const res = await fetch(`/api/transaction`, {
        method: "PUT",
        body: JSON.stringify({ ...transaction, omit: !omit }),
        headers: {
          contentType: "application/json",
        },
      });
      if (res.status !== 200) throw new Error("Fallo al actualizar");
      const data = await res.json();
      toast({
        title: "Transacción actualizada",
      });
    } catch (error) {
      toast({
        title: "Error al actualizar",
      });
    }
  };
  return <Switch checked={omit} onCheckedChange={updateOmit} />;
}

export function UpdateTransactionSheet({
  transaction,
}: UpdateTransactionSheetProps) {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { revalidateTransactions } = useGetTransactions();

  const updateCategory = async () => {
    try {
      const res = await fetch(`/api/transaction`, {
        method: "PUT",
        body: JSON.stringify(transaction),
        headers: {
          contentType: "application/json",
        },
      });
      if (res.status !== 200) throw new Error("Fallo al actualizar");
      const data = await res.json();
      toast({
        title: "Transacción actualizada",
      });
      setSheetOpen(false);
      revalidateTransactions();
    } catch (error) {
      toast({
        title: "Error al actualizar",
      });
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="mr-2">
          <Pencil className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Transacción</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <Label htmlFor="category">Selecciona una categoría</Label>
          <Select
            onValueChange={(value) => (transaction.category = value)}
            defaultValue={transaction.category}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                id="category"
                placeholder="Selecciona una categoría"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoría</SelectLabel>
                {categoryArrayWithId.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.emoji} {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <Label htmlFor="category">Agrega una descripcion</Label>
          <Input
            placeholder="Agrega una descripcion"
            defaultValue={transaction.descriptionUser}
            onChange={(e) => {
              transaction.descriptionUser = e.target.value;
            }}
          />
        </div>

        <Button className="mt-4" onClick={updateCategory}>
          Guardar
        </Button>
      </SheetContent>
    </Sheet>
  );
}
