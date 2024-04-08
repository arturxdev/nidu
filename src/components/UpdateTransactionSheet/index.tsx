"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
import { Transaction } from "../TransactionTable/columns";

type UpdateTransactionSheetProps = {
  transaction: Transaction;
};

export function UpdateTransactionSheet({
  transaction,
}: UpdateTransactionSheetProps) {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState(false);

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
      console.log(data);
      toast({
        title: "Transacción actualizada",
      });
      setSheetOpen(false);
    } catch (error) {
      console.error(error);
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
                <SelectItem value="ahorro">Ahorro</SelectItem>
                <SelectItem value="comida">Comida</SelectItem>
                <SelectItem value="subs">Subscripcion</SelectItem>
                <SelectItem value="libre">Libre</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-4" onClick={updateCategory}>
          Guardar
        </Button>
      </SheetContent>
    </Sheet>
  );
}
