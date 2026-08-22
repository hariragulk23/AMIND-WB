import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { sourcingContent } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sourcing & Trade",
  description:
    "How a requirement becomes a shipment: specification, sourcing route, trade terms, documentation and shipment coordination — the same sequence every time.",
  path: "/sourcing-trade",
});

export default function SourcingTradePage() {
  return (
    <>
      <PageHero
        headingLines={["Sourcing", "& Trade"]}
        intro={sourcingContent.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Sourcing & Trade", path: "/sourcing-trade" },
        ]}
      />

      <section
        aria-labelledby="stages-heading"
        className="bg-paper text-on-light"
      >
        <Container className="section-y-sm">
          <Reveal>
            <SectionLabel index="01">The sequence</SectionLabel>
          </Reveal>
          <h2 id="stages-heading" className="sr-only">
            The sourcing and trade sequence
          </h2>

          <ol className="mt-12 border-t border-paper-line">
            {sourcingContent.stages.map((stage) => (
              <Reveal
                as="li"
                key={stage.number}
                className="border-b border-paper-line"
                y={18}
              >
                <div className="grid gap-4 py-9 md:grid-cols-12 md:gap-8 md:py-12">
                  <p className="numeral font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-none text-brand-red md:col-span-2">
                    {stage.number}
                  </p>
                  <h3 className="display-md text-heading md:col-span-4">
                    {stage.title}
                  </h3>
                  <p className="measure text-on-light-muted md:col-span-6">
                    {stage.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="incoterms-heading"
        className="bg-paper text-on-light"
      >
        <Container className="pb-[clamp(5rem,8vw,9rem)]">
          <div className="grid gap-8 border-t border-paper-line pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel index="02">Reference</SectionLabel>
              </Reveal>
              <h2
                id="incoterms-heading"
                className="display-md mt-6 text-on-light"
              >
                {sourcingContent.incoterms.title}
              </h2>
            </div>
            <Reveal
              stagger="base"
              className="space-y-5 lg:col-span-7 lg:col-start-6"
            >
              {sourcingContent.incoterms.body.map((paragraph) => (
                <p key={paragraph} className="measure text-on-light-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <EnquiryBanner
        headingLines={["Submit a trade", "requirement."]}
        intro="Set out the commodity, specification, quantity and destination. We will respond with a clear view of the sourcing route and the terms it would work on."
      />
    </>
  );
}
