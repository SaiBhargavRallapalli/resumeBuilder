"use client";

import { useState } from "react";
import type { ResumeDocument } from "@/lib/types/resume";
import { useResumeStore } from "@/lib/store/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { generateSummary } from "@/lib/ats/analyzer";
import { callAi } from "@/lib/ai/client";
import {
  BULLET_SUGGESTIONS,
  SKILL_SUGGESTIONS,
  JOB_ROLES,
} from "@/lib/data/content-suggestions";
import {
  Plus,
  Trash2,
  Sparkles,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ResumeEditorProps {
  resume: ResumeDocument;
}

type EditorSection =
  | "contact"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "awards"
  | "languages";

const SECTIONS: { id: EditorSection; label: string; visibilityKey?: keyof ResumeDocument["visibility"] }[] = [
  { id: "contact", label: "Contact" },
  { id: "summary", label: "Summary", visibilityKey: "summary" },
  { id: "experience", label: "Experience", visibilityKey: "experience" },
  { id: "education", label: "Education", visibilityKey: "education" },
  { id: "skills", label: "Skills", visibilityKey: "skills" },
  { id: "projects", label: "Projects", visibilityKey: "projects" },
  { id: "certifications", label: "Certifications", visibilityKey: "certifications" },
  { id: "awards", label: "Awards", visibilityKey: "awards" },
  { id: "languages", label: "Languages", visibilityKey: "languages" },
];

export function ResumeEditor({ resume }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<EditorSection>("contact");
  const [aiLoading, setAiLoading] = useState(false);
  const store = useResumeStore();
  const id = resume.id;
  const { sections, visibility } = resume;

  return (
    <div className="flex h-full flex-col">
      <nav className="flex gap-1 overflow-x-auto border-b p-2 scrollbar-thin">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              activeSection === s.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-4">
        {activeSection === "contact" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full name</Label>
                <Input
                  className="mt-1"
                  value={sections.contact.fullName}
                  onChange={(e) =>
                    store.setContact(id, { fullName: e.target.value })
                  }
                  placeholder="Alex Morgan"
                />
              </div>
              <div>
                <Label>Job title</Label>
                <Input
                  className="mt-1"
                  value={sections.contact.jobTitle}
                  onChange={(e) =>
                    store.setContact(id, { jobTitle: e.target.value })
                  }
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="mt-1"
                  type="email"
                  value={sections.contact.email}
                  onChange={(e) =>
                    store.setContact(id, { email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  className="mt-1"
                  value={sections.contact.phone}
                  onChange={(e) =>
                    store.setContact(id, { phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  className="mt-1"
                  value={sections.contact.location}
                  onChange={(e) =>
                    store.setContact(id, { location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  className="mt-1"
                  value={sections.contact.linkedin}
                  onChange={(e) =>
                    store.setContact(id, { linkedin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "summary" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Professional summary</Label>
              <Button
                size="sm"
                variant="outline"
                disabled={aiLoading}
                onClick={async () => {
                  setAiLoading(true);
                  const role = sections.contact.jobTitle || "Professional";
                  const text = await callAi("generate-summary", { role, years: 5 });
                  store.setSummary(id, text);
                  setAiLoading(false);
                }}
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {aiLoading ? "Generating..." : "AI Generate"}
              </Button>
            </div>
            <Textarea
              value={sections.summary}
              onChange={(e) => store.setSummary(id, e.target.value)}
              placeholder="2-4 sentences highlighting your experience and value..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              {sections.summary.length}/500 characters
            </p>
            <div>
              <p className="mb-2 text-xs font-medium">Quick role templates</p>
              <div className="flex flex-wrap gap-1">
                {JOB_ROLES.slice(0, 6).map((role) => (
                  <button
                    key={role}
                    type="button"
                    className="rounded-full border px-2 py-0.5 text-xs hover:bg-muted"
                    onClick={() =>
                      store.setSummary(id, generateSummary(role, 4))
                    }
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "experience" && (
          <div className="space-y-6">
            {sections.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="rounded-lg border bg-muted/20 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    Role {idx + 1}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => store.removeExperience(id, exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Position</Label>
                    <Input
                      className="mt-1"
                      value={exp.position}
                      onChange={(e) =>
                        store.updateExperience(id, exp.id, {
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      className="mt-1"
                      value={exp.company}
                      onChange={(e) =>
                        store.updateExperience(id, exp.id, {
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Start</Label>
                    <Input
                      className="mt-1"
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        store.updateExperience(id, exp.id, {
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>End</Label>
                    <Input
                      className="mt-1"
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) =>
                        store.updateExperience(id, exp.id, {
                          endDate: e.target.value,
                        })
                      }
                    />
                    <label className="mt-1 flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          store.updateExperience(id, exp.id, {
                            current: e.target.checked,
                          })
                        }
                      />
                      Current role
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Achievements</Label>
                  {exp.bullets.map((bullet, bi) => (
                    <div key={bi} className="flex gap-2">
                      <Textarea
                        value={bullet}
                        onChange={(e) => {
                          const bullets = [...exp.bullets];
                          bullets[bi] = e.target.value;
                          store.updateExperience(id, exp.id, { bullets });
                        }}
                        placeholder="Led team of 5 to deliver..."
                        rows={2}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        title="Enhance with AI"
                        disabled={aiLoading}
                        onClick={async () => {
                          setAiLoading(true);
                          const enhanced = await callAi("enhance-bullet", {
                            text: bullet,
                            role: sections.contact.jobTitle,
                          });
                          const bullets = [...exp.bullets];
                          bullets[bi] = enhanced;
                          store.updateExperience(id, exp.id, { bullets });
                          setAiLoading(false);
                        }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      store.updateExperience(id, exp.id, {
                        bullets: [...exp.bullets, ""],
                      })
                    }
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add bullet
                  </Button>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {BULLET_SUGGESTIONS.technical.slice(0, 2).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="rounded border px-2 py-0.5 text-[10px] hover:bg-muted"
                        onClick={() =>
                          store.updateExperience(id, exp.id, {
                            bullets: [...exp.bullets.filter(Boolean), s],
                          })
                        }
                      >
                        + suggestion
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => store.addExperience(id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add experience
            </Button>
          </div>
        )}

        {activeSection === "education" && (
          <div className="space-y-6">
            {sections.education.map((edu, idx) => (
              <div key={edu.id} className="rounded-lg border p-4">
                <div className="mb-3 flex justify-between">
                  <span className="text-sm font-medium">Education {idx + 1}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => store.removeEducation(id, edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      store.updateEducation(id, edu.id, {
                        institution: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Degree (e.g. B.S.)"
                    value={edu.degree}
                    onChange={(e) =>
                      store.updateEducation(id, edu.id, {
                        degree: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Field of study"
                    value={edu.field}
                    onChange={(e) =>
                      store.updateEducation(id, edu.id, {
                        field: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="GPA"
                    value={edu.gpa}
                    onChange={(e) =>
                      store.updateEducation(id, edu.id, { gpa: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => store.addEducation(id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add education
            </Button>
          </div>
        )}

        {activeSection === "skills" && (
          <div className="space-y-4">
            <Label>Skills (comma-separated or one per line)</Label>
            <Textarea
              value={sections.skills.join(", ")}
              onChange={(e) => {
                const skills = e.target.value
                  .split(/[,\n]/)
                  .map((s) => s.trim())
                  .filter(Boolean);
                store.setSkills(id, skills);
              }}
              placeholder="JavaScript, React, Node.js..."
              className="min-h-[100px]"
            />
            <div>
              <p className="mb-2 text-xs font-medium">Suggested for your role</p>
              <div className="flex flex-wrap gap-1">
                {(SKILL_SUGGESTIONS["Software Engineer"] ?? []).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-xs",
                      sections.skills.includes(skill)
                        ? "border-primary bg-primary/10"
                        : "hover:bg-muted"
                    )}
                    onClick={() => {
                      if (!sections.skills.includes(skill)) {
                        store.setSkills(id, [...sections.skills, skill]);
                      }
                    }}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div className="space-y-4">
            {!visibility.projects && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => store.setVisibility(id, { projects: true })}
              >
                Enable projects section
              </Button>
            )}
            {sections.projects.map((p) => (
              <div key={p.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex justify-between">
                  <Input
                    placeholder="Project name"
                    value={p.name}
                    onChange={(e) =>
                      store.updateProject(id, p.id, { name: e.target.value })
                    }
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => store.removeProject(id, p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="URL"
                  value={p.url}
                  onChange={(e) =>
                    store.updateProject(id, p.id, { url: e.target.value })
                  }
                />
              </div>
            ))}
            <Button variant="outline" onClick={() => store.addProject(id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add project
            </Button>
          </div>
        )}

        {(activeSection === "certifications" ||
          activeSection === "awards" ||
          activeSection === "languages") && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enable this section in the sidebar toggles, then add entries below.
            </p>
            {activeSection === "certifications" && (
              <>
                {!visibility.certifications && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      store.setVisibility(id, { certifications: true })
                    }
                  >
                    Enable certifications
                  </Button>
                )}
                {sections.certifications.map((c) => (
                  <div key={c.id} className="flex gap-2">
                    <Input
                      placeholder="Certification name"
                      className="flex-1"
                      value={c.name}
                      onChange={(e) =>
                        store.updateResume(id, {
                          sections: {
                            ...sections,
                            certifications: sections.certifications.map(
                              (x) =>
                                x.id === c.id
                                  ? { ...x, name: e.target.value }
                                  : x
                            ),
                          },
                        })
                      }
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => store.removeCertification(id, c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => store.addCertification(id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add certification
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
