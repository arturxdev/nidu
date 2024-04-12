"use client";
import Image from "next/image";
import styles from "./add-report.module.scss";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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

type AddReportProps = {
  token: string;
};

export default function AddReport({ token }: AddReportProps) {
  const router = useRouter();
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
    <div className="w-full min-h-screen px-4 pt-4 ">
      <div className="flex items-center mb-6 gap-2">
        <div className={styles.backButton} onClick={() => router.back()}>
          <ChevronLeft />
        </div>
        <p className="text-lg ">Agregar reporte bancario</p>
      </div>

      <div className="flex">
        <div className={styles.stepsSection}>
          <p className={styles.title}>
            ¿Cómo subir tus transacciones desde un reporte bancario?
          </p>

          <div className="flex flex-col	gap-8">
            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step1.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>

              <div className={styles.bulletPoint}>1</div>
              <p className="text-sm	">
                Selecciona el banco del que deseas subir el reporte.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step2.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>2</div>
              <p className="text-sm	">
                Ingresa al portal web de tu banco seleccionado y consulta el
                detalle de la cuenta que quieres subir, puede ser crédito o
                débito.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step3.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>3</div>
              <p className="text-sm	">
                Identifica la opción que te permite descargar tu reporte y elige
                alguno de estos formatos: csv, xml, xls, xlsx.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step4.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>4</div>
              <p className="text-sm	">
                Nombra la cuenta que quieres guardar en tu Nidu y a la que
                podrás agregar futuros reportes.
              </p>
            </div>

            <div className="flex items-center	gap-2">
              <div className={styles.imageContainer}>
                <Image
                  src={"/img/step5.png"}
                  width={56}
                  height={40}
                  alt="step1"
                />
              </div>
              <div className={styles.bulletPoint}>5</div>
              <p className="text-sm	">
                Sube el archivo que acabas de descargar. Si quieres subir más de
                una cuenta del mismo banco, tendrás que hacerlo una por una.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="bank">Banco origen</Label>
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
              <Button
                type="submit"
                disabled={!file || !bank}
                onClick={uploadFile}
              >
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
      </div>
    </div>
  );
}
