import TransactionTable from "@/components/TransactionTable";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { transactionService } from "@/services/transaction";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const transactions = await transactionService.get(40, 0, 'desc', user.id)
  return (
    <main className="text-center p-10">
      <form action={logout}>
        <button className="btn btn-accent">Logout</button>
      </form>
      <p className="text-4xl font-bold">Tus cargos</p>
      <TransactionTable transactions={transactions.results} />
    </main>
  );
}
async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/login");
}
interface ActionResult {
  error: string;
}
