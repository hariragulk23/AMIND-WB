import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { ScrollRail } from "@/components/animation/ScrollRail";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processContent } from "@/data/home";
import { travel } from "@/lib/motion";

/**
 * SECTION — HOW WE WORK
 *
 * Five stages drawn as a progression rather than stacked as paragraphs: one
 * hairline rail with the numerals as nodes on it, and a red line that draws
 * down the rail as the visitor scrolls. The descriptions were cut back when
 * the rail went in — the sequencing is now carried by the graphic, so the
 * prose no longer has to say it as well.
 *
 * Language discipline: every step describes what the company itself does —
 * identify, assess, agree, coordinate, arrange, manage. Physical execution
 * (freight, handling, inspection) is attributed to the third parties who
 * actually perform it.
 */
export function HowWeWork() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-paper text-on-light"
    >
      <Container className="section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="02">{processContent.label}</SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="process-heading"
              lines={processContent.headingLines}
              className="display-lg mt-8 text-heading"
            />
          </div>

          <Reveal
            as="p"
            className="body-lg measure-tight text-on-light-muted lg:col-span-4 lg:col-start-9 lg:pt-4"
          >
            {processContent.intro}
          </Reveal>
        </div>

        {/* A LITERAL PROGRESSION, NOT A LIST OF PARAGRAPHS.
            One hairline runs the full height of the sequence and the numerals
            sit on it as nodes, each one knocked out of the line by its own
            paper background so the rail appears to pass behind them. A second
            line in brand red draws down the same path as the visitor scrolls,
            so the graphic reports how far through the five stages they are.
            Deliberately not diagram furniture: no arrows, no icon bubbles, no
            boxes. The only thing added to the page is a line that grows.
            The rail sits at the same x on every breakpoint, so the sequence
            reads top-to-bottom identically on a phone and on a desktop; only
            the indent and the type scale change. */}
        <ol className="relative mt-16 lg:mt-24">
          {/* Track, and the drawn progress over it. Inset vertically so the
              line begins and ends at the first and last numeral rather than
              floating past them. */}
          <span
            aria-hidden="true"
            className="absolute left-5 top-3 bottom-3 w-px bg-paper-line lg:left-8"
          />
          <ScrollRail className="absolute left-5 top-3 bottom-3 w-px lg:left-8" />

          {processContent.steps.map((step) => (
            /* From `lg` the row splits: stage name in the left column,
               description in the right. The section previously ran the whole
               row at reading measure and left the right half of a 1440 canvas
               empty — this uses that width with content already on the page
               rather than filling it with something invented. The right
               column is sized to the reading measure, so the description
               occupies its column exactly instead of being capped inside a
               wider one. Below `lg` it collapses back to one top-to-bottom
               sequence. */
            <Reveal
              as="li"
              key={step.number}
              className="relative pb-12 pl-14 last:pb-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,38rem)] lg:items-start lg:gap-x-12 lg:pb-20 lg:pl-28"
              y={travel.sm}
            >
              {/* The node. `bg-paper` is what breaks the rail behind it.
                  Absolutely positioned, so it takes no grid cell. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex w-10 justify-center lg:w-16"
              >
                <span className="numeral bg-paper py-1 font-display text-sm font-semibold leading-none text-brand-red">
                  {step.number}
                </span>
              </span>

              <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-heading">
                {step.title}
              </h3>
              <p className="measure mt-3 text-on-light-muted lg:mt-0 lg:pt-2">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <CtaLink href="/sourcing-trade" variant="text">
            Sourcing &amp; Trade in detail
          </CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}
