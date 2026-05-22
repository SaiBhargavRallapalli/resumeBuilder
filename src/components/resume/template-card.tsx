"use client";

import Link from "next/link";
import type { TemplateMeta } from "@/lib/types/resume";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Shield, Columns2 } from "lucide-react";

interface TemplateCardProps {
  template: TemplateMeta;
  selected?: boolean;
  onSelect?: (id: TemplateMeta["id"]) => void;
  compact?: boolean;
}

const PREVIEW_STYLES: Record<string, string> = {
  classic: "bg-white border-2 border-gray-200",
  minimal: "bg-gray-50 border border-gray-300",
  professional: "bg-white border-l-4 border-blue-600",
  modern: "bg-gradient-to-br from-blue-50 to-white",
  "double-column": "bg-white grid grid-cols-3 gap-0",
  compact: "bg-white text-[6px]",
  executive: "bg-blue-700 text-white",
  creative: "bg-gradient-to-r from-violet-100 to-pink-50",
};

export function TemplateCard({
  template,
  selected,
  onSelect,
  compact,
}: TemplateCardProps) {
  const previewClass = PREVIEW_STYLES[template.id] ?? "bg-white";

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg",
        selected && "ring-2 ring-primary shadow-md"
      )}
    >
      <div
        className={cn(
          "relative aspect-[3/4] cursor-pointer p-4",
          previewClass
        )}
        onClick={() => onSelect?.(template.id)}
        onKeyDown={(e) => e.key === "Enter" && onSelect?.(template.id)}
        role="button"
        tabIndex={0}
      >
        {template.id === "double-column" && (
          <>
            <div className="col-span-1 h-full bg-blue-100/50" />
            <div className="col-span-2 space-y-1 p-2">
              <div className="h-2 w-3/4 rounded bg-gray-300" />
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
            </div>
          </>
        )}
        {template.id !== "double-column" && (
          <div className="space-y-2">
            <div
              className={cn(
                "h-3 rounded",
                template.id === "executive" ? "bg-white/30" : "bg-gray-300"
              )}
            />
            <div className="h-1.5 w-2/3 rounded bg-gray-200" />
            <div className="mt-4 space-y-1">
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-4/5 rounded bg-gray-200" />
            </div>
          </div>
        )}
        {template.atsScore >= 95 && (
          <Badge
            variant="success"
            className="absolute right-2 top-2 gap-1"
          >
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
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {template.description}
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
            <Button size="sm" variant="ghost" asChild>
              <Link href={`/builder?template=${template.id}`}>Preview</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
