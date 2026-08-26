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

/**
 * Brand easing curves.
 *
 * ONE CURVE, EVERYWHERE. `globals.css` defines the brand curve as
 * `--ease-brand: cubic-bezier(0.22, 1, 0.36, 1)` and every CSS transition on
 * the site uses it. That bezier is exactly easeOutQuint, which GSAP calls
 * `power4.out` — so JS and CSS motion are now provably the same curve rather
 * than two similar-looking ones.
 *
 * This previously drifted: `out` was `power3.out` (quart — close to, but not,
 * the CSS curve) and `editorial` was `expo.out`, which is far more aggressive
 * than either. expo.out covers ~97% of its distance in the first half of its
 * duration, so a 2s "slow, deliberate" heading reveal was really a fast snap
 * followed by a second of imperceptible drift. Components also reached past
 * these tokens for raw strings ("power1.inOut", "power2.inOut"), so the site
 * was moving on five different curves.
 *
 * Scale of emphasis is now carried by DURATION and DISTANCE, not by swapping
 * to a punchier curve.
 */
export const ease = {
  /** The brand curve. Identical to `--ease-brand` in globals.css. */
  out: "power4.out",
  /**
   * For symmetrical in/out motion (panels opening and closing), where an
   * ease-out-only curve reads as lopsided.
   */
  inOut: "power3.inOut",
  /** For scrubbed transitions — must be linear to track the scrollbar. */
  scrub: "none",
} as const;

/**
 * Durations in seconds. Kept long on purpose — but long only works when the
 * element is actually still travelling for that whole time, which is why the
 * reveal distances below were increased alongside these.
 */
export const duration = {
  fast: 0.5,
  /** Panels, menus, anything the visitor is waiting on. */
  ui: 0.8,
  /** The standard entrance reveal. */
  base: 1.1,
  /** Large editorial type. */
  slow: 1.5,
} as const;

/** Standard stagger for grouped reveals. */
export const stagger = {
  tight: 0.08,
  base: 0.14,
  loose: 0.2,
} as const;

/**
 * Distance in pixels an element rises during an entrance reveal.
 *
 * This used to default to 18px against a 1.35s duration. Under an ease-out
 * curve that puts nearly all of the 18px into the first ~350ms and leaves a
 * long tail moving a fraction of a pixel per frame — which does not read as
 * "slow and deliberate", it reads as a small twitch followed by lag. A longer
 * duration needs a proportionally longer travel to stay legible for its whole
 * length.
 */
export const travel = {
  sm: 22,
  base: 32,
} as const;

/**
 * Scrub smoothing, in seconds of catch-up.
 *
 * NEVER USE `scrub: true`. `true` maps the animation's progress directly onto
 * scroll position with no smoothing, so the animation moves in exactly the
 * discrete steps the input device produces. Measured on the commodity journey
 * before this changed: one mouse-wheel notch advanced the crossfade by 17% of
 * its entire range within a single frame — six notches took it end to end. The
 * effect was a stepped switch, not the slow dissolve it was written to be.
 *
 * A numeric scrub makes the animation *ease toward* the scroll position over
 * this many seconds, which is what makes scrubbed motion read as liquid.
 */
export const scrub = {
  /** Short travel, or motion that must stay tightly tied to scroll. */
  tight: 0.6,
  /** Long dissolves and parallax, where extra float is wanted. */
  smooth: 1,
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
