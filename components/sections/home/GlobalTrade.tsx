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

      {/* THE SPARSE SECTION. Everything sits on one centre line with a lot of
          dark around it, and the four facts — not the prose — are the largest
          thing in the band. The shape is deliberately unlike the two-column
          sections above and below: that contrast is what stops the page
          reading as one template repeated eight times.

          NOTE: this was planned as the full-bleed photographic section. It is
          not, because there is no trade photograph — `home-trade` in
          data/images.ts is `available: false`, and the only real photography
          on the site is commodity-specific, so using a coffee or teak frame
          here would misrepresent the section. Sparse-and-centred delivers the
          layout contrast without inventing an image. See the report. */}
      <Container className="section-y-lg relative">
        <div className="mx-auto max-w-[62rem] text-center">
          <Reveal className="flex justify-center">
            <SectionLabel tone="dark">{tradeContent.label}</SectionLabel>
          </Reveal>

          <DisplayReveal
            as="h2"
            id="global-trade-heading"
            lines={tradeContent.headingLines}
            className="display-lg mx-auto mt-12 max-w-[18ch] text-on-dark lg:mt-16"
          />

          <Reveal stagger="base" className="mt-12 space-y-5 lg:mt-16">
            {tradeContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="measure mx-auto text-on-dark-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* The facts, given the weight the prose used to take. */}
        <Reveal
          as="dl"
          stagger="base"
          className="mt-20 grid gap-x-10 gap-y-12 border-t border-charcoal pt-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4"
        >
          {tradeContent.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label-xs text-on-dark-muted">{fact.label}</dt>
              <dd className="font-display mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-on-dark">
                {fact.value}
              </dd>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-col gap-3 border-t border-charcoal pt-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="label-xs numeral text-brass">
              {company.baseCoordinates.latitude} /{" "}
              {company.baseCoordinates.longitude}
            </span>
            <span className="label-xs text-on-dark-muted">
              {company.baseCoordinates.locality}
            </span>
          </p>
          <p className="text-sm text-on-dark-muted">{tradeContent.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
