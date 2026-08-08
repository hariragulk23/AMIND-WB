/**
 * lib/seo.ts
 * ---------------------------------------------------------------------------
 * Metadata helpers. Every route builds its metadata through `pageMetadata` so
 * titles, canonicals, Open Graph and Twitter tags stay consistent.
 *
 * Canonical domain: https://amglobalcommodities.com
 */

import type { Metadata } from "next";
import { company } from "@/data/company";

export const SITE_URL = company.url;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/commodities/coffee". */
  path: string;
  /** Set false for utility pages that should not be indexed. */
  index?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: company.brand,
      title,
      description,
      url,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
