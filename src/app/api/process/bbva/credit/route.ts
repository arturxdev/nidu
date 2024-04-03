import { lucia } from "@/lib/auth";
import { processBBVACredit } from "@/services/files/bvva/credit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
    if (!sessionId) {
      return new Response(null, {
        status: 401
      });
    }

    const { user } = await lucia.validateSession(sessionId);
    console.log(user)
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
      throw new Error("File not found")
    }
    if (!user?.id) throw new Error("User not found")
    await processBBVACredit(user.id, file)
    return NextResponse.json(null, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}


