"use client";

import { useState } from "react";
import Link from "next/link";
import { TemplateCard } from "@/components/resume/template-card";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
export default function TemplatesPage() {
  const [category, setCategory] = useState<string>("all");

  const filtered =
    category === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Resume Templates</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          ATS-tested designs for every industry. Customize any template in one click.
        </p>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/builder?new=1">Start with a template</Link>
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
          <TemplateCard
            key={t.id}
            template={t}
            onSelect={() => {
              window.location.href = `/builder?new=1&template=${t.id}`;
            }}
          />
        ))}
      </div>
    </div>
  );
}
