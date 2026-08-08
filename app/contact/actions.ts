"use server";

/**
 * Trade enquiry server action.
 *
 * Runs on the server only. It re-validates everything (the client's checks are
 * a convenience, never a gate), applies the anti-spam checks, builds the
 * notification and hands it to the delivery layer.
 *
 * The result it returns distinguishes between an enquiry that was genuinely
 * emailed and one that could not be, and the form renders those two outcomes
 * differently. Nothing here ever reports success for a message that was not
 * sent.
 */

import { deliver } from "@/lib/email";
import { buildEnquiryMessage } from "@/lib/email/message";
import {
  looksAutomated,
  parseEnquiry,
  type EnquiryErrors,
  type TradeEnquiry,
} from "@/lib/enquiry";

export type EnquiryState =
  | { status: "idle" }
  /** Delivered to the company inbox. */
  | { status: "sent" }
  /**
   * Validated and logged server-side, but no email provider is configured or
   * the send failed. The visitor is told to contact us directly rather than
   * being led to believe the enquiry has landed.
   */
  | { status: "undelivered"; reason: "not-configured" | "failed" }
  | {
      status: "invalid";
      errors: EnquiryErrors;
      /** Sanitised values, echoed back so the form can repopulate itself. */
      values: TradeEnquiry;
    };

export async function submitTradeEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Silently accept and discard automated submissions: reporting the rejection
  // would tell a bot exactly which check it tripped.
  if (looksAutomated(formData)) {
    return { status: "sent" };
  }

  const parsed = parseEnquiry(formData);
  if (!parsed.ok) {
    return { status: "invalid", errors: parsed.errors, values: parsed.data };
  }

  const message = buildEnquiryMessage(parsed.data);
  const result = await deliver(message);

  if (result.status === "sent") return { status: "sent" };

  if (result.detail) {
    console.error("[trade-enquiry] Not delivered:", result.detail);
  }

  return { status: "undelivered", reason: result.status };
}
