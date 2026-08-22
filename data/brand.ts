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
 * red/green/red), genuinely transparent. This is the header/nav mark; it sits
 * beside the live "AM INDIA" text wordmark rendered by `Logo.tsx`, not fused
 * into a combined image.
 *
 * /public/brand/am-india-full-lockup.png — icon + wordmark + underline as one
 * combined artwork. Supplied and present on disk, but NOT wired into any
 * component yet — reserved for a future footer/letterhead treatment. Do not
 * import or render this asset without explicit direction.
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
  /** Icon-only mark. Used in the header beside the text wordmark. */
  icon: {
    path: "/brand/am-india-icon.png",
    width: 725,
    height: 580,
    alt: "AM India",
    available: true,
  } satisfies BrandAsset,
  /**
   * Combined icon + wordmark artwork. On disk and ready, but reserved —
   * not rendered anywhere yet. See the file-level note above.
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
