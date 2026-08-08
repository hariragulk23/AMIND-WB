import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
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
 * A high-contrast editorial serif for oversized display type, paired with a
 * neutral grotesque for interface and body copy. Both are open-source and
 * self-hosted by next/font, so there is no external font request, no layout
 * shift from a swap, and no third-party connection.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
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
  themeColor: "#0e0f0d",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable}`}>
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
