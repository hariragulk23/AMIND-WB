import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqContent } from "@/data/faq";
import { faqSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

/**
 * SECTION — FAQ
 *
 * Five questions a buyer evaluating a supplier actually asks, answered
 * directly. Every answer restates a fact published elsewhere on the site;
 * see the source notes in data/faq.ts.
 *
 * AN ACCORDION, BUILT ON NATIVE <details>/<summary>.
 * Native rather than a custom widget because <details> is keyboard operable,
 * exposes its own expanded state to assistive technology, and works with
 * JavaScript disabled — none of which a div-and-onClick pattern gets for
 * free. The first item is open so the section reads as an answer rather than
 * a list of headings.
 *
 * COLLAPSED IS NOT ABSENT. Every answer stays in the server-rendered HTML at
 * all times — <details> hides its contents with CSS, it does not remove or
 * lazy-load them. Search engines and answer engines read the full text, and
 * it stays byte-identical to the FAQPage JSON-LD below.
 *
 * The FAQPage JSON-LD is emitted from this component rather than the page, so
 * the markup can only ever ship alongside the section it describes.
 *
 * Questions are `h3` because the section heading is the `h2`; that keeps the
 * document outline intact rather than restarting the hierarchy.
 */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-paper text-on-light">
      {/* Closes on the last accordion item's own border, which already
          marks the boundary — so the bottom padding is cut below the
          standard section-y rhythm while the top keeps it (nothing marks
          the top boundary except the section label, same as everywhere
          else). */}
      <Container className="pt-[clamp(3.5rem,9vw,6rem)] pb-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>{faqContent.label}</SectionLabel>
            </Reveal>
            <DisplayReveal
              as="h2"
              id="faq-heading"
              lines={faqContent.headingLines}
              className="display-lg mt-8 text-heading"
            />
          </div>

          <Reveal
            stagger="base"
            className="border-t border-paper-line lg:col-span-7"
          >
            {faqContent.items.map((item, index) => (
              <details
                key={item.question}
                /* First item open, so the section opens as an answer rather
                   than as a list of headings with nothing under it. */
                open={index === 0}
                className="group border-b border-paper-line"
              >
                <summary
                  className={cn(
                    "flex w-full cursor-pointer list-none items-start justify-between gap-6",
                    "py-7 text-left lg:py-8",
                    "transition-colors duration-300 ease-brand hover:text-brand-red-deep",
                    /* Safari still paints the default triangle without this. */
                    "[&::-webkit-details-marker]:hidden",
                  )}
                >
                  <h3 className="display-md measure text-heading">
                    {item.question}
                  </h3>

                  {/* A plus that becomes a minus. Two rules, one rotated —
                      no icon font, no extra dependency, and it animates on
                      transform only. aria-hidden because <details> already
                      announces its own expanded state. */}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 block h-3.5 w-3.5 shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-brand group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>

                <div className="measure pb-8 text-on-light-muted lg:pb-10">
                  {item.answer}
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </Container>

      <JsonLd data={faqSchema()} />
    </section>
  );
}
