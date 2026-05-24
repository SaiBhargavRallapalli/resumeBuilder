import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ResumeCraft — Free ATS Resume Builder",
  description:
    "Build ATS-friendly resumes in minutes. 14 professional templates with sample content, AI optimization, instant PDF download. No account required.",
  keywords: [
    "resume builder",
    "ATS resume",
    "free resume",
    "CV builder",
    "job application",
  ],
  openGraph: {
    title: "ResumeCraft — Free ATS Resume Builder",
    description:
      "Build ATS-friendly resumes in minutes. No account required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
