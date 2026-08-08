"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/motion";

registerGsap();

interface ScrollCueProps {
  label: string;
}

/**
 * A restrained "scroll to explore" indicator: a hairline whose highlight
 * travels slowly downward. No bouncing, no rotation.
 *
 * With reduced motion the rule simply sits still — the label still explains
 * what to do, so nothing is lost.
 */
export function ScrollCue({ label }: ScrollCueProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-cue-fill]",
        { yPercent: -100 },
        {
          yPercent: 100,
          duration: 2.4,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 0.35,
        },
      );
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className="flex items-center gap-4 text-on-dark-muted"
    >
      <span className="label-xs">{label}</span>
      <span
        aria-hidden="true"
        className="relative block h-14 w-px overflow-hidden bg-charcoal"
      >
        <span data-cue-fill className="absolute inset-0 block bg-brass" />
      </span>
    </div>
  );
}
