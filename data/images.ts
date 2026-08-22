/**
 * data/images.ts
 * ---------------------------------------------------------------------------
 * IMAGE MANIFEST — the single source of truth for every photograph on the site.
 *
 * No component may hard-code an image path. Every slot is declared here with
 * its real on-disk path, its true intrinsic dimensions, its alt text and, where
 * the crop needs steering, an `objectPosition`.
 *
 * ART DIRECTION
 * The commodity hero frames ship as two separate photographs, not one file
 * scaled down: a 16:9 landscape crop for tablet and desktop, and a 9:16
 * portrait crop for phones. `<Media>` switches between them with a real
 * `<picture>`/`media` query, so a phone downloads only the portrait file and
 * the composition is never squeezed.
 *
 * FORMAT
 * The sources are high-quality JPEG (q90, 4:4:4 chroma). That is the source
 * format only — it is deliberately NOT the delivered one. Next.js negotiates
 * AVIF or WebP per request and resizes to the breakpoint, so the delivered
 * bytes are a fraction of the source. See public/images/IMAGE_SOURCES.md.
 *
 * ADDING AN IMAGE: declare it here, set `available: true`, and reference it by
 * key. Until `available` is true, <Media> paints a tonal ground of exactly the
 * same box — so activating one never causes layout shift, and no request is
 * ever made for a file that does not exist.
 */

export type ImageSection =
  | "home-hero"
  | "home-journey"
  | "home-trade"
  | "home-grid"
  | "commodity-hero"
  | "commodity-gallery"
  | "company";

/** The art-directed portrait companion to a landscape frame. */
export interface MobileVariant {
  readonly path: string;
  readonly width: number;
  readonly height: number;
}

export interface ImageAsset {
  /** Stable key used by components to look the asset up. */
  readonly key: string;
  /** Public path of the file actually on disk. */
  readonly path: string;
  /** True intrinsic dimensions. Required — they reserve the box. */
  readonly width: number;
  readonly height: number;
  /**
   * Portrait crop served below the `md` breakpoint. Present only on the
   * full-bleed hero frames, where scaling a landscape file down would destroy
   * the composition.
   */
  readonly mobile?: MobileVariant;
  /** Where the image appears, for the photography brief. */
  readonly section: ImageSection;
  /** Layout aspect ratio — reserved even while the asset is missing. */
  readonly aspectRatio: `${number}/${number}`;
  /**
   * `object-position` for the crop. Set per image where the subject sits off
   * centre; kept here rather than as scattered CSS in components.
   */
  readonly objectPosition?: string;
  /** What the photograph must show. Written for the photographer. */
  readonly subject: string;
  /**
   * Alt text describing what is actually in the frame.
   * EMPTY STRING IS DELIBERATE on the hero frames: they sit behind headline
   * typography that already names the commodity, so announcing them again
   * would just repeat the heading to a screen-reader user.
   */
  readonly alt: string;
  /** Only ever true when the file exists at `path`. */
  readonly available: boolean;
  /** Tonal family used by the placeholder while an asset is missing. */
  readonly tone: "ink" | "forest" | "earth" | "paper";
}

