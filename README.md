# ResumeCraft — ATS-Friendly Resume Builder

A modern, free resume builder with ATS optimization, AI-assisted writing, professional templates, and instant PDF download.

Inspired by best-in-class tools ([ResumeGemini](https://resumegemini.com), [Enhancv](https://enhancv.com), [resume.io](https://resume.io), [Kickresume](http://kickresume.com), [Kittl](https://www.kittl.com/create/resumes)) — built to be faster, clearer, and fully ATS-focused.

## Features

- **14 professional templates** — Classic, Ivy League, Minimal, Modern, Double Column, Timeline, Executive, and more
- **Real-time ATS score** — Live checklist + keyword matching from job descriptions
- **AI assistant** — Generate summaries, enhance bullets with metrics and action verbs
- **Live preview** — See changes instantly as you type
- **Free PDF download** — No credit card, no paywall
- **Multiple resumes** — Saved locally in your browser
- **Import/Export JSON** — Backup and restore resumes

## Production features

- **Text-based PDF export** — Server-generated, selectable text (ATS-parseable) via `/api/export-pdf`
- **Zod validation** — Safe JSON import with schema validation
- **Error boundaries** — App-level and builder-level error recovery
- **AI API** — `/api/ai` with OpenAI when `OPENAI_API_KEY` is set; local fallback otherwise
- **CI/CD** — GitHub Actions (lint, build, Playwright smoke tests)
- **Security headers** — X-Frame-Options, CSP-adjacent headers in `next.config.ts`
- **Legal pages** — `/privacy` and `/terms`

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/templates` | Browse 14 ATS-tested templates |
| `/examples` | Role-based resume examples (SWE, PM, Nurse, etc.) |
| `/builder/new` | Pick a template (opens with sample data) |
| `/builder` | Editor with live preview, ATS checker, PDF export |

## Deploy to Vercel

```bash
npm install -g vercel   # if needed
vercel                  # preview
vercel --prod           # production
```

Set optional env var `NEXT_PUBLIC_APP_URL` to your production domain for sitemap/SEO.

Analytics (`@vercel/analytics`) activates automatically on Vercel — no config needed.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Zustand** (persisted state)
- **html2canvas + jsPDF** (PDF export)
- **@vercel/analytics** (production metrics)

## Project Structure

```
src/
├── app/              # Pages (landing, builder, templates)
├── components/
│   ├── builder/      # Editor, ATS panel, style panel
│   ├── resume/       # Preview & template cards
│   └── ui/           # Shared UI primitives
└── lib/
    ├── ats/          # ATS analyzer & AI helpers
    ├── data/         # Templates & content suggestions
    ├── store/        # Zustand resume store
    └── types/        # TypeScript types
```

## ATS Best Practices (built-in)

1. Use **Classic** or **Minimal** templates for strict ATS
2. Include quantified achievements (numbers, %, $)
3. Paste job descriptions in the ATS panel for keyword matching
4. Use standard fonts (Arial, Georgia, Times)
5. Keep section headings standard: Experience, Education, Skills

## License

MIT
