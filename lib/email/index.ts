import "server-only";

/**
 * lib/email/index.ts
 * ---------------------------------------------------------------------------
 * Transactional email delivery.
 *
 * ══════════════════════════════════════════════════════════════════════════
 *  NO PROVIDER IS CONNECTED YET.
 *
 *  This module resolves its configuration from environment variables at call
 *  time and reports HONESTLY which of three modes it is in:
 *
 *    "sent"          a provider is configured and accepted the message
 *    "not-configured" no provider is configured — nothing was sent
 *    "failed"        a provider is configured but the send failed
 *
 *  The server action passes that status straight through to the UI, which
 *  NEVER claims an email was sent unless the status is "sent". This is the
 *  whole point of the abstraction: a form that silently drops a six-figure
 *  enquiry while showing a green tick is worse than no form at all.
 *
 *  TO GO LIVE: set TRADE_ENQUIRY_API_KEY and TRADE_ENQUIRY_FROM. The Resend
 *  implementation below then activates with no code change. To use a
 *  different provider, add a branch to `deliver()` — nothing outside this
 *  file needs to change.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * `import "server-only"` makes it a build error to import this module into a
 * Client Component, so the API key can never be bundled for the browser.
 */

import { company } from "@/data/company";
import type { BuiltMessage } from "./message";

export type DeliveryStatus = "sent" | "not-configured" | "failed";

export interface DeliveryResult {
  status: DeliveryStatus;
  /** Internal detail for server logs. Never shown to the visitor verbatim. */
  detail?: string;
}

interface EmailConfig {
  to: string;
  from: string | undefined;
  apiKey: string | undefined;
  /** Provider endpoint. Overridable for testing, or for a regional endpoint. */
  apiUrl: string;
}

/**
 * Read at call time, not at module scope, so a platform that injects
 * environment variables per-request is handled correctly.
 */
function readConfig(): EmailConfig {
  return {
    to: process.env.TRADE_ENQUIRY_TO?.trim() || company.email,
    from: process.env.TRADE_ENQUIRY_FROM?.trim() || undefined,
    apiKey: process.env.TRADE_ENQUIRY_API_KEY?.trim() || undefined,
    apiUrl:
      process.env.TRADE_ENQUIRY_API_URL?.trim() || "https://api.resend.com/emails",
  };
}

/** True when a provider is fully configured and delivery can be attempted. */
export function isEmailConfigured(): boolean {
  const { from, apiKey } = readConfig();
  return Boolean(from && apiKey);
}

/**
 * Sends via the Resend HTTP API.
 *
 * Called through `fetch` rather than the SDK: it is a single POST, and the
 * project has no other need for the dependency.
 */
async function sendWithResend(
  config: EmailConfig,
  message: BuiltMessage,
): Promise<DeliveryResult> {
  const response = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return {
      status: "failed",
      detail: `Resend responded ${response.status}: ${detail.slice(0, 300)}`,
    };
  }

  return { status: "sent" };
}

/**
 * Delivers a built message.
 *
 * When no provider is configured the enquiry is written to the server log in
 * full, so a submission made during this window is recoverable rather than
 * lost — and the caller is told plainly that nothing was emailed.
 */
export async function deliver(message: BuiltMessage): Promise<DeliveryResult> {
  const config = readConfig();

  if (!config.apiKey || !config.from) {
    console.warn(
      [
        "[trade-enquiry] No email provider configured — nothing was sent.",
        `  Would have gone to: ${config.to}`,
        `  Missing: ${[
          !config.from && "TRADE_ENQUIRY_FROM",
          !config.apiKey && "TRADE_ENQUIRY_API_KEY",
        ]
          .filter(Boolean)
          .join(", ")}`,
        "  Enquiry follows so it is not lost:",
        message.text,
      ].join("\n"),
    );
    return { status: "not-configured" };
  }

  try {
    return await sendWithResend(config, message);
  } catch (error) {
    console.error("[trade-enquiry] Delivery threw:", error);
    return {
      status: "failed",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * PLANNED — automated acknowledgement to the buyer.
 *
 * Intentionally not called anywhere. Sending an auto-reply is a commercial
 * decision (tone, what it promises, whether it implies a response time) that
 * has not been made, and enabling it by default would put unreviewed wording
 * in front of buyers. To enable: implement using `deliver()`'s provider branch
 * with the buyer as recipient, and call it from the server action after a
 * successful internal send.
 */
export const ACKNOWLEDGEMENT_ENABLED = false;
