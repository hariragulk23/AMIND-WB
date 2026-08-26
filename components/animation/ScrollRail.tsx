"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  scrub as scrubTokens,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

registerGsap();

interface ScrollRailProps {
  /** Positioning classes, so the caller decides where the rail sits. */
  className?: string;
}

/**
 * A vertical rail that fills as its containing section scrolls past.
 *
 * The progression IS the graphic — a line that draws itself downward, with the
 * stage numerals sitting on it as nodes. No arrows, no icon bubbles, no
 * flowchart boxes: the only thing added to the page is one hairline that grows.
 *
 * Scrubbed rather than triggered, so the fill tracks the scrollbar exactly and
 * reads as the visitor's own progress through the five stages rather than as
 * an animation playing at them.
 *
 * Only `scaleY` is animated, from a top origin, so the whole thing stays on the
 * compositor.
 *
 * REDUCED MOTION: the rail is painted fully drawn and never animates. The
 * sequence is still legible — it is the numerals and the line that carry it,
 * and both are present either way.
 */
export function ScrollRail({ className }: ScrollRailProps) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = el.current;
      if (!node) return;

      const section = node.parentElement;
      if (!section) return;

      if (prefersReducedMotion()) {
        gsap.set(node, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        node,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: ease.scrub,
          scrollTrigger: {
            trigger: section,
            /* Starts as the list reaches the lower third and completes as its
               end clears the middle of the screen, so the line is drawing for
               the whole time the stages are being read. */
            start: "top 70%",
            end: "bottom 55%",
            scrub: scrubTokens.tight,
          },
        },
      );
    },
    { scope: el },
  );

  return (
    <span
      ref={el}
      aria-hidden="true"
      className={cn("block origin-top bg-brand-red", className)}
      /* Painted at zero height until the effect runs. Without this the rail
         flashes fully drawn on first paint, before GSAP sets its start state. */
      style={{ transform: "scaleY(0)" }}
    />
  );
}
