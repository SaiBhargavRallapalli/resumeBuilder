import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://resume.devbench.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/templates", "/examples", "/builder/new", "/privacy", "/terms"],
        disallow: ["/api/", "/builder?", "/_next/"],
      },
      {
        // Allow Google AdSense crawler
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        // Allow AI/LLM crawlers to public pages only
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-Web", "PerplexityBot", "Bytespider"],
        allow: ["/", "/templates", "/examples", "/privacy", "/terms"],
        disallow: ["/api/", "/builder"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
