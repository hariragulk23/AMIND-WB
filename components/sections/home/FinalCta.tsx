import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company } from "@/data/company";
import { finalCtaContent } from "@/data/home";
import { primaryCta } from "@/data/navigation";

/**
 * SECTION 8 — FINAL CTA
 *
 * The page ends on the largest type on the site and a single conversion.
 * Direct email and phone sit alongside it, because serious B2B buyers often
 * prefer to skip the form.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-forest-deep text-on-dark"
    >
      <Container className="relative py-24 md:py-36 lg:py-48">
        <Reveal>
          <SectionLabel index="08" tone="dark">
            {finalCtaContent.label}
          </SectionLabel>
        </Reveal>

        <DisplayReveal
          as="h2"
          id="final-cta-heading"
          lines={finalCtaContent.headingLines}
          className="display-hero mt-10 text-on-dark lg:mt-14"
        />

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-12">
          <Reveal
            as="p"
            className="body-lg max-w-[34rem] text-on-dark-muted lg:col-span-5"
          >
            {finalCtaContent.paragraph}
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-7">
            <CtaLink href={primaryCta.href} tone="dark" variant="solid">
              {primaryCta.labelLong}
            </CtaLink>
          </Reveal>

          <Reveal className="lg:col-span-2 lg:col-start-11">
            <address className="not-italic">
              <p className="label-xs text-on-dark-muted">Direct</p>
              <a
                href={`mailto:${company.email}`}
                className="mt-3 block break-words text-sm text-on-dark transition-colors duration-300 ease-brand hover:text-brass"
              >
                {company.email}
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="numeral mt-1.5 block text-sm text-on-dark transition-colors duration-300 ease-brand hover:text-brass"
              >
                {company.phone}
              </a>
            </address>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
