# Content required before public launch

Everything the website needs from **Antonio Marco Exports and Trade Private
Limited** that has not yet been supplied.

Nothing in this list has been guessed, invented or filled with a plausible
default. Where a fact is missing, the corresponding section either does not
render at all or renders neutral, non-committal copy. That is deliberate:
publishing an invented grade, origin, MOQ, port or certification is a
commercial misstatement, and in the case of certifications potentially a
regulatory one.

**How to use this document:** answer a section, then update the matching data
file (named against each group). No component changes are needed.

---

## 1. Corporate

_File: `data/company.ts`_

Already held and published: brand name, legal name, registered office, CIN,
GSTIN, email, phone, incorporation date (6 August 2025), directors, Spanish
corporate shareholding (percentages deliberately withheld).

Still required:

- [ ] **Official logo files** — vector (SVG/AI/EPS) plus light and dark
      variants. Currently a typographic wordmark stands in
      (`components/layout/Logo.tsx`).
- [ ] **Official brand colours** — the site palette is a temporary stand-in and
      must be re-derived from the logo.
- [ ] Preferred **brand typeface**, if one is specified by the shareholder's
      brand guidelines.
- [ ] Whether the **Spanish parent company** may be named on the site, and if
      so, exactly how it should be described.
- [ ] Should **director names** appear publicly on `/about`? (Currently shown —
      they are on the public MCA record. Confirm this is wanted.)
- [ ] Correspondence/operational address, if different from the registered
      office.
- [ ] Office / operating hours and time zone for enquiry response
      expectations.
- [ ] Any **social or professional profiles** (LinkedIn) to link and to add to
      the Organization structured data.
- [ ] Confirmation that `antoniomarcoindia@gmail.com` is the long-term enquiry
      address, or the domain address that will replace it.

---

## 2. Coffee

_File: `data/commodities.ts` → `coffee`_

- [ ] Species actually offered — Arabica, Robusta, or both.
- [ ] Form — green coffee only, or others.
- [ ] Processing methods handled (washed / natural / honey / other).
- [ ] Grade nomenclature used, and against which standard.
- [ ] Screen sizes offered.
- [ ] Defect count tolerances and the counting standard applied.
- [ ] Moisture specification.
- [ ] Crop year(s) available.
- [ ] Origins that can genuinely be supplied.
- [ ] Packing — bag type and net weight; container stuffing plan.
- [ ] Minimum order quantity.
- [ ] Incoterms actually offered.
- [ ] Loading ports.
- [ ] Sample policy — free/paid, size, courier terms.
- [ ] Whether cupping scores/reports can be provided.

---

## 3. Teak

_File: `data/commodities.ts` → `teak`_

- [ ] Forms handled — logs, sawn timber, boards, or a subset.
- [ ] Origin(s) of the timber.
- [ ] Dimension ranges and tolerances; typical cutting lists.
- [ ] Grading standard used and the grades offered.
- [ ] Moisture content specification (air-dried / kiln-dried, target %).
- [ ] **Legal documentation set** provided with a consignment (transit permits,
      origin declarations, ownership chain).
- [ ] Packing and container loading method; volume per container.
- [ ] Minimum order quantity.
- [ ] Incoterms actually offered.
- [ ] Loading ports.

> ⚠ **Make no forestry claim without the certificate in hand.** FSC, PEFC,
> EUDR due-diligence and CITES are pre-wired in `data/compliance.ts` and
> switched off. EUDR in particular requires geolocation evidence and a due
> diligence statement — do not imply compliance until that process genuinely
> exists.

---

## 4. Spices

_File: `data/commodities.ts` → `spices`_

- [ ] **Which spices are actually offered.** The category currently names none,
      because availability must be data-driven. Candidates to confirm
      individually: black pepper, cardamom, turmeric, chilli, cinnamon, cloves,
      others.

For **each** confirmed spice:

- [ ] Whole and/or ground.
- [ ] Origin / growing region.
- [ ] Grade nomenclature.
- [ ] Moisture specification.
- [ ] Purity, admixture and extraneous matter limits.
- [ ] Volatile oil / curcumin / piperine content where relevant.
- [ ] Contaminant limits worked to (pesticide MRL regime, aflatoxin, ETO,
      heavy metals) and the destination markets those satisfy.
- [ ] Packing formats and net weights.
- [ ] Minimum order quantity.
- [ ] Incoterms and loading ports.

---

## 5. Nuts

_File: `data/commodities.ts` → `nuts`_

- [ ] Raw, processed, or both.
- [ ] **Exact commercial cashew grades offered** (deliberately not
      pre-populated — grade nomenclature is a commercial commitment).
