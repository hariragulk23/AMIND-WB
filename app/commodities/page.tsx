import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { commodities } from "@/data/commodities";
import { pageMetadata } from "@/lib/seo";
import { travel } from "@/lib/motion";

export const metadata: Metadata = pageMetadata({
  title: "Commodity Platforms",
  description:
    "Coffee, teak, spices and nuts — four platforms sourced and traded B2B from India for international buyers. Specifications confirmed per enquiry.",
  path: "/commodities",
});

/**
 * /commodities — the platform index.
 *
 * Driven entirely by data/commodities.ts, so adding a fifth platform requires
 * no change to this file.
 */
export default function CommoditiesPage() {
  return (
    <>
      <PageHero
        headingLines={["Commodity", "platforms"]}
        intro="Four platforms, each handled on its own specifications, documentation and sourcing routes. Grades, origins and availability are confirmed per enquiry rather than published as a catalogue."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Commodities", path: "/commodities" },
        ]}
      />

      <section className="bg-paper text-on-light">
        <Container className="section-y-sm">
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {commodities.map((commodity) => (
              <Reveal as="li" key={commodity.slug} y={travel.sm}>
                <Link
                  href={`/commodities/${commodity.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden">
                    <Media
                      imageKey={commodity.tileImage}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="transition-transform duration-[1400ms] ease-brand group-hover:scale-[1.05]"
                    />
                  </div>

                  <p className="label-xs mt-6 text-brass-deep">
                    {commodity.index}
                  </p>
                  <h2 className="display-lg mt-3 text-on-light">
                    {commodity.name}
                  </h2>
                  <p className="measure mt-4 text-on-light-muted">
                    {commodity.summary}
                  </p>
                  <span className="label-xs mt-6 inline-flex items-center gap-3 text-on-light transition-colors duration-300 ease-brand group-hover:text-brass-deep">
                    Explore
                    <span className="sr-only">{commodity.name}</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <EnquiryBanner />
    </>
  );
}
