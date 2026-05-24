import { NextResponse } from "next/server";
import { handleAiRequest } from "@/lib/ai/handle-ai-request";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleAiRequest(body);

    if ("error" in result && result.status === 400) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
