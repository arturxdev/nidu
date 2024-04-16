import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { generateFormatNumber } from "@/utils/generalHelper"
type Data = {
  date: string
  value: number
}
type Props = {
  data: Data[]
  total: number
}
export function TransactionByDate(props: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{invoice.date}</TableCell>
            <TableCell className="text-right">${generateFormatNumber(invoice.value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-right">${generateFormatNumber(props.total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
