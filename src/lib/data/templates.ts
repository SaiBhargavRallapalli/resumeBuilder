import type { ResumeStyle, TemplateId, TemplateMeta } from "@/lib/types/resume";

export type TemplateLayout =
  | "classic"
  | "single-column"
  | "minimal"
  | "modern"
  | "professional"
  | "ivy-league"
  | "double-column"
  | "contemporary"
  | "elegant"
  | "creative"
  | "executive"
  | "compact"
  | "timeline"
  | "polished";

export interface TemplateDefinition extends TemplateMeta {
  layout: TemplateLayout;
  defaultStyle: Partial<ResumeStyle>;
  recommendedFor: string[];
  tags: string[];
  popular?: boolean;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional single-column layout. The safest choice for corporate, finance, and government applications.",
    category: "ats",
    atsScore: 98,
    supportsPhoto: false,
    columns: 1,
    layout: "classic",
    defaultStyle: { primaryColor: "#1e293b", fontFamily: "times", fontSize: "medium" },
    recommendedFor: ["Finance", "Law", "Government", "Academia"],
    tags: ["ATS", "Traditional", "One page"],
    popular: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Centered header with clean dividers. Maximum readability for ATS parsers and recruiters.",
    category: "ats",
    atsScore: 99,
    supportsPhoto: false,
    columns: 1,
    layout: "minimal",
    defaultStyle: { primaryColor: "#334155", fontFamily: "arial", fontSize: "medium", margin: "normal" },
    recommendedFor: ["Any industry", "Career changers", "Remote roles"],
    tags: ["ATS", "Simple", "Clean"],
    popular: true,
  },
  {
    id: "single-column",
    name: "Single Column",
    description:
      "Clarity-first design for students and graduates. Emphasizes education and skills upfront.",
    category: "ats",
    atsScore: 97,
    supportsPhoto: false,
    columns: 1,
    layout: "single-column",
    defaultStyle: { primaryColor: "#2563eb", fontFamily: "arial", fontSize: "medium" },
    recommendedFor: ["Students", "Interns", "Entry-level", "Freshers"],
    tags: ["ATS", "Student", "Graduate"],
  },
  {
    id: "ivy-league",
    name: "Ivy League",
    description:
      "Harvard-inspired refined design. Ideal for graduates, academics, and consulting applicants.",
    category: "professional",
    atsScore: 96,
    supportsPhoto: false,
    columns: 1,
    layout: "ivy-league",
    defaultStyle: { primaryColor: "#7f1d1d", fontFamily: "georgia", fontSize: "medium", margin: "wide" },
    recommendedFor: ["Consulting", "MBA", "Academia", "Banking"],
    tags: ["Professional", "Conservative"],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "Polished layout with strong section hierarchy for business development and client-facing roles.",
    category: "professional",
    atsScore: 95,
    supportsPhoto: false,
    columns: 1,
    layout: "professional",
    defaultStyle: { primaryColor: "#1d4ed8", fontFamily: "georgia", fontSize: "medium" },
    recommendedFor: ["Sales", "Business", "Operations", "HR"],
    tags: ["Corporate", "Business"],
    popular: true,
  },
  {
    id: "polished",
    name: "Polished",
    description:
      "Refined design with accent rules and structured sections for senior professionals.",
    category: "professional",
    atsScore: 94,
    supportsPhoto: false,
    columns: 1,
    layout: "polished",
    defaultStyle: { primaryColor: "#0f766e", fontFamily: "georgia", fontSize: "medium" },
    recommendedFor: ["Management", "Consulting", "Healthcare admin"],
    tags: ["Senior", "Executive track"],
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "Contemporary accent bar and typography for tech, marketing, and startup roles.",
    category: "modern",
    atsScore: 92,
    supportsPhoto: false,
    columns: 1,
    layout: "modern",
    defaultStyle: { primaryColor: "#2563eb", fontFamily: "inter", fontSize: "medium" },
    recommendedFor: ["Software Engineering", "Product", "Marketing", "Startups"],
    tags: ["Tech", "Contemporary"],
    popular: true,
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description:
      "Bold two-tone header with sidebar-ready structure for customer-facing and sales roles.",
    category: "modern",
    atsScore: 90,
    supportsPhoto: true,
    columns: 2,
    layout: "contemporary",
    defaultStyle: { primaryColor: "#059669", fontFamily: "inter", fontSize: "medium" },
    recommendedFor: ["Sales", "Marketing", "Customer success"],
    tags: ["Two column", "Bold"],
  },
  {
    id: "double-column",
    name: "Double Column",
    description:
      "Skills sidebar with experience body — ATS-tested layout balancing expertise and achievements.",
    category: "modern",
    atsScore: 90,
    supportsPhoto: false,
    columns: 2,
    layout: "double-column",
    defaultStyle: { primaryColor: "#2563eb", fontFamily: "inter", fontSize: "small" },
    recommendedFor: ["Engineering", "Project management", "Analytics"],
    tags: ["Two column", "Skills sidebar"],
    popular: true,
  },
  {
    id: "elegant",
    name: "Elegant",
    description:
      "Sleek two-column design highlighting achievements. Suited for senior professionals.",
    category: "professional",
    atsScore: 89,
    supportsPhoto: false,
    columns: 2,
    layout: "elegant",
    defaultStyle: { primaryColor: "#4c1d95", fontFamily: "georgia", fontSize: "medium", margin: "wide" },
    recommendedFor: ["Senior IC", "Directors", "Specialists"],
    tags: ["Elegant", "Two column"],
  },
  {
    id: "timeline",
    name: "Timeline",
    description:
      "Visual career progression timeline emphasizing steady growth and long-term achievements.",
    category: "modern",
    atsScore: 88,
    supportsPhoto: false,
    columns: 1,
    layout: "timeline",
    defaultStyle: { primaryColor: "#0891b2", fontFamily: "inter", fontSize: "medium" },
    recommendedFor: ["Experienced professionals", "Career progression stories"],
    tags: ["Timeline", "Experience-focused"],
  },
  {
    id: "compact",
    name: "Compact",
    description:
      "Tighter margins fitting more detail on one page. Perfect for strict one-page requirements.",
    category: "simple",
    atsScore: 97,
    supportsPhoto: false,
    columns: 1,
    layout: "compact",
    defaultStyle: {
      primaryColor: "#1e293b",
      fontFamily: "arial",
      fontSize: "small",
      margin: "narrow",
      lineHeight: "compact",
    },
    recommendedFor: ["Early career", "Graduates", "One-page limits"],
    tags: ["Compact", "One page", "ATS"],
  },
  {
    id: "executive",
    name: "Executive",
    description:
      "Bold colored header for C-suite and senior leaders whose credentials speak for themselves.",
    category: "professional",
    atsScore: 88,
    supportsPhoto: false,
    columns: 1,
    layout: "executive",
    defaultStyle: { primaryColor: "#1e3a5f", fontFamily: "georgia", fontSize: "medium", margin: "normal" },
    recommendedFor: ["C-suite", "VP", "Director", "Executive"],
    tags: ["Executive", "Leadership"],
  },
  {
    id: "creative",
    name: "Creative",
    description:
      "Visually striking layout for designers, creatives, and portfolio-driven roles.",
    category: "creative",
    atsScore: 75,
    supportsPhoto: true,
    columns: 2,
    layout: "creative",
    defaultStyle: { primaryColor: "#7c3aed", fontFamily: "inter", fontSize: "medium" },
    recommendedFor: ["Design", "UX", "Creative", "Media"],
    tags: ["Creative", "Portfolio"],
  },
];

export const TEMPLATE_MAP = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t])
) as Record<TemplateId, TemplateDefinition>;

export const TEMPLATE_CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "ats", label: "ATS-Friendly" },
  { id: "modern", label: "Modern" },
  { id: "professional", label: "Professional" },
  { id: "simple", label: "Simple" },
  { id: "creative", label: "Creative" },
] as const;

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATE_MAP[id] ?? TEMPLATE_MAP.classic;
}

export function getTemplateLayout(id: TemplateId): TemplateLayout {
  return getTemplate(id).layout;
}

export function applyTemplateDefaults(
  templateId: TemplateId,
  style: ResumeStyle
): ResumeStyle {
  const meta = getTemplate(templateId);
  return { ...style, ...meta.defaultStyle };
}

export const POPULAR_TEMPLATES = TEMPLATES.filter((t) => t.popular);
export const ATS_TEMPLATES = TEMPLATES.filter((t) => t.atsScore >= 95);
