import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <FileText className="h-5 w-5 text-primary" />
              ResumeCraft
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Free ATS-friendly resume builder. Build, optimize, and download in minutes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/builder" className="hover:text-foreground">Resume Builder</Link></li>
              <li><Link href="/templates" className="hover:text-foreground">Templates</Link></li>
              <li><Link href="/examples" className="hover:text-foreground">Examples</Link></li>
              <li><Link href="/builder" className="hover:text-foreground">ATS Checker</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="/templates" className="hover:text-foreground">Resume Examples</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeCraft. Built for job seekers worldwide.
        </p>
      </div>
    </footer>
  );
}
