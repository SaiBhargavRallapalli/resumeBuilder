"use client";

import { useRouter } from "next/navigation";
import { RESUME_EXAMPLES } from "@/lib/data/resume-examples";
import { getTemplate } from "@/lib/data/templates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function ExamplesPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Resume Examples</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Real-world examples by role. Use as a starting point — customize every section.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RESUME_EXAMPLES.map((ex) => {
          const template = getTemplate(ex.templateId);
          return (
            <article
              key={ex.id}
              className="flex flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{ex.title}</h2>
                  <p className="text-sm text-muted-foreground">{ex.industry}</p>
                </div>
                <Badge variant="secondary">{template.name}</Badge>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {ex.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-700">
                <Shield className="h-3 w-3" />
                ATS {template.atsScore}%
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() =>
                  router.push(
                    `/builder/new?template=${ex.templateId}&example=${ex.id}`
                  )
                }
              >
                Use this example
              </Button>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        All examples are fictional and for demonstration. No account required.
      </p>
    </div>
  );
}
