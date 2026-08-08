/**
 * data/images.ts
 * ---------------------------------------------------------------------------
 * IMAGE MANIFEST — the contract between the design and the photography.
 *
 * No external stock-photo URLs are embedded anywhere in this project. Every
 * image slot is declared here with the path the real asset must be dropped at,
 * the aspect ratio the layout reserves, the minimum resolution, and the
 * subject the photograph must show.
 *
 * HOW TO ACTIVATE AN IMAGE
 *   1. Save the file at exactly `path` (AVIF or WebP preferred, JPG accepted).
 *   2. Flip `available` to `true`.
 *   3. Refine `alt` so it describes the delivered photograph accurately.
 *
 * Until `available` is true, <Media> renders a tonal placeholder that reserves
 * the exact same box — so activating an asset never causes layout shift, and
 * visitors never see placeholder text.
 *
 * A human-readable version of this manifest is generated in
 * `public/images/README.md`.
 */

export type ImageSection =
  | "home-hero"
  | "home-journey"
  | "home-trade"
  | "home-grid"
  | "commodity-hero"
  | "commodity-gallery"
  | "company";

export interface ImageAsset {
  /** Stable key used by components to look the asset up. */
  readonly key: string;
  /** Public path the real file must be saved at. */
  readonly path: string;
  /** Where the image appears, for the photography brief. */
  readonly section: ImageSection;
  /** Layout aspect ratio — reserved even while the asset is missing. */
  readonly aspectRatio: `${number}/${number}`;
  /** Minimum acceptable pixel dimensions. */
  readonly minResolution: `${number}x${number}`;
  /** What the photograph must show. Written for the photographer. */
  readonly subject: string;
  /** Meaningful alt text. Must be refined once the real asset lands. */
  readonly alt: string;
  /** Flip to true only when the real file exists at `path`. */
  readonly available: boolean;
  /**
   * Tonal family used by the placeholder so the composition still reads
   * correctly before photography is delivered.
   */
  readonly tone: "ink" | "forest" | "earth" | "paper";
}

export const imageManifest = {
  /* ---------------------------------------------------------------- HOME */
  "home-hero": {
    key: "home-hero",
    path: "/images/origin/hero-origin.webp",
    section: "home-hero",
    aspectRatio: "16/9",
    minResolution: "2880x1620",
    subject:
      "Cinematic wide origin frame — raw commodity in bulk or an origin landscape at low light. Dark, atmospheric, no people looking at camera, no flags, no cargo ships.",
    alt: "Raw commodity at origin",
    available: false,
    tone: "ink",
  },
  "home-trade": {
    key: "home-trade",
    path: "/images/trade/trade-documentation.webp",
    section: "home-trade",
    aspectRatio: "4/5",
    minResolution: "1600x2000",
    subject:
      "Close, restrained frame of trade documentation, inspection notes or a sample tray on a desk. Hands acceptable. No stock handshakes.",
    alt: "Trade documentation and commodity samples under review",
    available: false,
    tone: "paper",
  },

  /* ------------------------------------------------- COMMODITY JOURNEY */
  "journey-coffee": {
    key: "journey-coffee",
    path: "/images/coffee/journey-coffee.webp",
    section: "home-journey",
    aspectRatio: "16/9",
    minResolution: "2560x1440",
    subject:
      "Macro texture of green coffee beans in bulk, or hands grading green coffee over a tray. Natural light, shallow depth of field.",
    alt: "Green coffee beans in bulk",
    available: false,
    tone: "forest",
  },
  "journey-teak": {
    key: "journey-teak",
    path: "/images/teak/journey-teak.webp",
    section: "home-journey",
    aspectRatio: "16/9",
    minResolution: "2560x1440",
    subject:
      "Macro of sawn teak end-grain or stacked sawn timber in a yard. Emphasise grain, colour and stack geometry.",
    alt: "Sawn teak timber showing end grain",
    available: false,
    tone: "earth",
  },
  "journey-spices": {
    key: "journey-spices",
    path: "/images/spices/journey-spices.webp",
    section: "home-journey",
    aspectRatio: "16/9",
    minResolution: "2560x1440",
    subject:
      "Spices in bulk — black pepper, cardamom, turmeric or dried chilli — photographed as texture, not as a styled kitchen scene.",
    alt: "Whole spices in bulk",
    available: false,
    tone: "earth",
  },
  "journey-nuts": {
    key: "journey-nuts",
    path: "/images/nuts/journey-nuts.webp",
    section: "home-journey",
    aspectRatio: "16/9",
    minResolution: "2560x1440",
    subject:
      "Cashew kernels in bulk or cashew grading/sorting at a processing facility. Macro texture preferred.",
    alt: "Cashew kernels in bulk",
    available: false,
    tone: "paper",
  },

  /* ------------------------------------------------- COMMODITY TILES */
  "tile-coffee": {
    key: "tile-coffee",
    path: "/images/coffee/tile-coffee.webp",
    section: "home-grid",
    aspectRatio: "4/5",
    minResolution: "1200x1500",
    subject: "Vertical crop of green coffee — beans in a jute bag or in a grading tray.",
    alt: "Green coffee beans in a jute bag",
    available: false,
    tone: "forest",
  },
  "tile-teak": {
    key: "tile-teak",
    path: "/images/teak/tile-teak.webp",
    section: "home-grid",
    aspectRatio: "4/5",
    minResolution: "1200x1500",
    subject: "Vertical crop of teak — a stack of boards or a single sawn face.",
    alt: "Stacked teak boards",
    available: false,
    tone: "earth",
  },
  "tile-spices": {
    key: "tile-spices",
    path: "/images/spices/tile-spices.webp",
    section: "home-grid",
    aspectRatio: "4/5",
    minResolution: "1200x1500",
    subject: "Vertical crop of a single spice in bulk, shot as texture.",
    alt: "Spices in bulk",
    available: false,
    tone: "earth",
  },
  "tile-nuts": {
    key: "tile-nuts",
    path: "/images/nuts/tile-nuts.webp",
    section: "home-grid",
    aspectRatio: "4/5",
    minResolution: "1200x1500",
    subject: "Vertical crop of cashew kernels, graded and sorted.",
    alt: "Graded cashew kernels",
    available: false,
    tone: "paper",
  },

  /* ------------------------------------------------------------ COMPANY */
  "company-base": {
    key: "company-base",
    path: "/images/company/operational-base.webp",
    section: "company",
    aspectRatio: "3/2",
    minResolution: "2000x1333",
    subject:
      "Honest, non-generic frame representing the operational base in Tamil Nadu. Only use genuine locations — never a stock office interior.",
    alt: "Operational base in Tamil Nadu, India",
    available: false,
    tone: "paper",
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof imageManifest;

export function getImage(key: ImageKey): ImageAsset {
  return imageManifest[key];
}

/** All manifest entries, for documentation generation and audits. */
export const allImages: readonly ImageAsset[] = Object.values(imageManifest);
