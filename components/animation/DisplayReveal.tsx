"use client";

import { Fragment, useRef, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import {
  duration as dur,
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  REVEAL_START,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

registerGsap();

interface DisplayRevealProps {
  /** One string per line of display type. Rendered as real text on the server. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  /** Forwarded to the heading element so sections can be aria-labelledby it. */
  id?: string;
  /** Play immediately on mount instead of waiting for scroll — hero only. */
  immediate?: boolean;
  delay?: number;
  /** Stagger between lines, in seconds. */
  lineStagger?: number;
}

/**
 * Masked line reveal for oversized editorial headings.
 *
 * Each line sits inside an overflow-hidden mask and rises into place. Only
 * `transform` and `opacity` are animated, so the whole reveal stays on the
 * compositor.
 *
 * The heading is complete, readable text in the server-rendered HTML — search
 * engines and no-JS visitors get the full heading with no animation applied.
 */
export function DisplayReveal({
  lines,
  as: Tag = "h2",
  className,
  id,
  immediate = false,
  delay = 0,
  lineStagger = 0.13,
}: DisplayRevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el || prefersReducedMotion()) return;

      const targets = el.querySelectorAll<HTMLElement>("[data-line]");
      if (targets.length === 0) return;

      gsap.set(targets, { yPercent: 108, opacity: 0 });
      /* See MotionRoot: swept visible if this animation never runs. */
      targets.forEach((t) => t.setAttribute("data-reveal-pending", ""));

      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: dur.slow,
        delay,
        ease: ease.editorial,
        stagger: lineStagger,
        onComplete: () =>
          targets.forEach((t) => t.removeAttribute("data-reveal-pending")),
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: REVEAL_START,
                once: true,
              },
            }),
      });
    },
    { scope, dependencies: [immediate, delay, lineStagger] },
  );

  return (
    <Tag ref={scope} id={id} className={cn(className)}>
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {/* A real space between lines. The masks are block-level, so this
              whitespace text node collapses to nothing visually — but it IS
              part of the element's textContent. Without it a heading split
              across lines is extracted as "We connectoriginwith market." by
              screen readers, search engines and answer engines. */}
          {index > 0 ? " " : null}
          {/* The mask is padded and negatively margined so descenders and
              tight line-heights are never clipped. */}
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <span data-line className="block">
              {line}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
