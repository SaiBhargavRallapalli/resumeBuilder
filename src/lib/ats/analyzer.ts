import type { ResumeDocument } from "@/lib/types/resume";

export interface ATSCheck {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
  tip: string;
}

export interface ATSAnalysis {
  score: number;
  checks: ATSCheck[];
  keywords: {
    matched: string[];
    missing: string[];
  };
  suggestions: string[];
}

function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const stopWords = new Set([
    "the", "and", "for", "with", "that", "this", "from", "have", "will",
    "your", "our", "are", "was", "been", "being", "their", "they", "them",
  ]);
  const freq = new Map<string, number>();
  for (const w of words) {
    if (stopWords.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([w]) => w);
}

export function analyzeATS(
  resume: ResumeDocument,
  jobDescription = ""
): ATSAnalysis {
  const { sections, visibility, templateId } = resume;
  const checks: ATSCheck[] = [];

  const hasName = sections.contact.fullName.trim().length > 1;
  checks.push({
    id: "name",
    label: "Full name present",
    passed: hasName,
    weight: 10,
    tip: "Add your full name at the top of your resume.",
  });

  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sections.contact.email);
  checks.push({
    id: "email",
    label: "Valid email address",
    passed: hasEmail,
    weight: 8,
    tip: "Include a professional email address.",
  });

  const hasPhone = sections.contact.phone.replace(/\D/g, "").length >= 10;
  checks.push({
    id: "phone",
    label: "Phone number included",
    passed: hasPhone,
    weight: 5,
    tip: "Add a phone number recruiters can reach you at.",
  });

  const summaryLen = sections.summary.trim().length;
  checks.push({
    id: "summary",
    label: "Professional summary (50–500 chars)",
    passed: summaryLen >= 50 && summaryLen <= 500,
    weight: 10,
    tip: "Write a 2–4 sentence summary highlighting your value proposition.",
  });

  const hasExperience =
    visibility.experience &&
    sections.experience.length > 0 &&
    sections.experience.some((e) => e.bullets.some((b) => b.trim().length > 20));
  checks.push({
    id: "experience",
    label: "Work experience with bullet points",
    passed: hasExperience,
    weight: 15,
    tip: "Add roles with quantified achievement bullets (numbers, %, $).",
  });

  const quantifiedBullets = sections.experience
    .flatMap((e) => e.bullets)
    .filter((b) => /\d+%?|\$[\d,]+|[\d,]+\+?/.test(b)).length;
  checks.push({
    id: "metrics",
    label: "Quantified achievements",
    passed: quantifiedBullets >= 2,
    weight: 12,
    tip: "Use metrics: 'Increased sales by 25%' beats 'Improved sales'.",
  });

  const skillCount = sections.skills.length;
  checks.push({
    id: "skills",
    label: "Skills section (6–20 skills)",
    passed: skillCount >= 6 && skillCount <= 25,
    weight: 10,
    tip: "List 8–15 relevant skills matching the job description.",
  });

  const atsTemplate = [
    "classic",
    "minimal",
    "professional",
    "compact",
    "single-column",
    "ivy-league",
    "polished",
  ].includes(templateId);
  checks.push({
    id: "template",
    label: "ATS-friendly template selected",
    passed: atsTemplate,
    weight: 8,
    tip: "Use Classic, Minimal, or Professional templates for best ATS parsing.",
  });

  const standardFont = ["inter", "arial", "georgia", "times"].includes(
    resume.style.fontFamily
  );
  checks.push({
    id: "font",
    label: "Standard readable font",
    passed: standardFont,
    weight: 5,
    tip: "Stick to Arial, Georgia, Times, or Inter for ATS compatibility.",
  });

  const hasEducation =
    visibility.education && sections.education.length > 0;
  checks.push({
    id: "education",
    label: "Education section filled",
    passed: hasEducation,
    weight: 7,
    tip: "Include your highest degree and institution.",
  });

  const bulletActionVerbs = sections.experience
    .flatMap((e) => e.bullets)
    .filter((b) =>
      /^(led|managed|developed|implemented|designed|created|improved|reduced|increased|built|launched|spearheaded|optimized|delivered|achieved)/i.test(
        b.trim()
      )
    ).length;
  checks.push({
    id: "verbs",
    label: "Strong action verbs in bullets",
    passed: bulletActionVerbs >= 2,
    weight: 10,
    tip: "Start bullets with verbs: Led, Built, Increased, Delivered.",
  });

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks
    .filter((c) => c.passed)
    .reduce((s, c) => s + c.weight, 0);
  let score = Math.round((earned / totalWeight) * 100);

  const jobKeywords = extractKeywords(jobDescription);
  const resumeText = [
    sections.summary,
    ...sections.experience.flatMap((e) => [
      e.position,
      e.company,
      ...e.bullets,
    ]),
    ...sections.skills,
    ...sections.education.map((e) => `${e.degree} ${e.field}`),
  ].join(" ");
  const resumeKeywords = new Set(extractKeywords(resumeText));

  const matched = jobKeywords.filter((k) => resumeKeywords.has(k));
  const missing = jobKeywords.filter((k) => !resumeKeywords.has(k)).slice(0, 15);

  if (jobDescription.trim()) {
    const keywordMatchRate =
      jobKeywords.length > 0 ? matched.length / jobKeywords.length : 0;
    score = Math.round(score * 0.7 + keywordMatchRate * 100 * 0.3);
  }

  const suggestions: string[] = [];
  for (const check of checks.filter((c) => !c.passed)) {
    suggestions.push(check.tip);
  }
  if (missing.length > 0 && jobDescription.trim()) {
    suggestions.push(
      `Add keywords from the job posting: ${missing.slice(0, 5).join(", ")}`
    );
  }
  if (score >= 85 && quantifiedBullets < 3) {
    suggestions.push(
      "Great ATS score! Add more numbers to stand out to human recruiters too."
    );
  }

  return {
    score: Math.min(100, score),
    checks,
    keywords: { matched, missing },
    suggestions: suggestions.slice(0, 6),
  };
}

export function enhanceBullet(bullet: string, role: string): string {
  const trimmed = bullet.trim();
  if (!trimmed) return trimmed;
  if (trimmed.length > 80) return trimmed;

  const starters = ["Led", "Developed", "Implemented", "Managed", "Delivered"];
  const hasVerb = starters.some((s) =>
    trimmed.toLowerCase().startsWith(s.toLowerCase())
  );
  let enhanced = trimmed;
  if (!hasVerb) {
    enhanced = `Delivered ${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
  }
  if (!/\d/.test(enhanced) && role.toLowerCase().includes("engineer")) {
    enhanced = enhanced.replace(/\.$/, "") + ", improving efficiency by 25%";
  }
  return enhanced;
}

export function generateSummary(role: string, years: number): string {
  const templates: Record<string, string> = {
    "Software Engineer": `Results-driven Software Engineer with ${years}+ years building scalable web applications. Expert in modern JavaScript frameworks and cloud technologies. Proven track record of leading projects that improve performance and deliver measurable business impact.`,
    "Product Manager": `Strategic Product Manager with ${years}+ years launching user-centric products. Skilled at cross-functional leadership, roadmap prioritization, and data-driven decision making. Consistently deliver features that drive engagement and revenue growth.`,
    default: `Motivated ${role} with ${years}+ years of professional experience. Strong communicator and problem-solver with a proven ability to deliver results in fast-paced environments. Committed to excellence and continuous improvement.`,
  };
  return templates[role] ?? templates.default;
}
