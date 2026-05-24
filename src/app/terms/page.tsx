import Link from "next/link";

export const metadata = {
  title: "Terms of Service | ResumeCraft",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: May 22, 2026</p>

      <h2>Acceptance</h2>
      <p>
        By using ResumeCraft, you agree to these terms. The service is provided free of charge
        for personal job-search use.
      </p>

      <h2>Service</h2>
      <p>
        ResumeCraft provides resume templates, editing tools, ATS scoring guidance, and PDF export.
        AI suggestions are assistive only — you are responsible for reviewing all content before submitting to employers.
      </p>

      <h2>No warranty</h2>
      <p>
        The service is provided &quot;as is.&quot; We do not guarantee interview outcomes, ATS parsing
        by every employer system, or uninterrupted availability.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the service for unlawful purposes</li>
        <li>Do not attempt to disrupt or reverse-engineer the platform</li>
        <li>Do not submit false or misleading information in resumes you create</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Templates and site content are owned by ResumeCraft. You retain ownership of the resume
        content you create.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. Continued use after changes constitutes acceptance.</p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </article>
  );
}
