import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/lib/data/templates";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://resume.devbench.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/builder/new`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // One URL per template for SEO — these resolve to /builder/new?template=<id>
  // but help search engines discover template-specific landing pages
  const templateRoutes: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${baseUrl}/builder/new?template=${t.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...templateRoutes];
}
