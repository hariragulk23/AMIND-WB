import type { Metadata } from "next";

import { Reveal } from "@/components/animation/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { company, registeredOfficeLines } from "@/data/company";
import { contactContent } from "@/data/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a Trade Enquiry",
  description:
    "Start a trade enquiry with AM Global Commodities. Send the commodity, specification, quantity and destination, and we will respond with a clear view of the sourcing route.",
  path: "/contact",
});

/**
 * /contact — START A TRADE ENQUIRY
 *
 * NOTE ON SCOPE: the structured enquiry form (server-side validation,
 * anti-spam, attachment architecture and transactional email delivery) is the
 * next build step. Until it ships, this page converts directly to email and
 * phone and tells a buyer exactly what to include — which is what a serious
 * B2B buyer will do anyway. Nothing here is a placeholder: every detail shown
 * is real and actionable.
 */
export default function ContactPage() {
  const subject = encodeURIComponent("Trade enquiry — AM Global Commodities");

  return (
    <>
      <PageHero
        headingLines={["Start a", "trade enquiry"]}
        intro={contactContent.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="bg-paper text-on-light">
        <Container className="py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            {/* ---- What to include ---------------------------------- */}
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="01">What to include</SectionLabel>
              </Reveal>

              <Reveal as="ul" stagger="base" className="mt-10 border-t border-paper-line">
                {contactContent.checklist.map((item) => (
                  <li
                    key={item}
                    className="border-b border-paper-line py-4 text-on-light"
                  >
                    {item}
                  </li>
                ))}
              </Reveal>

              <Reveal className="mt-10">
                <CtaLink href={`mailto:${company.email}?subject=${subject}`}>
                  Email the enquiry
                </CtaLink>
              </Reveal>
            </div>

            {/* ---- Direct contact ----------------------------------- */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <SectionLabel index="02">Direct</SectionLabel>
              </Reveal>

              <Reveal className="mt-10">
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
                  <div className="mt-2 text-on-light-muted">
                    {registeredOfficeLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </div>
                </address>
              </Reveal>

              <Reveal className="mt-10 border-t border-paper-line pt-6">
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
          </div>
        </Container>
      </section>
    </>
  );
}
