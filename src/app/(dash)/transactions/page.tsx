import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import "dayjs/plugin/utc";
export default async function Home() {
  const { session, user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  //const startDate = dayjs().utc(true);
  //const endDate = startDate.startOf("M");
  /*const banks = await transactionService.getBanks(
    user?.id,
    startDate.toDate(),
    endDate.toDate()
  );*/

  return (
    <main className="p-10">
      <TransactionTable token={session?.id} />
    </main>
  );
}
