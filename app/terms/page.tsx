import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { company, registeredOfficeInline } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms governing use of the AM Global Commodities website. Nothing on this website constitutes a contractual offer.",
  path: "/terms",
});

/**
 * WEBSITE TERMS
 *
 * Scope is deliberately limited to use of the website. These are NOT terms of
 * sale — commodity transactions are governed by the individual contract agreed
 * for each trade.
 *
 * ⚠ REQUIRES LEGAL REVIEW BEFORE PUBLIC LAUNCH. Tracked in
 * CONTENT_REQUIRED.md → Legal.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        headingLines={["Terms"]}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />

      <section className="bg-paper text-on-light">
        <Container width="text" className="py-20 md:py-28">
          <div className="space-y-10">
            <div>
              <h2 className="display-md text-on-light">These terms</h2>
              <p className="mt-4 text-on-light-muted">
                This website is operated by {company.legalName}, trading as{" "}
                {company.brand}, registered in India at{" "}
                {registeredOfficeInline}. By using this website you accept these
                terms.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">No offer, no prices</h2>
              <p className="mt-4 text-on-light-muted">
                Nothing on this website constitutes an offer, a quotation or a
                commitment to supply. No prices are published. Commodity
                descriptions are general and indicative; specifications, grades,
                quantities, packing, Incoterms and availability are confirmed in
                writing against each individual enquiry.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Contracts of sale</h2>
              <p className="mt-4 text-on-light-muted">
                Any trade is governed exclusively by the written contract agreed
                between the parties for that transaction. These website terms do
                not form part of, vary, or override any such contract.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">Accuracy</h2>
              <p className="mt-4 text-on-light-muted">
                We take care to keep the information on this website accurate
                and current, but it is provided for general information only and
                may change without notice. It should not be relied on as the
                basis for a commercial decision without written confirmation
                from us.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">
                Intellectual property
              </h2>
              <p className="mt-4 text-on-light-muted">
                The content, design and marks on this website are the property
                of {company.legalName} or its licensors, and may not be
                reproduced without permission.
              </p>
            </div>

            <div>
              <h2 className="display-md text-on-light">
                Governing law and contact
              </h2>
              <p className="mt-4 text-on-light-muted">
                These terms are governed by the laws of India. Questions about
                them can be sent to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brass-deep underline underline-offset-4"
                >
                  {company.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
