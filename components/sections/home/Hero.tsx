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
 *   WHO      AM GLOBAL COMMODITIES, with Antonio Marco as corporate identity
 *   WHAT     international B2B commodity sourcing and trading
 *   PRODUCTS coffee, teak, spices and nuts, named in the platform index
 *   WHERE    Tamil Nadu, India — with an international orientation
 *
 * Rendered on the server: every one of those is present and fully visible in
 * the initial HTML. The animation only moves them; it never gates them.
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
        <div
          aria-hidden="true"
          style={{ paddingTop: "calc(var(--am-header-h) + 1.25rem)" }}
        />

        {/* ---- Eyebrow: what this company is, in one line --------------- */}
        <Reveal className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2" immediate>
          <span aria-hidden="true" className="brand-rule block w-12" />
          <p className="label-xs text-on-light-muted">
            International B2B commodity sourcing &amp; trading
          </p>
        </Reveal>

        {/* ---- Wordmark ------------------------------------------------- */}
        <DisplayReveal
          as="h1"
          lines={heroContent.lines}
          className="display-hero mt-5 text-heading md:mt-7"
          immediate
          delay={0.12}
        />

        <Reveal as="p" className="mt-3 label-xs text-on-light-muted" delay={0.3} immediate>
          {brandLockup.descriptorLong}
        </Reveal>

        {/* ---- Commodity platform index --------------------------------- */}
        <Reveal
          as="ul"
          stagger="tight"
          delay={0.4}
          y={14}
          immediate
          className="mt-6 grid grid-cols-4 border-t border-paper-line md:mt-8"
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
        <div className="mt-6 border-t border-paper-line pt-6 md:mt-8 md:pt-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal
              as="p"
              className="display-md font-display uppercase tracking-[0.02em] text-brand-red-deep lg:col-span-3"
              delay={0.5}
              y={20}
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
              className="body-lg max-w-[34rem] text-on-light-muted lg:col-span-5"
              delay={0.6}
              y={20}
              immediate
            >
              {heroContent.intro}
            </Reveal>

            <Reveal
              className="flex flex-col items-start gap-2.5 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch"
              delay={0.7}
              y={20}
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
