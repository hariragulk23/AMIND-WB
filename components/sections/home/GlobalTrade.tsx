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

      {/* COMPOSED WITHOUT A PHOTOGRAPH, ON PURPOSE.
          This slot was originally drawn as a full-bleed photographic band,
          and there is no photograph for it — `home-trade` in data/images.ts
          is `available: false`, and every real image on the site is
          commodity-specific, so a coffee or teak frame here would
          misrepresent the section.
          The previous attempt kept the photographic composition and simply
          left the image out: centred text in a narrow column inside an
          extra-tall band. That reads as a section waiting for something,
          because it was.
          This layout is built for what actually exists. It spans the full
          container rather than a centred 62rem column, and it is bounded top
          and bottom by rules so the band has edges instead of fading into
          dark. The four facts sit in a divided data row that carries the
          full width — they are the substance here, so they are given the
          structure. A photograph could later sit behind or beside this
          without any of it being rearranged, which is the difference between
          an enhancement and a dependency. */}
      <Container className="section-y relative">
        {/* Top edge: what the section is, and where the company is, on one
            baseline. Anchors the band rather than letting it start in air. */}
        <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-b border-charcoal pb-8">
          <SectionLabel tone="dark">{tradeContent.label}</SectionLabel>
          {/* Inline, with a real separator character — these are inline spans
              inside one paragraph, so the em dash both reads as punctuation
              and keeps the extracted text apart. */}
          <p className="label-xs text-on-dark-muted">
            <span className="numeral text-brass">
              {company.baseCoordinates.latitude} /{" "}
              {company.baseCoordinates.longitude}
            </span>
            {" — "}
            <span>{company.baseCoordinates.locality}</span>
          </p>
        </Reveal>

        {/* Asymmetric split: heading holds the left, prose the right. */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <DisplayReveal
            as="h2"
            id="global-trade-heading"
            lines={tradeContent.headingLines}
            className="display-lg text-on-dark lg:col-span-5"
          />

          <Reveal
            stagger="base"
            className="space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-2"
          >
            {tradeContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="measure text-on-dark-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* The data row. Divided rather than merely spaced, so four short
            facts read as one deliberate band across the full width instead of
            four items adrift in it. */}
        <Reveal
          as="dl"
          stagger="base"
          className="mt-20 grid gap-x-8 gap-y-12 border-t border-charcoal pt-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4"
        >
          {tradeContent.facts.map((fact) => (
            <div
              key={fact.label}
              className="lg:border-l lg:border-charcoal lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="label-xs text-on-dark-muted">{fact.label}</dt>
              <dd className="font-display mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] text-on-dark">
                {fact.value}
              </dd>
            </div>
          ))}
        </Reveal>

        {/* Bottom edge. */}
        <Reveal className="mt-14 border-t border-charcoal pt-8">
          <p className="measure text-sm text-on-dark-muted">
            {tradeContent.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
