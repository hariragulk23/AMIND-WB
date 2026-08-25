import Link from "next/link";
import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Media } from "@/components/ui/Media";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { commodities } from "@/data/commodities";
import { gridContent } from "@/data/home";
import { secondaryCtas } from "@/data/navigation";

/**
 * SECTION 6 — COMMODITIES GRID
 *
 * The conventional navigation counterpart to the cinematic journey: four
 * editorial tiles, each a single large target with the commodity, one line of
 * description and an explore affordance.
 *
 * The whole tile is the link, so the hit area is generous on touch devices;
 * the hover treatment is a slow media scale plus a rule, driven by CSS only.
 */
export function CommoditiesGrid() {
  return (
    <section aria-labelledby="grid-heading" className="bg-paper text-on-light">
      {/* Opens on a full-width rule, which marks the section break on its
          own — so the top padding is roughly half the sitewide rhythm and
          the rule sits close under the previous section's closing CTA,
          rather than floating in a second stretch of empty paper. */}
      <Container className="pt-[clamp(2.5rem,6vw,5.5rem)] section-pb">
        <div className="flex flex-col justify-between gap-8 border-t border-paper-line pt-14 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel >{gridContent.label}</SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="grid-heading"
              lines={gridContent.headingLines}
              className="display-lg mt-8 text-heading"
            />
          </div>

          <Reveal className="shrink-0">
            <CtaLink
              href={secondaryCtas.exploreCommodities.href}
              variant="text"
            >
              All commodities
            </CtaLink>
          </Reveal>
        </div>

        {/* One row of four from `lg`, two-up on tablet, stacked on mobile.
            The vertical gap tightens as the columns multiply: at four across
            the tiles are short enough that a 5rem gutter between rows reads
            as a break in the grid rather than rhythm. */}
        <Reveal
          stagger="loose"
          className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:mt-20 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
        >
          {commodities.map((commodity) => (
            <Link
              key={commodity.slug}
              href={`/commodities/${commodity.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden">
                <Media
                  imageKey={commodity.tileImage}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-[1400ms] ease-brand group-hover:scale-[1.05]"
                />
              </div>

              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="display-md text-heading">{commodity.name}</h3>
                <span className="label-xs numeral text-brass-deep">
                  {commodity.index.replace("Platform ", "")}
                </span>
              </div>

              <p className="measure mt-3 text-sm text-on-light-muted">
                {commodity.summary}
              </p>

              <span className="label-xs mt-6 flex items-center gap-3 text-on-light transition-colors duration-300 ease-brand group-hover:text-brass-deep">
                Explore
                <span className="sr-only">{commodity.name}</span>
                <span
                  aria-hidden="true"
                  className="relative block h-px w-6 overflow-hidden bg-current opacity-60"
                >
                  <span className="absolute inset-0 block origin-left scale-x-0 bg-current transition-transform duration-500 ease-brand group-hover:scale-x-100" />
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
