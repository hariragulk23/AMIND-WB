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
 * Written to describe what this website actually does today: it sets no
 * analytics or advertising cookies and collects nothing automatically beyond
 * standard hosting logs, so enquiry correspondence is the only personal data
 * involved.
 *
 * ⚠ REQUIRES LEGAL REVIEW BEFORE PUBLIC LAUNCH, and must be revised when the
 * structured enquiry form, any analytics, or any third-party embed is added.
 * Tracked in CONTENT_REQUIRED.md → Legal.
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
              <p className="mt-4 text-on-light-muted">
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
              <p className="mt-4 text-on-light-muted">
                We collect the personal data you choose to send us when you make
                a trade enquiry — typically your name, company, business email
                address, telephone number and the contents of your enquiry. We
                use it for one purpose: to assess and respond to that enquiry
                and to correspond with you about the trade it concerns.
              </p>
              <p className="mt-4 text-on-light-muted">
                We do not sell personal data, and we do not use it for
                advertising or profiling.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Cookies and analytics</h2>
              <p className="mt-4 text-on-light-muted">
                This website does not set analytics, advertising or tracking
                cookies. Our hosting provider processes standard technical logs,
                which may include IP addresses, for security and reliability.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Retention</h2>
              <p className="mt-4 text-on-light-muted">
                Enquiry correspondence is retained for as long as needed to
                handle the enquiry and any resulting commercial relationship,
                and to meet applicable legal, tax and accounting obligations.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Your rights</h2>
              <p className="mt-4 text-on-light-muted">
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
              <address className="mt-4 not-italic text-on-light-muted">
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
