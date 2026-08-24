/**
 * data/commodities.ts
 * ---------------------------------------------------------------------------
 * COMMODITY CONTENT MODEL + DATA
 *
 * The model below intentionally supports far more than is currently populated.
 * Every commercial field is OPTIONAL, and the commodity page template renders
 * a section only when its data is present.
 *
 * ══════════════════════════════════════════════════════════════════════════
 *  HARD RULE — DO NOT INVENT VALUES
 *  Grades, origins, volumes, MOQs, Incoterms, loading ports, certifications,
 *  crop years, moisture limits and availability must come from the company.
 *  Leave a field `undefined` until it is confirmed. An absent field disappears
 *  from the public site; a guessed field becomes a commercial misstatement.
 *  Everything still missing is listed in CONTENT_REQUIRED.md.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * TO ADD A NEW COMMODITY: append an entry to `commodities` with a unique slug
 * and add the matching image slots to data/images.ts. Navigation, the homepage
 * journey, the homepage grid, the sitemap and /commodities pick it up
 * automatically.
 */

import type { ImageKey } from "./images";

/** Whether the platform is openly quoted, or enquiry-led. Data-driven only. */
export type AvailabilityStatus = "enquiry" | "active" | "seasonal" | "unavailable";

export interface Specification {
  readonly parameter: string;
  readonly value: string;
  /** Test method or standard, when one applies. */
  readonly method?: string;
}


/**
 * Shown above every indicative specification table. The wording is the whole
 * safeguard: it has to be impossible to read these tables as an offer.
 */
export const indicativeSpecNote =
  "Reference parameters only. These are the standards this commodity is commonly traded against internationally — not stock in hand, not an offer, and not a statement of what is currently available. Grades, exact specification and availability are confirmed per enquiry.";

export interface ProductType {
  readonly name: string;
  readonly note?: string;
}

export interface CommodityDocument {
  readonly title: string;
  readonly description: string;
  /** Only set once a real file exists in /public/documents. */
  readonly path?: string;
}

export interface Commodity {
  // ---- Identity (always required) ----------------------------------------
  readonly slug: string;
  readonly name: string;
  /** Editorial one-liner used in the homepage journey and tiles. */
  readonly summary: string;
  /**
   * Search-result description. Written to fit inside the ~160 character
   * budget: concatenating `summary` + `sourcingApproach` produced 200-253
   * characters, which Google truncates mid-sentence. Same claims, said once.
   */
  readonly metaDescription: string;
  /** 1–2 paragraph B2B overview. General positioning only — no hard specs. */
  readonly description: readonly string[];
  /** Tracked micro-label, e.g. "Platform 01". */
  readonly index: string;
  /** Latin/trade descriptor shown as a typographic detail. */
  readonly descriptor: string;
  /** Buyer segments this platform is built to serve. NOT a customer list. */
  readonly buyerSegments: readonly string[];
  /** Honest framing of how sourcing is approached for this commodity. */
  readonly sourcingApproach: string;
  /** Honest framing of how quality is coordinated. No certification claims. */
  readonly qualityApproach: string;

  // ---- Media --------------------------------------------------------------
  readonly journeyImage: ImageKey;
  readonly tileImage: ImageKey;
  readonly heroImage?: ImageKey;
  readonly gallery?: readonly ImageKey[];

