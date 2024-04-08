import { lucia } from "@/lib/auth";
import connectMongo from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    await connectMongo()
    await lucia.deleteExpiredSessions()
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
