/**
 * data/enquiry.ts
 * ---------------------------------------------------------------------------
 * Trade enquiry form configuration — options, labels and copy.
 *
 * Kept in the data layer with everything else so the form's vocabulary can be
 * edited without touching the form component, the validator or the server
 * action.
 *
 * SCOPE — THIS IS A FIRST-CONTACT FORM, NOT A SPECIFICATION SHEET.
 * It collects who is asking, how to reach them, which platform they are
 * interested in, and what they want in their own words. Nothing else.
 *
 * The structured trade fields this form used to carry — approximate quantity
 * and unit, destination country and port, preferred Incoterm, packaging
 * requirements, purchase frequency, and a separate "specific product" line —
 * were removed deliberately. Fourteen fields is a specification sheet, and
 * asking a buyer to complete one before anyone has replied to them is the
 * wrong order: those details belong to the Evaluate and Trade stages in
 * `data/home.ts → processContent`, once a conversation is open. A buyer who
 * already knows their volume, destination or terms can still state them in
 * the message; the form simply no longer demands them as a precondition of
 * making contact.
 *
 * If structured fields are ever wanted again, they belong on a second-stage
 * form behind a reply — not here.
 */

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

/**
 * Commodity list is derived from the platforms, plus an escape hatch.
 *
 * "Other" is kept deliberately. The field is required, so without it a buyer
 * interested in something outside the four platforms would have to pick a
 * commodity they do not want in order to submit at all. What they actually
 * want then goes in the message.
 */
export const commodityOptions: readonly SelectOption[] = [
  { value: "coffee", label: "Coffee" },
  { value: "teak", label: "Teak" },
  { value: "spices", label: "Spices" },
  { value: "nuts", label: "Nuts" },
  { value: "other", label: "Other" },
];

/** Section headings for the form's two steps. */
export const enquirySections = [
  {
    index: "01",
    title: "Your details",
    description: "So we know who we are responding to, and how.",
  },
  {
    index: "02",
    title: "Your enquiry",
    description:
      "What you are looking for. Volume, destination and timing are welcome here if you have them — not required.",
  },
] as const;

export const enquiryCopy = {
  heading: ["Start a", "trade enquiry"],
  intro:
    "Tell us what you are looking to source, buy or trade. We will review the requirement and come back to you directly.",
  submitLabel: "Submit trade enquiry",
  submittingLabel: "Submitting…",
  messageNote:
    "Include anything that helps us scope it — approximate volume, destination market, timing, grade or specification. If it is not settled yet, describe the requirement as it stands.",
  requiredNote: "Fields marked with an asterisk are required.",
  privacyNote:
    "Your details are used only to respond to this enquiry. See our Privacy Policy.",
} as const;

/** Human-readable labels used by both the form and the notification email. */
export const fieldLabels = {
  contactName: "Name",
  companyName: "Company",
  email: "Business email",
  phone: "Phone / WhatsApp",
  commodity: "Commodity of interest",
  message: "Message / requirement",
} as const;

export type EnquiryFieldName = keyof typeof fieldLabels;

/** Resolves a stored option value back to its display label for the email. */
export function optionLabel(
  options: readonly SelectOption[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
