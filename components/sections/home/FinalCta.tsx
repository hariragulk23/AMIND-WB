import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { finalCtaContent } from "@/data/home";
import { primaryCta } from "@/data/navigation";

/**
 * SECTION 8 — FINAL CTA
 *
 * The page ends on the largest type on the site and a single conversion.
 * Email and phone used to repeat here as well — the footer that follows
 * immediately after already carries both, so the duplicate line was cut
 * rather than reworded.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-forest-deep text-on-dark"
    >
      <Container className="relative section-y">
        <Reveal>
          <SectionLabel tone="dark">
            {finalCtaContent.label}
          </SectionLabel>
        </Reveal>

        <DisplayReveal
          as="h2"
          id="final-cta-heading"
          lines={finalCtaContent.headingLines}
          className="display-xl mt-10 text-on-dark lg:mt-14"
        />

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-12">
          <Reveal
            as="p"
            className="body-lg max-w-[34rem] text-on-dark-muted lg:col-span-5"
          >
            {finalCtaContent.paragraph}
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-7">
            <CtaLink href={primaryCta.href} tone="dark" variant="solid">
              {primaryCta.labelLong}
            </CtaLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
