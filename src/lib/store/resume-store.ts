"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createEmptyResume,
  createSampleResume,
  type ResumeDocument,
  type ResumeStyle,
  type SectionVisibility,
  type TemplateId,
  type ContactInfo,
  type ExperienceItem,
  type EducationItem,
  type ProjectItem,
  type CertificationItem,
  type AwardItem,
  type LanguageItem,
} from "@/lib/types/resume";

interface ResumeStore {
  resumes: ResumeDocument[];
  activeResumeId: string | null;
  jobDescription: string;

  getActiveResume: () => ResumeDocument | null;
  createResume: (title?: string, sample?: boolean) => string;
  duplicateResume: (id: string) => string;
  deleteResume: (id: string) => void;
  setActiveResume: (id: string) => void;
  updateResume: (id: string, patch: Partial<ResumeDocument>) => void;
  setTemplate: (id: string, templateId: TemplateId) => void;
  setStyle: (id: string, style: Partial<ResumeStyle>) => void;
  setContact: (id: string, contact: Partial<ContactInfo>) => void;
  setSummary: (id: string, summary: string) => void;
  setVisibility: (id: string, visibility: Partial<SectionVisibility>) => void;
  setSkills: (id: string, skills: string[]) => void;
  setJobDescription: (jd: string) => void;

  addExperience: (id: string, item?: Partial<ExperienceItem>) => void;
  updateExperience: (id: string, itemId: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string, itemId: string) => void;

  addEducation: (id: string, item?: Partial<EducationItem>) => void;
  updateEducation: (id: string, itemId: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string, itemId: string) => void;

  addProject: (id: string, item?: Partial<ProjectItem>) => void;
  updateProject: (id: string, itemId: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string, itemId: string) => void;

  addCertification: (id: string, item?: Partial<CertificationItem>) => void;
  removeCertification: (id: string, itemId: string) => void;

  addAward: (id: string, item?: Partial<AwardItem>) => void;
  removeAward: (id: string, itemId: string) => void;

  addLanguage: (id: string, item?: Partial<LanguageItem>) => void;
  removeLanguage: (id: string, itemId: string) => void;

  importResume: (data: ResumeDocument) => void;
}

function patchResume(
  resumes: ResumeDocument[],
  id: string,
  updater: (r: ResumeDocument) => ResumeDocument
): ResumeDocument[] {
  return resumes.map((r) =>
    r.id === id
      ? { ...updater(r), updatedAt: new Date().toISOString() }
      : r
  );
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: null,
      jobDescription: "",

      getActiveResume: () => {
        const { resumes, activeResumeId } = get();
        return resumes.find((r) => r.id === activeResumeId) ?? null;
      },

      createResume: (title, sample) => {
        const resume = sample ? createSampleResume() : createEmptyResume(title);
        set((s) => ({
          resumes: [...s.resumes, resume],
          activeResumeId: resume.id,
        }));
        return resume.id;
      },

      duplicateResume: (id) => {
        const source = get().resumes.find((r) => r.id === id);
        if (!source) return "";
        const copy: ResumeDocument = {
          ...JSON.parse(JSON.stringify(source)),
          id: crypto.randomUUID(),
          title: `${source.title} (Copy)`,
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({
          resumes: [...s.resumes, copy],
          activeResumeId: copy.id,
        }));
        return copy.id;
      },

      deleteResume: (id) => {
        set((s) => {
          const resumes = s.resumes.filter((r) => r.id !== id);
          const activeResumeId =
            s.activeResumeId === id
              ? (resumes[0]?.id ?? null)
              : s.activeResumeId;
          return { resumes, activeResumeId };
        });
      },

      setActiveResume: (id) => set({ activeResumeId: id }),

      updateResume: (id, patch) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({ ...r, ...patch })),
        })),

      setTemplate: (id, templateId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({ ...r, templateId })),
        })),

      setStyle: (id, style) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            style: { ...r.style, ...style },
          })),
        })),

      setContact: (id, contact) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              contact: { ...r.sections.contact, ...contact },
            },
          })),
        })),

      setSummary: (id, summary) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: { ...r.sections, summary },
          })),
        })),

      setVisibility: (id, visibility) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            visibility: { ...r.visibility, ...visibility },
          })),
        })),

      setSkills: (id, skills) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: { ...r.sections, skills },
          })),
        })),

      setJobDescription: (jd) => set({ jobDescription: jd }),

      addExperience: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              experience: [
                ...r.sections.experience,
                {
                  id: crypto.randomUUID(),
                  company: "",
                  position: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  bullets: [""],
                  ...item,
                },
              ],
            },
          })),
        })),

      updateExperience: (id, itemId, patch) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              experience: r.sections.experience.map((e) =>
                e.id === itemId ? { ...e, ...patch } : e
              ),
            },
          })),
        })),

      removeExperience: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              experience: r.sections.experience.filter((e) => e.id !== itemId),
            },
          })),
        })),

      addEducation: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              education: [
                ...r.sections.education,
                {
                  id: crypto.randomUUID(),
                  institution: "",
                  degree: "",
                  field: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  gpa: "",
                  bullets: [],
                  ...item,
                },
              ],
            },
          })),
        })),

      updateEducation: (id, itemId, patch) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              education: r.sections.education.map((e) =>
                e.id === itemId ? { ...e, ...patch } : e
              ),
            },
          })),
        })),

      removeEducation: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              education: r.sections.education.filter((e) => e.id !== itemId),
            },
          })),
        })),

      addProject: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              projects: [
                ...r.sections.projects,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  url: "",
                  description: "",
                  bullets: [""],
                  ...item,
                },
              ],
            },
          })),
        })),

      updateProject: (id, itemId, patch) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              projects: r.sections.projects.map((p) =>
                p.id === itemId ? { ...p, ...patch } : p
              ),
            },
          })),
        })),

      removeProject: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              projects: r.sections.projects.filter((p) => p.id !== itemId),
            },
          })),
        })),

      addCertification: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              certifications: [
                ...r.sections.certifications,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  issuer: "",
                  date: "",
                  ...item,
                },
              ],
            },
          })),
        })),

      removeCertification: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              certifications: r.sections.certifications.filter(
                (c) => c.id !== itemId
              ),
            },
          })),
        })),

      addAward: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              awards: [
                ...r.sections.awards,
                {
                  id: crypto.randomUUID(),
                  title: "",
                  issuer: "",
                  date: "",
                  ...item,
                },
              ],
            },
          })),
        })),

      removeAward: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              awards: r.sections.awards.filter((a) => a.id !== itemId),
            },
          })),
        })),

      addLanguage: (id, item) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              languages: [
                ...r.sections.languages,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  proficiency: "Professional",
                  ...item,
                },
              ],
            },
          })),
        })),

      removeLanguage: (id, itemId) =>
        set((s) => ({
          resumes: patchResume(s.resumes, id, (r) => ({
            ...r,
            sections: {
              ...r.sections,
              languages: r.sections.languages.filter((l) => l.id !== itemId),
            },
          })),
        })),

      importResume: (data) =>
        set((s) => ({
          resumes: [...s.resumes, { ...data, updatedAt: new Date().toISOString() }],
          activeResumeId: data.id,
        })),
    }),
    { name: "resume-builder-storage" }
  )
);
