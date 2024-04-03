import { transactionSchema } from "@/entities/transaccions";
import connectMongo from "@/lib/mongoose";
import { getTransactions, updateTransaction } from "@/services/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongo()
  const transactions = await getTransactions()
  return NextResponse.json(transactions)
}
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const transaction = transactionSchema.parse(data)
    await connectMongo()
    const transactions = await updateTransaction(transaction.id, transaction)
    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
