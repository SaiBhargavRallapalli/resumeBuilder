import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "@/components/resume/template-card";
import { TEMPLATES } from "@/lib/data/templates";
import {
  Shield,
  Sparkles,
  Download,
  Zap,
  CheckCircle2,
  Star,
  FileText,
  Target,
  Palette,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "ATS-Optimized Templates",
    description:
      "Templates tested for Applicant Tracking Systems. Single-column layouts, standard fonts, and clean structure so recruiters see you.",
  },
  {
    icon: Sparkles,
    title: "AI Resume Assistant",
    description:
      "Generate summaries, enhance bullet points with action verbs and metrics, and match keywords from any job description.",
  },
  {
    icon: Target,
    title: "Real-Time ATS Score",
    description:
      "Live compatibility score with actionable checklist. Paste a job posting and see which keywords you're missing.",
  },
  {
    icon: Palette,
    title: "One-Click Customization",
    description:
      "Change templates, colors, fonts, and margins instantly. Preview updates in real time as you type.",
  },
  {
    icon: Download,
    title: "Free PDF Download",
    description:
      "Download high-quality PDF resumes at no cost. No credit card, no hidden subscriptions.",
  },
  {
    icon: Zap,
    title: "Build in 5 Minutes",
    description:
      "Step-by-step editor with pre-written examples for every section. Start from scratch or use a sample resume.",
  },
];

const STEPS = [
  { step: "1", title: "Choose a template", desc: "Pick from ATS-friendly, modern, or professional designs." },
  { step: "2", title: "Fill your details", desc: "Add experience, education, and skills with AI suggestions." },
  { step: "3", title: "Optimize for ATS", desc: "Paste the job description and boost your compatibility score." },
  { step: "4", title: "Download & apply", desc: "Export a crisp PDF and land more interviews." },
];

const FAQ = [
  {
    q: "Is ResumeCraft really free?",
    a: "Yes. Build, customize, and download your resume as PDF completely free. No credit card required.",
  },
  {
    q: "What makes a resume ATS-friendly?",
    a: "Use standard section headings, readable fonts, no tables or graphics in critical areas, and keywords from the job description. Our ATS checker guides you through each requirement.",
  },
  {
    q: "Can I create multiple resumes?",
    a: "Yes. Create unlimited resumes tailored to different roles. All saved locally in your browser.",
  },
  {
    q: "How does AI optimization work?",
    a: "Our assistant enhances bullet points with strong verbs and metrics, generates professional summaries, and matches keywords from job postings you paste.",
  },
  {
    q: "Which template should I use?",
    a: "For strict ATS systems, choose Classic or Minimal. For creative roles, try Modern or Creative. Our ATS score shows compatibility for each template.",
  },
];

const TESTIMONIALS = [
  {
    text: "The ATS checker helped me add missing keywords. I got 3 interviews in the first week.",
    author: "Sarah K., Product Manager",
  },
  {
    text: "Finally a resume builder that's actually free. The PDF quality is professional.",
    author: "James L., Software Engineer",
  },
  {
    text: "AI bullet enhancement saved me hours. My resume sounds so much more impactful now.",
    author: "Priya R., Data Analyst",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-1 h-3 w-3" />
              ATS-Friendly · Free Forever
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build a resume that beats the{" "}
              <span className="text-primary">ATS</span> and impresses recruiters
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Professional templates, AI-powered writing, and real-time ATS scoring.
              Create your standout resume in as little as 5 minutes — completely free.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/builder?new=1&sample=1">
                  <FileText className="mr-2 h-5 w-5" />
                  Build Your Resume Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · Unlimited downloads
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.9/5 user rating
              </span>
              <span>·</span>
              <span>8 ATS-optimized templates</span>
              <span>·</span>
              <span>100% free PDF export</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 opacity-60 grayscale sm:px-6">
          {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map(
            (co) => (
              <span key={co} className="text-lg font-semibold">
                {co}
              </span>
            )
          )}
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Everything you need to get hired</h2>
            <p className="mt-3 text-muted-foreground">
              Inspired by the best resume builders — built better for ATS and ease of use
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">Get hired in 4 easy steps</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/builder?new=1">Start Building Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold">Professional templates</h2>
              <p className="mt-2 text-muted-foreground">
                ATS-tested designs recruiters trust
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/templates">View all templates</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.slice(0, 4).map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Ready to land your dream job?</h2>
          <p className="mt-4 opacity-90">
            Join thousands of job seekers using ResumeCraft to build ATS-winning resumes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-12 bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/builder?new=1">Create My Resume — It&apos;s Free</Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">Loved by job seekers</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-xl border bg-card p-6"
              >
                <p className="text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-4 font-medium">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">
            Frequently asked questions
          </h2>
          <div className="mt-12 space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border bg-card p-6">
                <h3 className="flex items-start gap-2 font-semibold">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item.q}
                </h3>
                <p className="mt-3 pl-7 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
