import { authSchema } from "@/entities/auth";
import { logger } from "@/lib/logger";
import connectMongo from "@/lib/mongoose";
import { loginAndReturnToken } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    logger.info("POST /login")
    const data = await request.json()
    const auth = authSchema.parse(data)
    await connectMongo()
    const transactions = await loginAndReturnToken(auth.username, auth.password)
    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

