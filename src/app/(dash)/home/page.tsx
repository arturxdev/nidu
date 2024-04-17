import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeDashboard from "./components/HomeDashboard";

export default async function Home() {
  const { session, user } = await validateRequest();
  if (!user) return redirect("/login");

  return <HomeDashboard token={session?.id} />;
}
