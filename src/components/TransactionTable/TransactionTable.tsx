import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      description: "Pago Spotify",
      amount: 100,
      status: "pending",
      account: "amex",
      type: "expense",
      createdAt: String(new Date()),
    },
    {
      id: "7238ed52f",
      description: "Pago Netflix",
      amount: 200,
      status: "success",
      account: "amex",
      type: "expense",
      createdAt: String(new Date()),
    },
    {
      id: "7238ed52f",
      description: "Pagina web",
      amount: 4000,
      status: "success",
      account: "amex",
      type: "income",
      createdAt: String(new Date()),
    },
    // ...
  ];
}

export default async function TransactionTable() {
  const data = await getData();

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
