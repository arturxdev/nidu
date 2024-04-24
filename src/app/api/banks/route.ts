import { lucia } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import { transactionService } from "@/services/transaction";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    await connectMongo()
    const authorizationHeader = request.headers.get("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
    if (!sessionId) {
      return new Response(null, {
        status: 401
      });
    }
    const { user } = await lucia.validateSession(sessionId);
    if (!user?.id) throw new Error("User not found")
    const banks = await transactionService.getBanks(user.id)
    return NextResponse.json(banks, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