export const imageManifest = {
  /* ================================================== COMMODITY HERO FRAMES
     Full-bleed scenes in the homepage commodity journey. Landscape 16:9 with
     a portrait 9:16 companion for phones. Decorative — see `alt` above. */
  "journey-coffee": {
    key: "journey-coffee",
    path: "/images/coffee/hero-coffee.jpg",
    width: 1376,
    height: 768,
    mobile: { path: "/images/coffee/hero-coffee-mobile.jpg", width: 768, height: 1376 },
    section: "home-journey",
    aspectRatio: "16/9",
    /* Cherries sit left of centre; hold that side in the crop. */
    objectPosition: "38% 50%",
    subject: "Ripe coffee cherries on the branch at origin.",
    alt: "",
    available: true,
    tone: "forest",
  },
  "journey-teak": {
    key: "journey-teak",
    path: "/images/teak/hero-teak.jpg",
    width: 1376,
    height: 768,
    mobile: { path: "/images/teak/hero-teak-mobile.jpg", width: 768, height: 1376 },
    section: "home-journey",
    aspectRatio: "16/9",
    objectPosition: "50% 50%",
    subject: "Squared teak logs stacked end-on, showing the grain.",
    alt: "",
    available: true,
    tone: "earth",
  },
  "journey-spices": {
    key: "journey-spices",
    path: "/images/spices/hero-spices.jpg",
    width: 1376,
    height: 768,
    mobile: { path: "/images/spices/hero-spices-mobile.jpg", width: 768, height: 1376 },
    section: "home-journey",
    aspectRatio: "16/9",
    objectPosition: "50% 45%",
    subject: "Black pepper, star anise, cardamom and dried chilli in bulk.",
    alt: "",
    available: true,
    tone: "earth",
  },
  "journey-nuts": {
    key: "journey-nuts",
    path: "/images/nuts/hero-nuts.jpg",
    width: 1376,
    height: 768,
    mobile: { path: "/images/nuts/hero-nuts-mobile.jpg", width: 768, height: 1376 },
    section: "home-journey",
    aspectRatio: "16/9",
    objectPosition: "50% 50%",
    subject: "Cashews, almonds, pistachios and walnuts in bulk.",
    alt: "",
    available: true,
    tone: "paper",
  },

  /* ======================================================= COMMODITY TILES
     4:5 studio frames in the commodity grid. These carry information — a
     visitor scanning the grid should be able to tell the platforms apart from
     the photographs alone — so each gets descriptive alt text. */
  "tile-coffee": {
    key: "tile-coffee",
    path: "/images/coffee/tile-coffee.jpg",
    width: 928,
    height: 1152,
    section: "home-grid",
    aspectRatio: "4/5",
    objectPosition: "50% 55%",
    subject: "Green coffee beans in an open jute sack.",
    alt: "An open jute sack filled with green coffee beans",
    available: true,
    tone: "forest",
  },
  "tile-teak": {
    key: "tile-teak",
    path: "/images/teak/tile-teak.jpg",
    width: 928,
    height: 1152,
    section: "home-grid",
    aspectRatio: "4/5",
    objectPosition: "50% 50%",
    subject: "Sawn teak billets stacked into a block, end grain out.",
    alt: "Sawn teak billets stacked into a block with the end grain facing out",
    available: true,
    tone: "earth",
  },
  "tile-spices": {
    key: "tile-spices",
    path: "/images/spices/tile-spices.jpg",
    width: 928,
    height: 1152,
    section: "home-grid",
    aspectRatio: "4/5",
    objectPosition: "50% 55%",
    subject: "Black pepper, dried chilli and turmeric in separate heaps.",
    alt: "Separate heaps of black peppercorns, dried red chillies and turmeric fingers",
    available: true,
    tone: "earth",
  },
  "tile-nuts": {
    key: "tile-nuts",
    path: "/images/nuts/tile-nuts.jpg",
    width: 928,
    height: 1152,
    section: "home-grid",
    aspectRatio: "4/5",
    objectPosition: "50% 50%",
    subject: "A cloth sack spilling mixed nuts.",
    /*
      NOTE — THIS PHOTOGRAPH IS OFF-BRIEF AND SHOULD BE REPLACED.
      The nut platform is cashew-led ("Cashew-led nut sourcing", data/
      commodities.ts). This frame contains NO cashews — it is walnuts,
      almonds and hazelnuts only. The alt text below therefore cannot say
      "cashews" without describing something that is not in the picture,
      which would mislead exactly the screen-reader users alt text exists
      to serve. It is kept accurate and non-specific instead.
      The real fix is a cashew-forward 4:5 tile frame. The 16:9 hero
      (journey-nuts) does show cashews prominently, but it cannot be
      recropped to 4:5 without upscaling 768px of height to 1152px.
      See CONTENT_REQUIRED.md → Nuts.
    */
    alt: "A cloth sack tipped over, spilling mixed nuts across a dark surface",
    available: true,
    tone: "paper",
  },

  /* ============================================================== RESERVED
     Declared so the layout and the photography brief stay in one place. Not
     supplied yet, so nothing is requested for them. */
  "home-trade": {
    key: "home-trade",
    path: "/images/trade/trade-documentation.jpg",
    width: 1600,
    height: 2000,
    section: "home-trade",
    aspectRatio: "4/5",
    subject:
      "Close, restrained frame of trade documentation, inspection notes or a sample tray. Hands acceptable. No stock handshakes.",
    alt: "Trade documentation and commodity samples under review",
    available: false,
    tone: "paper",
  },
  "company-base": {
    key: "company-base",
    path: "/images/company/operational-base.jpg",
    width: 2000,
    height: 1333,
    section: "company",
    aspectRatio: "3/2",
    subject:
      "Honest, non-generic frame representing the operational base in Tamil Nadu. Genuine locations only — never a stock office interior.",
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
