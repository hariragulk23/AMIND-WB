import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { processContent } from "@/data/home";

/**
 * SECTION 5 — HOW WE WORK
 *
 * Five stages as an editorial document: oversized numerals, hairline rules, no
 * icons and no cards.
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

        <ol className="mt-16 border-t border-paper-line lg:mt-24">
          {processContent.steps.map((step) => (
            <Reveal
              as="li"
              key={step.number}
              className="group border-b border-paper-line"
              y={18}
            >
              {/* Asymmetric, not an even twelve-column split: a narrow rail
                  carries the numeral and the step title, and the description
                  runs in one wide column beside it. The old 2/4/6 grid put
                  three roughly equal blocks on every row, which read as a
                  table — the eye had to re-scan each row to find where the
                  substance was. Here the rail is fixed and the substance is
                  always in the same place. */}
              <div className="grid gap-3 py-10 md:grid-cols-[7rem_1fr] md:gap-12 md:py-14 lg:grid-cols-[10rem_1fr]">
                <div className="flex items-baseline gap-4 md:block">
                  <p className="numeral font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none text-brand-red">
                    {step.number}
                  </p>
                  <h3 className="display-md text-heading md:mt-4">
                    {step.title}
                  </h3>
                </div>
                <p className="measure text-on-light-muted md:pt-2">
                  {step.description}
                </p>
              </div>
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
