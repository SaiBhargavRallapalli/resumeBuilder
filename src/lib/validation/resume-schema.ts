import { z } from "zod";

const templateIds = [
  "classic", "modern", "professional", "minimal", "double-column",
  "executive", "compact", "creative", "single-column", "ivy-league",
  "polished", "contemporary", "elegant", "timeline",
] as const;

export const resumeDocumentSchema = z.object({
  id: z.string().min(1),
  title: z.string().max(200).default("My Resume"),
  templateId: z.enum(templateIds).default("classic"),
  style: z.object({
    primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#2563eb"),
    fontFamily: z.enum(["inter", "georgia", "arial", "times"]).default("arial"),
    fontSize: z.enum(["small", "medium", "large"]).default("medium"),
    lineHeight: z.enum(["compact", "normal", "relaxed"]).default("normal"),
    margin: z.enum(["narrow", "normal", "wide"]).default("normal"),
  }),
  sections: z.object({
    contact: z.object({
      fullName: z.string().max(200).default(""),
      jobTitle: z.string().max(200).default(""),
      email: z.string().max(200).default(""),
      phone: z.string().max(50).default(""),
      location: z.string().max(200).default(""),
      website: z.string().max(500).default(""),
      linkedin: z.string().max(500).default(""),
    }),
    summary: z.string().max(2000).default(""),
    experience: z.array(z.object({
      id: z.string(),
      company: z.string().max(200),
      position: z.string().max(200),
      location: z.string().max(200).default(""),
      startDate: z.string().max(20).default(""),
      endDate: z.string().max(20).default(""),
      current: z.boolean().default(false),
      bullets: z.array(z.string().max(1000)).default([]),
    })).max(30).default([]),
    education: z.array(z.object({
      id: z.string(),
      institution: z.string().max(200),
      degree: z.string().max(100).default(""),
      field: z.string().max(200).default(""),
      location: z.string().max(200).default(""),
      startDate: z.string().max(20).default(""),
      endDate: z.string().max(20).default(""),
      gpa: z.string().max(20).default(""),
      bullets: z.array(z.string().max(500)).default([]),
    })).max(20).default([]),
    skills: z.array(z.string().max(100)).max(50).default([]),
    projects: z.array(z.object({
      id: z.string(),
      name: z.string().max(200),
      url: z.string().max(500).default(""),
      description: z.string().max(1000).default(""),
      bullets: z.array(z.string().max(1000)).default([]),
    })).max(20).default([]),
    certifications: z.array(z.object({
      id: z.string(),
      name: z.string().max(200),
      issuer: z.string().max(200).default(""),
      date: z.string().max(20).default(""),
    })).max(20).default([]),
    awards: z.array(z.object({
      id: z.string(),
      title: z.string().max(200),
      issuer: z.string().max(200).default(""),
      date: z.string().max(20).default(""),
    })).max(20).default([]),
    languages: z.array(z.object({
      id: z.string(),
      name: z.string().max(100),
      proficiency: z.string().max(100).default("Professional"),
    })).max(20).default([]),
  }),
  visibility: z.object({
    summary: z.boolean().default(true),
    experience: z.boolean().default(true),
    education: z.boolean().default(true),
    skills: z.boolean().default(true),
    projects: z.boolean().default(false),
    certifications: z.boolean().default(false),
    awards: z.boolean().default(false),
    languages: z.boolean().default(false),
  }),
  updatedAt: z.string().default(() => new Date().toISOString()),
});

export type ValidatedResumeDocument = z.infer<typeof resumeDocumentSchema>;

export function parseResumeImport(data: unknown): ValidatedResumeDocument {
  return resumeDocumentSchema.parse(data);
}

export function safeParseResumeImport(data: unknown) {
  return resumeDocumentSchema.safeParse(data);
}

export const aiRequestSchema = z.object({
  action: z.enum(["generate-summary", "enhance-bullet", "optimize-keywords"]),
  role: z.string().max(200).optional(),
  text: z.string().max(5000).optional(),
  jobDescription: z.string().max(10000).optional(),
  years: z.number().min(0).max(50).optional(),
});
