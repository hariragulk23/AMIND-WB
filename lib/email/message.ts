/**
 * lib/email/message.ts
 * ---------------------------------------------------------------------------
 * Builds the internal trade enquiry notification.
 *
 * Deliberately plain. This email is an internal work item, not a marketing
 * piece: it needs to be scannable in a phone's inbox preview, forwardable, and
 * legible in any client. No layout tables, no images, no branding chrome.
 *
 * Both a text and a minimal HTML part are produced so clients that prefer one
 * or the other both render sensibly.
 */

import { commodityOptions, fieldLabels, optionLabel } from "@/data/enquiry";
import type { TradeEnquiry } from "@/lib/enquiry";

export interface BuiltMessage {
  subject: string;
  text: string;
  html: string;
  /** Set as Reply-To so a reply goes straight to the buyer. */
  replyTo: string;
}

/** Escapes text for safe interpolation into the HTML part. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Builds a subject from whatever is known, e.g.
 *   "New Trade Enquiry — Coffee — Nordkaffe AB"
 * Absent parts are simply omitted rather than rendered as "unknown".
 *
 * Commodity and company are what make one enquiry distinguishable from another
 * in an inbox list. Destination and volume used to appear here; they are no
 * longer collected as fields, and pulling a guess out of the free-text message
 * would put an unverified figure in a subject line.
 */
function buildSubject(enquiry: TradeEnquiry): string {
  const parts = ["New Trade Enquiry"];

  const commodity = optionLabel(commodityOptions, enquiry.commodity);
  if (commodity) parts.push(commodity);

  if (enquiry.companyName) parts.push(enquiry.companyName);

  return parts.join(" — ").slice(0, 200);
}

/**
 * Ordered rows for the body. Empty values are dropped, not shown blank.
 *
 * Who and how to reach them first, then what they want — the order someone
 * triaging the inbox actually reads in, and the message last because it is the
 * only row that runs to multiple lines.
 */
function rows(enquiry: TradeEnquiry): [string, string][] {
  const all: [string, string][] = [
    [fieldLabels.contactName, enquiry.contactName],
    [fieldLabels.companyName, enquiry.companyName],
    [fieldLabels.email, enquiry.email],
    [fieldLabels.phone, enquiry.phone],
    [fieldLabels.commodity, optionLabel(commodityOptions, enquiry.commodity)],
    [fieldLabels.message, enquiry.message],
  ];
  return all.filter(([, value]) => value.trim() !== "");
}

export function buildEnquiryMessage(
  enquiry: TradeEnquiry,
  submittedAt: Date = new Date(),
): BuiltMessage {
  const timestamp = `${submittedAt.toISOString()} (UTC)`;
  const entries = rows(enquiry);

  const text = [
    buildSubject(enquiry),
    "",
    `Submitted: ${timestamp}`,
    "",
    ...entries.map(([label, value]) =>
      value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`,
    ),
    "",
    "—",
    "Submitted via the trade enquiry form on amglobalcommodities.com",
  ].join("\n");

  const html = [
    `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111">`,
    `<p style="margin:0 0 4px"><strong>${escapeHtml(buildSubject(enquiry))}</strong></p>`,
    `<p style="margin:0 0 16px;color:#555;font-size:13px">Submitted: ${escapeHtml(timestamp)}</p>`,
    `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">`,
    ...entries.map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 20px 6px 0;vertical-align:top;color:#555;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;vertical-align:top">${escapeHtml(value).replace(/\n/g, "<br>")}</td>` +
        `</tr>`,
    ),
    `</table>`,
    `<p style="margin:20px 0 0;color:#777;font-size:12px">Submitted via the trade enquiry form on amglobalcommodities.com</p>`,
    `</div>`,
  ].join("");

  return { subject: buildSubject(enquiry), text, html, replyTo: enquiry.email };
}
