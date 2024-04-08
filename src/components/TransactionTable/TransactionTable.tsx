import { getTransactions } from "@/services/transaction";
import { columns } from "./columns";
import { DataTable } from "./data-table";


export default async function TransactionTable() {

  const transactions = await getTransactions()

  return (
    <div className="">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
