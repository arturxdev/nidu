import { transactionService } from "@/services/transaction";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { validateRequest } from "@/lib/auth";

export default async function TransactionTable() {
  const { user } = await validateRequest();
  if (!user) return null
  const transactions = await transactionService.get(150, 0, 'desc', user.id)
  const banks = await transactionService.getBanks(user.id)
  return (
    <div className="">
      <DataTable columns={columns} data={transactions.results} banks={banks} />
    </div>
  );
}
