"use client";

import { useMemo } from "react";
import type { TemplateDefinition } from "@/lib/data/templates";
import { getTemplatePreviewResume } from "@/lib/data/template-preview";
import { ResumePreview } from "@/components/resume/resume-preview";
import { cn } from "@/lib/utils/cn";

interface TemplateThumbnailProps {
  template: TemplateDefinition;
  className?: string;
  /** Smaller scale for compact cards (e.g. style panel) */
  compact?: boolean;
}

/** A4 width in CSS pixels at 96dpi — used to scale previews into card frames. */
const A4_WIDTH_PX = 794;

export function TemplateThumbnail({
  template,
  className,
  compact = false,
}: TemplateThumbnailProps) {
  const resume = useMemo(
    () => getTemplatePreviewResume(template.id),
    [template.id]
  );

  const scale = compact ? 0.26 : 0.32;

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-start justify-center overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Paper shadow */}
      <div
        className="absolute inset-x-4 top-3 bottom-0 rounded-sm bg-black/[0.06] blur-md"
        style={{ transform: "translateY(4px)" }}
      />
      <div
        className="relative origin-top rounded-sm bg-white shadow-[0_8px_30px_rgba(15,23,42,0.12)] ring-1 ring-black/5"
        style={{
          width: A4_WIDTH_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <ResumePreview resume={resume} variant="thumbnail" />
      </div>
    </div>
  );
}
