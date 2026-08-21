/**
 * lib/structured-data.ts
 * ---------------------------------------------------------------------------
 * JSON-LD builders.
 *
 * Only Organization, WebSite and BreadcrumbList are emitted. No review,
 * rating, aggregateRating or offer schema is produced anywhere — there are no
 * genuine reviews or public prices, and fabricating them would be both a
 * search-guidelines violation and a commercial misrepresentation.
 *
 * Every value is read from data/company.ts.
 */

import { company } from "@/data/company";
import { absoluteUrl, SITE_URL } from "./seo";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.brand,
    /* The registered entity. Unchanged by the brand rename — contracts are
       signed in this name, not the trading brand. */
    legalName: company.legalName,
    /* The trading brand written out in full, for entity matching. */
    alternateName: `${company.brand} — ${company.legalName}`,
    url: SITE_URL,
    description: company.summary,
    foundingDate: company.incorporation.date,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.registeredOffice.lines.join(", "),
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      postalCode: company.registeredOffice.postalCode,
      addressCountry: company.registeredOffice.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: company.email,
        telephone: company.phoneHref,
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
    identifier: company.registrations.map((r) => ({
      "@type": "PropertyValue",
      name: r.label,
      value: r.value,
    })),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.brand,
    description: company.summary,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: readonly Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
