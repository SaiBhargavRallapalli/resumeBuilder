"use client";

import type { ResumeDocument, ResumeStyle } from "@/lib/types/resume";
import { useResumeStore } from "@/lib/store/resume-store";
import { Label } from "@/components/ui/label";
import { TEMPLATES } from "@/lib/data/templates";
import { TemplateCard } from "@/components/resume/template-card";
import { cn } from "@/lib/utils/cn";

const COLORS = [
  "#2563eb",
  "#059669",
  "#7c3aed",
  "#dc2626",
  "#0891b2",
  "#ca8a04",
  "#1e293b",
];

interface StylePanelProps {
  resume: ResumeDocument;
}

export function StylePanel({ resume }: StylePanelProps) {
  const setStyle = useResumeStore((s) => s.setStyle);
  const setTemplate = useResumeStore((s) => s.setTemplate);

  const update = (patch: Partial<ResumeStyle>) =>
    setStyle(resume.id, patch);

  return (
    <div className="space-y-8">
      <div>
        <Label className="mb-3 block">Accent color</Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                resume.style.primaryColor === c
                  ? "border-foreground ring-2 ring-offset-2"
                  : "border-transparent"
              )}
              style={{ backgroundColor: c }}
              onClick={() => update({ primaryColor: c })}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Font</Label>
        <select
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={resume.style.fontFamily}
          onChange={(e) =>
            update({
              fontFamily: e.target.value as ResumeStyle["fontFamily"],
            })
          }
        >
          <option value="inter">Inter (Modern)</option>
          <option value="arial">Arial (ATS Safe)</option>
          <option value="georgia">Georgia (Professional)</option>
          <option value="times">Times New Roman (Classic)</option>
        </select>
      </div>

      <div>
        <Label className="mb-2 block">Font size</Label>
        <div className="flex gap-2">
          {(["small", "medium", "large"] as const).map((s) => (
            <button
              key={s}
              type="button"
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm capitalize",
                resume.style.fontSize === s && "border-primary bg-primary/5"
              )}
              onClick={() => update({ fontSize: s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Margins</Label>
        <div className="flex gap-2">
          {(["narrow", "normal", "wide"] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm capitalize",
                resume.style.margin === m && "border-primary bg-primary/5"
              )}
              onClick={() => update({ margin: m })}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Template</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {TEMPLATES.slice(0, 4).map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              compact
              selected={resume.templateId === t.id}
              onSelect={(id) => setTemplate(resume.id, id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
