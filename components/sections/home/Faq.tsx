import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqContent } from "@/data/faq";
import { faqSchema } from "@/lib/structured-data";

/**
 * SECTION — FAQ
 *
 * Five questions a buyer evaluating a supplier actually asks, answered
 * directly. Every answer restates a fact published elsewhere on the site;
 * see the source notes in data/faq.ts.
 *
 * DELIBERATELY NOT AN ACCORDION. Collapsing the answers would hide the only
 * plainly-extractable text on the page behind a click and a JavaScript
 * dependency, which is the opposite of the point — and with five short
 * answers there is nothing to save. Everything is real text, visible on load,
 * present in the server-rendered HTML.
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
      <Container className="section-y">
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
            as="dl"
            stagger="base"
            className="border-t border-paper-line lg:col-span-7"
          >
            {faqContent.items.map((item) => (
              <div key={item.question} className="border-b border-paper-line">
                <div className="py-9 lg:py-11">
                  <dt>
                    <h3 className="display-md measure text-heading">
                      {item.question}
                    </h3>
                  </dt>
                  <dd className="measure mt-4 text-on-light-muted">
                    {item.answer}
                  </dd>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>

      <JsonLd data={faqSchema()} />
    </section>
  );
}
