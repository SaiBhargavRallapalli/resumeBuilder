import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
// @ts-ignore: side-effect global CSS import declaration not available in this environment
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://resume.devbench.co.in";

const GTM_ID = "GTM-NBTV4W35";
const GA4_IDS = ["G-V6MSPDCYDK", "G-DN9KYVJHQ2"];

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ResumeCraft — Free ATS Resume Builder",
    template: "%s | ResumeCraft",
  },
  description:
    "Build ATS-friendly resumes in minutes. 14 professional templates, AI writing assistance, real-time ATS scoring, and instant PDF download. No account required — 100% free.",
  keywords: [
    "resume builder",
    "ATS resume builder",
    "free resume builder",
    "CV builder",
    "resume templates",
    "ATS friendly resume",
    "job application resume",
    "resume maker",
    "professional resume",
    "resume PDF download",
  ],
  authors: [{ name: "ResumeCraft" }],
  creator: "ResumeCraft",
  publisher: "ResumeCraft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "ResumeCraft",
    title: "ResumeCraft — Free ATS Resume Builder",
    description:
      "Build ATS-friendly resumes in minutes. 14 professional templates, AI writing assistance, and free PDF download. No account required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeCraft — Free ATS Resume Builder",
    description:
      "14 ATS-optimized templates, AI writing assistance, real-time ATS scoring. Build your resume in 5 minutes — completely free.",
  },
  alternates: {
    canonical: APP_URL,
  },
  other: {
    "google-adsense-account": "ca-pub-6450653669194686",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Google Tag Manager (head) ─────────────────────────── */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>

      <body className={`${inter.variable} font-sans`}>
        {/* ── Google Tag Manager (noscript fallback) ───────────────── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />

        {/* ── Vercel Analytics ─────────────────────────────────────── */}
        <Analytics />

        {/* ── Google Analytics 4 (gtag.js) ─────────────────────────── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_IDS[0]}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_IDS[0]}');
gtag('config', '${GA4_IDS[1]}');`,
          }}
        />

        {/* ── Google AdSense ───────────────────────────────────────── */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6450653669194686"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
