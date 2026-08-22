/**
 * data/home.ts
 * ---------------------------------------------------------------------------
 * Homepage narrative content. Kept out of the section components so copy can
 * be edited (or later moved to a CMS) without touching layout or animation.
 *
 * Copy discipline: no counters, no years of experience, no shipment volumes,
 * no client claims. Process language uses coordinate / arrange / manage /
 * work with / facilitate, because logistics execution sits with third-party
 * providers, not with AM INDIA.
 */

export const heroContent = {
  /**
   * The wordmark's real text. No longer rendered as display type directly —
   * the hero shows the designed AM INDIA lockup image instead — but kept as
   * the source of truth for the hero's sr-only h1 and any other place the
   * heading text is needed as real text.
   */
  lines: ["AM", "India"] as const,
  statement: ["From origin.", "To opportunity."] as const,
  intro:
    "A B2B commodity sourcing and trading company connecting reliable supply with international demand across coffee, teak, spices and nuts.",
  scrollCue: "Scroll to explore",
} as const;

export const positioningContent = {
  label: "Positioning",
  /** Rendered as three lines of display type. */
  headingLines: ["We connect", "origin", "with market."] as const,
  /** One-sentence lead, then the middle paragraph broken out as scannable
      points, then a closing fact. Same claims as the previous three-paragraph
      block — restructured so the three things the company actually does can be
      read at a glance instead of parsed out of a single 37-word sentence. */
  lead:
    "AM INDIA is the international trading identity of Antonio Marco Exports and Trade Private Limited — a B2B sourcing and trading company in Tamil Nadu, India.",
  pointsLead: "It sits between supply and demand:",
  points: [
    "Interpreting a buyer's written specification",
    "Identifying a sourcing route that can meet it",
    "Coordinating quality evidence, documentation and shipment, so a contract executes cleanly",
  ],
  coda:
    "Established in India in 2025 with European corporate roots — registered, structured and staffed for cross-border trade from day one.",
} as const;

export const tradeContent = {
  label: "Global trade",
  headingLines: ["European roots.", "Indian sourcing.", "Global perspective."] as const,
  paragraphs: [
    "India is the operational base — registered and managed in Tamil Nadu, close to the agricultural and processing regions that supply its platforms.",
    "European corporate roots set the reference points: specification discipline, documentation standards, and what international buyers expect commercially.",
  ],
  /** Neutral, non-committal facts. No routes, offices or volumes claimed. */
  facts: [
    { label: "Operational base", value: "Tamil Nadu, India" },
    { label: "Corporate roots", value: "Spain" },
    { label: "Trade direction", value: "Import and export" },
    { label: "Commercial model", value: "B2B, enquiry-led" },
  ] as const,
  note: "Destination markets, ports and routing are confirmed per enquiry.",
} as const;

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export const processContent = {
  label: "How we work",
  headingLines: ["A process built", "for contracts."] as const,
  intro:
    "Five stages, same order every time — each one removing ambiguity before it becomes a commercial problem.",
  steps: [
    {
      number: "01",
      title: "Source",
      description:
        "The requirement in writing, then sourcing routes matched by specification, form and volume — not a fixed catalogue.",
    },
    {
      number: "02",
      title: "Evaluate",
      description:
        "Samples and specifications assessed against the buyer's parameters. Independent inspection arranged where the contract calls for it.",
    },
    {
      number: "03",
      title: "Trade",
      description:
        "Specification, quantity, packing, Incoterm, payment terms and timing — agreed explicitly, confirmed before anything moves.",
    },
    {
      number: "04",
      title: "Document",
      description:
        "The trade, quality and shipping documents the contract and destination market require, coordinated so the consignment clears.",
    },
    {
      number: "05",
      title: "Deliver",
      description:
        "Shipment arranged and managed with freight forwarders, carriers and handling agents. Communication maintained to arrival.",
    },
  ] satisfies readonly ProcessStep[],
} as const;

export const journeyContent = {
  label: "Commodity platforms",
  heading: "Four platforms.",
  note: "Specifications, grades and availability are confirmed per enquiry.",
} as const;

export const gridContent = {
  label: "Explore",
  headingLines: ["Choose a", "platform."] as const,
} as const;

export const trustContent = {
  label: "Corporate foundation",
  headingLines: ["Built for", "international trade."] as const,
  intro:
    "Public record, or a plain statement of how the business is structured. No counters, no unverifiable claims.",
} as const;

export const finalCtaContent = {
  label: "Next step",
  headingLines: ["Let's", "talk", "trade."] as const,
  paragraph:
    "Send the specification, quantity and destination. We will come back with a clear view of whether and how it can be sourced.",
} as const;
