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
    "A trade either works commercially or it does not, and that is decided long before a container is booked. This is the sequence we run, in order, on every enquiry.",
  stages: [
    {
      number: "01",
      title: "Understand the requirement",
      description:
        "Commodity, product, specification, quantity, packing, destination and timing — captured in writing so both sides are working from the same document.",
    },
    {
      number: "02",
      title: "Identify the sourcing route",
      description:
        "We assess which sourcing routes can realistically meet the specification and the volume, rather than fitting the requirement to whatever is nearest to hand.",
    },
    {
      number: "03",
      title: "Evaluate the commercial specification",
      description:
        "Samples, analysis and specification sheets are reviewed against the buyer's parameters. Where a contract calls for it, inspection is arranged through independent third parties.",
    },
    {
      number: "04",
      title: "Agree trade terms",
      description:
        "Specification, quantity, packing, Incoterm, payment terms, timing and tolerances are agreed explicitly and confirmed before the transaction proceeds.",
    },
    {
      number: "05",
      title: "Coordinate documentation",
      description:
        "We coordinate the trade, quality and shipping documentation set required by the contract and by the destination market's import requirements.",
    },
    {
      number: "06",
      title: "Coordinate the shipment",
      description:
        "Booking, loading and handling are arranged and managed with freight forwarders, carriers and handling agents. Physical execution sits with those providers; coordination and accountability sit with us.",
    },
    {
      number: "07",
      title: "Maintain communication",
      description:
        "One point of contact through to arrival, with status shared as it changes rather than only when it is asked for.",
    },
  ],
  incoterms: {
    title: "A note on Incoterms",
    body: [
      "Incoterms® rules define where risk and cost transfer between seller and buyer. FOB places the goods at the buyer's disposal on board the vessel at the named port of loading; CIF adds carriage and insurance to the named port of destination.",
      "Which terms apply to a given transaction is agreed per contract. Nothing on this website constitutes an offer on any particular Incoterm.",
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
        "Antonio Marco Exports and Trade Private Limited is a private limited company incorporated in India and registered with the Ministry of Corporate Affairs. Its registered office is in Sivakasi, Tamil Nadu.",
        "AM INDIA is the name the business trades under internationally. The two are the same entity: the brand is the commercial identity, the company is the legal one, and every contract is entered into by the registered company.",
      ],
    },
    {
      title: "European roots",
      paragraphs: [
        "The company was established in India as the subsidiary of a Spanish corporate shareholder. That origin is not decoration — it shapes how the business reads a specification, what it expects of documentation, and the commercial standards it works to.",
        "India is where the company operates and sources. Europe is where its corporate structure comes from. Both are stated plainly because both are relevant to how it trades.",
      ],
    },
    {
      title: "Built for international trade",
      paragraphs: [
        "The Indian company was incorporated in 2025 and is structured deliberately: registered for cross-border trade from the outset, organised around four commodity platforms, and built to handle specification-led B2B transactions rather than adapted to them later.",
        "The ambition is to become a trading house that international buyers return to — earned through executed contracts rather than asserted on a website.",
      ],
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
