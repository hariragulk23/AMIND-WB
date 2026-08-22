/**
 * data/pages.ts
 * ---------------------------------------------------------------------------
 * Content for the inner corporate pages. Kept alongside the other data files
 * so all editable copy lives in one place.
 *
 * Same discipline as everywhere else: no invented history, no fabricated
 * capabilities, no certification claims.
 */

export const sourcingContent = {
  intro:
    "Whether a trade works commercially is decided long before a container is booked. This is the sequence, in order, on every enquiry.",
  stages: [
    {
      number: "01",
      title: "Understand the requirement",
      description:
        "Commodity, product, specification, quantity, packing, destination and timing — in writing, so both sides work from one document.",
    },
    {
      number: "02",
      title: "Identify the sourcing route",
      description:
        "Which routes can realistically meet the specification and volume — rather than fitting the requirement to whatever is nearest to hand.",
    },
    {
      number: "03",
      title: "Evaluate the commercial specification",
      description:
        "Samples, analysis and specification sheets reviewed against the buyer's parameters. Independent inspection arranged where the contract calls for it.",
    },
    {
      number: "04",
      title: "Agree trade terms",
      description:
        "Specification, quantity, packing, Incoterm, payment terms, timing and tolerances — agreed explicitly before the transaction proceeds.",
    },
    {
      number: "05",
      title: "Coordinate documentation",
      description:
        "The trade, quality and shipping documents the contract and the destination market's import rules require.",
    },
    {
      number: "06",
      title: "Coordinate the shipment",
      description:
        "Booking, loading and handling arranged with freight forwarders, carriers and agents. Execution sits with them; coordination and accountability sit with us.",
    },
    {
      number: "07",
      title: "Maintain communication",
      description:
        "One point of contact through to arrival, with status shared as it changes — not only when asked.",
    },
  ],
  incoterms: {
    title: "A note on Incoterms",
    body: [
      "Incoterms® rules define where risk and cost transfer between seller and buyer. FOB places the goods at the buyer's disposal on board the vessel at the named port of loading; CIF adds carriage and insurance to the named port of destination.",
      "Which terms apply is agreed per contract. Nothing on this website constitutes an offer on any particular Incoterm.",
    ],
  },
} as const;

export const aboutContent = {
  intro:
    "AM INDIA is the international trading identity of Antonio Marco Exports and Trade Private Limited.",
  sections: [
    {
      title: "The company",
      paragraphs: [
        "A private limited company incorporated in India and registered with the Ministry of Corporate Affairs, with its registered office in Sivakasi, Tamil Nadu.",
        "AM INDIA is the trading name; Antonio Marco Exports and Trade Private Limited is the legal entity. Every contract is entered into by the registered company.",
      ],
    },
    {
      title: "European roots",
      paragraphs: [
        "Established in India as the subsidiary of a Spanish corporate shareholder. That origin shapes how it reads a specification, what it expects of documentation, and the standards it works to.",
        "India is where it operates and sources. Europe is where its corporate structure comes from.",
      ],
    },
    {
      title: "Built for international trade",
      /* Lead plus points rather than a 40-word sentence: the three structural
         facts are the substance, and they read faster stacked than embedded. */
      paragraphs: ["Incorporated in 2025 and structured deliberately:"],
      points: [
        "Registered for cross-border trade from the outset",
        "Organised around four commodity platforms",
        "Built for specification-led B2B transactions, not adapted to them later",
      ],
      coda:
        "The ambition is a trading house international buyers return to — earned through executed contracts, not asserted on a website.",
    },
  ],
} as const;

export const complianceContent = {
  intro:
    "Documentation is part of the product. This page sets out the framework the company works within, and publishes only the registrations that have been verified.",
  framework: [
    {
      title: "Corporate registration",
      description:
        "The legal entity, its incorporation and its statutory identifiers — the basis on which any contract is signed.",
    },
    {
      title: "Trade registration",
      description:
        "The registrations that permit import and export activity from India and govern the associated tax treatment.",
    },
    {
      title: "Commodity registration",
      description:
        "Commodity-specific and food-safety registrations required by Indian export authorities and by destination markets.",
    },
    {
      title: "Quality documentation",
      description:
        "Specification sheets, analysis reports and sample approvals recorded against each transaction.",
    },
    {
      title: "Product inspection",
      description:
        "Pre-shipment inspection and laboratory analysis, arranged through independent third parties where a contract requires it.",
    },
    {
      title: "Traceability",
      description:
        "The ability to tie a consignment back through its sourcing route, which increasingly determines whether goods can enter a market at all.",
    },
    {
      title: "Shipment documentation",
      description:
        "The commercial, transport and regulatory document set that has to travel with a consignment for it to clear.",
    },
  ],
  /** Shown in place of a certificate wall while nothing further is verified. */
  verificationNote:
    "Only registrations that have been verified are published here. Certificates are added to this page as they are issued and confirmed — never in advance of that.",
} as const;

export const contactContent = {
  intro:
    "Enquiries are handled directly. The more precise the requirement, the more useful the first response will be.",
  checklist: [
    "Commodity and specific product",
    "Specification, grade or quality parameters",
    "Approximate quantity and unit",
    "Destination country and port",
    "Preferred Incoterm, if you work to one",
    "Packaging requirements",
    "Purchase frequency — spot or recurring",
    "Company name and contact details",
  ],
} as const;
