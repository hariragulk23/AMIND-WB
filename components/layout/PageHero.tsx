import Link from "next/link";
import { DisplayReveal } from "@/components/animation/DisplayReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/structured-data";

interface PageHeroProps {
  /** One string per line of display type. */
  headingLines: readonly string[];
  intro?: string;
  /**
   * The full trail, ending with the current page. The last entry is rendered
   * as the current location rather than as a link.
   */
  crumbs: readonly Crumb[];
}

/**
 * Shared hero for every route other than the homepage.
 *
 * Uses a dark ground on all pages, which is what lets the site header keep a
 * single, consistent transparent-over-hero treatment site-wide.
 *
 * Emits BreadcrumbList structured data from the same trail it renders, so the
 * visible breadcrumb and the markup can never drift apart.
 */
export function PageHero({ headingLines, intro, crumbs }: PageHeroProps) {
  const ancestors = crumbs.slice(0, -1);
  const current = crumbs[crumbs.length - 1];

  return (
    <section className="grain relative overflow-hidden bg-ink text-on-dark">
      <div className="grain-layer" />

      <Container className="relative flex flex-col justify-end pb-14 md:pb-20">
        {/* Clears the fixed header. */}
        <div
          aria-hidden="true"
          style={{ paddingTop: "calc(var(--am-header-h) + 5rem)" }}
        />

        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="label-xs flex flex-wrap items-center gap-2 text-on-dark-muted">
              {ancestors.map((crumb) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  <Link
                    href={crumb.path}
                    className="transition-colors duration-300 ease-brand hover:text-brass"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-charcoal">
                    /
                  </span>
                </li>
              ))}
              <li aria-current="page" className="text-on-dark">
                {current.name}
              </li>
            </ol>
          </nav>
        </Reveal>

        <DisplayReveal
          as="h1"
          lines={headingLines}
          className="display-xl mt-10 text-on-dark md:mt-14"
          immediate
          delay={0.1}
        />

        {intro ? (
          <Reveal
            as="p"
            className="body-lg mt-8 max-w-[42rem] text-on-dark-muted"
            delay={0.35}
          >
            {intro}
          </Reveal>
        ) : null}
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </section>
  );
}
