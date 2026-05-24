import { enhanceBullet, generateSummary } from "@/lib/ats/analyzer";

type AiAction = "generate-summary" | "enhance-bullet" | "optimize-keywords";

interface AiOptions {
  role?: string;
  text?: string;
  years?: number;
  jobDescription?: string;
}

export async function callAi(action: AiAction, options: AiOptions): Promise<string> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...options }),
    });
    if (!res.ok) throw new Error("API error");
    const data = (await res.json()) as { result?: string };
    if (data.result) return data.result;
  } catch {
    // fall through to local
  }

  switch (action) {
    case "generate-summary":
      return generateSummary(options.role ?? "Professional", options.years ?? 5);
    case "enhance-bullet":
      return enhanceBullet(options.text ?? "", options.role ?? "");
    case "optimize-keywords":
      return (options.jobDescription ?? "").split(/\s+/).slice(0, 5).join(", ");
    default:
      return "";
  }
}
