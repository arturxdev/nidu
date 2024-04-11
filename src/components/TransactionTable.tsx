"use client";
import { Transaction } from "@/entities/transaccions";
import { logger } from "@/lib/logger";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type Props = {
  transactions: Transaction[]
}
export default function TransactionTable(props: Props) {
  const updateCategory = async (transaction: Transaction) => {
    try {
      const res = await fetch(`/api/transaction`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
        headers: {
          contentType: 'application/json'
        },
        next: { tags: ['transactions'] }
      })
      if (res.status !== 200) throw new Error('Fallo al actualizar')
      const data = await res.json()
    } catch (error) {
      logger.error(error)
    }
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Tarjeta</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Referencia</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.transactions.map((transaction) => (
            <TableRow className="text-left" key={transaction.id}>
              <TableCell>{dayjs(transaction.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.card}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Select defaultValue={transaction.category} onValueChange={(e) => { transaction.category = e }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="savings">Ahorro</SelectItem>
                      <SelectItem value="food">Comida</SelectItem>
                      <SelectItem value="subscription">Subscripcion</SelectItem>
                      <SelectItem value="free">Libre</SelectItem>
                      <SelectItem value="Transport">Transporte</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input placeholder="Agrega una descripcion" defaultValue={transaction.descriptionUser} onChange={(e) => { transaction.descriptionUser = e.target.value }} />
              </TableCell>
              <TableCell>
                <Button onClick={() => { updateCategory(transaction) }}>Guardar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
