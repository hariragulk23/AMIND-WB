"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import {
  duration as dur,
  ease,
  gsap,
  prefersReducedMotion,
  registerGsap,
  REVEAL_START,
  stagger as staggerTokens,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

registerGsap();

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical offset in pixels the element rises from. */
  y?: number;
  delay?: number;
  /**
   * When set, the element's direct children are staggered instead of the
   * element itself — used for lists, rules and grids.
   */
  stagger?: keyof typeof staggerTokens;
  /**
   * Play on mount rather than on scroll. Used for above-the-fold content,
   * which must never sit invisible waiting for a trigger that only fires once
   * the visitor scrolls.
   */
  immediate?: boolean;
}

/**
 * The site's standard entrance reveal: a short rise and fade, triggered once
 * when the element comes comfortably into view.
 *
 * Content is rendered in its final state on the server. The pre-animation
 * state is applied by `gsap.set` inside `useGSAP`, which runs in a layout
 * effect before paint — so there is no flash, and with JavaScript disabled the
 * content simply appears normally.
 *
 * `useGSAP` reverts every tween and ScrollTrigger created in this scope on
 * unmount, so navigating between routes leaves nothing behind.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 28,
  delay = 0,
  stagger,
  immediate = false,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el || prefersReducedMotion()) return;

      const targets: Element[] = stagger ? Array.from(el.children) : [el];
      if (targets.length === 0) return;

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: dur.base,
        delay,
        ease: ease.out,
        stagger: stagger ? staggerTokens[stagger] : 0,
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
    { scope, dependencies: [y, delay, stagger, immediate] },
  );

  return (
    <Tag ref={scope} className={cn(className)}>
      {children}
    </Tag>
  );
}
