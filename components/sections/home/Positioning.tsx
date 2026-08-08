import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { positioningContent } from "@/data/home";
import { secondaryCtas } from "@/data/navigation";

/**
 * SECTION 3 — POSITIONING
 *
 * A single large statement on a warm paper ground, deliberately quiet after
 * the cinematic journey. Concise copy, no adjectives doing work that facts
 * should do.
 */
export function Positioning() {
  return (
    <section
      aria-labelledby="positioning-heading"
      className="bg-paper text-on-light"
    >
      <Container className="py-24 md:py-36 lg:py-44">
        <Reveal>
          <SectionLabel index="03">{positioningContent.label}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <DisplayReveal
            as="h2"
            id="positioning-heading"
            lines={positioningContent.headingLines}
            className="display-xl text-on-light lg:col-span-7"
          />

          <div className="lg:col-span-5 lg:pt-3">
            <Reveal stagger="base" className="space-y-6">
              {positioningContent.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "body-lg text-on-light"
                      : "text-on-light-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-10" delay={0.1}>
              <CtaLink
                href={secondaryCtas.discussRequirements.href}
                variant="text"
              >
                {secondaryCtas.discussRequirements.label}
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
