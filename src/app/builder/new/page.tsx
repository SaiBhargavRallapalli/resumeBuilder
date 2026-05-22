"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TemplatePickerScreen } from "@/components/builder/template-picker";
import { useResumeStore } from "@/lib/store/resume-store";
import type { TemplateId } from "@/lib/types/resume";

function NewResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { _hasHydrated, setHasHydrated, createResumeFromTemplate } =
    useResumeStore();

  useEffect(() => {
    const unsub = useResumeStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    if (useResumeStore.persist.hasHydrated()) setHasHydrated(true);
    return unsub;
  }, [setHasHydrated]);

  useEffect(() => {
    if (!_hasHydrated) return;
    const template = searchParams.get("template") as TemplateId | null;
    const example = searchParams.get("example");
    if (template) {
      createResumeFromTemplate(template, {
        exampleId: example ?? undefined,
        empty: !example,
      });
      router.replace("/builder");
    }
  }, [_hasHydrated, searchParams, createResumeFromTemplate, router]);

  const template = searchParams.get("template");
  if (template) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Setting up your resume...</p>
      </div>
    );
  }

  return <TemplatePickerScreen />;
}

export default function NewResumePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <NewResumeContent />
    </Suspense>
  );
}
