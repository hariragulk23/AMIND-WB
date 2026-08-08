/**
 * data/navigation.ts
 * ---------------------------------------------------------------------------
 * Navigation is data-driven so the information architecture can grow without
 * touching the header, mobile menu or footer components.
 *
 * An Insights / Market Intelligence section can be added later by appending a
 * single entry to `primaryNav` — no layout redesign required.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
  /** Optional short description used by the full-screen mobile menu. */
  readonly description?: string;
  /** Child links, e.g. the four commodity platforms. */
  readonly children?: readonly NavItem[];
}

/** Primary desktop + mobile navigation. Deliberately kept to four entries. */
export const primaryNav: readonly NavItem[] = [
  {
    label: "Commodities",
    href: "/commodities",
    description: "Coffee, teak, spices and nuts.",
    children: [
      { label: "Coffee", href: "/commodities/coffee" },
      { label: "Teak", href: "/commodities/teak" },
      { label: "Spices", href: "/commodities/spices" },
      { label: "Nuts", href: "/commodities/nuts" },
    ],
  },
  {
    label: "Sourcing & Trade",
    href: "/sourcing-trade",
    description: "How a requirement becomes a shipment.",
  },
  {
    label: "About",
    href: "/about",
    description: "The company behind the trading identity.",
  },
  {
    label: "Quality & Compliance",
    href: "/quality-compliance",
    description: "Documentation, inspection and traceability.",
  },
];

/** The single primary conversion across the whole site. */
export const primaryCta = {
  label: "Trade Enquiry",
  labelLong: "Start a Trade Enquiry",
  href: "/contact",
} as const;

/** Secondary calls to action, reused by sections and page templates. */
export const secondaryCtas = {
  exploreCommodities: { label: "Explore Commodities", href: "/commodities" },
  discussRequirements: { label: "Discuss Requirements", href: "/contact" },
  requestInformation: { label: "Request Information", href: "/contact" },
} as const;

/** Footer link groups. */
export const footerNav: readonly { title: string; items: readonly NavItem[] }[] = [
  {
    title: "Commodities",
    items: [
      { label: "Coffee", href: "/commodities/coffee" },
      { label: "Teak", href: "/commodities/teak" },
      { label: "Spices", href: "/commodities/spices" },
      { label: "Nuts", href: "/commodities/nuts" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Sourcing & Trade", href: "/sourcing-trade" },
      { label: "Quality & Compliance", href: "/quality-compliance" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: readonly NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];
