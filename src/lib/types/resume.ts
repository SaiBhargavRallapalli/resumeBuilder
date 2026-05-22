export type SectionId =
  | "contact"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "awards"
  | "languages";

export interface ContactInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  description: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export type TemplateId =
  | "classic"
  | "modern"
  | "professional"
  | "minimal"
  | "double-column"
  | "executive"
  | "compact"
  | "creative"
  | "single-column"
  | "ivy-league"
  | "polished"
  | "contemporary"
  | "elegant"
  | "timeline";

export type TemplateCategory =
  | "ats"
  | "modern"
  | "professional"
  | "creative"
  | "simple";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  category: TemplateCategory;
  atsScore: number;
  supportsPhoto: boolean;
  columns: 1 | 2;
  recommendedFor?: string[];
  tags?: string[];
  popular?: boolean;
}

export interface ResumeStyle {
  primaryColor: string;
  fontFamily: "inter" | "georgia" | "arial" | "times";
  fontSize: "small" | "medium" | "large";
  lineHeight: "compact" | "normal" | "relaxed";
  margin: "narrow" | "normal" | "wide";
}

export interface ResumeSections {
  contact: ContactInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
}

export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  awards: boolean;
  languages: boolean;
}

export interface ResumeDocument {
  id: string;
  title: string;
  templateId: TemplateId;
  style: ResumeStyle;
  sections: ResumeSections;
  visibility: SectionVisibility;
  updatedAt: string;
}

export const DEFAULT_CONTACT: ContactInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
};

export const DEFAULT_STYLE: ResumeStyle = {
  primaryColor: "#2563eb",
  fontFamily: "inter",
  fontSize: "medium",
  lineHeight: "normal",
  margin: "normal",
};

export const DEFAULT_VISIBILITY: SectionVisibility = {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: false,
  certifications: false,
  awards: false,
  languages: false,
};

export function createEmptyResume(title = "My Resume"): ResumeDocument {
  return {
    id: crypto.randomUUID(),
    title,
    templateId: "classic",
    style: { ...DEFAULT_STYLE },
    sections: {
      contact: { ...DEFAULT_CONTACT },
      summary: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      awards: [],
      languages: [],
    },
    visibility: { ...DEFAULT_VISIBILITY },
    updatedAt: new Date().toISOString(),
  };
}

export function createSampleResume(): ResumeDocument {
  const resume = createEmptyResume("Software Engineer Resume");
  resume.templateId = "modern";
  resume.sections.contact = {
    fullName: "Alex Morgan",
    jobTitle: "Senior Software Engineer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
  };
  resume.sections.summary =
    "Results-driven software engineer with 8+ years building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of leading teams and delivering products that increase revenue by 30%+.";
  resume.sections.experience = [
    {
      id: crypto.randomUUID(),
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      bullets: [
        "Led migration to microservices architecture, reducing deployment time by 60% and improving system reliability to 99.9% uptime",
        "Mentored team of 5 junior developers, improving code review throughput by 40%",
        "Implemented CI/CD pipeline using GitHub Actions, cutting release cycles from 2 weeks to 2 days",
      ],
    },
    {
      id: crypto.randomUUID(),
      company: "StartupXYZ",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      bullets: [
        "Built customer-facing dashboard serving 50K+ daily active users using React and TypeScript",
        "Optimized database queries reducing page load time by 45%",
        "Collaborated with product team to ship 12 major features in 18 months",
      ],
    },
  ];
  resume.sections.education = [
    {
      id: crypto.randomUUID(),
      institution: "University of California, Berkeley",
      degree: "B.S.",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2018",
      gpa: "3.8",
      bullets: [],
    },
  ];
  resume.sections.skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AWS",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Agile/Scrum",
  ];
  resume.visibility.projects = true;
  resume.sections.projects = [
    {
      id: crypto.randomUUID(),
      name: "Open Source CLI Tool",
      url: "github.com/alexmorgan/cli-tool",
      description: "Developer productivity tool",
      bullets: [
        "2,500+ GitHub stars with 50+ contributors",
        "Featured in JavaScript Weekly newsletter",
      ],
    },
  ];
  return resume;
}
