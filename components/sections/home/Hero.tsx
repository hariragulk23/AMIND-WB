import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { ScrollCue } from "@/components/animation/ScrollCue";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { commodities } from "@/data/commodities";
import { company } from "@/data/company";
import { brandAssets, brandLockup } from "@/data/brand";
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
 * THE WORDMARK IS THE DESIGNED LOCKUP IMAGE, NOT LIVE TEXT.
 * It was previously set as two staggered lines of live display type (a
 * two-beat AM / then INDIA entrance, rebuilt from an earlier three-word
 * stagger). The wordmark is one designed artwork — icon and lettering drawn
 * together as a single mark — so it is now placed as that one image rather
 * than reconstructed from text plus a separate icon graphic. A flattened
 * image can't be staggered by line the way live text could, so the entrance
 * simplifies to one reveal rather than two beats; everything below still
 * arrives as a single quiet wave shortly after.
 *
 * A visually-hidden h1 carries the real heading text immediately before the
 * image, so the page keeps a genuine text heading for the accessibility tree
 * and for search engines even though sighted visitors see the artwork.
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
        {/* Real text heading, kept for the accessibility tree and SEO —
            visually hidden since the artwork below carries the heading for
            sighted visitors. */}
        <h1 className="sr-only">{heroContent.lines.join(" ")}</h1>

        <Reveal immediate delay={0.22} y={18} className="mt-6 md:mt-8">
          <Image
            src={brandAssets.fullLockup.path}
            alt="AM INDIA — Antonio Marco Exports and Trade Private Limited"
            width={brandAssets.fullLockup.width}
            height={brandAssets.fullLockup.height}
            priority
            /* Matches the v2 lockup's aspect ratio (2366/494 ≈ 4.79), not
               the old file's (2340/580 ≈ 4.03) — the new artwork is
               proportionally wider, so the same height clamp now renders a
               wider box at every breakpoint. The clamp's ceiling (9.5rem =
               152px tall) bounds the maximum possible width at 728px
               regardless of viewport size; each tier below carries margin
               over its measured rendered width so the srcset candidate is
               never smaller than the display box. */
            sizes="(min-width: 1280px) 760px, (min-width: 640px) 600px, 300px"
            className="h-[clamp(3.5rem,min(9vw,13vh),9.5rem)] w-auto"
          />
        </Reveal>

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
