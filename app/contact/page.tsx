import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { TradeEnquiryForm } from "@/components/enquiry/TradeEnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company, registeredOfficeLines } from "@/data/company";
import { enquiryCopy } from "@/data/enquiry";
import { isEmailConfigured } from "@/lib/email";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a Trade Enquiry",
  description:
    "Send the commodity, specification, quantity and destination. AM INDIA reviews the requirement and comes back directly on whether it can be sourced.",
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
        <Container className="pb-8 pt-16 md:pt-20">
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

      {/* ---- Direct contact + registered entity ------------------------ */}
      <section
        aria-labelledby="direct-contact-heading"
        className="bg-paper text-on-light"
      >
        <Container className="pb-20 md:pb-28">
          <div className="grid gap-10 border-t border-paper-line pt-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel>Direct</SectionLabel>
              </Reveal>
              <h2
                id="direct-contact-heading"
                className="display-md mt-6 text-on-light"
              >
                Or contact us directly
              </h2>
            </div>

            <Reveal className="lg:col-span-4 lg:col-start-6">
              <address className="not-italic">
                <p className="label-xs text-on-light-muted">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-2 block break-words text-on-light transition-colors duration-300 ease-brand hover:text-brass-deep"
                >
                  {company.email}
                </a>

                <p className="label-xs mt-8 text-on-light-muted">
                  Phone / WhatsApp
                </p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="numeral mt-2 block text-on-light transition-colors duration-300 ease-brand hover:text-brass-deep"
                >
                  {company.phone}
                </a>

                <p className="label-xs mt-8 text-on-light-muted">
                  Registered office
                </p>
                <div className="measure mt-2 text-on-light-muted">
                  {registeredOfficeLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </address>
            </Reveal>

            <Reveal className="lg:col-span-3 lg:col-start-10">
              <p className="label-xs text-on-light-muted">Registered entity</p>
              <p className="mt-2 text-sm text-on-light">{company.legalName}</p>
              <dl className="mt-4 space-y-1 text-sm">
                {company.registrations.map((registration) => (
                  <div key={registration.label} className="flex gap-3">
                    <dt className="label-xs pt-1 text-on-light-muted">
                      {registration.label}
                    </dt>
                    <dd className="numeral text-on-light">
                      {registration.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
