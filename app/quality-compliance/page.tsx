import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryBanner } from "@/components/sections/EnquiryBanner";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { verifiedCompliance } from "@/data/compliance";
import { complianceContent } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quality & Compliance",
  description:
    "The quality and documentation framework AM Global Commodities works within — corporate and trade registration, quality documentation, inspection, traceability and shipment documentation.",
  path: "/quality-compliance",
});

/**
 * Publishes only what `data/compliance.ts` marks as verified. Certificates are
 * pre-wired and switched off in that file; nothing appears here until its
 * `verified` flag is turned on against a confirmed certificate.
 */
export default function QualityCompliancePage() {
  return (
    <>
      <PageHero
        headingLines={["Quality &", "Compliance"]}
        intro={complianceContent.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Quality & Compliance", path: "/quality-compliance" },
        ]}
      />

      {/* ---- Verified registrations ------------------------------------ */}
      <section
        aria-labelledby="registrations-heading"
        className="bg-paper text-on-light"
      >
        <Container className="py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel index="01">Registrations</SectionLabel>
              </Reveal>
              <h2
                id="registrations-heading"
                className="display-md mt-6 text-on-light"
              >
                Verified and published
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal as="ul" stagger="base" className="border-t border-paper-line">
                {verifiedCompliance.map((record) => (
                  <li key={record.id} className="border-b border-paper-line py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="label-sm text-on-light">{record.label}</h3>
                      {record.number ? (
                        <p className="numeral text-on-light">{record.number}</p>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-on-light-muted">
                      {record.name} — {record.authority}
                    </p>
                    <p className="mt-1 text-sm text-on-light-muted">
                      {record.description}
                    </p>
                  </li>
                ))}
              </Reveal>

              <Reveal
                as="p"
                className="mt-6 max-w-[42rem] text-sm text-on-light-muted"
              >
                {complianceContent.verificationNote}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Framework -------------------------------------------------- */}
      <section
        aria-labelledby="framework-heading"
        className="bg-paper text-on-light"
      >
        <Container className="pb-20 md:pb-28">
          <div className="grid gap-8 border-t border-paper-line pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel index="02">Framework</SectionLabel>
              </Reveal>
              <h2
                id="framework-heading"
                className="display-md mt-6 text-on-light"
              >
                What we work within
              </h2>
            </div>

            <Reveal
              as="ul"
              stagger="base"
              className="lg:col-span-7 lg:col-start-6"
            >
              {complianceContent.framework.map((item) => (
                <li key={item.title} className="border-b border-paper-line py-6">
                  <h3 className="display-md text-on-light">{item.title}</h3>
                  <p className="mt-2 max-w-[42rem] text-on-light-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <EnquiryBanner
        headingLines={["Ask for the", "documentation."]}
        intro="If your import requires a specific document set, tell us what it is at the enquiry stage and we will confirm what can be provided."
      />
    </>
  );
}
