import { FilterSchema } from "@/entities/filter";
import { transactionSchema } from "@/entities/transaccions";
import { lucia } from "@/lib/auth";
import { logger } from "@/lib/logger";
import connectMongo from "@/lib/mongoose";
import { transactionService } from "@/services/transaction";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {

    const filter = FilterSchema.parse({
      limit: request.nextUrl.searchParams.get('limit'),
      skip: request.nextUrl.searchParams.get('page'),
      order: request.nextUrl.searchParams.get('order') ?? 'desc'
    })
    await connectMongo();
    const authorizationHeader = request.headers.get("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
    if (!sessionId) {
      return new Response(null, {
        status: 401
      });
    }

    const { user } = await lucia.validateSession(sessionId);
    if (!user?.id) throw new Error("User not found")
    const transactions = await transactionService.get(filter, user.id)
    return NextResponse.json(transactions)
  } catch (error: any) {
    logger.error(error)
    return NextResponse.json({ error: error.message }, { status: 400 })

  }
}
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const transaction = transactionSchema.parse(data)
    await connectMongo()
    const transactions = await transactionService.update(transaction.id, transaction)
    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