  // ---- Commercial detail (ALL UNCONFIRMED — leave undefined) --------------
  readonly origins?: readonly string[];
  readonly productTypes?: readonly ProductType[];
  readonly grades?: readonly string[];
  readonly specifications?: readonly Specification[];
  /**
   * INDICATIVE ONLY — the published market parameters this commodity is
   * traded against internationally, NOT this company's offer.
   *
   * Deliberately a separate field from `specifications` above. That one is
   * reserved for figures verified against what the company can actually
   * supply; this one exists so a buyer can tell within a few seconds whether
   * their requirement is the kind of thing this platform handles at all,
   * which "confirmed per enquiry" alone never told them.
   *
   * Every table is rendered under `indicativeSpecNote`, which states plainly
   * that these are reference parameters and not stock. When real figures are
   * confirmed they go in `specifications` and supersede this — see
   * CONTENT_REQUIRED.md for exactly which fields need replacing.
   */
  readonly indicativeSpecifications?: readonly Specification[];
  readonly process?: readonly string[];
  readonly crop?: string;
  readonly packaging?: readonly string[];
  readonly moq?: string;
  readonly incoterms?: readonly string[];
  readonly loadingPorts?: readonly string[];
  readonly certifications?: readonly string[];
  readonly documents?: readonly CommodityDocument[];
  readonly availabilityStatus?: AvailabilityStatus;
}

/**
 * The four launch platforms.
 *
 * Copy discipline applied throughout: these entries describe the trade the
 * company is built to serve and how it works — never volumes, grades, origins
 * or certifications that have not been confirmed.
 */
