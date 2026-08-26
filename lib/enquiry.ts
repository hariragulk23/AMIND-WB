/**
 * lib/enquiry.ts
 * ---------------------------------------------------------------------------
 * Trade enquiry validation and sanitisation.
 *
 * This module is the SINGLE definition of what a valid enquiry is. The client
 * imports it to give immediate feedback; the server action imports the same
 * functions to validate again. Client-side checks are a convenience only —
 * `parseEnquiry` on the server is the authority, and it never trusts anything
 * the browser sent.
 *
 * Dependency-free on purpose: the rule set is small and explicit, and a
 * schema library would be a disproportionate addition for it.
 */

import { commodityOptions, type EnquiryFieldName } from "@/data/enquiry";

export interface TradeEnquiry {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  commodity: string;
  message: string;
}

export type EnquiryErrors = Partial<Record<EnquiryFieldName | "form", string>>;

export interface ParseResult {
  ok: boolean;
  /**
   * The sanitised submission, returned whether or not it validated. On failure
   * the server echoes this back so the form can be repopulated: React resets an
   * uncontrolled form once its action resolves, so the values have to come back
   * as `defaultValue` or the buyer loses everything they typed.
   */
  data: TradeEnquiry;
  errors: EnquiryErrors;
}

/** Per-field caps. Anything longer is a mistake or an abuse attempt. */
const MAX_LENGTH: Record<EnquiryFieldName, number> = {
  contactName: 120,
  companyName: 160,
  email: 254,
  phone: 40,
  commodity: 40,
  message: 4000,
};

/**
 * Trims, collapses whitespace runs and strips control characters.
 *
 * The control-character strip matters most for the short fields that are
 * interpolated into the notification email's subject line — a stray CR or LF
 * there is a header-injection vector.
 */
function clean(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F-\u009F]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

/** Same as `clean`, but keeps newlines — used for the free-text areas. */
function cleanMultiline(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F-\u009F]+/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/**
 * Pragmatic email check. Deliberately not RFC 5322 — the goal is to catch
 * typos and obvious junk, not to reject unusual but legitimate addresses.
 */
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= MAX_LENGTH.email && EMAIL_PATTERN.test(value);
}

/** Constrains a select value to its allowed set; anything else becomes "". */
function constrain(
  value: string,
  options: readonly { value: string }[],
): string {
  return options.some((option) => option.value === value) ? value : "";
}

/**
 * Validates and sanitises a submitted enquiry.
 *
 * Required: contact name, company name, a valid business email, a commodity,
 * and a message. Phone is optional — it is a useful second channel, not a
 * precondition of making contact, and email is already mandatory.
 *
 * The message is required because it is now the only field carrying what the
 * buyer actually wants. The previous rule was "an approximate quantity OR a
 * message"; with the structured trade fields gone, the message is the whole
 * requirement, and an enquiry naming a commodity and nothing else is not
 * something anyone can respond to. Note this requires only that they write
 * something — no minimum detail, volume or destination is demanded.
 */
export function parseEnquiry(formData: FormData): ParseResult {
  const data: TradeEnquiry = {
    contactName: clean(formData.get("contactName"), MAX_LENGTH.contactName),
    companyName: clean(formData.get("companyName"), MAX_LENGTH.companyName),
    email: clean(formData.get("email"), MAX_LENGTH.email),
    phone: clean(formData.get("phone"), MAX_LENGTH.phone),
    commodity: constrain(
      clean(formData.get("commodity"), MAX_LENGTH.commodity),
      commodityOptions,
    ),
    message: cleanMultiline(formData.get("message"), MAX_LENGTH.message),
  };

  const errors: EnquiryErrors = {};

  if (!data.contactName) errors.contactName = "Enter your name.";
  if (!data.companyName) errors.companyName = "Enter your company name.";

  if (!data.email) {
    errors.email = "Enter your business email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.commodity) errors.commodity = "Select a commodity.";

  if (!data.message) {
    errors.message = "Tell us what you are looking for.";
  }

  return { ok: Object.keys(errors).length === 0, data, errors };
}

/* -------------------------------------------------------------------------
   Anti-spam
   ------------------------------------------------------------------------- */

/** Name of the hidden field bots tend to fill in. Must stay unremarkable. */
export const HONEYPOT_FIELD = "company_website";

/** Name of the field holding the millisecond timestamp of form render. */
export const TIMING_FIELD = "form_loaded_at";

/** A genuine person does not complete this form in under three seconds. */
const MIN_COMPLETION_MS = 3000;

/**
 * Non-intrusive spam checks: an off-screen honeypot input, plus a minimum
 * completion time.
 *
 * The timing check is skipped when the timestamp is absent, because it is set
 * by JavaScript on mount — a visitor without JavaScript must still be able to
 * submit. No CAPTCHA: it would add friction and a third-party dependency to
 * the site's only conversion, for a form that is not yet a spam target.
 */
export function looksAutomated(formData: FormData): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const loadedAt = Number(formData.get(TIMING_FIELD));
  if (Number.isFinite(loadedAt) && loadedAt > 0) {
    return Date.now() - loadedAt < MIN_COMPLETION_MS;
  }

  return false;
}
