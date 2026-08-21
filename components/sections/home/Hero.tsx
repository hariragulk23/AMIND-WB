import Link from "next/link";
import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { ScrollCue } from "@/components/animation/ScrollCue";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { commodities } from "@/data/commodities";
import { company } from "@/data/company";
import { brandLockup } from "@/data/brand";
import { heroContent } from "@/data/home";
import { primaryCta, secondaryCtas } from "@/data/navigation";

/**
 * SECTION 1 — HERO
 *
 * Rebuilt on the off-white canvas. Premium here comes from whitespace,
 * typographic authority and restraint rather than from a dark ground: the
 * composition is a corporate title page, not a film poster.
 *
 * Within the first viewport a visitor gets all four things they need:
 *   WHO      AM INDIA, with Antonio Marco as corporate identity
 *   WHAT     international B2B commodity sourcing and trading
 *   PRODUCTS coffee, teak, spices and nuts, named in the platform index
 *   WHERE    Tamil Nadu, India — with an international orientation
 *
 * Rendered on the server: every one of those is present and fully visible in
 * the initial HTML. The animation only moves them; it never gates them.
 *
 * THE ENTRANCE IS CHOREOGRAPHED IN TWO BEATS.
 * It was originally a three-word stagger — AM / GLOBAL / COMMODITIES — with a
 * tight 0.09s gap and four separately delayed supporting elements trailing it.
 * With a two-word wordmark that reading collapses: a short gap between two
 * words is heard as one hurried beat, not two.
 *
 * So the timing is rebuilt rather than trimmed:
 *   BEAT ONE   the rule and eyebrow set the frame, then AM lands.
 *   BEAT TWO   a deliberate pause, then INDIA lands — long enough to register
 *              as a second arrival rather than the tail of the first.
 *   SETTLE     everything below arrives as one quiet wave overlapping the end
 *              of beat two, instead of four more separate beats competing
 *              with the wordmark for attention.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-screen-safe flex-col overflow-hidden bg-paper text-on-light">
      {/* A single quiet ground tint, warm at the top right. Not decoration for
          its own sake — it stops a full-bleed off-white field reading flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 88% 6%, color-mix(in oklab, var(--brand-green) 12%, transparent) 0%, transparent 68%)",
        }}
      />

      <Container className="relative flex flex-1 flex-col justify-end">
        {/* Clears the fixed header. The extra air above the wordmark is
            desktop-only — on a phone the composition needs every pixel to keep
            the scroll cue above the fold. */}
        <div
          aria-hidden="true"
          className="pt-[calc(var(--am-header-h)+1.25rem)] md:pt-[calc(var(--am-header-h)+2.5rem)]"
        />

        {/* ---- Eyebrow: what this company is, in one line --------------- */}
        {/* Beat one opens here. */}
        <Reveal
          className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2"
          immediate
          delay={0.05}
          y={10}
        >
          <span aria-hidden="true" className="brand-rule block w-12" />
          <p className="label-xs text-on-light-muted">
            International B2B commodity sourcing &amp; trading
          </p>
        </Reveal>

        {/* ---- Wordmark ------------------------------------------------- */}
        <DisplayReveal
          as="h1"
          lines={heroContent.lines}
          className="display-hero mt-6 text-heading md:mt-8"
          immediate
          delay={0.22}
          /* The pause between AM and INDIA. Nearly three times the old
             three-word gap — this is what makes it two beats. */
          lineStagger={0.34}
        />

        {/*
          Below `md` the header withholds the Antonio Marco mark to stay
          minimal, so the corporate relationship is stated here in text instead.
          From `md` up the header carries the real logo and this line is
          withheld — the first viewport should name Antonio Marco once, not
          twice.
        */}
        <Reveal
          as="p"
          className="mt-3 label-xs text-on-light-muted md:hidden"
          delay={0.92}
          y={10}
          immediate
        >
          {brandLockup.descriptorLong}
        </Reveal>

        {/* ---- Commodity platform index --------------------------------- */}
        <Reveal
          as="ul"
          stagger="tight"
          delay={0.98}
          y={12}
          immediate
          className="mt-6 grid grid-cols-4 border-t border-paper-line md:mt-9"
        >
          {commodities.map((commodity, index) => (
            <li key={commodity.slug} className="min-w-0">
              <Link
                href={`/commodities/${commodity.slug}`}
                className="group flex items-baseline gap-1.5 py-3.5 transition-colors duration-300 ease-brand hover:text-brand-red-deep md:gap-3 md:py-4"
              >
                <span className="label-xs numeral hidden text-brand-red sm:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="label-xs truncate text-on-light md:label-sm">
                  {commodity.name}
                </span>
              </Link>
            </li>
          ))}
        </Reveal>

        {/* ---- Statement + intro + CTAs ---------------------------------- */}
        <div className="mt-6 border-t border-paper-line pt-6 md:mt-9 md:pt-9">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal
              as="p"
              className="display-md font-display uppercase tracking-[0.02em] text-brand-red-deep lg:col-span-3"
              delay={1.06}
              y={14}
              immediate
            >
              {heroContent.statement.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Reveal>

            <Reveal
              as="p"
              className="body-lg measure text-on-light-muted lg:col-span-5"
              delay={1.12}
              y={14}
              immediate
            >
              {heroContent.intro}
            </Reveal>

            <Reveal
              className="flex flex-col items-start gap-2.5 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch"
              delay={1.18}
              y={14}
              immediate
            >
              <CtaLink href={primaryCta.href} variant="solid">
                {primaryCta.labelLong}
              </CtaLink>
              <CtaLink
                href={secondaryCtas.exploreCommodities.href}
                variant="outline"
              >
                {secondaryCtas.exploreCommodities.label}
              </CtaLink>
            </Reveal>
          </div>
        </div>

        {/* ---- Base line: scroll cue + operational base ------------------ */}
        <div className="mt-6 flex items-end justify-between gap-6 pb-5 md:mt-8 md:pb-9">
          <ScrollCue label={heroContent.scrollCue} tone="light" />

          <p className="label-xs hidden text-right text-on-light-muted sm:block">
            <span className="numeral block text-brand-green-deep">
              {company.baseCoordinates.latitude} / {company.baseCoordinates.longitude}
            </span>
            <span className="mt-1.5 block">{company.baseCoordinates.locality}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
