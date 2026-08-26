"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/motion";

registerGsap();

interface ScrollCueProps {
  label: string;
  /** The ground the cue sits on. */
  tone?: "dark" | "light";
}

/**
 * A restrained "scroll to explore" indicator: a hairline whose highlight
 * travels slowly downward. No bouncing, no rotation.
 *
 * PAUSED WHEN OFF-SCREEN. This is an infinite loop, and an infinite GSAP tween
 * keeps ticking on the shared RAF for the whole session — including the entire
 * time the visitor is metres down the page and the hero is nowhere near the
 * viewport. On a mid-range phone that is a permanent background cost animating
 * something nobody can see. The ScrollTrigger below plays it only while it is
 * actually visible.
 *
 * With reduced motion the rule simply sits still — the label still explains
 * what to do, so nothing is lost.
 */
export function ScrollCue({ label, tone = "dark" }: ScrollCueProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tween = gsap.fromTo(
        "[data-cue-fill]",
        { yPercent: -100 },
        {
          yPercent: 100,
          duration: 2.6,
          ease: ease.inOut,
          repeat: -1,
          repeatDelay: 0.4,
          paused: true,
        },
      );

      ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className={
        tone === "light"
          ? "flex items-center gap-4 text-on-light-muted"
          : "flex items-center gap-4 text-on-dark-muted"
      }
    >
      <span className="label-xs">{label}</span>
      <span
        aria-hidden="true"
        className={
          tone === "light"
            ? "relative block h-14 w-px overflow-hidden bg-paper-line"
            : "relative block h-14 w-px overflow-hidden bg-charcoal"
        }
      >
        <span data-cue-fill className="absolute inset-0 block bg-brand-red" />
      </span>
    </div>
  );
}
