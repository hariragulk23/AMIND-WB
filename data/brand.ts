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
 * The supplied artwork is preserved untouched at
 * /public/brand/antonio-marco-logo-original.png (1774×887, white canvas).
 *
 * /public/brand/antonio-marco-logo.webp is the derivative the site renders.
 * Two things were done to it, neither of which alters the mark:
 *   • the empty canvas was trimmed to the artwork plus 7% brand safe space,
 *     taking it from 1774×887 to 1567×365 and 829 KB to 74 KB;
 *   • the flat white backdrop was lifted to transparency, with a soft edge so
 *     the antialiasing survives, so the mark sits on the warm site canvas
 *     without a white rectangle around it.
 * No bar, letterform, proportion or colour was changed. Because the artwork is
 * dark, it needs a light ground — the footer places it on a light panel rather
 * than inverting it.
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
    /** Intrinsic size of the derivative — reserves the box, prevents shift. */
    width: 1567,
    height: 365,
    alt: "Antonio Marco",
    available: true,
  } satisfies BrandAsset,
} as const;

/**
 * The relationship shown to visitors.
 *
 * The public brand is AM INDIA. Antonio Marco is the corporate
 * identity behind it, shown as a quiet descriptor — never large enough for a
 * visitor to think the company trades under a different name.
 */
export const brandLockup = {
  primary: "AM INDIA",
  primaryUpper: "AM INDIA",
  descriptor: "by Antonio Marco",
  /** Used where the full corporate relationship needs stating in text. */
  descriptorLong: "A brand of Antonio Marco Exports and Trade Private Limited",
} as const;
