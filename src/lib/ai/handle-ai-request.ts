import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { enhanceBullet, generateSummary } from "@/lib/ats/analyzer";
import { aiRequestSchema } from "@/lib/validation/resume-schema";

function getModel() {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) return null;
  const openai = createOpenAI({ apiKey });
  return openai("gpt-4o-mini");
}

export async function handleAiRequest(body: unknown) {
  const parsed = aiRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { error: "Invalid request", status: 400 as const };
  }

  const { action, role, text, jobDescription, years } = parsed.data;
  const model = getModel();

  if (!model) {
    return { fallback: true, result: localFallback(action, { role, text, years, jobDescription }) };
  }

  try {
    const prompts: Record<string, string> = {
      "generate-summary": `Write a professional resume summary (2-4 sentences, under 500 characters) for a ${role ?? "professional"} with ${years ?? 5}+ years experience. Use strong action language and be ATS-friendly. Return only the summary text.`,
      "enhance-bullet": `Improve this resume bullet point to be ATS-friendly with a strong action verb and a metric if plausible. Return only the bullet text:\n${text ?? ""}`,
      "optimize-keywords": `Given this job description, suggest 5 missing keywords to add to a resume. Return comma-separated keywords only:\n${jobDescription ?? ""}`,
    };

    const { text: result } = await generateText({
      model,
      prompt: prompts[action],
      maxOutputTokens: 300,
    });

    return { fallback: false, result: result.trim() };
  } catch {
    return { fallback: true, result: localFallback(action, { role, text, years, jobDescription }) };
  }
}

function localFallback(
  action: string,
  ctx: { role?: string; text?: string; years?: number; jobDescription?: string }
): string {
  switch (action) {
    case "generate-summary":
      return generateSummary(ctx.role ?? "Professional", ctx.years ?? 5);
    case "enhance-bullet":
      return enhanceBullet(ctx.text ?? "", ctx.role ?? "");
    case "optimize-keywords":
      return (ctx.jobDescription ?? "").split(/\s+/).slice(0, 5).join(", ");
    default:
      return "";
  }
}
