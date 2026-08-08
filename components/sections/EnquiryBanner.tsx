import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { company } from "@/data/company";
import { primaryCta } from "@/data/navigation";

interface EnquiryBannerProps {
  /** Optional context line, e.g. naming the commodity being viewed. */
  intro?: string;
  headingLines?: readonly string[];
}

/**
 * The site-wide conversion block that closes every inner page. The homepage
 * uses its own, larger treatment in components/sections/home/FinalCta.tsx.
 */
export function EnquiryBanner({
  intro = "Send the specification, quantity and destination. We will come back with a clear view of whether and how it can be sourced.",
  headingLines = ["Start a", "trade enquiry."],
}: EnquiryBannerProps) {
  return (
    <section
      aria-labelledby="enquiry-banner-heading"
      className="grain relative overflow-hidden bg-forest-deep text-on-dark"
    >
      <div className="grain-layer" />

      <Container className="relative py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <DisplayReveal
            as="h2"
            id="enquiry-banner-heading"
            lines={headingLines}
            className="display-lg text-on-dark lg:col-span-6"
          />

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal as="p" className="max-w-[34rem] text-on-dark-muted">
              {intro}
            </Reveal>

            <Reveal className="mt-8">
              <CtaLink href={primaryCta.href} tone="dark" variant="solid">
                {primaryCta.labelLong}
              </CtaLink>
            </Reveal>

            <Reveal className="mt-8">
              <address className="not-italic text-sm text-on-dark-muted">
                <a
                  href={`mailto:${company.email}`}
                  className="block break-words transition-colors duration-300 ease-brand hover:text-brass"
                >
                  {company.email}
                </a>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="numeral mt-1 block transition-colors duration-300 ease-brand hover:text-brass"
                >
                  {company.phone}
                </a>
              </address>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
