import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { ScrollRail } from "@/components/animation/ScrollRail";
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

          {/* Same rail as the homepage's five stages — this is the same kind
              of thing (an ordered sequence), so it gets the same graphic
              rather than a second, unrelated treatment. Seven stages benefit
              from it more than five did: as a stack of equal rows it read as
              a table and gave no sense of how far through you were. */}
          <ol className="relative mt-14">
            <span
              aria-hidden="true"
              className="absolute left-5 top-3 bottom-3 w-px bg-paper-line lg:left-8"
            />
            <ScrollRail className="absolute left-5 top-3 bottom-3 w-px lg:left-8" />

            {sourcingContent.stages.map((stage) => (
              <Reveal
                as="li"
                key={stage.number}
                /* Same two-column split as the homepage rail from `lg`. */
                className="relative pb-12 pl-14 last:pb-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,38rem)] lg:items-start lg:gap-x-12 lg:pb-16 lg:pl-28"
                y={18}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex w-10 justify-center lg:w-16"
                >
                  <span className="numeral bg-paper py-1 font-display text-sm font-semibold leading-none text-brand-red">
                    {stage.number}
                  </span>
                </span>

                <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-heading">
                  {stage.title}
                </h3>
                <p className="measure mt-3 text-on-light-muted lg:mt-0 lg:pt-2">
                  {stage.description}
                </p>
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