- [ ] Counts / sizes per grade.
- [ ] Moisture and broken/defect tolerances.
- [ ] Packing — tin, vacuum pouch, carton; net weights per unit and per
      container.
- [ ] Origin / processing location.
- [ ] Whether any other tree nuts are to be offered, and when.
- [ ] Minimum order quantity.
- [ ] Incoterms and loading ports.
- [ ] **Larger hero frames for the four commodities.** The supplied 16:9
      frames are 1376x768. The homepage journey renders them full-bleed, so
      at a 1920px viewport a 1376px source is stretched to 1920 CSS px — a
      40% upscale beyond native. Next.js is behaving correctly (it caps at
      the source width and will not invent pixels); the source is simply too
      small for full-bleed use. Supply >=1920px wide, ideally 2560px, for
      coffee, teak, spices and nuts. The 9:16 mobile frames (768x1376) are
      correctly sized and need no change.

- [ ] **A cashew-forward 4:5 tile photograph** to replace
      `public/images/nuts/tile-nuts.jpg`. The platform is cashew-led, but the
      current tile frame contains no cashews at all — only walnuts, almonds
      and hazelnuts — so its alt text cannot honestly describe cashews. The
      16:9 hero frame does show cashews well; only the tile needs replacing.
      Native 928×1152 or larger, so nothing is upscaled.

---

## 6. Trade terms

_Files: `data/commodities.ts`, `data/pages.ts`_

- [ ] Incoterms the company will actually contract on. Until supplied, FOB and
      CIF appear only in an explicitly educational note on `/sourcing-trade`
      and are not presented as an offer.
- [ ] Payment terms accepted (LC at sight, LC usance, TT advance, DP/DA, other).
- [ ] Contract quantity tolerance conventions.
- [ ] Currency/currencies quoted in.
- [ ] Validity period of an offer.
- [ ] Whether any sample or trial-order policy should be published.
- [ ] Claims and arbitration convention referenced in contracts.

> Prices are never to be published. This is a B2B enquiry-led site.

---

## 7. Logistics

_Files: `data/commodities.ts`, `data/pages.ts`_

- [ ] Loading ports used, per commodity.
- [ ] Whether the company arranges freight itself or works through named
      forwarders. (Copy currently says shipment is *arranged and managed with*
      third-party forwarders, carriers and handling agents — confirm this is
      accurate.)
- [ ] Container types and typical loadability per commodity.
- [ ] Typical lead time from contract to loading.
- [ ] Whether any warehousing is genuinely operated or controlled. **No
      warehouse is claimed anywhere on the site today.**
- [ ] Destination markets the company is actually set up to serve. **No country
      or route is claimed today** — the global-trade section is deliberately
      abstract for this reason.

---

## 8. Compliance

_File: `data/compliance.ts` — set `verified: true` only against a checked
certificate_

Verified and published: **CIN**, **GSTIN**.

Pre-wired and switched **off** until a certificate is produced:

- [ ] IEC — Importer Exporter Code (number, date)
- [ ] AD Code registration
- [ ] FSSAI licence (number, category, validity)
- [ ] Coffee Board of India RCMC
- [ ] Spices Board CRES
- [ ] APEDA RCMC
- [ ] ISO 9001
- [ ] HACCP
- [ ] Organic certification
- [ ] Fairtrade
- [ ] Rainforest Alliance
- [ ] FSC
- [ ] PEFC
- [ ] EUDR due-diligence capability
- [ ] CITES (if any listed species is ever handled)

Also required:

- [ ] Which **inspection agencies** are used (e.g. SGS, Bureau Veritas,
      Intertek) and whether they may be named.
- [ ] Which **laboratories** are used for analysis.
- [ ] The standard **shipment document set** issued per consignment.
- [ ] Traceability practice — what is actually recorded and retained.

---

## 8b. Indicative specification tables — REPLACE BEFORE LAUNCH

_File: `data/commodities.ts` → each commodity's `indicativeSpecifications`_

Each commodity page now carries an **indicative** specification table so a
buyer can judge relevance before enquiring. Every one is published industry
reference — Coffee Board grade designations, ISO test methods, FEQ timber
conventions, AFI/CEPCI cashew grades — and every table renders beneath
`indicativeSpecNote`, which states plainly that these are reference
parameters and not stock, an offer, or current availability.

**They are not this company's figures, and must be replaced.** When a value
is confirmed for what AM INDIA can actually supply, put it in
`specifications` (the separate, verified field) — that table renders above
the indicative one and supersedes it. Then delete the corresponding
indicative row.

