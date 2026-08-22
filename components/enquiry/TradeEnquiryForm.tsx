"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitTradeEnquiry, type EnquiryState } from "@/app/contact/actions";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company } from "@/data/company";
import {
  commodityOptions,
  enquiryCopy,
  enquirySections,
  fieldLabels,
  incotermOptions,
  purchaseFrequencyOptions,
  quantityUnitOptions,
} from "@/data/enquiry";
import { HONEYPOT_FIELD, TIMING_FIELD } from "@/lib/enquiry";
import { SelectField, TextAreaField, TextField } from "./Field";

const INITIAL: EnquiryState = { status: "idle" };

/**
 * The trade enquiry form — the site's primary conversion.
 *
 * Built on a Server Action with `useActionState`, so it also works with
 * JavaScript disabled: the form posts, the server validates, and the page
 * re-renders with the result. JavaScript adds the pending state, focus
 * management and the conditional required-field logic, but gates nothing.
 *
 * Inputs are uncontrolled. React resets an uncontrolled form once its action
 * resolves, so on a validation error the server echoes the sanitised values
 * back and they are re-applied as `defaultValue` — the reset then restores
 * them instead of clearing the form. Verified in a browser; assuming the DOM
 * values simply persist is wrong, and costs the buyer everything they typed.
 *
 * No animation. A form that moves while being filled in is harder to use, and
 * restraint here is worth more than motion.
 */
