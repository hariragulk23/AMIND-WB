import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company } from "@/data/company";
import { trustContent } from "@/data/home";
import { trustSignals, verifiedCompliance } from "@/data/compliance";
import { cn, gridDividers } from "@/lib/utils";

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
    <section aria-labelledby="trust-heading" className="bg-paper text-on-light">
      <Container className="section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="03">
                {trustContent.label}
              </SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="trust-heading"
              lines={trustContent.headingLines}
              className="display-lg mt-8 text-heading"
            />
          </div>

          <Reveal
            as="p"
            className="body-lg measure-tight text-on-light-muted lg:col-span-5 lg:col-start-8 lg:pt-4"
          >
            {trustContent.intro}
          </Reveal>
        </div>

        {/* ---- Structural facts ---------------------------------------- */}
        <Reveal
          as="ul"
          stagger="base"
          className="mt-16 grid border-t border-paper-line md:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {trustSignals.map((signal) => (
            <li
              key={signal.title}
              className="border-b border-paper-line px-0 py-8 md:px-8 md:first:pl-0 lg:py-10"
            >
              <h3 className="display-md text-heading">{signal.title}</h3>
              <p className="mt-3 text-sm text-on-light-muted">
                {signal.description}
              </p>
            </li>
          ))}
        </Reveal>

        {/* ---- Verified registrations + incorporation -------------------
            Its own top rule, so this reads as a second, distinct data row
            rather than a caption trailing off the grid above it. Dividers
            between items carry the same treatment as the Global Trade
            section's facts row, so the two read as one established pattern
            rather than two different treatments for the same kind of
            content. */}
        <Reveal className="mt-14 flex flex-col gap-8 border-t border-paper-line pt-8 lg:flex-row lg:items-end lg:justify-between">
          <dl className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {[
              { key: "incorporated", label: "Incorporated", value: company.incorporation.displayDate, name: undefined as string | undefined },
              ...verifiedCompliance.map((record) => ({
                key: record.id,
                label: record.label,
                value: record.number,
                name: record.name,
              })),
            ].map((item, index) => (
              <div
                key={item.key}
                className={cn(
                  "min-w-0 border-paper-line",
                  gridDividers(index, [
                    { prefix: "", cols: 2 },
                    { prefix: "sm", cols: 3 },
                  ]),
                )}
              >
                <dt className="label-xs text-on-light-muted">
                  {item.label}
                  {item.name ? (
                    <span className="sr-only"> — {item.name}</span>
                  ) : null}
                </dt>
                {/* break-all: CIN/GSTIN are long unbroken alphanumeric
                    strings that would otherwise overflow a narrow grid
                    column into the next one instead of wrapping. */}
                <dd className="numeral mt-2 break-all font-display text-xl text-on-light">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <CtaLink href="/quality-compliance" variant="text">
            Quality &amp; Compliance
          </CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}
