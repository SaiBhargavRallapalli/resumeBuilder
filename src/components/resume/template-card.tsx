"use client";

import { useRouter } from "next/navigation";
import type { TemplateMeta } from "@/lib/types/resume";
import { getTemplate } from "@/lib/data/templates";
import { TemplateThumbnail } from "@/components/resume/template-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  ArrowRight,
  Check,
  Columns2,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

interface TemplateCardProps {
  template: TemplateMeta;
  selected?: boolean;
  onSelect?: (id: TemplateMeta["id"]) => void;
  compact?: boolean;
}

const CATEGORY_LABELS: Record<
  TemplateMeta["category"],
  { label: string; className: string }
> = {
  ats: {
    label: "ATS-Friendly",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  modern: {
    label: "Modern",
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  professional: {
    label: "Professional",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },
  simple: {
    label: "Simple",
    className: "bg-gray-50 text-gray-700 border-gray-200",
  },
  creative: {
    label: "Creative",
    className: "bg-violet-50 text-violet-700 border-violet-200",
  },
};

export function TemplateCard({
  template,
  selected,
  onSelect,
  compact = false,
}: TemplateCardProps) {
  const router = useRouter();
  const full = getTemplate(template.id);
  const category = CATEGORY_LABELS[template.category];

  const handleUse = () => {
    if (onSelect) {
      onSelect(template.id);
    } else {
      router.push(`/builder/new?template=${template.id}`);
    }
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
        selected && "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
      )}
    >
      {/* Preview frame */}
      <button
        type="button"
        onClick={handleUse}
        className={cn(
          "relative w-full overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100/80 text-left",
          compact ? "h-[200px]" : "h-[280px] sm:h-[300px]"
        )}
        aria-label={`Use ${template.name} template`}
      >
        <div className="absolute inset-0 flex items-start justify-center pt-4">
          <TemplateThumbnail template={full} compact={compact} />
        </div>

        {/* Top badges */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            {template.popular && (
              <Badge className="gap-1 border-0 bg-amber-500 px-2 py-0.5 text-[10px] text-white shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </Badge>
            )}
            {template.atsScore >= 95 && (
              <Badge
                variant="success"
                className="gap-1 px-2 py-0.5 text-[10px] shadow-sm"
              >
                <Shield className="h-3 w-3" />
                ATS {template.atsScore}%
              </Badge>
            )}
          </div>
          {selected && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex items-end justify-center bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent p-4",
            "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            "focus-within:opacity-100"
          )}
        >
          <span className="mb-1 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
            {selected ? "Selected" : "Use this template"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* Meta */}
      <div className={cn("flex flex-1 flex-col border-t bg-card", compact ? "p-3" : "p-4")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={cn("font-semibold tracking-tight", compact ? "text-sm" : "text-base")}>
                {template.name}
              </h3>
              {template.columns === 2 && (
                <Columns2
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                  aria-label="Two column layout"
                />
              )}
            </div>
            {!compact && (
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {template.description}
              </p>
            )}
          </div>
        </div>

        {!compact && (
          <>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span
                className={cn(
                  "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium",
                  category.className
                )}
              >
                {category.label}
              </span>
              {full.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {full.recommendedFor && full.recommendedFor.length > 0 && (
              <p className="mt-2.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Sparkles className="h-3 w-3 shrink-0 text-primary/70" />
                <span className="line-clamp-1">
                  Best for {full.recommendedFor.slice(0, 3).join(" · ")}
                </span>
              </p>
            )}
          </>
        )}

        {compact && (
          <Button
            size="sm"
            variant={selected ? "default" : "outline"}
            className="mt-2 w-full text-xs"
            onClick={handleUse}
          >
            {selected ? "Current template" : "Apply"}
          </Button>
        )}

        {!compact && (
          <Button
            className="mt-4 w-full"
            variant={selected ? "default" : "secondary"}
            onClick={handleUse}
          >
            {selected ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Selected
              </>
            ) : (
              <>
                Use Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </article>
  );
}