Confirm and replace, per commodity:

- [ ] **Coffee** — which grade families are actually offered (the table lists
      the full Coffee Board set); the screen sizes genuinely supplied;
      the moisture and defect tolerances contracted to.
- [ ] **Teak** — which forms are handled; real dimension ranges and cutting
      lists; the seasoning actually offered (air- vs kiln-dried, target %);
      the grading standard the company contracts on; the exact legality
      document set issued.
- [ ] **Spices** — **which spices are offered at all.** The table deliberately
      lists the parameter set and ISO methods rather than named spices with
      values, because naming them would be a claim. Once products are
      confirmed, add per-spice values.
- [ ] **Nuts** — which cashew grades are actually offered (the table lists the
      standard commercial set); the moisture and defect tolerances contracted
      to; whether scorched and broken grades are handled.

**Deliberately left out of every table, and still required** — these could
not be stated as market reference without implying a commitment this company
has not made:

- [ ] Packing formats and net weights. Universal market units exist (60 kg
      jute for coffee, 22.68 kg vacuum tin for cashew kernels) but packing is
      a commercial commitment, not a parameter, so no table states one.
- [ ] Origins, volumes, MOQs, prices, loading ports, Incoterms.
- [ ] Any certification. Nothing in these tables asserts one — the ISO and
      AFI references name the METHOD a parameter is measured by, which is not
      a claim to hold a certificate.

---

## 9. Photography

_File: `data/images.ts` — the manifest specifies path, aspect ratio, minimum
resolution and required subject for every slot_

- [ ] Homepage hero — cinematic origin frame (2880×1620 min).
- [ ] Coffee, teak, spices, nuts — one wide journey frame each (2560×1440 min).
- [ ] Coffee, teak, spices, nuts — one vertical tile each (1200×1500 min).
- [ ] Trade documentation / inspection frame (1600×2000 min).
- [ ] Operational base in Tamil Nadu (2000×1333 min) — genuine locations only.
- [ ] Optional: hero video with poster frame.

Direction: macro texture, hands handling product, raw commodities, origin
landscapes, grading and inspection, bags and crates, timber grain, spices in
bulk, cashew processing. **Avoid** stock handshakes, generic cargo-ship heroes,
flag imagery and generic corporate interiors.

Only use photographs of facilities, stock or operations the company genuinely
has rights to and a genuine connection with.

---

## 10. Legal

_Files: `app/privacy/page.tsx`, `app/terms/page.tsx`_

- [ ] **Legal review of the privacy policy.** It currently describes the site
      accurately as built (no analytics or advertising cookies; enquiry
      correspondence only) and **must be revised** when the enquiry form,
      any analytics, or any third-party embed is added.
- [ ] **Legal review of the website terms.** Scope is limited to use of the
      website; they are explicitly not terms of sale.
- [ ] Confirm the data controller identity and any grievance officer or DPO
      contact required under Indian law.
- [ ] Confirm the retention period for enquiry correspondence.
- [ ] Standard terms and conditions of sale, if these should be published or
      offered for download.
- [ ] Confirm whether a cookie banner will be needed — **not required as
      built**, since the site sets no analytics or advertising cookies.

---

## 11. Enquiry form — activation

The form is **built and working**: validated on client and server, anti-spam in
place, and honest about delivery. Only the email provider is missing.

To switch delivery on:

- [ ] Choose a transactional email provider. `lib/email/index.ts` implements
      **Resend** already; any other provider needs one new branch in that file
      and nothing else.
- [ ] Verify a sending domain with the provider (`amglobalcommodities.com`).
- [ ] Set `TRADE_ENQUIRY_FROM` to a verified sender address on that domain.
- [ ] Set `TRADE_ENQUIRY_API_KEY` in the hosting environment (never in the
      repository).
- [ ] Confirm `TRADE_ENQUIRY_TO` — currently defaults to
      `antoniomarcoindia@gmail.com`. Consider a domain mailbox instead.

Delivery goes live the moment those are set. No redeploy of the form is needed.

Still to decide:

- [ ] Should enquiries be copied to a second address?
- [ ] Should an **automated acknowledgement** be sent to the buyer? Not enabled
      by default — the wording would need to avoid promising a response time.
      Hook is `ACKNOWLEDGEMENT_ENABLED` in `lib/email/index.ts`.
- [ ] Should **file attachments** be accepted (specification sheets)? Not
      implemented: uploads will only be enabled once storage, size/type limits
      and scanning are securely in place.
- [ ] Is the current required-field set right? Currently required: commodity,
      destination country, company name, contact name, business email, and
      either an approximate quantity or a description in the message.
