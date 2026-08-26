"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Media } from "@/components/ui/Media";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { commodities } from "@/data/commodities";
import { journeyContent } from "@/data/home";
import {
  duration as dur,
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  scrub as scrubTokens,
  ScrollTrigger,
  stagger as staggerTokens,
  travel,
} from "@/lib/motion";

registerGsap();

/**
 * SECTION 2 — COMMODITY JOURNEY
 *
 * A scroll-driven, full-bleed presentation of the four commodity platforms.
 *
 * ARCHITECTURE NOTE — why there is no ScrollTrigger `pin` here:
 * the full-viewport media stage is held in place by native CSS `position:
 * sticky`, and the text column is pulled up over it with a negative margin.
 * GSAP is used only to crossfade the stacked media layers. That matters a
 * great deal on Android and iOS, where pin-spacers plus a collapsing URL bar
 * are the usual cause of jumping, mis-measured scroll sections. Nothing here
 * takes over the scrollbar, so scrolling never feels hijacked.
 *
 * Degradation:
 *  • No JavaScript — the first media layer shows and all four commodity
 *    panels are fully readable and linked.
 *  • Reduced motion — crossfades become instant state changes, the parallax
 *    scale is dropped, and nothing is scrubbed.
 */
export function CommodityJourney() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", root);
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);
      const markers = gsap.utils.toArray<HTMLElement>("[data-marker]", root);
      const reduced = prefersReducedMotion();

      // Only the first layer is visible to begin with; each subsequent layer
      // fades in on top of the previous one.
      gsap.set(layers, { opacity: (i: number) => (i === 0 ? 1 : 0) });

      panels.forEach((panel, i) => {
        const layer = layers[i];

        /* ---- Media crossfade ---------------------------------------- */
        if (layer && i > 0) {
          if (reduced) {
            ScrollTrigger.create({
              trigger: panel,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) =>
                gsap.set(layer, { opacity: self.isActive ? 1 : 0 }),
            });
          } else {
            gsap.fromTo(
              layer,
              { opacity: 0 },
              {
                opacity: 1,
                ease: ease.scrub,
                scrollTrigger: {
                  trigger: panel,
                  /* A wider range than the section needs, so the crossfade
                     reads as a slow dissolve rather than a switch. */
                  start: "top 96%",
                  end: "top 18%",
                  /* Was `true`. With no smoothing the dissolve moved in
                     exactly the steps the input device produced: measured at
                     17% of the full crossfade range in a single frame per
                     mouse-wheel notch, so six notches took it end to end as
                     a series of visible steps. The wide start/end range was
                     doing nothing, because the range only controls how much
                     scrolling maps to the fade — not how smoothly it gets
                     there. */
                  scrub: scrubTokens.smooth,
                },
              },
            );
          }
        }

        /* ---- Slow settle on the incoming layer -----------------------
           Smoothed for the same reason as the crossfade above. This one
           matters more on mid-range hardware: it is a continuous transform
           on a full-viewport image, so an unsmoothed scrub asks the
           compositor to re-rasterise at a new scale on every scroll step.
           Travel reduced from 7% to 4% — at 7% the top and bottom edges
           visibly creep during an ordinary scroll, which reads as drift
           rather than depth. */
        if (layer && !reduced) {
          gsap.fromTo(
            layer,
            { scale: 1.04 },
            {
              scale: 1,
              ease: ease.scrub,
              /* Explicit, because this is the one transform on the site big
                 enough for the difference to matter: without a 3D matrix the
                 browser may re-rasterise a full-viewport image at each new
                 scale instead of letting the compositor scale a cached
                 texture. */
              force3D: true,
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: scrubTokens.smooth,
              },
            },
          );
        }

        /* ---- Active platform marker ----------------------------------
           Uses `toggleClass` rather than an `onToggle` callback: a callback
           only fires on a transition, so a trigger the visitor scrolls
           straight past (or lands beyond on reload) would never correct
           itself, leaving two markers reading as active. `toggleClass` is
           re-evaluated on every refresh, so the rail is always right. */
        if (markers[i]) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 50%",
            end: "bottom 50%",
            toggleClass: { targets: markers[i], className: "is-active" },
          });
        }

        /* ---- Panel copy ---------------------------------------------- */
        if (reduced) return;
        const content = panel.querySelector<HTMLElement>("[data-panel-content]");
        if (!content) return;

        const items = Array.from(content.children);
        gsap.set(items, { opacity: 0, y: travel.sm });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: dur.base,
          stagger: staggerTokens.tight,
          ease: ease.out,
          scrollTrigger: { trigger: panel, start: "top 60%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="commodity-journey-heading"
      className="relative bg-ink text-on-dark"
    >
      <h2 id="commodity-journey-heading" className="sr-only">
        {journeyContent.label}
      </h2>

      <div className="relative">
        {/* ---- Sticky media stage (decorative) ------------------------- */}
        <div
          aria-hidden="true"
          className="grain sticky top-0 h-screen-safe overflow-hidden"
        >
          {commodities.map((commodity, index) => (
            <div
              key={commodity.slug}
              data-layer
              /* No `will-change` here on purpose: four permanently promoted
                 full-viewport layers cost real memory on mid-range Android,
                 and GSAP promotes whichever layer it is animating anyway. */
              className="absolute inset-0"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <Media
                imageKey={commodity.journeyImage}
                fill
                sizes="100vw"
                /* Only the first frame is eager — it is the one painted as the
                   journey comes into view. The other three lazy-load. */
                priority={index === 0}
              />
            </div>
          ))}

          <div className="scrim-media absolute inset-0" />
          <div className="grain-layer" />

          {/* Platform marker rail */}
          <ol className="absolute right-[var(--am-gutter)] top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
            {commodities.map((commodity, index) => (
              <li
                key={commodity.slug}
                data-marker
                className="label-xs numeral flex items-center justify-end gap-3 text-on-dark opacity-45 transition-opacity duration-500 ease-brand [&.is-active]:opacity-100"
              >
                <span>{commodity.name}</span>
                <span className="text-brand-red-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* ---- Scrolling copy column, pulled up over the stage --------- */}
        <div className="relative pull-up-screen">
          {commodities.map((commodity, index) => (
            <article
              key={commodity.slug}
              data-panel
              className="flex min-h-screen-safe flex-col justify-end"
            >
              <Container className="pb-16 pt-28 md:pb-20">
                <div data-panel-content className="max-w-[46rem]">
                  <SectionLabel
                    tone="dark"
                    index={String(index + 1).padStart(2, "0")}
                  >
                    {commodity.descriptor}
                  </SectionLabel>

                  <h3 className="display-xl mt-6 text-on-dark">
                    {commodity.name}
                  </h3>

                  {/* One line over the photograph, not three. The paragraph
                      that used to sit here (`description[0]`) is a full
                      specification note — it is still published in full on
                      the commodity page this panel links to, so nothing is
                      lost from the site, but over a full-bleed image it was
                      competing with the photograph rather than supporting it.
                      This is the section that is primarily image. */}
                  <p className="body-lg mt-6 max-w-[34rem] text-on-dark-muted">
                    {commodity.summary}
                  </p>

                  <div className="mt-9">
                    <CtaLink
                      href={`/commodities/${commodity.slug}`}
                      tone="dark"
                      variant="text"
                    >
                      {`Explore ${commodity.name}`}
                    </CtaLink>
                  </div>
                </div>
              </Container>
            </article>
          ))}
        </div>
      </div>

      <Container className="relative border-t border-charcoal py-8">
        <p className="label-xs text-on-dark-muted">{journeyContent.note}</p>
      </Container>
    </section>
  );
}
