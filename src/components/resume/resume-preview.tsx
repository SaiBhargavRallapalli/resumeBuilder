"use client";

import type { ResumeDocument } from "@/lib/types/resume";
import { getTemplateLayout } from "@/lib/data/templates";
import { cn } from "@/lib/utils/cn";

const FONT_MAP = {
  inter: "font-sans",
  arial: "font-sans",
  georgia: "font-serif",
  times: "font-serif",
} as const;

const SIZE_MAP = {
  small: "text-[10px]",
  medium: "text-[11px]",
  large: "text-[12px]",
} as const;

function formatDate(d: string, current?: boolean) {
  if (!d) return current ? "Present" : "";
  const [y, m] = d.split("-");
  if (m) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[parseInt(m, 10) - 1] ?? m} ${y}`;
  }
  return y ?? d;
}

interface ResumePreviewProps {
  resume: ResumeDocument;
  id?: string;
  className?: string;
  scale?: number;
  /** Thumbnail mode: no min-height, no shadow, non-interactive */
  variant?: "full" | "thumbnail";
}

export function ResumePreview({
  resume,
  id = "resume-preview",
  className,
  scale = 1,
  variant = "full",
}: ResumePreviewProps) {
  const { sections, visibility, style, templateId } = resume;
  const layout = getTemplateLayout(templateId);
  const { contact } = sections;
  const color = style.primaryColor;

  const baseClass = cn(
    FONT_MAP[style.fontFamily],
    SIZE_MAP[style.fontSize],
    "bg-white text-gray-900 leading-snug",
    style.lineHeight === "compact" && "leading-tight",
    style.lineHeight === "relaxed" && "leading-relaxed",
    className
  );

  const padding =
    style.margin === "narrow"
      ? "p-6"
      : style.margin === "wide"
        ? "p-12"
        : "p-8";

  const Header = () => (
    <header className="mb-4">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ color: layout === "executive" ? "#fff" : color }}
      >
        {contact.fullName || "Your Name"}
      </h1>
      {contact.jobTitle && (
        <p
          className="mt-1 text-sm font-medium opacity-90"
          style={{ color: layout === "executive" ? "#e2e8f0" : undefined }}
        >
          {contact.jobTitle}
        </p>
      )}
      <div
        className={cn(
          "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px]",
          layout === "executive" ? "text-slate-200" : "text-gray-600"
        )}
      >
        {contact.email && <span>{contact.email}</span>}
        {contact.phone && <span>{contact.phone}</span>}
        {contact.location && <span>{contact.location}</span>}
        {contact.linkedin && <span>{contact.linkedin}</span>}
        {contact.website && <span>{contact.website}</span>}
      </div>
    </header>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="mb-2 border-b pb-1 text-xs font-bold uppercase tracking-wider"
      style={{ borderColor: color, color }}
    >
      {children}
    </h2>
  );

  const Summary = () =>
    visibility.summary && sections.summary ? (
      <section className="mb-4">
        <SectionTitle>Professional Summary</SectionTitle>
        <p className="text-justify">{sections.summary}</p>
      </section>
    ) : null;

  const Experience = () =>
    visibility.experience && sections.experience.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-3">
          {sections.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold">{exp.position || "Position"}</p>
                  <p className="text-gray-700">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-gray-600">
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {exp.bullets
                    .filter(Boolean)
                    .map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const Education = () =>
    visibility.education && sections.education.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-2">
          {sections.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-gray-700">
                    {edu.institution}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-gray-600">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const Skills = ({ vertical = false }: { vertical?: boolean }) =>
    visibility.skills && sections.skills.length > 0 ? (
      <section className={vertical ? "" : "mb-4"}>
        <SectionTitle>Skills</SectionTitle>
        {vertical ? (
          <ul className="space-y-1">
            {sections.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>{sections.skills.join(" · ")}</p>
        )}
      </section>
    ) : null;

  const Projects = () =>
    visibility.projects && sections.projects.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Projects</SectionTitle>
        <div className="space-y-2">
          {sections.projects.map((p) => (
            <div key={p.id}>
              <p className="font-semibold">
                {p.name}
                {p.url && (
                  <span className="ml-1 font-normal text-gray-600">· {p.url}</span>
                )}
              </p>
              {p.description && <p className="text-gray-700">{p.description}</p>}
              {p.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-0.5 list-disc pl-4">
                  {p.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const Certifications = () =>
    visibility.certifications && sections.certifications.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Certifications</SectionTitle>
        <ul className="space-y-1">
          {sections.certifications.map((c) => (
            <li key={c.id}>
              <span className="font-medium">{c.name}</span>
              {c.issuer && ` — ${c.issuer}`}
              {c.date && ` (${c.date})`}
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  const Awards = () =>
    visibility.awards && sections.awards.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Awards</SectionTitle>
        <ul className="space-y-1">
          {sections.awards.map((a) => (
            <li key={a.id}>
              <span className="font-medium">{a.title}</span>
              {a.issuer && ` — ${a.issuer}`}
              {a.date && ` (${a.date})`}
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  const Languages = () =>
    visibility.languages && sections.languages.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Languages</SectionTitle>
        <p>
          {sections.languages
            .map((l) => `${l.name} (${l.proficiency})`)
            .join(" · ")}
        </p>
      </section>
    ) : null;

  const mainContent = (
    <>
      <Summary />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Awards />
      <Languages />
    </>
  );

  const ExperienceTimeline = () =>
    visibility.experience && sections.experience.length > 0 ? (
      <section className="mb-4">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-4">
          {sections.experience.map((exp) => (
            <div
              key={exp.id}
              className="relative border-l-2 pl-4"
              style={{ borderColor: `${color}66` }}
            >
              <div
                className="absolute -left-[5px] top-1 h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold">{exp.position || "Position"}</p>
                  <p className="text-gray-700">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-gray-600">
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-4">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderTemplate = () => {
    switch (layout) {
      case "executive":
        return (
          <div className={baseClass}>
            <div
              className="-mx-8 -mt-8 mb-6 px-8 py-6"
              style={{ backgroundColor: color }}
            >
              <Header />
            </div>
            <div className={padding}>{mainContent}</div>
          </div>
        );

      case "double-column":
        return (
          <div className={cn(baseClass, "grid grid-cols-[1fr_2fr] gap-6", padding)}>
            <aside className="space-y-4 border-r pr-4" style={{ borderColor: `${color}33` }}>
              <Header />
              <Skills vertical />
              <Languages />
              <Certifications />
            </aside>
            <main>
              <Summary />
              <Experience />
              <Education />
              <Projects />
              <Awards />
            </main>
          </div>
        );

      case "modern":
        return (
          <div className={cn(baseClass, padding)}>
            <div className="mb-4 flex items-start gap-4">
              <div
                className="h-1 w-16 shrink-0 rounded"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <Header />
              </div>
            </div>
            <Summary />
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Awards />
            <Languages />
          </div>
        );

      case "minimal":
        return (
          <div className={cn(baseClass, padding)}>
            <header className="mb-6 border-b border-gray-300 pb-4 text-center">
              <h1 className="text-xl font-bold">{contact.fullName || "Your Name"}</h1>
              {contact.jobTitle && (
                <p className="text-sm text-gray-600">{contact.jobTitle}</p>
              )}
              <p className="mt-2 text-[10px] text-gray-600">
                {[contact.email, contact.phone, contact.location, contact.linkedin]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            </header>
            {mainContent}
            <Skills />
          </div>
        );

      case "timeline":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            <ExperienceTimeline />
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Awards />
            <Languages />
          </div>
        );

      case "professional":
      case "polished":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            {visibility.experience && sections.experience.length > 0 && (
            <section className="mb-4">
              <h2
                className="mb-2 text-xs font-bold uppercase tracking-widest"
                style={{ color }}
              >
                Professional Experience
              </h2>
              {sections.experience.map((exp) => (
                <div key={exp.id} className="mb-3 border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{exp.position}</p>
                    <p className="shrink-0 text-gray-600 text-[10px]">
                      {formatDate(exp.startDate)} –{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <p className="text-gray-700">{exp.company}</p>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc pl-4">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
            )}
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Awards />
            <Languages />
          </div>
        );

      case "compact":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            <Experience />
            <Education />
            <Skills />
          </div>
        );

      default:
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            {mainContent}
            <Skills />
          </div>
        );
    }
  };

  const isThumbnail = variant === "thumbnail";

  return (
    <div
      id={isThumbnail ? undefined : id}
      className={cn(
        "mx-auto w-full max-w-[210mm]",
        !isThumbnail && "shadow-lg",
        isThumbnail && "pointer-events-none select-none",
        className
      )}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
      }}
    >
      <div className={cn("bg-white", !isThumbnail && "min-h-[297mm]")}>
        {renderTemplate()}
      </div>
    </div>
  );
}
