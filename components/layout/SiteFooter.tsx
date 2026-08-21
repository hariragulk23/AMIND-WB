import Link from "next/link";
import { company, registeredOfficeLines } from "@/data/company";
import { footerNav, legalNav } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { FooterMark } from "./FooterMark";

/**
 * Site footer — the legal record of the business.
 *
 * Shows the public brand, the registered legal entity, the registered office,
 * CIN, GSTIN and contact details, all read from data/company.ts.
 *
 * PAN and TAN are deliberately never displayed.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-on-dark">
      {/* The logo's red/green/red rule, capping the footer. One of the three
          places the motif is allowed to appear. */}
      <div aria-hidden="true" className="brand-rule w-full" />

      <Container className="relative py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Identity + legal entity ---- */}
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold uppercase leading-none tracking-[0.1em] text-on-dark">
              {company.brand}
            </p>
            <p className="mt-4 max-w-[28rem] text-sm text-on-dark-muted">
              {company.tagline}
            </p>

            <FooterMark />

            <div className="mt-10">
              <h2 className="label-xs text-brass">Registered entity</h2>
              <p className="mt-3 text-sm text-on-dark">{company.legalName}</p>
              <address className="mt-3 not-italic text-sm leading-relaxed text-on-dark-muted">
                {registeredOfficeLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <dl className="mt-5 space-y-1 text-sm">
                {company.registrations.map((registration) => (
                  <div key={registration.label} className="flex gap-3">
                    <dt className="label-xs pt-1 text-on-dark-muted">
                      {registration.label}
                    </dt>
                    <dd className="numeral text-on-dark">{registration.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ---- Navigation ---- */}
          <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-6">
            <div className="grid grid-cols-2 gap-10">
              {footerNav.map((group) => (
                <div key={group.title}>
                  <h2 className="label-xs text-brass">{group.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-on-dark-muted transition-colors duration-300 ease-brand hover:text-on-dark"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="label-xs text-brass">Contact</h2>
            <address className="mt-4 space-y-2.5 not-italic text-sm">
              <a
                href={`mailto:${company.email}`}
                className="block break-words text-on-dark-muted transition-colors duration-300 ease-brand hover:text-on-dark"
              >
                {company.email}
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="block text-on-dark-muted transition-colors duration-300 ease-brand hover:text-on-dark"
              >
                {company.phone}
              </a>
            </address>
          </div>
        </div>

        {/* ---- Legal bar ---- */}
        <div className="mt-16 flex flex-col gap-5 border-t border-charcoal pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-on-dark-muted">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-xs text-on-dark-muted transition-colors duration-300 ease-brand hover:text-on-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
