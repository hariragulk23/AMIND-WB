/**
 * data/company.ts
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all corporate facts.
 *
 * Every component that displays a company detail (address, CIN, GSTIN, email,
 * phone, directors, positioning copy) MUST read it from here. Do not duplicate
 * corporate information inside components.
 *
 * RULE: only verified facts belong in this file. Nothing here may be invented.
 * Anything still unknown is tracked in CONTENT_REQUIRED.md.
 */

export interface PostalAddress {
  readonly lines: readonly string[];
  readonly city: string;
  readonly district: string;
  readonly postalCode: string;
  readonly state: string;
  readonly country: string;
  readonly countryCode: string;
}

export interface Director {
  readonly name: string;
}

export interface CompanyRegistration {
  /** Short label shown in the UI, e.g. "CIN". */
  readonly label: string;
  readonly value: string;
  /** Longer description used for accessibility and compliance listings. */
  readonly description: string;
}

export const company = {
  /** Public-facing trading brand. Use this in all customer-facing copy. */
  brand: "AM Global Commodities",
  brandShort: "AM Global",
  /** Registered legal entity. Required in the footer and legal pages. */
  legalName: "Antonio Marco Exports and Trade Private Limited",
  legalNameUpper: "ANTONIO MARCO EXPORTS AND TRADE PRIVATE LIMITED",
  entityType: "Private Limited Company",

  tagline: "Connecting origins, markets and opportunities.",
  /** One-sentence description reused in metadata and structured data. */
  summary:
    "A B2B commodity sourcing and trading company connecting reliable supply with international demand across coffee, teak, spices and nuts.",

  domain: "amglobalcommodities.com",
  url: "https://amglobalcommodities.com",

  email: "antoniomarcoindia@gmail.com",
  phone: "+91 7708795669",
  /** E.164 form for tel: links and structured data. */
  phoneHref: "+917708795669",

  incorporation: {
    /** ISO date — 6 August 2025. */
    date: "2025-08-06",
    displayDate: "6 August 2025",
    year: 2025,
    jurisdiction: "India",
  },

  registeredOffice: {
    lines: ["1/168/2, Gopal Nagar", "Sivakasi West"],
    city: "Sivakasi",
    district: "Virudhunagar",
    postalCode: "626124",
    state: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
  } satisfies PostalAddress,

  /**
   * Coordinates of the registered office locality (Sivakasi, Tamil Nadu).
   * Used only as a typographic/graphic reference for the operational base —
   * never presented as a warehouse, port or facility.
   */
  baseCoordinates: {
    latitude: "9.4494° N",
    longitude: "77.7983° E",
    locality: "Sivakasi, Tamil Nadu, India",
  },

  registrations: [
    {
      label: "CIN",
      value: "U46306TN2025FTC183037",
      description: "Corporate Identification Number, Ministry of Corporate Affairs, India",
    },
    {
      label: "GSTIN",
      value: "33ABDCA4556E1ZZ",
      description: "Goods and Services Tax Identification Number, Tamil Nadu, India",
    },
  ] satisfies readonly CompanyRegistration[],

  directors: [{ name: "Antonio Marco Riquelme" }, { name: "Hari Ragul K" }] satisfies readonly Director[],

  /**
   * Corporate structure. The Indian company was established as the subsidiary
   * of a Spanish corporate shareholder.
   *
   * IMPORTANT: shareholding percentages must never be published.
   */
  structure: {
    shareholderOrigin: "Spain",
    shareholderOriginAdjective: "Spanish",
    statement:
      "Established in India as the subsidiary of a Spanish corporate shareholder.",
  },

  /** Verbatim strings reused across hero, positioning and CTA sections. */
  statements: {
    originToOpportunity: "From origin. To opportunity.",
    connectOriginMarket: "We connect origin with market.",
    rootsReachPerspective: "European roots. Indian sourcing. Global perspective.",
  },
} as const;

/** Registered office rendered as an ordered array of display lines. */
export const registeredOfficeLines: readonly string[] = [
  ...company.registeredOffice.lines,
  company.registeredOffice.city,
  `${company.registeredOffice.district} - ${company.registeredOffice.postalCode}`,
  `${company.registeredOffice.state}, ${company.registeredOffice.country}`,
];

/** Single-line address for structured data and meta tags. */
export const registeredOfficeInline: string = registeredOfficeLines.join(", ");
