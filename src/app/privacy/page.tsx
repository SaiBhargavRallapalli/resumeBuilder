import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | ResumeCraft",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: May 22, 2026</p>

      <h2>Overview</h2>
      <p>
        ResumeCraft is a free resume builder. We designed it so you can build resumes
        without creating an account.
      </p>

      <h2>Data we store</h2>
      <ul>
        <li>
          <strong>Resume data</strong> — Stored locally in your browser (localStorage).
          We do not upload your resume content to our servers unless you use optional AI features.
        </li>
        <li>
          <strong>Analytics</strong> — We use Vercel Analytics to collect anonymous page views
          and performance metrics. No personal resume content is included.
        </li>
        <li>
          <strong>AI features</strong> — If enabled, summary/bullet enhancement sends text
          you submit to our AI provider. Set <code>OPENAI_API_KEY</code> on the server only;
          keys are never exposed to the browser.
        </li>
      </ul>

      <h2>Data we do not collect</h2>
      <p>
        We do not require sign-in, do not sell your data, and do not share resume content
        with recruiters or third parties for marketing.
      </p>

      <h2>Your choices</h2>
      <p>
        Clear browser storage to delete all saved resumes. Export JSON backups anytime from the builder.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Open an issue on our repository or contact the site administrator.
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </article>
  );
}
