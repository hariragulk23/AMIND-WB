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
 * /public/brand/am-india-full-lockup-v2.png — icon + "AM INDIA" wordmark +
 * red/green rule + "GLOBAL COMMODITIES" subtitle, drawn as one combined
 * artwork, genuinely transparent. Rendered as a single image in the header
 * (`Logo.tsx`) — the one place on the site with no separate live-text
 * wordmark already carrying the name, so the designed mark leads there
 * rather than being reconstructed from live text plus a separate icon
 * graphic. NOT used by the homepage hero (`Hero.tsx`): the hero has its own
 * separate live h1 and never rendered this file, a stale claim in an
 * earlier version of this comment notwithstanding.
 *
 * Supersedes /public/brand/am-india-full-lockup.png (no "GLOBAL COMMODITIES"
 * line), which is retired from every component but left on disk rather than
 * deleted — no instruction to remove it was given. See the migration report.
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
    alt: "AM INDIA",
    available: true,
  } satisfies BrandAsset,
  /**
   * The combined icon + wordmark artwork. Header. `alt` here is the fuller
   * default; the header passes its own concise nav-landmark override rather
   * than using it as-is.
   */
  fullLockup: {
    path: "/brand/am-india-full-lockup-v2.png",
    width: 2366,
    height: 494,
    alt: "AM INDIA — Antonio Marco Exports and Trade Private Limited",
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
