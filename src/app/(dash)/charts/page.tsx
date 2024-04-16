import BarChart from "@/components/Charts/Bar";
import { Button } from "@/components/ui/button";
import { chartService } from "@/services/charts";
import dayjs from "dayjs";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TransactionByDate } from "@/components/Charts/TransactionByDate";
import { validateRequest } from "@/lib/auth";
import { generateFormatNumber } from "@/utils/generalHelper";
import { redirect } from "next/navigation";

export default async function Dashboards() {
  const { user } = await validateRequest()
  if (!user) return redirect("/login")
  const today = dayjs()
  const data = await chartService.dashboard(user.id, today.startOf('month').toDate(), today.toDate())
  const totalIncome = data.income.reduce((acc, curr) => acc + curr.value, 0)
  const totalOutcome = data.outcome.reduce((acc, curr) => acc + curr.value, 0)
  return (
    <div className="p-5">
      <p className="text-3xl">Dashboards</p>
      <Select>
        <SelectTrigger className="w-[180px] mt-5">
          <SelectValue placeholder="Selecciona un banco" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Selecciona que banco quires ver</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex gap-4 mt-5">
        <div className="w-1/3 h-96 card overflow-y-auto">
          <p className="text-center">Gastos por dia</p>
          <p className="text-sm text-center text-gray-500">Total gastado ${generateFormatNumber(totalOutcome)}</p>
          <TransactionByDate data={data.outcome} total={totalOutcome} />
        </div>
        <div className="w-1/3 h-96 card overflow-y-auto">
          <p className="text-center">Ingresos por dia</p>
          <p className="text-sm text-center text-gray-500">Total gastado ${generateFormatNumber(totalIncome)}</p>
          <TransactionByDate data={data.income} total={totalIncome} />
        </div>
        <div className="w-1/3 h-96 card">
          <p className="text-center">Gastos por categoria</p>
          <BarChart data={data.categories} />
        </div>
      </div>
    </div>
  );
}
