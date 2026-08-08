/**
 * data/home.ts
 * ---------------------------------------------------------------------------
 * Homepage narrative content. Kept out of the section components so copy can
 * be edited (or later moved to a CMS) without touching layout or animation.
 *
 * Copy discipline: no counters, no years of experience, no shipment volumes,
 * no client claims. Process language uses coordinate / arrange / manage /
 * work with / facilitate, because logistics execution sits with third-party
 * providers, not with AM Global Commodities.
 */

export const heroContent = {
  /** Rendered as three separate lines of oversized display type. */
  lines: ["AM", "Global", "Commodities"] as const,
  statement: ["From origin.", "To opportunity."] as const,
  intro:
    "A B2B commodity sourcing and trading company connecting reliable supply with international demand across coffee, teak, spices and nuts.",
  scrollCue: "Scroll to explore",
} as const;

export const positioningContent = {
  label: "Positioning",
  /** Rendered as three lines of display type. */
  headingLines: ["We connect", "origin", "with market."] as const,
  paragraphs: [
    "AM Global Commodities is the international trading identity of Antonio Marco Exports and Trade Private Limited — a B2B sourcing and trading company operating from Tamil Nadu, India.",
    "The company sits between supply and demand: interpreting a buyer's written specification, identifying a sourcing route capable of meeting it, and coordinating the quality evidence, documentation and shipment arrangements that let a contract be executed cleanly.",
    "Established in India in 2025 with European corporate roots, the company was built from the outset for cross-border trade rather than adapted to it — registered, structured and staffed for it from day one.",
  ],
} as const;

export const tradeContent = {
  label: "Global trade",
  headingLines: ["European roots.", "Indian sourcing.", "Global perspective."] as const,
  paragraphs: [
    "India is the operational base. The company is registered and managed in Tamil Nadu, close to the agricultural and processing regions that supply its commodity platforms.",
    "Its European corporate roots shape how the business reads a market — the specification discipline, documentation standards and commercial expectations that international buyers work to.",
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
    "Five stages, in the same order every time. Each one exists to remove ambiguity before it becomes a commercial problem.",
  steps: [
    {
      number: "01",
      title: "Source",
      description:
        "We take the requirement in writing and identify sourcing routes capable of meeting it — by specification, form and volume, rather than from a fixed catalogue.",
    },
    {
      number: "02",
      title: "Evaluate",
      description:
        "Samples and specifications are assessed against the buyer's parameters. Where a contract calls for it, we arrange inspection and analysis through independent third parties.",
    },
    {
      number: "03",
      title: "Trade",
      description:
        "Commercial terms are agreed explicitly: specification, quantity, packing, Incoterm, payment terms and timing, confirmed before anything moves.",
    },
    {
      number: "04",
      title: "Document",
      description:
        "We coordinate the trade, quality and shipping documentation set required by the contract and by the destination market, so the consignment clears without friction.",
    },
    {
      number: "05",
      title: "Deliver",
      description:
        "Shipment is arranged and managed with freight forwarders, carriers and handling agents, and communication is maintained through to arrival.",
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
    "Everything below is a matter of public record or a statement of how the business is structured. No counters, no unverifiable claims.",
} as const;

export const finalCtaContent = {
  label: "Next step",
  headingLines: ["Let's", "talk", "trade."] as const,
  paragraph:
    "Send the specification, quantity and destination. We will come back with a clear view of whether and how it can be sourced.",
} as const;
