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
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "ATS-Optimized Templates",
    description:
      "Templates tested for Applicant Tracking Systems. Single-column layouts, standard fonts, and clean structure so recruiters see you.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "AI Resume Assistant",
    description:
      "Generate summaries, enhance bullet points with action verbs and metrics, and match keywords from any job description.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Target,
    title: "Real-Time ATS Score",
    description:
      "Live compatibility score with actionable checklist. Paste a job posting and see which keywords you're missing.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Palette,
    title: "One-Click Customization",
    description:
      "Change templates, colors, fonts, and margins instantly. Preview updates in real time as you type.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Download,
    title: "Free PDF Download",
    description:
      "Download high-quality PDF resumes at no cost. No credit card, no hidden subscriptions.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Zap,
    title: "Build in 5 Minutes",
    description:
      "Step-by-step editor with pre-written examples for every section. Start from scratch or use a sample resume.",
    color: "bg-orange-50 text-orange-600",
  },
];

const STATS = [
  { value: "10K+", label: "Resumes built" },
  { value: "14", label: "Unique templates" },
  { value: "99%", label: "ATS pass rate" },
  { value: "Free", label: "Always & forever" },
];

const STEPS = [
  { step: "1", title: "Choose a template", desc: "Pick from ATS-friendly, modern, or professional designs that match your industry." },
  { step: "2", title: "Fill your details", desc: "Add experience, education, and skills with AI-powered writing suggestions." },
  { step: "3", title: "Optimize for ATS", desc: "Paste the job description and boost your compatibility score instantly." },
  { step: "4", title: "Download & apply", desc: "Export a crisp, text-searchable PDF and land more interviews." },
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
    text: "The ATS checker helped me add missing keywords. I got 3 interviews in the first week after updating my resume.",
    author: "Sarah K.",
    role: "Product Manager",
  },
  {
    text: "Finally a resume builder that's actually free. The PDF quality is professional and the templates look great.",
    author: "James L.",
    role: "Software Engineer",
  },
  {
    text: "AI bullet enhancement saved me hours. My resume sounds so much more impactful now. Highly recommend.",
    author: "Priya R.",
    role: "Data Analyst",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/90 via-blue-50/20 to-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent)]" />
        {/* Subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #1e293b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1 text-xs font-medium">
              <Shield className="h-3 w-3 text-primary" />
              ATS-Friendly · Free Forever · No Sign-up
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build a resume that beats the{" "}
              <span className="text-primary">ATS</span> and impresses recruiters
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Professional templates, AI-powered writing, and real-time ATS scoring.
              Create your standout resume in as little as 5 minutes — completely free.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-12 gap-2 px-8 text-base shadow-md" asChild>
                <Link href="/builder/new">
                  <FileText className="h-5 w-5" />
                  Build Your Resume Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 px-8" asChild>
                <Link href="/templates">
                  Browse Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No account needed · Saves in your browser · Unlimited PDF downloads
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium text-primary">Why ResumeCraft</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to get hired
            </h2>
            <p className="mt-3 text-muted-foreground">
              Inspired by the best resume builders — built better for ATS and ease of use
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-muted/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium text-primary">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get hired in 4 easy steps
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[calc(50%+28px)] top-5 hidden h-px w-[calc(100%-56px)] border-t-2 border-dashed border-primary/20 lg:block" />
                )}
                <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md shadow-primary/20">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="h-12 gap-2 px-8" asChild>
              <Link href="/builder/new">
                Start Building Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Templates preview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm font-medium text-primary">Templates</p>
              <h2 className="text-3xl font-bold tracking-tight">
                Professional designs for every role
              </h2>
              <p className="mt-2 text-muted-foreground">
                ATS-tested layouts that recruiters trust
              </p>
            </div>
            <Button variant="outline" className="shrink-0 gap-1" asChild>
              <Link href="/templates">
                View all {TEMPLATES.length} templates
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.filter((t) => t.popular).map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.08),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to land your dream job?
          </h2>
          <p className="mt-4 text-lg opacity-85">
            Join thousands of job seekers using ResumeCraft to build ATS-winning resumes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-12 gap-2 bg-white px-8 text-primary shadow-lg hover:bg-white/90"
            asChild
          >
            <Link href="/builder/new">
              <FileText className="h-5 w-5" />
              Create My Resume — It&apos;s Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium text-primary">Testimonials</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by job seekers
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-5 flex items-center gap-3 border-t pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/40 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium text-primary">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="flex items-start gap-2.5 font-semibold">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item.q}
                </h3>
                <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
