"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TemplateCard } from "@/components/resume/template-card";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { TemplateId } from "@/lib/types/resume";
import { Shield } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === category);

  const handleSelect = (templateId: TemplateId) => {
    router.push(`/builder/new?template=${templateId}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Resume Templates</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {TEMPLATES.length} professionally designed, ATS-tested templates. No sign-in required.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-emerald-600" />
            ATS-tested layouts
          </span>
          <span>·</span>
          <span>One-click customization</span>
          <span>·</span>
          <span>Free PDF download</span>
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/builder/new">Start with a template</Link>
        </Button>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === cat.id
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
