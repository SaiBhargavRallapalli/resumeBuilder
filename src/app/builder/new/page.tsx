"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TemplatePickerScreen } from "@/components/builder/template-picker";
import { useResumeStore } from "@/lib/store/resume-store";
import type { TemplateId } from "@/lib/types/resume";

function NewResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const started = useRef(false);
  const { _hasHydrated, setHasHydrated, createResumeFromTemplate } =
    useResumeStore();

  useEffect(() => {
    const unsub = useResumeStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    if (useResumeStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }
    return unsub;
  }, [setHasHydrated]);

  useEffect(() => {
    if (!_hasHydrated || started.current) return;

    const template = searchParams.get("template") as TemplateId | null;
    const example = searchParams.get("example");

    if (template) {
      started.current = true;
      const id = createResumeFromTemplate(template, {
        exampleId: example ?? undefined,
      });
      router.replace(`/builder?r=${id}`);
    }
  }, [_hasHydrated, searchParams, createResumeFromTemplate, router]);

  const template = searchParams.get("template");
  if (template) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">Opening template with sample data...</p>
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