export function TradeEnquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitTradeEnquiry,
    INITIAL,
  );
  const [commodity, setCommodity] = useState("");
  /*
    Adjusting state during render rather than in an effect. After a validation
    round trip the commodity has to be re-adopted from the server's echoed
    values so the conditional required-field logic stays correct — doing that
    in an effect would queue a second render pass for every submission.
    See https://react.dev/learn/you-might-not-need-an-effect
  */
  const [seenState, setSeenState] = useState<EnquiryState>(INITIAL);
  if (state !== seenState) {
    setSeenState(state);
    setCommodity(state.status === "invalid" ? state.values.commodity : "");
  }

  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const timingRef = useRef<HTMLInputElement>(null);

  /*
    Runs on mount and after every submission — both are DOM writes, which is
    what effects are for.
      • Re-stamps the timing field. It is set from the client so a prerendered
        page never ships a build-time timestamp, and re-stamped because the
        form reset clears it.
      • Moves focus to whatever the visitor now has to deal with.
  */
  useEffect(() => {
    if (timingRef.current) timingRef.current.value = String(Date.now());

    if (state.status === "invalid") {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    } else if (state.status === "sent" || state.status === "undelivered") {
      resultRef.current?.focus();
    }
  }, [state]);

  const errors = state.status === "invalid" ? state.errors : {};
  /*
    React resets an uncontrolled form once its action resolves. Feeding the
    server's sanitised values back in as `defaultValue` means the reset
    restores them instead of clearing the form — so a validation error never
    costs the buyer the fourteen fields they just filled in.
  */
  const values = state.status === "invalid" ? state.values : undefined;
  const otherCommodity = commodity === "other";

  /* ---- Delivered ----------------------------------------------------- */
  if (state.status === "sent") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="border-t border-paper-line py-16 outline-none md:py-24"
      >
        <SectionLabel>Enquiry received</SectionLabel>
        <p className="display-lg mt-8 max-w-[20ch] text-on-light">
          Thank you. Your enquiry has been sent.
        </p>
        <p className="body-lg mt-6 max-w-[38rem] text-on-light-muted">
          We will review the requirement and come back to you directly at the
          email address you gave us. If anything changes in the meantime, reply
          to us at{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-brass-deep underline underline-offset-4"
          >
            {company.email}
          </a>
          .
        </p>
      </div>
    );
  }

  /* ---- Validated, but NOT delivered -----------------------------------
     Deliberately not dressed up as success. The enquiry is safe in the server
     log, but the buyer is told plainly that it has not reached the inbox and
     is given a route that works right now. */
  if (state.status === "undelivered") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="alert"
        className="border-t border-paper-line py-16 outline-none md:py-24"
      >
        <SectionLabel>Not delivered</SectionLabel>
        <p className="display-lg mt-8 max-w-[24ch] text-on-light">
          Your enquiry could not be sent.
        </p>
        <p className="body-lg mt-6 max-w-[38rem] text-on-light-muted">
          {state.reason === "not-configured"
            ? "Email delivery from this website is not active yet, so we cannot confirm your enquiry has reached us."
            : "Something went wrong delivering your enquiry, so we cannot confirm it has reached us."}{" "}
          Please send it to us directly — we will pick it up straight away.
        </p>
        <div className="mt-8 flex flex-col gap-2">
          <a
            href={`mailto:${company.email}?subject=${encodeURIComponent("Trade enquiry")}`}
            className="display-md text-on-light underline decoration-paper-line underline-offset-8 transition-colors duration-300 ease-brand hover:text-brass-deep"
          >
            {company.email}
          </a>
          <a
            href={`tel:${company.phoneHref}`}
            className="numeral display-md text-on-light underline decoration-paper-line underline-offset-8 transition-colors duration-300 ease-brand hover:text-brass-deep"
          >
            {company.phone}
          </a>
        </div>
      </div>
    );
  }

  /* ---- The form -------------------------------------------------------- */
  return (
    <form ref={formRef} action={formAction} noValidate>
      {/* Anti-spam. Off-screen rather than display:none, which some bots skip. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={timingRef} type="hidden" name={TIMING_FIELD} defaultValue="" />

      {state.status === "invalid" ? (
        <p
          role="alert"
          className="mb-4 border-l-2 border-brass-deep bg-paper-dim px-6 py-5 text-sm text-on-light"
        >
          Some details need checking before this can be sent. The fields
          concerned are marked below.
        </p>
      ) : null}

      <fieldset disabled={pending} className="min-w-0 border-0 p-0">
        <legend className="sr-only">Trade enquiry details</legend>

        {/* ---- 01 Product requirement ---------------------------------- */}
        <EnquirySection index={0}>
          <SelectField
            name="commodity"
            label={fieldLabels.commodity}
            defaultValue={values?.commodity}
            options={commodityOptions}
            placeholder="Select a commodity"
            required
            error={errors.commodity}
            onChange={setCommodity}
          />
          <TextField
            name="specificProduct"
            label={fieldLabels.specificProduct}
            defaultValue={values?.specificProduct}
            required={otherCommodity}
            error={errors.specificProduct}
            hint={
              otherCommodity
                ? "Tell us which product you are looking for."
                : undefined
            }
          />
          <TextField
            name="quantity"
            label={fieldLabels.quantity}
            defaultValue={values?.quantity}
            inputMode="text"
            error={errors.quantity}
            hint={enquiryCopy.quantityNote}
            className="sm:col-span-2 lg:col-span-1"
          />
          <SelectField
            name="quantityUnit"
            label={fieldLabels.quantityUnit}
            defaultValue={values?.quantityUnit}
            options={quantityUnitOptions}
            placeholder="Select a unit"
          />
        </EnquirySection>

        {/* ---- 02 Destination & trade ---------------------------------- */}
        <EnquirySection index={1}>
          <TextField
            name="destinationCountry"
            label={fieldLabels.destinationCountry}
            defaultValue={values?.destinationCountry}
            autoComplete="country-name"
            required
            error={errors.destinationCountry}
          />
          <TextField
            name="destinationPort"
            label={fieldLabels.destinationPort}
            defaultValue={values?.destinationPort}
            error={errors.destinationPort}
          />
          <SelectField
            name="incoterm"
            label={fieldLabels.incoterm}
            defaultValue={values?.incoterm}
            options={incotermOptions}
            placeholder="Select a term"
            hint={enquiryCopy.incotermNote}
          />
          <SelectField
            name="frequency"
            label={fieldLabels.frequency}
            defaultValue={values?.frequency}
            options={purchaseFrequencyOptions}
            placeholder="Select frequency"
          />
          <TextAreaField
            name="packaging"
            label={fieldLabels.packaging}
            defaultValue={values?.packaging}
            rows={3}
            className="sm:col-span-2"
          />
        </EnquirySection>

        {/* ---- 03 Your company ----------------------------------------- */}
        <EnquirySection index={2}>
          <TextField
            name="companyName"
            label={fieldLabels.companyName}
            defaultValue={values?.companyName}
            autoComplete="organization"
            required
            error={errors.companyName}
          />
          <TextField
            name="contactName"
            label={fieldLabels.contactName}
            defaultValue={values?.contactName}
            autoComplete="name"
            required
            error={errors.contactName}
          />
          <TextField
            name="email"
            label={fieldLabels.email}
            defaultValue={values?.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            error={errors.email}
          />
          <TextField
            name="phone"
            label={fieldLabels.phone}
            defaultValue={values?.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
          />
        </EnquirySection>

        {/* ---- 04 Additional information ------------------------------- */}
        <EnquirySection index={3}>
          <TextAreaField
            name="message"
            label={fieldLabels.message}
            defaultValue={values?.message}
            rows={6}
            error={errors.message}
            className="sm:col-span-2"
          />
        </EnquirySection>
      </fieldset>

      {/* ---- Submit ---------------------------------------------------- */}
      <div className="grid gap-8 border-t border-paper-line py-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm text-on-light-muted">
            {enquiryCopy.requiredNote}
          </p>
          <p className="mt-2 text-sm text-on-light-muted">
            Your details are used only to respond to this enquiry. See our{" "}
            <Link
              href="/privacy"
              className="text-brass-deep underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="label-sm group relative inline-flex w-full items-center justify-between gap-6 bg-brand-red-cta px-8 py-6 text-white transition-colors duration-300 ease-brand hover:bg-brand-red-deep disabled:cursor-progress disabled:bg-on-light-muted sm:w-auto"
          >
            <span>
              {pending ? enquiryCopy.submittingLabel : enquiryCopy.submitLabel}
            </span>
            {pending ? (
              /* A single travelling rule — no spinner, no bounce. */
              <span
                aria-hidden="true"
                className="relative block h-px w-10 overflow-hidden bg-white/30"
              >
                <span className="absolute inset-y-0 left-0 block w-1/3 animate-[am-loading_1.1s_ease-in-out_infinite] bg-white" />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="relative block h-px w-10 overflow-hidden bg-current opacity-60"
              >
                <span className="absolute inset-0 block origin-left scale-x-0 bg-current transition-transform duration-500 ease-brand group-hover:scale-x-100" />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/** One numbered block of the form: label column, then the fields. */
function EnquirySection({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const section = enquirySections[index];

  return (
    <section className="grid gap-8 border-t border-paper-line py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-4">
        <SectionLabel index={section.index}>{section.title}</SectionLabel>
        <p className="mt-4 max-w-[24rem] text-sm text-on-light-muted">
          {section.description}
        </p>
      </div>
      <div className="grid content-start gap-x-8 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
        {children}
      </div>
    </section>
  );
}
