import { transactionService } from "@/services/transaction";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function TransactionTable() {
  const transactions = await transactionService.get();

  return (
    <div className="">
      <DataTable columns={columns} data={transactions.results} />
    </div>
  );
}
