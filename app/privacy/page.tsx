import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { company, registeredOfficeInline } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How AM INDIA handles personal data submitted through this website and by email.",
  path: "/privacy",
});

/**
 * PRIVACY POLICY
 *
 * Written to describe what this website actually does: it sets no cookies at
 * all, and enquiry correspondence is the only personal data involved.
 *
 * ⚠ THE ANALYTICS PARAGRAPH DESCRIBES NETLIFY ANALYTICS, WHICH IS NOT YET
 * ENABLED. The copy was written ahead of switching it on, deliberately: the
 * page previously said no analytics were used, and that statement would have
 * become false the moment it was enabled. It is accurate for Netlify
 * Analytics specifically — server-side, log-derived, no client script, no
 * cookies, no personal identifiers.
 *
 * IF A DIFFERENT TOOL IS CHOSEN INSTEAD, THIS PARAGRAPH IS WRONG. Plausible,
 * Umami, GA4 or anything else runs a script in the visitor's browser, which
 * changes what has to be disclosed and may require consent. Rewrite this
 * before enabling any of them. And if analytics are not enabled at all, the
 * paragraph overstates what is collected — remove it.
 *
 * ⚠ REQUIRES LEGAL REVIEW BEFORE PUBLIC LAUNCH, and must be revised when any
 * third-party embed is added. Tracked in CONTENT_REQUIRED.md → Legal.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        headingLines={["Privacy", "Policy"]}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <section className="bg-paper text-on-light">
        <Container width="text" className="section-y-sm">
          <div className="space-y-10">
            <div>
              <h2 className="display-md text-on-light">Who we are</h2>
              <p className="measure mt-4 text-on-light-muted">
                This website is operated by {company.legalName}, trading as{" "}
                {company.brand}, a private limited company registered in India
                at {registeredOfficeInline}. CIN{" "}
                {company.registrations[0].value}. The company is the controller
                of personal data described in this policy.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">
                What we collect and why
              </h2>
              <p className="measure mt-4 text-on-light-muted">
                We collect the personal data you choose to send us when you make
                a trade enquiry — typically your name, company, business email
                address, telephone number and the contents of your enquiry. We
                use it for one purpose: to assess and respond to that enquiry
                and to correspond with you about the trade it concerns.
              </p>
              <p className="measure mt-4 text-on-light-muted">
                We do not sell personal data, and we do not use it for
                advertising or profiling.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Cookies and analytics</h2>
              <p className="measure mt-4 text-on-light-muted">
                This website sets no cookies of any kind — no analytics
                cookies, no advertising cookies and no tracking cookies. There
                is no cookie banner because there is nothing to consent to.
              </p>
              <p className="measure mt-4 text-on-light-muted">
                We use Netlify Analytics to understand which pages are visited.
                It works entirely from the server request logs our hosting
                provider already keeps. No script runs in your browser, nothing
                is stored on your device, and you are not followed between
                sites or between visits. It reports aggregate figures — page
                views, referring sites, broad country-level location — and does
                not build a profile of you or identify you individually.
              </p>
              <p className="measure mt-4 text-on-light-muted">
                Separately, our hosting provider processes standard technical
                logs, which may include IP addresses, for security and
                reliability.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Retention</h2>
              <p className="measure mt-4 text-on-light-muted">
                Enquiry correspondence is retained for as long as needed to
                handle the enquiry and any resulting commercial relationship,
                and to meet applicable legal, tax and accounting obligations.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Your rights</h2>
              <p className="measure mt-4 text-on-light-muted">
                Subject to applicable law, you may request access to the
                personal data we hold about you, ask us to correct or delete it,
                or object to our processing of it. To make a request, contact us
                at{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brass-deep underline underline-offset-4"
                >
                  {company.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Contact</h2>
              <address className="measure mt-4 not-italic text-on-light-muted">
                {company.legalName}
                <br />
                {registeredOfficeInline}
                <br />
                <a
                  href={`mailto:${company.email}`}
                  className="text-brass-deep underline underline-offset-4"
                >
                  {company.email}
                </a>
              </address>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
