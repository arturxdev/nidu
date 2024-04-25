
import { lucia } from "@/lib/auth";
import { logger } from "@/lib/logger";
import connectMongo from "@/lib/mongoose";
import { csvService } from "@/services/files";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const authorizationHeader = request.headers.get("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
    if (!sessionId) {
      return new Response(null, {
        status: 401
      });
    }

    const { user } = await lucia.validateSession(sessionId);
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
      throw new Error("File not found")
    }
    if (!user?.id) throw new Error("User not found")
    await csvService.banamex.debit(user.id, file)
    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    logger.error(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}


