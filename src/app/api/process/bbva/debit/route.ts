import { processBBVADebit } from "@/services/files/bvva/debit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
      throw new Error("File not found")
    }
    const transactions = await processBBVADebit("1", file)
    return NextResponse.json(transactions, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
