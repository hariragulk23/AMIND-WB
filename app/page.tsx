import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { CommoditiesGrid } from "@/components/sections/home/CommoditiesGrid";
import { Faq } from "@/components/sections/home/Faq";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { GlobalTrade } from "@/components/sections/home/GlobalTrade";
import { Hero } from "@/components/sections/home/Hero";
import { HowWeWork } from "@/components/sections/home/HowWeWork";
import { Positioning } from "@/components/sections/home/Positioning";
import { Trust } from "@/components/sections/home/Trust";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

/**
 * The commodity journey is the heaviest interactive section on the page and
 * sits entirely below the fold. Loading it through `next/dynamic` keeps its
 * JavaScript out of the initial bundle without delaying the hero.
 *
 * `ssr` is left enabled so the four commodity panels are still present in the
 * server-rendered HTML for search engines and for visitors without JavaScript.
 */
const CommodityJourney = dynamic(
  () =>
    import("@/components/sections/home/CommodityJourney").then(
      (mod) => mod.CommodityJourney,
    ),
  { loading: () => <div className="min-h-screen-safe bg-ink" /> },
);

export const metadata: Metadata = pageMetadata({
  title: `${company.brand} — International Commodity Sourcing & Trading`,
  description: company.summary,
  path: "/",
});

/**
 * HOMEPAGE
 *
 * A Server Component that composes eight independent sections. There is no
 * page-level state and no monolithic component — each section owns its own
 * markup, and every one of them reads its copy from data/home.ts,
 * data/commodities.ts, data/compliance.ts or data/company.ts.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CommodityJourney />
      <Positioning />
      <GlobalTrade />
      <HowWeWork />
      <CommoditiesGrid />
      <Trust />
      {/* Placed after the corporate facts and before the CTA: a buyer who
          has read this far has the specifics, and these are the questions
          that remain immediately before deciding to enquire. */}
      <Faq />
      <FinalCta />
    </>
  );
}
