import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Examples by Role | ResumeCraft",
  description:
    "Software engineer, product manager, nurse, student, and more — start from a real-world resume example and customize in minutes.",
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
