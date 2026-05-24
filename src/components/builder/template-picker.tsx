"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import { RESUME_EXAMPLES } from "@/lib/data/resume-examples";
import { useResumeStore } from "@/lib/store/resume-store";
import { TemplateCard } from "@/components/resume/template-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { TemplateId } from "@/lib/types/resume";
import { FileText } from "lucide-react";

interface TemplatePickerProps {
  onSelect: (templateId: TemplateId, exampleId?: string) => void;
  onBlank?: () => void;
}

export function TemplatePicker({ onSelect, onBlank }: TemplatePickerProps) {
  const [category, setCategory] = useState("all");
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const filtered =
    category === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Choose your resume template</h1>
        <p className="mt-2 text-muted-foreground">
          Every template opens with sample content you can edit. No account required.
        </p>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">Start from a role example (optional)</p>
        <div className="flex flex-wrap gap-2">
          {RESUME_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() =>
                setSelectedExample(selectedExample === ex.id ? null : ex.id)
              }
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                selectedExample === ex.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "hover:bg-muted"
              )}
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium",
              category === cat.id
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            onSelect={(id) => onSelect(id, selectedExample ?? undefined)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="outline" onClick={onBlank}>
          <FileText className="mr-2 h-4 w-4" />
          Start blank (no sample data)
        </Button>
        <p className="text-xs text-muted-foreground">
          Saves automatically in your browser
        </p>
      </div>
    </div>
  );
}

export function TemplatePickerScreen() {
  const router = useRouter();
  const createResumeFromTemplate = useResumeStore((s) => s.createResumeFromTemplate);

  const goToBuilder = (resumeId: string) => {
    router.push(`/builder?r=${resumeId}`);
  };

  const handleSelect = (templateId: TemplateId, exampleId?: string) => {
    const id = createResumeFromTemplate(templateId, { exampleId });
    goToBuilder(id);
  };

  const handleBlank = () => {
    const id = createResumeFromTemplate("classic", { empty: true });
    goToBuilder(id);
  };

  return <TemplatePicker onSelect={handleSelect} onBlank={handleBlank} />;
}
