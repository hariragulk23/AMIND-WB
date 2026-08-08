/**
 * data/compliance.ts
 * ---------------------------------------------------------------------------
 * COMPLIANCE DATA — the registration and certification switchboard.
 *
 * ══════════════════════════════════════════════════════════════════════════
 *  HARD RULE — NEVER FABRICATE A REGISTRATION OR CERTIFICATE
 *  A record is published ONLY when `verified: true`. Set that flag only after
 *  the certificate has been physically checked and, ideally, its number and
 *  validity recorded here. Everything else stays `verified: false` and is
 *  invisible on the public site.
 *
 *  This applies to IEC, FSSAI, Coffee Board RCMC, Spices Board CRES, APEDA
 *  RCMC, ISO, HACCP, Organic, Fairtrade, Rainforest Alliance, FSC, PEFC,
 *  EUDR compliance and CITES documentation — every one of which is listed
 *  below pre-wired and switched OFF.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * TO ACTIVATE A CERTIFICATE
 *   1. Verify the certificate exists and is current.
 *   2. Set `verified: true`.
 *   3. Fill `number` and `validUntil` if they should be published.
 * It then appears automatically on /quality-compliance and in the homepage
 * trust section. No component changes required.
 */

export type ComplianceCategory =
  | "corporate"
  | "trade"
  | "commodity"
  | "quality"
  | "sustainability";

export interface ComplianceRecord {
  readonly id: string;
  readonly category: ComplianceCategory;
  /** Short display name, e.g. "IEC". */
  readonly label: string;
  /** Full name, e.g. "Importer Exporter Code". */
  readonly name: string;
  readonly authority: string;
  /** What this registration actually permits or evidences. */
  readonly description: string;
  /** PUBLISHED ONLY WHEN TRUE. Requires a physically verified certificate. */
  readonly verified: boolean;
  readonly number?: string;
  readonly validUntil?: string;
}

export const complianceCategories: readonly {
  id: ComplianceCategory;
  title: string;
  description: string;
}[] = [
  {
    id: "corporate",
    title: "Corporate registration",
    description:
      "Statutory registration of the legal entity in India, on which every trade contract rests.",
  },
  {
    id: "trade",
    title: "Trade registration",
    description:
      "Registrations that permit import and export activity and the associated tax treatment.",
  },
  {
    id: "commodity",
    title: "Commodity registration",
    description:
      "Commodity-specific and food-safety registrations required by Indian export authorities and destination markets.",
  },
  {
    id: "quality",
    title: "Quality management",
    description:
      "Management-system and food-safety certifications covering how quality is controlled.",
  },
  {
    id: "sustainability",
    title: "Sustainability and legality",
    description:
      "Scheme certifications and legality frameworks applying to agricultural and timber commodities.",
  },
];

/**
 * Every record below that is currently `verified: false` is pre-wired but
 * deliberately NOT published. Do not flip a flag without the certificate.
 */
