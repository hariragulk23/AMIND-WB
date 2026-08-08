import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { primaryCta, secondaryCtas } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-screen-safe flex-col justify-center overflow-hidden bg-ink text-on-dark">
      <div className="grain-layer" />

      <Container className="relative py-24">
        <p className="label-xs numeral text-brass">Error 404</p>
        <h1 className="display-xl mt-8 text-on-dark">
          <span className="block">Page</span>
          <span className="block">not found</span>
        </h1>
        <p className="body-lg mt-8 max-w-[34rem] text-on-dark-muted">
          The page you asked for is not here. It may have moved, or the address
          may be incorrect.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
          <CtaLink
            href={secondaryCtas.exploreCommodities.href}
            tone="dark"
            variant="solid"
          >
            {secondaryCtas.exploreCommodities.label}
          </CtaLink>
          <CtaLink href={primaryCta.href} tone="dark" variant="outline">
            {primaryCta.labelLong}
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
