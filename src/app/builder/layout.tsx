import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder | ResumeCraft",
  description:
    "Edit your resume with live preview, ATS scoring, and one-click PDF download. Free — no account required.",
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
