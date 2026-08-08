import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CommodityDetail } from "@/components/commodities/CommodityDetail";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";
import { commodities, getCommodity } from "@/data/commodities";
import { pageMetadata } from "@/lib/seo";

/** Statically render one page per commodity in data/commodities.ts. */
export function generateStaticParams() {
  return commodities.map((commodity) => ({ slug: commodity.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/commodities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const commodity = getCommodity(slug);

  if (!commodity) return pageMetadata({
    title: "Commodity not found",
    description: "The requested commodity platform could not be found.",
    path: "/commodities",
    index: false,
  });

  return pageMetadata({
    title: commodity.name,
    description: `${commodity.summary} ${commodity.sourcingApproach}`,
    path: `/commodities/${commodity.slug}`,
  });
}

/**
 * COMMODITY PAGE TEMPLATE
 *
 * A single template serving every commodity. All page content comes from
 * data/commodities.ts — nothing is hard-coded per commodity here, so a new
 * platform gets a complete page the moment it is added to that file.
 */
export default async function CommodityPage({
  params,
}: PageProps<"/commodities/[slug]">) {
  const { slug } = await params;
  const commodity = getCommodity(slug);

  if (!commodity) notFound();

  return (
    <>
      <PageHero
        headingLines={[commodity.name]}
        intro={commodity.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Commodities", path: "/commodities" },
          { name: commodity.name, path: `/commodities/${commodity.slug}` },
        ]}
      />

      <CommodityDetail commodity={commodity} />

      <EnquiryBanner
        headingLines={["Enquire about", commodity.name.toLowerCase() + "."]}
        intro={`Send the specification, quantity and destination for ${commodity.name.toLowerCase()}. We will come back with a clear view of whether and how it can be sourced.`}
      />
    </>
  );
}
