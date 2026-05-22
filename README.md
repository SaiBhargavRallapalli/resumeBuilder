# ResumeCraft — ATS-Friendly Resume Builder

A modern, free resume builder with ATS optimization, AI-assisted writing, professional templates, and instant PDF download.

Inspired by best-in-class tools ([ResumeGemini](https://resumegemini.com), [Enhancv](https://enhancv.com), [resume.io](https://resume.io), [Kickresume](http://kickresume.com), [Kittl](https://www.kittl.com/create/resumes)) — built to be faster, clearer, and fully ATS-focused.

## Features

- **8 professional templates** — Classic, Minimal, Modern, Double Column, Executive, and more
- **Real-time ATS score** — Live checklist + keyword matching from job descriptions
- **AI assistant** — Generate summaries, enhance bullets with metrics and action verbs
- **Live preview** — See changes instantly as you type
- **Free PDF download** — No credit card, no paywall
- **Multiple resumes** — Saved locally in your browser
- **Import/Export JSON** — Backup and restore resumes

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Zustand** (persisted state)
- **html2canvas + jsPDF** (PDF export)

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