export const complianceRecords: readonly ComplianceRecord[] = [
  // ---- Corporate: VERIFIED (supplied by the company) --------------------
  {
    id: "cin",
    category: "corporate",
    label: "CIN",
    name: "Corporate Identification Number",
    authority: "Ministry of Corporate Affairs, Government of India",
    description:
      "Confirms the company is incorporated and registered in India as a private limited company.",
    verified: true,
    number: "U46306TN2025FTC183037",
  },
  {
    id: "gstin",
    category: "trade",
    label: "GSTIN",
    name: "Goods and Services Tax Identification Number",
    authority: "Goods and Services Tax Network, Tamil Nadu, India",
    description:
      "Registration for Indian indirect taxation, required for domestic procurement and export documentation.",
    verified: true,
    number: "33ABDCA4556E1ZZ",
  },

  // ---- Trade: NOT VERIFIED ---------------------------------------------
  {
    id: "iec",
    category: "trade",
    label: "IEC",
    name: "Importer Exporter Code",
    authority: "Directorate General of Foreign Trade, India",
    description: "The code required to conduct import and export transactions from India.",
    verified: false,
  },
  {
    id: "ad-code",
    category: "trade",
    label: "AD Code",
    name: "Authorised Dealer Code",
    authority: "Authorised dealer bank, registered at the port of loading",
    description: "Bank registration linking export consignments to the company's account.",
    verified: false,
  },

  // ---- Commodity / food safety: NOT VERIFIED ---------------------------
  {
    id: "fssai",
    category: "commodity",
    label: "FSSAI",
    name: "Food Safety and Standards Authority of India licence",
    authority: "Food Safety and Standards Authority of India",
    description: "Licence governing food business operations, including export of food commodities.",
    verified: false,
  },
  {
    id: "coffee-board-rcmc",
    category: "commodity",
    label: "Coffee Board RCMC",
    name: "Registration Cum Membership Certificate",
    authority: "Coffee Board of India",
    description: "Registration required to export coffee from India.",
    verified: false,
  },
  {
    id: "spices-board-cres",
    category: "commodity",
    label: "Spices Board CRES",
    name: "Certificate of Registration as Exporter of Spices",
    authority: "Spices Board of India",
    description: "Registration required to export spices from India.",
    verified: false,
  },
  {
    id: "apeda-rcmc",
    category: "commodity",
    label: "APEDA RCMC",
    name: "Registration Cum Membership Certificate",
    authority: "Agricultural and Processed Food Products Export Development Authority",
    description: "Registration covering scheduled agricultural and processed food exports.",
    verified: false,
  },

  // ---- Quality management: NOT VERIFIED --------------------------------
  {
    id: "iso-9001",
    category: "quality",
    label: "ISO 9001",
    name: "Quality management systems",
    authority: "Accredited certification body",
    description: "Certification of the quality management system.",
    verified: false,
  },
  {
    id: "haccp",
    category: "quality",
    label: "HACCP",
    name: "Hazard Analysis and Critical Control Points",
    authority: "Accredited certification body",
    description: "Food-safety management certification based on hazard analysis.",
    verified: false,
  },

  // ---- Sustainability / legality: NOT VERIFIED -------------------------
  {
    id: "organic",
    category: "sustainability",
    label: "Organic",
    name: "Organic certification",
    authority: "Accredited certification body",
    description: "Certification of organic production and handling.",
    verified: false,
  },
  {
    id: "fairtrade",
    category: "sustainability",
    label: "Fairtrade",
    name: "Fairtrade certification",
    authority: "Fairtrade certification body",
    description: "Certification against Fairtrade standards.",
    verified: false,
  },
  {
    id: "rainforest-alliance",
    category: "sustainability",
    label: "Rainforest Alliance",
    name: "Rainforest Alliance certification",
    authority: "Rainforest Alliance",
    description: "Certification against Rainforest Alliance standards.",
    verified: false,
  },
  {
    id: "fsc",
    category: "sustainability",
    label: "FSC",
    name: "Forest Stewardship Council certification",
    authority: "Forest Stewardship Council",
    description: "Chain-of-custody or forest-management certification for timber.",
    verified: false,
  },
  {
    id: "pefc",
    category: "sustainability",
    label: "PEFC",
    name: "Programme for the Endorsement of Forest Certification",
    authority: "PEFC",
    description: "Chain-of-custody or forest-management certification for timber.",
    verified: false,
  },
  {
    id: "eudr",
    category: "sustainability",
    label: "EUDR",
    name: "EU Deforestation Regulation due diligence",
    authority: "European Union",
    description:
      "Due-diligence statement and geolocation evidence required for regulated commodities entering the EU.",
    verified: false,
  },
  {
    id: "cites",
    category: "sustainability",
    label: "CITES",
    name: "CITES documentation",
    authority: "CITES management authority",
    description: "Permits for species listed under the CITES appendices.",
    verified: false,
  },
];

/** Only these may ever be rendered. */
export const verifiedCompliance: readonly ComplianceRecord[] =
  complianceRecords.filter((r) => r.verified);

export function complianceByCategory(
  category: ComplianceCategory,
): readonly ComplianceRecord[] {
  return verifiedCompliance.filter((r) => r.category === category);
}

/**
 * FACTUAL TRUST SIGNALS
 * Deliberately free of counters, years of experience, shipment numbers,
 * client logos and testimonials. Every line here is verifiable from the
 * company's own registration documents.
 */
export interface TrustSignal {
  readonly title: string;
  readonly description: string;
}

export const trustSignals: readonly TrustSignal[] = [
  {
    title: "India registered company",
    description:
      "A private limited company incorporated in India and registered with the Ministry of Corporate Affairs, operating from Tamil Nadu.",
  },
  {
    title: "European corporate roots",
    description:
      "Established as the Indian subsidiary of a Spanish corporate shareholder, giving the company a European frame of commercial reference.",
  },
  {
    title: "Import and export",
    description:
      "Built for cross-border trade in both directions, with the documentation discipline that international transactions require.",
  },
  {
    title: "Multi-commodity platform",
    description:
      "Four distinct commodity platforms — coffee, teak, spices and nuts — each handled on its own specifications and documentation.",
  },
  {
    title: "B2B only",
    description:
      "No retail channel and no consumer catalogue. The company works with businesses buying to specification and to contract.",
  },
  {
    title: "Documentation-led",
    description:
      "Trade, quality and shipping documentation is treated as part of the product, not as paperwork that follows it.",
  },
];
