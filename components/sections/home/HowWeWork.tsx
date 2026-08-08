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
      <Container className="py-24 md:py-36 lg:py-44">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="05">{processContent.label}</SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="process-heading"
              lines={processContent.headingLines}
              className="display-lg mt-8 text-on-light"
            />
          </div>

          <Reveal
            as="p"
            className="body-lg max-w-[30rem] text-on-light-muted lg:col-span-4 lg:col-start-9 lg:pt-4"
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
              y={22}
            >
              <div className="grid gap-4 py-9 md:grid-cols-12 md:gap-8 md:py-12">
                <p className="numeral font-display text-[clamp(2rem,4vw,3.25rem)] leading-none text-brass-deep md:col-span-2">
                  {step.number}
                </p>
                <h3 className="display-md text-on-light md:col-span-4">
                  {step.title}
                </h3>
                <p className="max-w-[42rem] text-on-light-muted md:col-span-6">
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
