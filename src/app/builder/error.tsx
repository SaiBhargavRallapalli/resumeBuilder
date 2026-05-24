"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BuilderError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-xl font-semibold">Builder error</h2>
      <p className="text-center text-muted-foreground">
        The editor encountered a problem. Your saved resumes are still in your browser.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Reload editor</Button>
        <Button variant="outline" asChild>
          <Link href="/builder/new">Pick a template</Link>
        </Button>
      </div>
    </div>
  );
}
