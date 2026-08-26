import type { Metadata } from "next";

import { TradeEnquiryForm } from "@/components/enquiry/TradeEnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { enquiryCopy } from "@/data/enquiry";
import { isEmailConfigured } from "@/lib/email";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a Trade Enquiry",
  description:
    "Send your contact details, the commodity you are interested in, and what you are looking for. AM INDIA reviews the requirement and comes back directly on whether it can be sourced.",
  path: "/contact",
});

/**
 * Rendered per request rather than prerendered, so the delivery-status notice
 * reflects the environment the site is actually running in. Setting the email
 * credentials therefore takes effect without a rebuild. The page has no other
 * dynamic content, so the cost is negligible.
 */
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const emailReady = isEmailConfigured();

  return (
    <>
      <PageHero
        headingLines={enquiryCopy.heading}
        intro={enquiryCopy.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Start a Trade Enquiry", path: "/contact" },
        ]}
      />

      <section className="bg-paper text-on-light">
        {/* Short top padding: the first form section opens on its own
            border-t immediately below, which already marks the boundary
            with the hero. */}
        <Container className="pb-8 pt-6 md:pt-8">
          {/*
            Told up front, not after fourteen fields. While no transactional
            email provider is configured, a buyer should not invest the time to
            complete the form only to be told at the end that it could not be
            sent. This notice disappears the moment delivery is live.
          */}
          {!emailReady ? (
            <div className="mb-4 border-l-2 border-brass-deep bg-paper-dim px-6 py-5">
              <p className="label-xs text-brass-deep">Direct contact preferred</p>
              <p className="mt-3 max-w-[46rem] text-sm text-on-light">
                Automated email delivery from this website is not active yet. You
                can still submit the form — the enquiry is validated and recorded
                — but for anything time-sensitive please write to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brass-deep underline underline-offset-4"
                >
                  {company.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${company.phoneHref}`}
                  className="numeral text-brass-deep underline underline-offset-4"
                >
                  {company.phone}
                </a>
                .
              </p>
            </div>
          ) : null}

          <TradeEnquiryForm />
        </Container>
      </section>
    </>
  );
}
