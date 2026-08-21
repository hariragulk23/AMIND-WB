/**
 * lib/motion.ts
 * ---------------------------------------------------------------------------
 * Central motion configuration. Every animated component imports its easing
 * and duration from here so the whole site moves with one voice: slow,
 * intentional, minimal, cinematic.
 *
 * Two rules enforced by this module:
 *
 *   1. NO SMOOTH-SCROLL LIBRARY. The site uses native browser scrolling. GSAP
 *      ScrollTrigger reads that scroll position; it never drives it.
 *
 *   2. prefers-reduced-motion IS HONOURED IN JS, not only in CSS. When it is
 *      set, `prefersReducedMotion()` returns true and animated components skip
 *      building timelines entirely — content is rendered in its final, fully
 *      visible state.
 *
 * Animation is restricted to `transform`, `opacity` and `clip-path` so the
 * compositor can do the work. Nothing here animates layout properties.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register plugins once, on the client only. Safe to call repeatedly —
 * gsap.registerPlugin de-duplicates.
 */
export function registerGsap(): void {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

/** Brand easing curves, matched to the CSS custom properties in globals.css. */
export const ease = {
  /** Default: decisive start, long settle. */
  out: "power3.out",
  /** For large editorial reveals. */
  editorial: "expo.out",
  /** For scrubbed transitions — must be linear-ish to track the scrollbar. */
  scrub: "none",
} as const;

/** Durations in seconds. Kept long on purpose. */
export const duration = {
  fast: 0.5,
  base: 1.1,
  slow: 1.7,
} as const;

/** Standard stagger for grouped reveals. */
export const stagger = {
  tight: 0.08,
  base: 0.13,
  loose: 0.2,
} as const;

/**
 * True when the visitor has asked for reduced motion.
 * Read at effect time (inside useGSAP) so it reflects the live setting and
 * never differs between server and client render.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Coarse-pointer / small-viewport check used to substitute simplified
 * animations on phones. Heavy pinned or scrubbed storytelling is not run on
 * small screens — the mobile experience is a deliberately different, calmer
 * composition rather than a shrunken desktop one.
 */
export const DESKTOP_QUERY = "(min-width: 1024px)";

export function isDesktopViewport(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(DESKTOP_QUERY).matches;
}

/**
 * Shared ScrollTrigger start position for entrance reveals: fire when the
 * element is comfortably inside the viewport rather than at the very edge.
 */
export const REVEAL_START = "top 82%";

export { gsap, ScrollTrigger };
