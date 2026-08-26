import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
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
  intro = "Tell us what you are looking for and how to reach you. We will come back with a clear view of whether and how it can be sourced.",
  headingLines = ["Start a", "trade enquiry."],
}: EnquiryBannerProps) {
  return (
    <section
      aria-labelledby="enquiry-banner-heading"
      className="relative overflow-hidden bg-forest-deep text-on-dark"
    >
      <Container className="relative section-y-sm">
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

            {/* Email and phone used to repeat here — the footer that
                follows immediately after already carries both. */}
            <Reveal className="mt-8">
              <CtaLink href={primaryCta.href} tone="dark" variant="solid">
                {primaryCta.labelLong}
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
