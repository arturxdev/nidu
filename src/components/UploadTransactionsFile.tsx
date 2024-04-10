"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

type UploadTransactionsFileProps = {
  token: string;
};
export function UploadTransactionsFile({ token }: UploadTransactionsFileProps) {
  const [file, setFile] = useState<any>();
  const [bank, setBank] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const BANK_URL = {
    amex: "/amex/credit",
    bbvadebit: "/bbva/debit",
    bbvacredit: "/bbva/credit",
  };

  const uploadFile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `/api/process${BANK_URL[bank as keyof typeof BANK_URL]}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.status !== 200) throw new Error("Fallo al actualizar");
      toast({
        title: "Transacción actualizada",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Subir documento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subir documento</DialogTitle>
          <DialogDescription>
            Sube tu documento en formato .CSV o .XLS y nosotros nos encargamos
            de cargar tus transacciones
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="document">Documento</Label>
            <Input
              id="document"
              type="file"
              onChange={(event) => setFile(event?.target?.files?.[0])}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bank">Selecciona tu banco</Label>
            <Select
              onValueChange={(value) => setBank(value)}
              defaultValue={bank}
            >
              <SelectTrigger className="w-full">
                <SelectValue id="bank" placeholder="Banco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amex">AMEX</SelectItem>
                <SelectItem value="bbvadebit">Bancomer Débito</SelectItem>
                <SelectItem value="bbvacredit">Bancomer Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          {!isLoading ? (
            <Button
              type="submit"
              disabled={!file || !bank}
              onClick={uploadFile}
            >
              Cargar documento
            </Button>
          ) : (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Cargando información
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
