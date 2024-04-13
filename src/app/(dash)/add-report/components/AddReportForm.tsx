"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import styles from "../add-report.module.scss";

type AddReportForm = {
  token: string;
};

const AddReportForm = ({ token }: AddReportForm) => {
  const [file, setFile] = useState<any>();
  const [bank, setBank] = useState<string>();
  const [bankName, setBankName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    }
  };

  return (
    <div className={styles.formSection}>
      <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="bank">Banco origen</Label>
          <Select onValueChange={(value) => setBank(value)} defaultValue={bank}>
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

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Nombre de la cuenta</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nombre"
            onChange={(e) => setBankName(e.target.value)}
            defaultValue={bankName}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="document">Documento</Label>
          <Input
            id="document"
            type="file"
            onChange={(event) => setFile(event?.target?.files?.[0])}
          />
        </div>
      </div>
      <div>
        {!isLoading ? (
          <Button type="submit" disabled={!file || !bank} onClick={uploadFile}>
            Subir reporte
          </Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Cargando información
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddReportForm;
