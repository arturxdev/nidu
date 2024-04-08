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

export function UpdateTransactionsFile() {
  return (
    <Dialog>
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
            <Input id="document" type="file" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bank">Selecciona tu banco</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue id="bank" placeholder="Banco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amex">AMEX</SelectItem>
                <SelectItem value="bancomer">Bancomer</SelectItem>
                <SelectItem value="santander">Santander</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Cargar documento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
