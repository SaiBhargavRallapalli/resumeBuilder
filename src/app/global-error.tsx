"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 font-sans">
        <h1 className="text-2xl font-bold">ResumeCraft</h1>
        <p className="text-muted-foreground">A critical error occurred.</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Reload app
        </button>
      </body>
    </html>
  );
}
