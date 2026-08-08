/**
 * data/brand.ts
 * ---------------------------------------------------------------------------
 * BRAND ASSET REGISTRY
 *
 * The official ANTONIO MARCO logo is a supplied artwork file, not something
 * this codebase may draw. It must never be redrawn, re-lettered, recoloured,
 * stretched, rotated or cropped into — the component that renders it only ever
 * places the file, scaled proportionally.
 *
 * ══════════════════════════════════════════════════════════════════════════
 *  THE LOGO FILE IS NOT IN THE REPOSITORY YET.
 *
 *  Add it at the paths below and flip `available` to true. Nothing else needs
 *  to change: the header and footer switch from the typographic lockup to the
 *  real artwork automatically.
 *
 *    /public/brand/antonio-marco-logo-original.png   preserved original
 *    /public/brand/antonio-marco-logo.webp           optimised web derivative
 *
 *  The derivative must be visually identical to the original. Trimming excess
 *  empty canvas is allowed; cropping any bar, letter or rule is not. Keep
 *  clear space around the mark of at least the height of the red bars.
 * ══════════════════════════════════════════════════════════════════════════
 */

export interface BrandAsset {
  /** Optimised derivative actually rendered by the site. */
  readonly path: string;
  /** Untouched original, preserved in the repository for reference. */
  readonly originalPath: string;
  /** Intrinsic dimensions of the derivative. Required to reserve layout space. */
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Flip to true only once the file exists at `path`. */
  readonly available: boolean;
}

export const brandAssets = {
  antonioMarcoLogo: {
    path: "/brand/antonio-marco-logo.webp",
    originalPath: "/brand/antonio-marco-logo-original.png",
    /**
     * Matches the supplied artwork's proportions (roughly 2:1 once the empty
     * canvas is trimmed). Update these to the real intrinsic size of the file
     * you add — they exist so the header reserves the correct box and the
     * logo never causes layout shift.
     */
    width: 1200,
    height: 300,
    alt: "Antonio Marco Exports and Trade Private Limited",
    available: false,
  } satisfies BrandAsset,
} as const;

/**
 * The relationship shown to visitors.
 *
 * The public brand is AM GLOBAL COMMODITIES. Antonio Marco is the corporate
 * identity behind it, shown as a quiet descriptor — never large enough for a
 * visitor to think the company trades under a different name.
 */
export const brandLockup = {
  primary: "AM Global Commodities",
  primaryUpper: "AM GLOBAL COMMODITIES",
  descriptor: "by Antonio Marco",
  /** Used where the full corporate relationship needs stating. */
  descriptorLong: "A brand of Antonio Marco Exports and Trade Private Limited",
} as const;
