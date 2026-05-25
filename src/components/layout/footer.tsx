import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-4 w-4" />
              </div>
              Resume<span className="text-primary">Craft</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Free ATS-friendly resume builder. Build, optimize, and download in minutes. No account needed.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/builder" className="transition-colors hover:text-foreground">Resume Builder</Link></li>
              <li><Link href="/templates" className="transition-colors hover:text-foreground">Templates</Link></li>
              <li><Link href="/examples" className="transition-colors hover:text-foreground">Examples</Link></li>
              <li><Link href="/builder" className="transition-colors hover:text-foreground">ATS Checker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/#faq" className="transition-colors hover:text-foreground">FAQ</Link></li>
              <li><Link href="/#features" className="transition-colors hover:text-foreground">Features</Link></li>
              <li><Link href="/templates" className="transition-colors hover:text-foreground">Resume Examples</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeCraft. Built for job seekers worldwide.
          </p>
          <p className="text-xs text-muted-foreground">
            100% free · No account required · Open for everyone
          </p>
        </div>
      </div>
    </footer>
  );
}
