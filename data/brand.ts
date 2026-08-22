/**
 * data/brand.ts
 * ---------------------------------------------------------------------------
 * BRAND ASSET REGISTRY
 *
 * The official AM INDIA marks are supplied artwork files, not something this
 * codebase may draw. They must never be redrawn, re-lettered, recoloured,
 * stretched, rotated or cropped into — a component only ever places the file,
 * scaled proportionally.
 *
 * /public/brand/am-india-icon.png — the icon alone (three diagonal bars,
 * red/green/red), genuinely transparent. Used where the wordmark is already
 * live text nearby and a second copy of it would repeat the name: the footer
 * (`FooterMark.tsx`, beneath the large "AM INDIA" text heading) and the
 * generated favicon/OG derivatives.
 *
 * /public/brand/am-india-full-lockup.png — icon + wordmark + underline drawn
 * as one combined artwork. This is the primary logo: used wherever the mark
 * stands alone with no separate live-text wordmark beside it — the header
 * (`Logo.tsx`) and the homepage hero (`Hero.tsx`). Rendered as a single
 * image, never reconstructed from live text plus a separate icon graphic.
 */

export interface BrandAsset {
  readonly path: string;
  /** Intrinsic dimensions. Required to reserve layout space. */
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Flip to true only once the file exists at `path`. */
  readonly available: boolean;
}

export const brandAssets = {
  /** Icon-only mark. Footer and generated favicon/OG derivatives. */
  icon: {
    path: "/brand/am-india-icon.png",
    width: 725,
    height: 580,
    alt: "AM India",
    available: true,
  } satisfies BrandAsset,
  /**
   * The primary logo — icon + wordmark, one artwork. Header and hero.
   * `alt` here is the fuller default; both consumers pass their own
   * context-appropriate override rather than using it as-is (a concise
   * nav-landmark alt in the header, a fuller one on the hero, where the
   * image stands in for the page's primary heading).
   */
  fullLockup: {
    path: "/brand/am-india-full-lockup.png",
    width: 2340,
    height: 580,
    alt: "AM India — Antonio Marco Exports and Trade Private Limited",
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
