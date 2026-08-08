import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company } from "@/data/company";
import { tradeContent } from "@/data/home";
import { TradeField } from "./TradeField";

/**
 * SECTION 4 — GLOBAL TRADE
 *
 * India as the operational base, the European connection stated as corporate
 * heritage rather than presence. No countries served, routes, ports, offices
 * or volumes are claimed anywhere in this section — every fact shown comes
 * from data/company.ts and data/home.ts.
 */
export function GlobalTrade() {
  return (
    <section
      aria-labelledby="global-trade-heading"
      className="grain relative overflow-hidden bg-ink text-on-dark"
    >
      <div className="grain-layer" />

      {/* Decorative field, bled behind the content. Held well back so it never
          competes with the body copy — heavily on mobile, where text spans the
          full width. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25 lg:opacity-55"
      >
        <div className="w-[160%] max-w-none md:w-[110%]">
          <TradeField />
        </div>
      </div>

      {/* Keeps the reading column clear of the field on wide screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/70 to-transparent lg:block"
      />

      <Container className="relative py-24 md:py-36 lg:py-44">
        <Reveal>
          <SectionLabel index="04" tone="dark">
            {tradeContent.label}
          </SectionLabel>
        </Reveal>

        <DisplayReveal
          as="h2"
          id="global-trade-heading"
          lines={tradeContent.headingLines}
          className="display-lg mt-10 max-w-[22ch] text-on-dark lg:mt-14"
        />

        <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal stagger="base" className="space-y-6 lg:col-span-5">
            {tradeContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-on-dark-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal
              as="dl"
              stagger="base"
              className="border-t border-charcoal"
            >
              {tradeContent.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-charcoal py-5"
                >
                  <dt className="label-xs text-on-dark-muted">{fact.label}</dt>
                  <dd className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-none text-on-dark">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="label-xs numeral text-brass">
                {company.baseCoordinates.latitude} /{" "}
                {company.baseCoordinates.longitude}
              </p>
              <p className="label-xs text-on-dark-muted">
                {company.baseCoordinates.locality}
              </p>
            </Reveal>

            <Reveal className="mt-6">
              <p className="text-sm text-on-dark-muted">{tradeContent.note}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
