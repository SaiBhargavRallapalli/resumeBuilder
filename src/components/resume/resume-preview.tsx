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

  // Standard header for single-column layouts
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

  // Section title — style varies by layout
  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    if (layout === "ivy-league") {
      return (
        <h2
          className="mb-2 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-center text-gray-900 border-b"
          style={{ borderColor: color }}
        >
          {children}
        </h2>
      );
    }
    if (layout === "polished") {
      return (
        <h2
          className="mb-2 pl-2.5 text-xs font-bold uppercase tracking-wider"
          style={{ borderLeft: `3px solid ${color}`, color }}
        >
          {children}
        </h2>
      );
    }
    if (layout === "professional") {
      return (
        <h2
          className="mb-2 text-xs font-bold uppercase tracking-widest"
          style={{ color }}
        >
          {children}
        </h2>
      );
    }
    return (
      <h2
        className="mb-2 border-b pb-1 text-xs font-bold uppercase tracking-wider"
        style={{ borderColor: color, color }}
      >
        {children}
      </h2>
    );
  };

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
      // ─── Classic: double rule under name, structured serif look ──────────────
      case "classic":
        return (
          <div className={cn(baseClass, padding)}>
            <header className="mb-5">
              <h1 className="text-2xl font-bold leading-tight text-gray-900">
                {contact.fullName || "Your Name"}
              </h1>
              {contact.jobTitle && (
                <p className="mt-0.5 text-sm font-medium" style={{ color }}>
                  {contact.jobTitle}
                </p>
              )}
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-600">
                {contact.email && <span>{contact.email}</span>}
                {contact.phone && <span>{contact.phone}</span>}
                {contact.location && <span>{contact.location}</span>}
                {contact.linkedin && <span>{contact.linkedin}</span>}
                {contact.website && <span>{contact.website}</span>}
              </div>
              <div className="mt-3 border-t-2" style={{ borderColor: color }} />
              <div className="mt-[2px] border-t border-gray-300" />
            </header>
            {mainContent}
            <Skills />
          </div>
        );

      // ─── Single Column: colored top banner + tinted contact strip ─────────────
      case "single-column":
        return (
          <div className={cn(baseClass, "overflow-hidden")}>
            <div className="px-8 py-6" style={{ backgroundColor: color }}>
              <h1 className="text-2xl font-bold leading-tight text-white">
                {contact.fullName || "Your Name"}
              </h1>
              {contact.jobTitle && (
                <p
                  className="mt-1 text-[11px] font-medium"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  {contact.jobTitle}
                </p>
              )}
            </div>
            <div
              className="px-8 py-2 text-[10px] text-gray-600"
              style={{
                backgroundColor: `${color}10`,
                borderBottom: `1px solid ${color}25`,
              }}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                {contact.email && <span>{contact.email}</span>}
                {contact.phone && <span>{contact.phone}</span>}
                {contact.location && <span>{contact.location}</span>}
                {contact.linkedin && <span>{contact.linkedin}</span>}
                {contact.website && <span>{contact.website}</span>}
              </div>
            </div>
            <div className={cn(padding, "pt-5")}>
              {mainContent}
              <Skills />
            </div>
          </div>
        );

      // ─── Minimal: centered header, maximum whitespace ─────────────────────────
      case "minimal":
        return (
          <div className={cn(baseClass, padding)}>
            <header className="mb-6 border-b border-gray-300 pb-4 text-center">
              <h1 className="text-xl font-bold tracking-tight">
                {contact.fullName || "Your Name"}
              </h1>
              {contact.jobTitle && (
                <p className="mt-0.5 text-sm text-gray-600">{contact.jobTitle}</p>
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

      // ─── Modern: left geometric accent bar ────────────────────────────────────
      case "modern":
        return (
          <div className={cn(baseClass, padding)}>
            <div className="mb-5 flex items-start gap-4">
              <div
                className="mt-1 h-14 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold leading-tight text-gray-900">
                  {contact.fullName || "Your Name"}
                </h1>
                {contact.jobTitle && (
                  <p className="mt-0.5 text-sm font-semibold" style={{ color }}>
                    {contact.jobTitle}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-600">
                  {contact.email && <span>{contact.email}</span>}
                  {contact.phone && <span>{contact.phone}</span>}
                  {contact.location && <span>{contact.location}</span>}
                  {contact.linkedin && <span>{contact.linkedin}</span>}
                  {contact.website && <span>{contact.website}</span>}
                </div>
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

      // ─── Timeline: experience with colored vertical timeline dots ─────────────
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

      // ─── Professional: widest tracking section headers, entry separators ──────
      case "professional":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            {visibility.experience && sections.experience.length > 0 && (
              <section className="mb-4">
                <SectionTitle>Professional Experience</SectionTitle>
                {sections.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="mb-3 border-b border-gray-100 pb-2 last:border-0"
                  >
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold">{exp.position}</p>
                      <p className="shrink-0 text-[10px] text-gray-600">
                        {formatDate(exp.startDate)} –{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
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

      // ─── Ivy League: centered uppercase name, academic style ──────────────────
      case "ivy-league":
        return (
          <div className={cn(baseClass, padding)}>
            <header className="mb-5 text-center">
              <h1 className="text-[22px] font-bold uppercase tracking-[0.06em] text-gray-900">
                {contact.fullName || "Your Name"}
              </h1>
              {contact.jobTitle && (
                <p className="mt-0.5 text-sm font-medium italic text-gray-700">
                  {contact.jobTitle}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-[10px] text-gray-600">
                {[contact.email, contact.phone, contact.location, contact.linkedin]
                  .filter(Boolean)
                  .join("  ·  ")}
              </div>
              <div className="mt-3 border-t-2" style={{ borderColor: color }} />
              <div className="mt-[2px] border-t border-gray-300" />
            </header>
            {mainContent}
            <Skills />
          </div>
        );

      // ─── Polished: left accent bar on section headers ─────────────────────────
      case "polished":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            {visibility.experience && sections.experience.length > 0 && (
              <section className="mb-4">
                <h2
                  className="mb-2 pl-2.5 text-xs font-bold uppercase tracking-wider"
                  style={{ borderLeft: `3px solid ${color}`, color }}
                >
                  Professional Experience
                </h2>
                {sections.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold">{exp.position}</p>
                      <p className="shrink-0 text-[10px] text-gray-600">
                        {formatDate(exp.startDate)} –{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
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

      // ─── Executive: FIXED full-width colored header (no overflow) ─────────────
      case "executive":
        return (
          <div className={cn(baseClass, "overflow-hidden")}>
            <div className="px-8 py-8" style={{ backgroundColor: color }}>
              <Header />
            </div>
            <div className={cn(padding, "pt-6")}>
              {mainContent}
              <Skills />
            </div>
          </div>
        );

      // ─── Compact: dense single-column, fits everything on one page ────────────
      case "compact":
        return (
          <div className={cn(baseClass, padding)}>
            <Header />
            <Summary />
            <Experience />
            <Education />
            <Skills />
            <Certifications />
          </div>
        );

      // ─── Double Column: standard sidebar with skills ───────────────────────────
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

      // ─── Contemporary: solid colored sidebar, white text ──────────────────────
      case "contemporary":
        return (
          <div className={cn(baseClass, "grid grid-cols-[5fr_9fr] overflow-hidden")}>
            <aside className="min-h-full space-y-5 p-5" style={{ backgroundColor: color }}>
              <div>
                <h1 className="text-[14px] font-bold leading-snug text-white">
                  {contact.fullName || "Your Name"}
                </h1>
                {contact.jobTitle && (
                  <p className="mt-1 text-[10px] font-medium text-white/80">
                    {contact.jobTitle}
                  </p>
                )}
              </div>
              <div>
                <h2 className="mb-1.5 border-b border-white/20 pb-1 text-[9px] font-bold uppercase tracking-widest text-white/60">
                  Contact
                </h2>
                <div className="space-y-0.5 text-[10px] text-white/80">
                  {contact.email && <p>{contact.email}</p>}
                  {contact.phone && <p>{contact.phone}</p>}
                  {contact.location && <p>{contact.location}</p>}
                  {contact.linkedin && <p>{contact.linkedin}</p>}
                </div>
              </div>
              {visibility.skills && sections.skills.length > 0 && (
                <div>
                  <h2 className="mb-1.5 border-b border-white/20 pb-1 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    Skills
                  </h2>
                  <ul className="space-y-0.5 text-[10px] text-white/80">
                    {sections.skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {visibility.languages && sections.languages.length > 0 && (
                <div>
                  <h2 className="mb-1.5 border-b border-white/20 pb-1 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    Languages
                  </h2>
                  <ul className="space-y-0.5 text-[10px] text-white/80">
                    {sections.languages.map((l) => (
                      <li key={l.id}>
                        {l.name} ({l.proficiency})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {visibility.certifications && sections.certifications.length > 0 && (
                <div>
                  <h2 className="mb-1.5 border-b border-white/20 pb-1 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    Certifications
                  </h2>
                  <ul className="space-y-1 text-[10px] text-white/80">
                    {sections.certifications.map((c) => (
                      <li key={c.id}>
                        <p className="font-medium">{c.name}</p>
                        {c.issuer && <p className="text-white/60">{c.issuer}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
            <main className="p-6">
              <Summary />
              <Experience />
              <Education />
              <Projects />
              <Awards />
            </main>
          </div>
        );

      // ─── Elegant: full-width header + refined two-column below ────────────────
      case "elegant":
        return (
          <div className={cn(baseClass, "overflow-hidden")}>
            <div className={cn(padding, "pb-4")}>
              <h1 className="text-2xl font-bold leading-tight" style={{ color }}>
                {contact.fullName || "Your Name"}
              </h1>
              {contact.jobTitle && (
                <p className="mt-0.5 text-sm font-medium text-gray-700">
                  {contact.jobTitle}
                </p>
              )}
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-600">
                {contact.email && <span>{contact.email}</span>}
                {contact.phone && <span>{contact.phone}</span>}
                {contact.location && <span>{contact.location}</span>}
                {contact.linkedin && <span>{contact.linkedin}</span>}
                {contact.website && <span>{contact.website}</span>}
              </div>
              <div className="mt-3 border-b" style={{ borderColor: `${color}55` }} />
            </div>
            <div className={cn(padding, "grid grid-cols-[2fr_3fr] gap-6 pt-4")}>
              <aside
                className="space-y-4 border-r pr-5"
                style={{ borderColor: `${color}22` }}
              >
                <Skills vertical />
                <Education />
                <Languages />
                <Certifications />
              </aside>
              <main>
                <Summary />
                <Experience />
                <Projects />
                <Awards />
              </main>
            </div>
          </div>
        );

      // ─── Creative: bold colored sidebar with dot-bullet skills ────────────────
      case "creative":
        return (
          <div className={cn(baseClass, "grid grid-cols-[2fr_5fr] overflow-hidden")}>
            <aside className="min-h-full space-y-4 p-5" style={{ backgroundColor: color }}>
              <div>
                <h1 className="text-[16px] font-bold leading-snug text-white">
                  {contact.fullName || "Your Name"}
                </h1>
                {contact.jobTitle && (
                  <p className="mt-1 text-[10px] font-medium text-white/80">
                    {contact.jobTitle}
                  </p>
                )}
              </div>
              <div className="border-t border-white/20" />
              <div>
                <h2 className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/55">
                  Contact
                </h2>
                <div className="space-y-0.5 text-[10px] text-white/80">
                  {contact.email && <p>{contact.email}</p>}
                  {contact.phone && <p>{contact.phone}</p>}
                  {contact.location && <p>{contact.location}</p>}
                  {contact.linkedin && <p>{contact.linkedin}</p>}
                </div>
              </div>
              {visibility.skills && sections.skills.length > 0 && (
                <div>
                  <h2 className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/55">
                    Skills
                  </h2>
                  <ul className="space-y-0.5 text-[10px] text-white/85">
                    {sections.skills.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span
                          className="h-1 w-1 shrink-0 rounded-full bg-white/60"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {visibility.education && sections.education.length > 0 && (
                <div>
                  <h2 className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/55">
                    Education
                  </h2>
                  {sections.education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5 text-[10px] text-white/80">
                      <p className="font-medium">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </p>
                      <p className="text-white/60">{edu.institution}</p>
                      <p className="text-white/55">
                        {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {visibility.certifications && sections.certifications.length > 0 && (
                <div>
                  <h2 className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/55">
                    Certifications
                  </h2>
                  <ul className="space-y-0.5 text-[10px] text-white/80">
                    {sections.certifications.map((c) => (
                      <li key={c.id}>{c.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {visibility.languages && sections.languages.length > 0 && (
                <div>
                  <h2 className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/55">
                    Languages
                  </h2>
                  <ul className="space-y-0.5 text-[10px] text-white/80">
                    {sections.languages.map((l) => (
                      <li key={l.id}>
                        {l.name} ({l.proficiency})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
            <main className={cn(padding, "py-6 pl-5")}>
              <Summary />
              <Experience />
              <Projects />
              <Awards />
            </main>
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
