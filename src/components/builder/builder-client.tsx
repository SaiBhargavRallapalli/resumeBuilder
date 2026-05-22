"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/lib/store/resume-store";
import { ResumePreview } from "@/components/resume/resume-preview";
import { ResumeEditor } from "@/components/builder/resume-editor";
import { ATSPanel } from "@/components/builder/ats-panel";
import { StylePanel } from "@/components/builder/style-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { downloadResumePDF, exportResumeJSON } from "@/lib/export/pdf";
import type { TemplateId } from "@/lib/types/resume";
import {
  Download,
  FileJson,
  Plus,
  Printer,
  Shield,
  Palette,
  Pencil,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { analyzeATS } from "@/lib/ats/analyzer";

export function BuilderClient() {
  const searchParams = useSearchParams();
  const {
    resumes,
    activeResumeId,
    jobDescription,
    getActiveResume,
    createResume,
    setActiveResume,
    setTemplate,
    updateResume,
    importResume,
  } = useResumeStore();

  const [sidePanel, setSidePanel] = useState<"edit" | "style" | "ats">("edit");
  const [downloading, setDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isNew = searchParams.get("new");
    const sample = searchParams.get("sample");
    const template = searchParams.get("template") as TemplateId | null;

    if (isNew && resumes.length === 0) {
      const id = createResume(undefined, sample === "1");
      if (template) setTemplate(id, template);
    } else if (isNew && activeResumeId === null && resumes.length > 0) {
      const id = createResume(undefined, sample === "1");
      if (template) setTemplate(id, template);
    } else if (template && activeResumeId) {
      setTemplate(activeResumeId, template);
    } else if (resumes.length === 0) {
      createResume(undefined, true);
    } else if (!activeResumeId && resumes.length > 0) {
      setActiveResume(resumes[0].id);
    }
  }, [
    mounted,
    searchParams,
    resumes.length,
    activeResumeId,
    createResume,
    setActiveResume,
    setTemplate,
  ]);

  const resume = getActiveResume();

  if (!mounted) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No resume selected</p>
        <Button onClick={() => createResume(undefined, true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create new resume
        </Button>
      </div>
    );
  }

  const analysis = analyzeATS(resume, jobDescription);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const name =
        resume.sections.contact.fullName.replace(/\s+/g, "_") || "resume";
      await downloadResumePDF("resume-preview", `${name}_resume.pdf`);
    } catch (e) {
      console.error(e);
      alert("Download failed. Try print instead.");
    } finally {
      setDownloading(false);
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        importResume(data);
      } catch {
        alert("Invalid resume file");
      }
    };
    input.click();
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Input
            className="h-8 w-48 border-0 bg-transparent font-semibold focus-visible:ring-0"
            value={resume.title}
            onChange={(e) =>
              updateResume(resume.id, { title: e.target.value })
            }
          />
          {resumes.length > 1 && (
            <select
              className="rounded border px-2 py-1 text-sm"
              value={activeResumeId ?? ""}
              onChange={(e) => setActiveResume(e.target.value)}
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center gap-2 rounded-full border px-3 py-1 text-sm sm:flex"
            title="ATS Score"
          >
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium">{analysis.score}% ATS</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => createResume()}>
            <Plus className="mr-1 h-3 w-3" />
            New
          </Button>
          <Button size="sm" variant="outline" onClick={handleImport}>
            <FileJson className="mr-1 h-3 w-3" />
            Import
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              exportResumeJSON(resume, `${resume.title}.json`)
            }
          >
            Export
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="mr-1 h-3 w-3" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={downloading}>
            <Download className="mr-1 h-3 w-3" />
            {downloading ? "..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full flex-col border-r lg:w-[420px] lg:shrink-0">
          <div className="flex border-b">
            {(
              [
                { id: "edit" as const, icon: Pencil, label: "Edit" },
                { id: "style" as const, icon: Palette, label: "Design" },
                { id: "ats" as const, icon: Shield, label: "ATS" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSidePanel(tab.id)}
                className={`flex flex-1 items-center justify-center gap-1 border-b-2 py-3 text-sm font-medium ${
                  sidePanel === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {sidePanel === "edit" && <ResumeEditor resume={resume} />}
            {sidePanel === "style" && (
              <div className="overflow-y-auto p-4">
                <StylePanel resume={resume} />
              </div>
            )}
            {sidePanel === "ats" && (
              <div className="overflow-y-auto p-4">
                <ATSPanel resume={resume} />
              </div>
            )}
          </div>
        </div>

        <div className="hidden flex-1 flex-col overflow-hidden bg-slate-100 lg:flex">
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-[210mm]">
              <ResumePreview resume={resume} id="resume-preview" />
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 lg:hidden">
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="max-h-[50vh] overflow-auto p-2">
              <ResumePreview resume={resume} scale={0.45} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
