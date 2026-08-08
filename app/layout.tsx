import type { Metadata, Viewport } from "next";
import { Manrope, Oxanium } from "next/font/google";
import "./globals.css";

import { MotionRoot } from "@/components/animation/MotionRoot";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { company } from "@/data/company";
import { SITE_URL } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/**
 * TYPOGRAPHY
 *
 * Oxanium for display: a broad, geometric, engineered face chosen to relate to
 * the ANTONIO MARCO wordmark's squared, technical character without imitating
 * its proprietary lettering. Manrope for body and UI — neutral, highly legible
 * at small sizes, and quiet enough to let the display type carry the identity.
 *
 * Both are open-source and self-hosted by next/font, so there is no external
 * font request, no third-party connection, and no layout shift on swap.
 */
const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.brand} — International Commodity Sourcing & Trading`,
    template: `%s — ${company.brand}`,
  },
  description: company.summary,
  applicationName: company.brand,
  authors: [{ name: company.legalName }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: company.brand,
    locale: "en_IN",
    url: SITE_URL,
    title: `${company.brand} — International Commodity Sourcing & Trading`,
    description: company.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.brand} — International Commodity Sourcing & Trading`,
    description: company.summary,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oxanium.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="label-xs sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-5 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>

        <MotionRoot />
        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />

        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
