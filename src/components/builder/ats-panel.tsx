"use client";

import { useMemo } from "react";
import { analyzeATS } from "@/lib/ats/analyzer";
import type { ResumeDocument } from "@/lib/types/resume";
import { useResumeStore } from "@/lib/store/resume-store";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ATSPanelProps {
  resume: ResumeDocument;
}

export function ATSPanel({ resume }: ATSPanelProps) {
  const jobDescription = useResumeStore((s) => s.jobDescription);
  const setJobDescription = useResumeStore((s) => s.setJobDescription);

  const analysis = useMemo(
    () => analyzeATS(resume, jobDescription),
    [resume, jobDescription]
  );

  const scoreColor =
    analysis.score >= 85
      ? "text-emerald-600"
      : analysis.score >= 60
        ? "text-amber-600"
        : "text-red-600";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">ATS Compatibility Score</p>
            <p className={cn("text-4xl font-bold", scoreColor)}>
              {analysis.score}%
            </p>
          </div>
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold",
              analysis.score >= 85
                ? "bg-emerald-100 text-emerald-700"
                : analysis.score >= 60
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
            )}
          >
            {analysis.score >= 85 ? "A" : analysis.score >= 60 ? "B" : "C"}
          </div>
        </div>
        <Progress value={analysis.score} className="mt-4" />
      </div>

      <div>
        <Label htmlFor="job-description" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Paste job description for keyword matching
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job posting here to optimize keywords..."
          className="mt-2 min-h-[100px]"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      {analysis.keywords.missing.length > 0 && jobDescription.trim() && (
        <div>
          <p className="mb-2 text-sm font-medium">Missing keywords</p>
          <div className="flex flex-wrap gap-1">
            {analysis.keywords.missing.slice(0, 10).map((k) => (
              <Badge key={k} variant="warning">
                {k}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium">ATS Checklist</p>
        <ul className="space-y-2">
          {analysis.checks.map((check) => (
            <li
              key={check.id}
              className="flex items-start gap-2 text-sm"
            >
              {check.passed ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              )}
              <span className={check.passed ? "" : "text-muted-foreground"}>
                {check.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {analysis.suggestions.length > 0 && (
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="mb-2 text-sm font-medium">Suggestions</p>
          <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {analysis.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
