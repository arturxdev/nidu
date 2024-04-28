import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import { transactionService } from "@/services/transaction";
import dayjs from "dayjs";
import "dayjs/plugin/utc";
export default async function Home() {
  const { session, user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const startDate = dayjs().utc(true);
  const endDate = startDate.startOf("M");
  const banks = await transactionService.getBanks(
    user?.id,
    startDate.toDate(),
    endDate.toDate()
  );

  return (
    <main className="p-10">
      <p className="text-2xl font-bold mb-4">Tus transacciones</p>
      <TransactionTable token={session?.id} banks={banks} />
    </main>
  );
}
