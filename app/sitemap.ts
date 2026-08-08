import type { MetadataRoute } from "next";
import { commodities } from "@/data/commodities";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap. Commodity routes are derived from data/commodities.ts, so adding a
 * platform there also adds it here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/commodities", priority: 0.9 },
    { path: "/sourcing-trade", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/quality-compliance", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...commodities.map((commodity) => ({
      url: absoluteUrl(`/commodities/${commodity.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
