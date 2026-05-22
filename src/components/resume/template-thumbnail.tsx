"use client";

import type { TemplateDefinition } from "@/lib/data/templates";
import { cn } from "@/lib/utils/cn";

interface TemplateThumbnailProps {
  template: TemplateDefinition;
  className?: string;
}

export function TemplateThumbnail({ template, className }: TemplateThumbnailProps) {
  const color = template.defaultStyle.primaryColor ?? "#2563eb";

  const renderLayout = () => {
    switch (template.layout) {
      case "executive":
        return (
          <>
            <div className="h-[28%] w-full rounded-t" style={{ backgroundColor: color }} />
            <div className="space-y-1 p-2 pt-2">
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-4/5 rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
            </div>
          </>
        );

      case "double-column":
        return (
          <div className="flex h-full gap-1 p-2">
            <div
              className="w-[32%] space-y-1 rounded-sm p-1"
              style={{ backgroundColor: `${color}18` }}
            >
              <div className="h-2 w-full rounded" style={{ backgroundColor: color, opacity: 0.6 }} />
              <div className="h-0.5 w-full rounded bg-gray-300" />
              <div className="h-0.5 w-3/4 rounded bg-gray-300" />
              <div className="h-0.5 w-full rounded bg-gray-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-1 w-full rounded bg-gray-300" />
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-5/6 rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="flex h-full flex-col items-center p-2">
            <div className="h-2 w-2/3 rounded bg-gray-400" />
            <div className="mt-1 h-1 w-1/2 rounded bg-gray-300" />
            <div className="my-2 h-px w-full bg-gray-300" />
            <div className="w-full space-y-1">
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="p-2">
            <div className="flex gap-1">
              <div className="h-4 w-1 rounded" style={{ backgroundColor: color }} />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-3/4 rounded bg-gray-400" />
                <div className="h-1 w-1/2 rounded bg-gray-300" />
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="h-0.5 w-1/3 rounded" style={{ backgroundColor: color }} />
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-full rounded bg-gray-200" />
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="p-2">
            <div className="h-2 w-2/3 rounded bg-gray-400" />
            <div className="mt-2 space-y-2 pl-2">
              {[1, 2].map((i) => (
                <div key={i} className="relative border-l-2 pl-2" style={{ borderColor: color }}>
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <div className="h-1 w-full rounded bg-gray-200" />
                  <div className="mt-0.5 h-0.5 w-4/5 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        );

      case "professional":
      case "polished":
        return (
          <div className="p-2">
            <div className="h-2 w-2/3 rounded bg-gray-400" />
            <div className="mt-1 h-1 w-1/2 rounded bg-gray-300" />
            <div
              className="mb-1 mt-2 h-0.5 w-1/4"
              style={{ backgroundColor: color }}
            />
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        );

      case "compact":
        return (
          <div className="space-y-0.5 p-1.5">
            <div className="h-1.5 w-2/3 rounded bg-gray-400" />
            <div className="h-0.5 w-1/2 rounded bg-gray-300" />
            <div className="h-0.5 w-full rounded bg-gray-200" />
            <div className="h-0.5 w-full rounded bg-gray-200" />
            <div className="h-0.5 w-4/5 rounded bg-gray-200" />
            <div className="h-0.5 w-full rounded bg-gray-200" />
          </div>
        );

      default:
        return (
          <div className="p-2">
            <div className="h-2 w-2/3 rounded bg-gray-400" />
            <div className="mt-1 h-1 w-1/2 rounded bg-gray-300" />
            <div
              className="mb-1 mt-2 border-b pb-0.5 text-[6px] font-bold uppercase"
              style={{ borderColor: color, color }}
            >
              Experience
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-4/5 rounded bg-gray-200" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-md bg-white shadow-inner",
        className
      )}
    >
      {renderLayout()}
    </div>
  );
}
