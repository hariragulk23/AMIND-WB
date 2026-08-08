import Link from "next/link";
import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { ScrollCue } from "@/components/animation/ScrollCue";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Media } from "@/components/ui/Media";
import { commodities } from "@/data/commodities";
import { company } from "@/data/company";
import { heroContent } from "@/data/home";
import { primaryCta, secondaryCtas } from "@/data/navigation";

/**
 * SECTION 1 — HERO
 *
 * A full-viewport typographic composition over a cinematic dark ground.
 *
 * Rendered on the server: the h1, the statement, the intro and both CTAs are
 * all present and fully visible in the initial HTML. The animation only moves
 * them; it never gates them. With JavaScript disabled the hero is complete and
 * unchanged apart from the absence of motion.
 */
export function Hero() {
  return (
    <section className="grain relative flex min-h-screen-safe flex-col overflow-hidden bg-ink text-on-dark">
      {/* ---- Cinematic ground -------------------------------------------- */}
      <Parallax fill amount={7} start="top top">
        <Media
          imageKey="home-hero"
          fill
          priority
          sizes="100vw"
          className="h-full"
        />
      </Parallax>

      {/* Scrim: guarantees text contrast over whatever photography lands. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/35"
      />
      <div className="grain-layer" />

      <Container className="relative flex flex-1 flex-col justify-end">
        {/* Clears the fixed header without relying on a magic number. */}
        <div
          aria-hidden="true"
          style={{ paddingTop: "calc(var(--am-header-h) + 1.5rem)" }}
        />

        {/* ---- Wordmark composition ------------------------------------- */}
        <DisplayReveal
          as="h1"
          lines={heroContent.lines}
          className="display-hero mt-auto text-on-dark"
          immediate
          delay={0.15}
        />

        {/*
          ---- Commodity index ------------------------------------------
          The four platforms, stated in the first viewport. Without this a
          visitor has to scroll before learning what is actually traded — the
          hero otherwise says only that the company exists. It doubles as the
          rule that separates the wordmark from the statement, so it costs one
          row of height rather than a whole band, and it fills the right of a
          wide canvas with substance instead of decoration.
        */}
        <Reveal
          as="ul"
          stagger="tight"
          delay={0.4}
          y={14}
          immediate
          className="mt-6 grid grid-cols-4 border-y border-charcoal md:mt-8"
        >
          {commodities.map((commodity, index) => (
            <li key={commodity.slug} className="min-w-0">
              <Link
                href={`/commodities/${commodity.slug}`}
                className="label-xs group flex items-baseline gap-2 py-4 text-on-dark transition-colors duration-300 ease-brand hover:text-brass md:gap-3"
              >
                <span className="numeral hidden text-brass sm:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{commodity.name}</span>
              </Link>
            </li>
          ))}
        </Reveal>

        {/* ---- Statement + intro + CTAs ---------------------------------- */}
        <div className="mt-8 md:mt-12">
          <div className="grid gap-9 lg:grid-cols-12 lg:gap-10">
            <Reveal
              as="p"
              className="display-md text-brass lg:col-span-4"
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
              className="body-lg max-w-[34rem] text-on-dark-muted lg:col-span-5"
              delay={0.6}
              y={20}
              immediate
            >
              {heroContent.intro}
            </Reveal>

            <Reveal
              className="flex flex-col items-start gap-4 sm:flex-row lg:col-span-3 lg:flex-col lg:items-stretch"
              delay={0.7}
              y={20}
              immediate
            >
              <CtaLink href={primaryCta.href} tone="dark" variant="solid">
                {primaryCta.labelLong}
              </CtaLink>
              <CtaLink
                href={secondaryCtas.exploreCommodities.href}
                tone="dark"
                variant="outline"
              >
                {secondaryCtas.exploreCommodities.label}
              </CtaLink>
            </Reveal>
          </div>
        </div>

        {/* ---- Base line: scroll cue + operational base ------------------ */}
        <div className="mt-8 flex items-end justify-between gap-6 pb-7 md:mt-12 md:pb-10">
          <ScrollCue label={heroContent.scrollCue} />

          <p className="label-xs hidden text-right text-on-dark-muted sm:block">
            <span className="numeral block text-brass">
              {company.baseCoordinates.latitude} / {company.baseCoordinates.longitude}
            </span>
            <span className="mt-1.5 block">{company.baseCoordinates.locality}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
