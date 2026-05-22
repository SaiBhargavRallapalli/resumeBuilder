import { Suspense } from "react";
import { BuilderClient } from "@/components/builder/builder-client";

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <p className="text-muted-foreground">Loading builder...</p>
        </div>
      }
    >
      <BuilderClient />
    </Suspense>
  );
}
