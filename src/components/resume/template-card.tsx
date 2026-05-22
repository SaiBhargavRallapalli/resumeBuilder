"use client";

import Link from "next/link";
import type { TemplateMeta } from "@/lib/types/resume";
import { getTemplate } from "@/lib/data/templates";
import { TemplateThumbnail } from "@/components/resume/template-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Shield, Columns2, Star } from "lucide-react";

interface TemplateCardProps {
  template: TemplateMeta;
  selected?: boolean;
  onSelect?: (id: TemplateMeta["id"]) => void;
  compact?: boolean;
  showLink?: boolean;
}

export function TemplateCard({
  template,
  selected,
  onSelect,
  compact,
  showLink = true,
}: TemplateCardProps) {
  const full = getTemplate(template.id);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg",
        selected && "ring-2 ring-primary shadow-md"
      )}
    >
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-slate-50 p-3"
        onClick={() => onSelect?.(template.id)}
        onKeyDown={(e) => e.key === "Enter" && onSelect?.(template.id)}
        role="button"
        tabIndex={0}
      >
        <TemplateThumbnail template={full} className="h-full" />
        {template.popular && (
          <Badge className="absolute left-2 top-2 gap-0.5 bg-amber-500">
            <Star className="h-3 w-3" />
            Popular
          </Badge>
        )}
        {template.atsScore >= 95 && (
          <Badge variant="success" className="absolute right-2 top-2 gap-1">
            <Shield className="h-3 w-3" />
            ATS {template.atsScore}%
          </Badge>
        )}
      </div>
      <div className={cn("p-4", compact && "p-3")}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{template.name}</h3>
            {!compact && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {template.description}
              </p>
            )}
            {!compact && template.recommendedFor && (
              <p className="mt-2 text-[10px] text-muted-foreground">
                Best for: {template.recommendedFor.slice(0, 2).join(", ")}
              </p>
            )}
          </div>
          {template.columns === 2 && (
            <Columns2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </div>
        {!compact && (
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              variant={selected ? "default" : "outline"}
              onClick={() => onSelect?.(template.id)}
            >
              {selected ? "Selected" : "Use Template"}
            </Button>
            {showLink && (
              <Button size="sm" variant="ghost" asChild>
                <Link href={`/builder/new?template=${template.id}`}>Preview</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
