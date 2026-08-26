"use client";

import { useRef, type ReactNode } from "react";
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

interface ParallaxProps {
  children: ReactNode;
  /**
   * Travel as a percentage of the inner layer's height. Kept small — this is
   * depth, not movement. Values above 8 will expose an edge.
   */
  amount?: number;
  start?: string;
  end?: string;
  className?: string;
  /**
   * Stretch to a positioned ancestor instead of sitting in normal flow.
   *
   * This is a prop rather than something the caller passes through
   * `className`, because `relative` and `absolute` are both Tailwind position
   * utilities in the same layer — passing `absolute` alongside a hard-coded
   * `relative` would leave the winner up to stylesheet order.
   */
  fill?: boolean;
}

/**
 * Subtle scrubbed parallax for full-bleed media.
 *
 * The inner layer is oversized by 14% on each axis so the visible box is never
 * uncovered as it translates. Only `transform` is animated.
 *
 * Skipped entirely under prefers-reduced-motion — the media then sits static,
 * which is the correct, complete presentation.
 *
 * The child is passed in from a Server Component, so the image itself is still
 * rendered on the server; only this thin wrapper hydrates.
 */
export function Parallax({
  children,
  amount = 8,
  start = "top bottom",
  end = "bottom top",
  className,
  fill = false,
}: ParallaxProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-parallax-inner]",
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: ease.scrub,
          scrollTrigger: {
            trigger: scope.current,
            start,
            end,
            /* Smoothed rather than `true`: parallax tied 1:1 to a discrete
               wheel or trackpad step moves in the same discrete steps, which
               is precisely what makes parallax read as cheap. */
            scrub: scrubTokens.smooth,
          },
        },
      );
    },
    { scope, dependencies: [amount, start, end] },
  );

  return (
    <div
      ref={scope}
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0" : "relative",
        className,
      )}
    >
      <div
        data-parallax-inner
        className="absolute inset-x-0 -top-[14%] h-[128%] will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
