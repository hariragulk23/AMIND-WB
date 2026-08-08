/**
 * data/enquiry.ts
 * ---------------------------------------------------------------------------
 * Trade enquiry form configuration — options, labels and copy.
 *
 * Kept in the data layer with everything else so the form's vocabulary can be
 * edited without touching the form component, the validator or the server
 * action.
 *
 * IMPORTANT — the Incoterm list is a list of terms a buyer may WORK TO, not a
 * list of terms this company offers. Which terms apply is agreed per contract
 * (see `incotermNote` below, which is rendered beside the field). Do not
 * reword that note into an offer.
 */

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

/** Commodity list is derived from the platforms, plus an escape hatch. */
export const commodityOptions: readonly SelectOption[] = [
  { value: "coffee", label: "Coffee" },
  { value: "teak", label: "Teak" },
  { value: "spices", label: "Spices" },
  { value: "nuts", label: "Nuts" },
  { value: "other", label: "Other" },
];

export const quantityUnitOptions: readonly SelectOption[] = [
  { value: "kg", label: "kg" },
  { value: "mt", label: "MT" },
  { value: "bags", label: "Bags" },
  { value: "containers", label: "Containers" },
  { value: "m3", label: "m³" },
  { value: "other", label: "Other" },
];

export const incotermOptions: readonly SelectOption[] = [
  { value: "fob", label: "FOB" },
  { value: "cif", label: "CIF" },
  { value: "cfr", label: "CFR" },
  { value: "exw", label: "EXW" },
  { value: "fca", label: "FCA" },
  { value: "discuss", label: "Not sure / discuss" },
];

export const purchaseFrequencyOptions: readonly SelectOption[] = [
  { value: "spot", label: "One-off / spot" },
  { value: "repeat", label: "Repeat purchase" },
  { value: "contract", label: "Ongoing contract" },
  { value: "undecided", label: "Not yet decided" },
];

/** Section headings for the form's four steps. */
export const enquirySections = [
  {
    index: "01",
    title: "Product requirement",
    description: "What you are looking to source, and in what volume.",
  },
  {
    index: "02",
    title: "Destination & trade",
    description: "Where it is going and the terms you work to.",
  },
  {
    index: "03",
    title: "Your company",
    description: "So we know who we are responding to.",
  },
  {
    index: "04",
    title: "Additional information",
    description: "Specifications, tolerances, timelines — anything relevant.",
  },
] as const;

export const enquiryCopy = {
  heading: ["Start a", "trade enquiry"],
  intro:
    "Tell us what you are looking to source, buy or trade. We will review the requirement and come back to you directly.",
  submitLabel: "Submit trade enquiry",
  submittingLabel: "Submitting…",
  incotermNote:
    "Listed for reference only. The terms applying to a transaction are agreed per contract.",
  quantityNote:
    "An approximate figure is fine. If the volume is not yet defined, describe the requirement in the message instead.",
  requiredNote: "Fields marked with an asterisk are required.",
  privacyNote:
    "Your details are used only to respond to this enquiry. See our Privacy Policy.",
} as const;

/** Human-readable labels used by both the form and the notification email. */
export const fieldLabels = {
  commodity: "Commodity",
  specificProduct: "Specific product",
  quantity: "Approximate quantity",
  quantityUnit: "Quantity unit",
  destinationCountry: "Destination country",
  destinationPort: "Destination port",
  incoterm: "Preferred Incoterm",
  packaging: "Packaging requirements",
  frequency: "Purchase frequency",
  companyName: "Company name",
  contactName: "Contact name",
  email: "Business email",
  phone: "Phone / WhatsApp",
  message: "Message / additional requirements",
} as const;

export type EnquiryFieldName = keyof typeof fieldLabels;

/** Resolves a stored option value back to its display label for the email. */
export function optionLabel(
  options: readonly SelectOption[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
