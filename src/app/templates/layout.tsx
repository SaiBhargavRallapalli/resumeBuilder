import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Templates — 14 ATS-Friendly Designs | ResumeCraft",
  description:
    "Browse 14 professionally designed, ATS-tested resume templates. Free to use with sample content — no account required.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
