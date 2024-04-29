"use client";
import { useGetBanks } from "@/services/hooks/useGetBanks";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetTransactions } from "@/services/hooks/useGetTransactions";
import { DateRangePicker } from "../nidu/DateRangePicker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";

type TransactionTableProps = {
  token: string;
};

export default function TransactionTable({ token }: TransactionTableProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { transactions, isLoading, revalidateTransactions } =
    useGetTransactions(
      token,
      150,
      0,
      "desc",
      date?.from ? format(date?.from, "yyyy-MM-dd") : "",
      date?.to
        ? format(date?.to, "yyyy-MM-dd")
        : date?.from
        ? format(date?.from, "yyyy-MM-dd")
        : ""
    );

  const { banks, isErrorBanks, isLoadingBanks, revalidateBanks } = useGetBanks(
    token,
    date?.from ? format(date?.from, "yyyy-MM-dd") : "",
    date?.to
      ? format(date?.to, "yyyy-MM-dd")
      : date?.from
      ? format(date?.from, "yyyy-MM-dd")
      : ""
  );

  const banksWithFormat = banks?.map((bank: any) => bank._id.bank);

  const handleOnChangeDate = (e: any) => {
    revalidateTransactions();
    revalidateBanks();
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="">
      <div className="text-foreground flex justify-between">
        <p className="text-2xl font-bold mb-4">Tus transacciones</p>
        <div className="flex gap-2">
          <DateRangePicker
            date={date}
            setDate={setDate}
            handleOnChangeDate={handleOnChangeDate}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={transactions?.results}
        banks={banksWithFormat}
      />
    </div>
  );
}
