import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company } from "@/data/company";
import { trustContent } from "@/data/home";
import { trustSignals, verifiedCompliance } from "@/data/compliance";

/**
 * SECTION 7 — TRUST
 *
 * No counters, no years of experience, no shipment totals, no client logos and
 * no testimonials. Every item is either a statement of how the business is
 * structured or a registration number that can be checked against the public
 * record.
 *
 * The registration strip renders `verifiedCompliance` — records flagged
 * `verified: true` in data/compliance.ts. Certificates such as IEC, FSSAI,
 * RCMCs, ISO or FSC are already wired into that file and switched off; the
 * moment one is verified and flagged, it appears here automatically with no
 * change to this component.
 */
export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="bg-ink text-on-dark">
      <Container className="py-24 md:py-36 lg:py-44">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="07" tone="dark">
                {trustContent.label}
              </SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="trust-heading"
              lines={trustContent.headingLines}
              className="display-lg mt-8 text-on-dark"
            />
          </div>

          <Reveal
            as="p"
            className="body-lg max-w-[32rem] text-on-dark-muted lg:col-span-5 lg:col-start-8 lg:pt-4"
          >
            {trustContent.intro}
          </Reveal>
        </div>

        {/* ---- Structural facts ---------------------------------------- */}
        <Reveal
          as="ul"
          stagger="base"
          className="mt-16 grid border-t border-charcoal md:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {trustSignals.map((signal) => (
            <li
              key={signal.title}
              className="border-b border-charcoal px-0 py-8 md:px-8 md:first:pl-0 lg:py-10"
            >
              <h3 className="display-md text-on-dark">{signal.title}</h3>
              <p className="mt-3 text-sm text-on-dark-muted">
                {signal.description}
              </p>
            </li>
          ))}
        </Reveal>

        {/* ---- Verified registrations + incorporation ------------------- */}
        <Reveal className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <dt className="label-xs text-on-dark-muted">Incorporated</dt>
              <dd className="numeral mt-2 font-display text-xl text-on-dark">
                {company.incorporation.displayDate}
              </dd>
            </div>
            {verifiedCompliance.map((record) => (
              <div key={record.id}>
                <dt className="label-xs text-on-dark-muted">
                  {record.label}
                  <span className="sr-only"> — {record.name}</span>
                </dt>
                <dd className="numeral mt-2 font-display text-xl text-on-dark">
                  {record.number}
                </dd>
              </div>
            ))}
          </dl>

          <CtaLink href="/quality-compliance" tone="dark" variant="text">
            Quality &amp; Compliance
          </CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}
