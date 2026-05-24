import type { ResumeDocument, TemplateId } from "@/lib/types/resume";
import { DEFAULT_STYLE, DEFAULT_VISIBILITY } from "@/lib/types/resume";
import { applyTemplateDefaults } from "@/lib/data/templates";

/** Static sample used for template card previews — no random IDs. */
const PREVIEW_SECTIONS: ResumeDocument["sections"] = {
  contact: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Software Engineer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
  },
  summary:
    "Results-driven engineer with 8+ years building scalable products. Expert in React, Node.js, and cloud architecture.",
  experience: [
    {
      id: "preview-exp-1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      bullets: [
        "Led migration to microservices, improving uptime to 99.9%",
        "Mentored team of 5 developers and shipped CI/CD pipeline",
      ],
    },
    {
      id: "preview-exp-2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      bullets: [
        "Built dashboard serving 50K+ daily active users",
        "Optimized queries reducing load time by 45%",
      ],
    },
  ],
  education: [
    {
      id: "preview-edu-1",
      institution: "UC Berkeley",
      degree: "B.S.",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.8",
      bullets: [],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "PostgreSQL",
    "Docker",
    "GraphQL",
  ],
  projects: [],
  certifications: [
    {
      id: "preview-cert-1",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-06",
    },
  ],
  awards: [],
  languages: [
    { id: "preview-lang-1", name: "English", proficiency: "Native" },
    { id: "preview-lang-2", name: "Spanish", proficiency: "Professional" },
  ],
};

const PREVIEW_VISIBILITY: ResumeDocument["visibility"] = {
  ...DEFAULT_VISIBILITY,
  projects: false,
  awards: false,
};

const previewCache = new Map<TemplateId, ResumeDocument>();

export function getTemplatePreviewResume(templateId: TemplateId): ResumeDocument {
  const cached = previewCache.get(templateId);
  if (cached) return cached;

  const resume: ResumeDocument = {
    id: "template-preview",
    title: "Preview",
    templateId,
    style: applyTemplateDefaults(templateId, { ...DEFAULT_STYLE }),
    sections: PREVIEW_SECTIONS,
    visibility: PREVIEW_VISIBILITY,
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  previewCache.set(templateId, resume);
  return resume;
}
