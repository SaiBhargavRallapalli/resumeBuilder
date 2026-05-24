"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TemplateCard } from "@/components/resume/template-card";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import type { TemplateId } from "@/lib/types/resume";
import { Search, Shield, Sparkles } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list =
      category === "all"
        ? TEMPLATES
        : TEMPLATES.filter((t) => t.category === category);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.recommendedFor.some((r) => r.toLowerCase().includes(q))
      );
    }

    return list;
  }, [category, query]);

  const popular = TEMPLATES.filter((t) => t.popular);
  const showPopularSection = category === "all" && !query.trim();
  const gridTemplates = showPopularSection
    ? filtered.filter((t) => !t.popular)
    : filtered;

  const handleSelect = (templateId: TemplateId) => {
    router.push(`/builder/new?template=${templateId}`);
  };

  return (
    <div className="pb-20">
      <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {TEMPLATES.length} professionally designed layouts
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Resume Templates
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick a design, edit with sample content, and download an ATS-friendly PDF —
              no account required.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-600" />
                ATS-tested layouts
              </span>
              <span className="hidden sm:inline">·</span>
              <span>Live preview while editing</span>
              <span className="hidden sm:inline">·</span>
              <span>Free PDF export</span>
            </div>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/builder/new">Start with a template</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="sticky top-[57px] z-20 -mx-4 border-b bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:top-[65px] sm:mx-0 sm:px-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates, roles, tags…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filtered.length} template{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === cat.id
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "bg-card hover:border-primary/40 hover:bg-muted/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {showPopularSection && popular.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Most popular</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Trusted by job seekers across industries
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((t) => (
                <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
              ))}
            </div>
          </section>
        )}

        {(gridTemplates.length > 0 || !showPopularSection) && (
          <section
            className={cn(
              "mt-12",
              showPopularSection && gridTemplates.length > 0 && "mt-16"
            )}
          >
            {showPopularSection && gridTemplates.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold">More templates</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every layout opens with editable sample content
                </p>
              </div>
            )}

            {gridTemplates.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
                <p className="font-medium">No templates match your search</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different keyword or clear filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridTemplates.map((t) => (
                  <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
