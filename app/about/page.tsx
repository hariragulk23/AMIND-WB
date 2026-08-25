import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StackedLines } from "@/components/ui/StackedLines";
import { company, registeredOfficeLines } from "@/data/company";
import { aboutContent } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Company",
  description:
    "The international trading identity of Antonio Marco Exports and Trade Private Limited — incorporated in India in 2025, with European corporate roots.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        headingLines={["About the", "company"]}
        intro={aboutContent.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="bg-paper text-on-light">
        {/* The first block opens on its own full-width rule, and each block
            carries its own vertical padding — so the Container's top padding
            is roughly half the sitewide rhythm to keep the hero-to-rule
            run-out from doubling up. The bottom keeps the standard small
            rhythm so the hand-off to the enquiry banner matches every other
            page. */}
        <Container className="pt-[clamp(2rem,4.5vw,4rem)] pb-[clamp(3rem,7vw,6.5rem)]">
          {aboutContent.sections.map((section, index) => (
            <div
              key={section.title}
              className="grid gap-8 border-t border-paper-line py-12 lg:grid-cols-12 lg:py-16"
            >
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionLabel index={String(index + 1).padStart(2, "0")}>
                    {section.title}
                  </SectionLabel>
                </Reveal>
              </div>
              <Reveal
                stagger="base"
                className="space-y-6 lg:col-span-7 lg:col-start-6"
              >
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={
                      i === 0
                        ? "body-lg measure text-on-light"
                        : "measure text-on-light-muted"
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                {"points" in section ? (
                  <ul className="space-y-3">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="measure flex gap-3 text-on-light-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-4 shrink-0 bg-brand-red"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {"coda" in section ? (
                  <p className="measure text-on-light-muted">{section.coda}</p>
                ) : null}
              </Reveal>
            </div>
          ))}

          {/* ---- Corporate record ---------------------------------------- */}
          {/* No bottom padding of its own: the Container's section-y-sm
              already closes the section, so the record block ending flush
              keeps the run-out to the enquiry banner the same size as on
              every other page. */}
          <div className="grid gap-8 border-t border-paper-line pt-12 lg:grid-cols-12 lg:pt-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel index="04">Corporate record</SectionLabel>
              </Reveal>
            </div>

            <Reveal
              as="dl"
              stagger="base"
              className="lg:col-span-7 lg:col-start-6"
            >
              <div className="flex flex-col gap-1 border-b border-paper-line py-5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="label-xs text-on-light-muted">Legal entity</dt>
                <dd className="text-on-light sm:text-right">
                  {company.legalName}
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-paper-line py-5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="label-xs text-on-light-muted">Incorporated</dt>
                <dd className="numeral text-on-light sm:text-right">
                  {company.incorporation.displayDate}
                </dd>
              </div>
              {company.registrations.map((registration) => (
                <div
                  key={registration.label}
                  className="flex flex-col gap-1 border-b border-paper-line py-5 sm:flex-row sm:justify-between sm:gap-6"
                >
                  <dt className="label-xs text-on-light-muted">
                    {registration.label}
                    <span className="sr-only"> — {registration.description}</span>
                  </dt>
                  <dd className="numeral text-on-light sm:text-right">
                    {registration.value}
                  </dd>
                </div>
              ))}
              <div className="flex flex-col gap-1 border-b border-paper-line py-5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="label-xs text-on-light-muted">Directors</dt>
                <StackedLines
                  as="dd"
                  lines={company.directors.map((d) => d.name)}
                  className="text-on-light sm:text-right"
                  separator=", "
                />
              </div>
              <div className="flex flex-col gap-1 border-b border-paper-line py-5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="label-xs text-on-light-muted">
                  Registered office
                </dt>
                <dd className="text-on-light sm:text-right">
                  <StackedLines
                    as="address"
                    lines={registeredOfficeLines}
                    className="not-italic"
                    separator=", "
                  />
                </dd>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <EnquiryBanner />
    </>
  );
}
