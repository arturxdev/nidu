"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetTransactions } from "@/services/hooks/useGetTransactions";

type TransactionTableProps = {
  token: string;
  banks: any;
};

export default function TransactionTable({
  token,
  banks,
}: TransactionTableProps) {
  const { transactions, isLoading } = useGetTransactions(token, 150, 0, "desc");

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="">
      <DataTable columns={columns} data={transactions?.results} banks={banks} />
    </div>
  );
}
