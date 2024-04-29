import { FilterSchema } from "@/entities/filter";
import { lucia } from "@/lib/auth";
import { logger } from "@/lib/logger";
import connectMongo from "@/lib/mongoose";
import { chartService } from "@/services/charts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const filter = FilterSchema.omit({ order: true, limit: true, skip: true })
      .required({ dateStart: true, dateEnd: true })
      .parse({
        dateStart: request.nextUrl.searchParams.get("dateStart"),
        dateEnd: request.nextUrl.searchParams.get("dateEnd"),
      });
    await connectMongo();
    const authorizationHeader = request.headers.get("Authorization");
    const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
    if (!sessionId) {
      return new Response(null, {
        status: 401,
      });
    }

    const { user } = await lucia.validateSession(sessionId);
    if (!user?.id) throw new Error("User not found");
    const resume = await chartService.resume(
      user.id,
      filter.dateStart ?? undefined,
      filter.dateEnd ?? undefined
    );
    return NextResponse.json(resume);
  } catch (error: any) {
    logger.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