export const commodities: readonly Commodity[] = [
  {
    slug: "coffee",
    name: "Coffee",
    metaDescription:
      "Green coffee for the roasting, importing and food manufacturing trade. Sourcing routes identified against your written specification, not a fixed list.",
    index: "Platform 01",
    descriptor: "Green coffee — Coffea",
    summary:
      "Green coffee for the roasting, importing and food manufacturing trade.",
    description: [
      "Coffee is a specification-led commodity. Buyers are precise about species, screen size, defect count, moisture and processing method, and a contract is only as good as the consistency behind it.",
      "AM INDIA approaches coffee as a green commodity trade: understanding the exact specification a buyer works to, identifying a sourcing route capable of meeting it, and coordinating the quality evidence and documentation that allow the contract to be executed with confidence.",
    ],
    buyerSegments: [
      "Roasters",
      "Green coffee importers",
      "Food manufacturers",
      "Distributors",
      "Wholesalers",
    ],
    sourcingApproach:
      "Sourcing routes are identified against the buyer's written specification rather than offered from a fixed list, so the species, preparation and volume are matched to the requirement.",
    qualityApproach:
      "Sample approval before shipment, with inspection and analysis arranged through independent third parties where the contract requires it.",
    /* Coffee Board of India grade designations and the ISO methods green
       coffee is assessed against. Published standards, not our figures. */
    indicativeSpecifications: [
      {
        parameter: "Grade families",
        value:
          "Arabica: Plantation (washed) AA / A / B / PB; Cherry (natural) AB / PB. Robusta: Parchment (washed) and Cherry (natural), AA / AB / PB.",
        method: "Coffee Board of India designations",
      },
      {
        parameter: "Screen size",
        value:
          "Grade-dependent — AA commonly screen 17/18, A and AB screen 15/16; PB is peaberry.",
        method: "ISO 4150",
      },
      {
        parameter: "Moisture",
        value: "Commonly 9–12.5% for green coffee.",
        method: "ISO 6673",
      },
      {
        parameter: "Defect count",
        value: "Assessed as full-defect equivalents per 300 g green sample.",
        method: "ISO 10470",
      },
    ],
    journeyImage: "journey-coffee",
    tileImage: "tile-coffee",
    availabilityStatus: "enquiry",

    // TODO(content): species offered, processing methods, screen sizes, grade
    // nomenclature, crop year, bag type and weight, defect tolerances,
    // moisture ceiling, origins, loading ports, MOQ, Incoterms.
    // See CONTENT_REQUIRED.md → Coffee.
  },
  {
    slug: "teak",
    name: "Teak",
    metaDescription:
      "Teak traded as a timber commodity, by dimension and documentation. Requirements assessed by form, dimension and volume, then matched to sourcing routes.",
    index: "Platform 02",
    descriptor: "Timber — Tectona grandis",
    summary: "Teak traded as a timber commodity, by dimension and documentation.",
    description: [
      "Teak is bought on dimension, grade, moisture and legality. Importers work to tolerances, cutting lists and container plans, and the paperwork that travels with a consignment matters as much as the timber itself.",
      "We treat teak as a timber commodity rather than a finished product: the requirement is defined in measurable terms, the sourcing route is assessed against it, and the legal and shipping documentation is coordinated so the consignment clears cleanly at destination.",
    ],
    buyerSegments: [
      "Timber importers",
      "Sawmills and re-manufacturers",
      "Joinery and furniture manufacturers",
      "Timber distributors",
      "Project buyers",
    ],
    sourcingApproach:
      "Requirements are assessed by form, dimension and volume, and matched against sourcing routes able to supply a legally documented consignment.",
    qualityApproach:
      "Measurement, grading and moisture verification are coordinated before loading, with inspection arranged independently where a buyer requires it.",
    /* Timber is bought on dimension, seasoning and legality documentation.
       FEQ is a long-established teak trade designation, not an invention. */
    indicativeSpecifications: [
      {
        parameter: "Forms traded",
        value: "Round logs, squares and sawn timber (scantlings, boards).",
      },
      {
        parameter: "Dimension",
        value:
          "Specified as thickness × width × length against a cutting list; sawn lengths commonly 1.8–4.0 m.",
      },
      {
        parameter: "Moisture",
        value:
          "Air-dried commonly 15–20%; kiln-dried commonly 8–12%, set by end use.",
      },
      {
        parameter: "Grade",
        value:
          "Visual grading against the buyer's stated standard — FEQ (First European Quality) and A / B / C grade conventions are the common reference.",
      },
      {
        parameter: "Legality documentation",
        value:
          "Transit permits, origin declaration and chain of ownership travel with the consignment; the destination market sets what is required.",
      },
    ],
    journeyImage: "journey-teak",
    tileImage: "tile-teak",
    availabilityStatus: "enquiry",

    // TODO(content): forms handled (logs / sawn / boards), dimension ranges and
    // tolerances, grading standard used, moisture specification, origins,
    // legal documentation set, container/packing plan, MOQ, Incoterms.
    // NOTE: make NO forestry sustainability, FSC, PEFC, EUDR or CITES claim
    // until the actual certificates/declarations are held and verified.
    // See CONTENT_REQUIRED.md → Teak.
  },
  {
    slug: "spices",
    name: "Spices",
    metaDescription:
      "A spice platform built around specification, purity and clean documentation. Each spice handled as its own commercial product, sourced to your requirement.",
    index: "Platform 03",
    descriptor: "Whole and ground spices",
    summary:
      "A spice platform built around specification, purity and clean documentation.",
    description: [
      "Spices are traded on purity, moisture, volatile oil and contaminant limits, and requirements differ sharply between an industrial processor and a repacker. Specification control is the whole discipline.",
      "The platform is structured to handle individual spices as distinct commercial products, each with its own specification, packing format and documentation set, rather than as a single undifferentiated category.",
    ],
    buyerSegments: [
      "Spice importers",
      "Food processors and blenders",
      "Extraction and oleoresin manufacturers",
      "Repackers",
      "Distributors",
    ],
    sourcingApproach:
      "Each spice is handled as its own commercial product, with the sourcing route identified against the written specification for that product.",
    qualityApproach:
      "Specification, purity and moisture are confirmed against agreed parameters, with laboratory analysis arranged through independent third parties where the contract requires it.",
    /* Deliberately the PARAMETER SET and its ISO methods rather than named
       spices with values: which spices this platform offers is not yet
       confirmed (see CONTENT_REQUIRED.md), and naming them here would be a
       claim. The methods are what a spice buyer actually needs to see to
       judge whether a supplier works to their regime. */
    indicativeSpecifications: [
      {
        parameter: "Form",
        value: "Whole, ground or crushed, specified per product.",
      },
      {
        parameter: "Moisture",
        value:
          "Set per spice — commonly 8–12% for whole spices, lower for ground.",
        method: "ISO 939",
      },
      {
        parameter: "Extraneous and foreign matter",
        value: "Specified per spice as a maximum percentage by weight.",
        method: "ISO 927",
      },
      {
        parameter: "Volatile oil",
        value:
          "Applies to aromatic spices; the minimum is set per product and per contract.",
        method: "ISO 6571",
      },
      {
        parameter: "Contaminant limits",
        value:
          "Worked to the destination market's regime — pesticide MRLs, aflatoxin and treatment restrictions differ by market and are agreed before contract.",
      },
    ],
    journeyImage: "journey-spices",
    tileImage: "tile-spices",
    availabilityStatus: "enquiry",

    // TODO(content): which spices are actually offered, and for each one:
    // whole/ground form, origin, grade nomenclature, moisture, purity and
    // contaminant limits, packing format, MOQ, Incoterms, loading ports.
    // Availability MUST be driven from this data — do not imply that every
    // spice named on the site is currently available.
    // See CONTENT_REQUIRED.md → Spices.
  },
  {
    slug: "nuts",
    name: "Nuts",
    metaDescription:
      "Cashew-led nut sourcing, graded and packed to the buyer's requirement. Grade, size and packing format confirmed in writing before a route is matched.",
    index: "Platform 04",
    descriptor: "Cashew and tree nuts",
    summary: "Cashew-led nut sourcing, graded and packed to the buyer's requirement.",
    description: [
      "Cashew is a graded commodity where count, colour, breakage and moisture decide the commercial value, and where packing format is part of the specification rather than an afterthought.",
      "Cashew is the initial focus of the nut platform, structured so further tree nuts can be added as distinct products with their own grades, sizes and packing formats.",
    ],
    buyerSegments: [
      "Nut importers",
      "Snack and confectionery manufacturers",
      "Food processors",
      "Repackers",
      "Distributors",
    ],
    sourcingApproach:
      "Grade, size and packing format are confirmed in writing first, then matched to a sourcing route able to supply them consistently.",
    qualityApproach:
      "Sample approval and grade verification are coordinated ahead of packing, with independent inspection arranged where the contract requires it.",
    /* Standard commercial cashew kernel grades. These are the AFI / CEPCI
       designations the whole trade quotes in — a buyer asking for W-320 is
       using a definition neither side sets. */
    indicativeSpecifications: [
      {
        parameter: "Whole white kernel grades",
        value:
          "W-180, W-210, W-240, W-320 and W-450, where the number is the approximate kernel count per pound. W-320 is the most widely traded.",
        method: "AFI / CEPCI grade definitions",
      },
      {
        parameter: "Scorched and broken grades",
        value:
          "Scorched wholes (SW), butts, splits, and large and small white pieces (LWP / SWP).",
        method: "AFI / CEPCI grade definitions",
      },
      {
        parameter: "Moisture",
        value: "Commonly a maximum of 5% for cashew kernels.",
        method: "AFI specification",
      },
      {
        parameter: "Defect tolerances",
        value:
          "Colour, breakage and foreign matter tolerances are set by grade and confirmed against an approved sample.",
      },
    ],
    journeyImage: "journey-nuts",
    tileImage: "tile-nuts",
    availabilityStatus: "enquiry",

    // TODO(content): raw vs processed, exact commercial cashew grades offered,
    // counts/sizes, moisture, packing (tin / vacuum / carton weights), origins,
    // MOQ, Incoterms, loading ports, other nuts to be added.
    // Do NOT pre-populate cashew grade nomenclature that has not been confirmed.
    // See CONTENT_REQUIRED.md → Nuts.
  },
];

/** Lookup helper used by the commodity page template. */
export function getCommodity(slug: string): Commodity | undefined {
  return commodities.find((c) => c.slug === slug);
}

export const commoditySlugs: readonly string[] = commodities.map((c) => c.slug);
