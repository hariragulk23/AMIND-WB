# AM INDIA

Website for **AM INDIA**, the international trading identity of
**Antonio Marco Exports and Trade Private Limited** (Tamil Nadu, India).

A premium B2B corporate, sourcing, import–export and commodity-trading site.
It is **not** an ecommerce store: there is no cart, no checkout and no
published pricing. The single conversion is **Start a Trade Enquiry**.

Canonical domain: `https://amglobalcommodities.com`

---

## Status

| Area | State |
| --- | --- |
| Design system, tokens, typography | Complete |
| Centralised company / commodity / compliance data | Complete |
| Header, full-screen mobile menu, footer | Complete |
| **Homepage (8 sections)** | **Complete** |
| Commodity page template + 4 commodity pages | Complete (awaiting commercial data) |
| `/commodities`, `/sourcing-trade`, `/about`, `/quality-compliance` | Complete (awaiting commercial data) |
| `/contact` | **Trade enquiry form complete** — validated, anti-spam, delivery-aware. Provider not yet connected |
| `/privacy`, `/terms` | Drafted — **require legal review before launch** |
| SEO: metadata, canonicals, OG, sitemap, robots, JSON-LD | Complete |
| Photography | Not yet supplied — see `data/images.ts` |

Everything still needed from the business is listed in
[`CONTENT_REQUIRED.md`](./CONTENT_REQUIRED.md).

---

## Tech

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**, strict
- **Tailwind CSS 4** (CSS-first config — no `tailwind.config.js`)
- **GSAP 3** + **ScrollTrigger**, driven through **`@gsap/react`'s `useGSAP()`**
- No CMS, no UI kit, no page builder, and **no smooth-scroll library** —
  scrolling is native.

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Run `npm run lint && npm run typecheck && npm run build` before committing.

---

## Project structure

```
app/                      Routes (App Router). Server Components by default.
  layout.tsx              Fonts, design tokens, header/footer, Organization + WebSite JSON-LD
  page.tsx                Homepage — composes the eight sections
  commodities/            Index + [slug] template
  sourcing-trade/ about/ quality-compliance/ contact/ privacy/ terms/
  robots.ts sitemap.ts not-found.tsx
  globals.css             ★ Design tokens, type scale, base layer, utilities

components/
  animation/              useGSAP wrappers: Reveal, DisplayReveal, Parallax,
                          ScrollCue, MotionRoot (global ScrollTrigger config)
  layout/                 SiteHeader, MobileMenu, SiteFooter, Logo, PageHero
  sections/home/          The eight homepage sections, one file each
  sections/               EnquiryBanner (shared conversion block)
  commodities/            CommodityDetail — the reusable commodity page body
  ui/                     Container, CtaLink, Media, SectionLabel, JsonLd

data/                     ★ ALL editable content lives here
  company.ts              Corporate facts — the single source of truth
  commodities.ts          Commodity content model + the four platforms
  compliance.ts           Registrations/certificates switchboard + trust signals
  navigation.ts           Header, footer and legal navigation
  images.ts               Image manifest (paths, ratios, resolutions, subjects)
  home.ts                 Homepage copy
  pages.ts                Copy for the inner corporate pages

lib/
  motion.ts               GSAP registration, easings, durations, reduced-motion
  seo.ts                  Metadata builder + absolute URLs
  structured-data.ts      Organization / WebSite / BreadcrumbList JSON-LD
  utils.ts                cn()

public/
  images/                 Drop real photography here (see the manifest)
  textures/grain.svg      Tiling film grain used over dark sections
```

**No component hard-codes company information.** If you find an address, a
registration number, an email or a phone number written inside a component,
that is a bug — it belongs in `data/company.ts`.

---

## Where things are stored

### Company details

`data/company.ts` — brand and legal names, registered office, CIN, GSTIN,
email, phone, incorporation date, directors, corporate structure. Editing a
value here updates the footer, contact page, about page, trust section and the
JSON-LD structured data at once.

Shareholding percentages must never be published. PAN and TAN are never
displayed.

### Commodity data

`data/commodities.ts`. Identity fields (`slug`, `name`, `summary`,
`description`, `buyerSegments`, …) are required; **every commercial field is
optional and currently unset**.

The page template renders a section only when its data exists — an absent
field simply does not appear. Never fill one in with a guess: grades, origins,
MOQs, Incoterms, ports, moisture limits and certifications are commercial
statements.

### Compliance and certificates

`data/compliance.ts`. Each record carries `verified: boolean`, and **only
`verified: true` records are ever rendered**. IEC, FSSAI, Coffee Board RCMC,
Spices Board CRES, APEDA RCMC, ISO 9001, HACCP, Organic, Fairtrade, Rainforest
Alliance, FSC, PEFC, EUDR and CITES are all pre-wired and switched off.

---

## How to…

### …replace an image

1. Open `data/images.ts` and find the slot (each entry documents the exact
   path, aspect ratio, minimum resolution and required subject).
2. Save the file at exactly that path under `public/`. AVIF or WebP preferred.
3. Set `available: true` and refine `alt` to describe the real photograph.

The `<Media>` component reserves the manifest's aspect ratio whether or not
the asset exists, so activating one causes **no layout shift**. Until then it
paints a tonal ground — visitors never see placeholder text.

`public/images/README.md` contains the same manifest as a photographer's brief.

### …add a commodity

1. Append an entry to `commodities` in `data/commodities.ts` with a unique
   `slug`.
2. Add its `journeyImage` and `tileImage` slots to `data/images.ts`.
3. Add the child link to `primaryNav` and `footerNav` in `data/navigation.ts`.

The homepage journey, the homepage grid, `/commodities`, the static params for
`/commodities/[slug]` and the sitemap all derive from that array
automatically.

### …add a certificate

1. Verify the certificate exists and is current. **Do not skip this.**
2. In `data/compliance.ts`, set `verified: true` on its record and fill
   `number` / `validUntil` if they should be published.

It then appears on `/quality-compliance` and in the homepage trust section with
no code change. For a certificate not already listed, add a new record in the
appropriate category.

### …configure the trade enquiry email

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `TRADE_ENQUIRY_TO` | Destination inbox. Defaults to `antoniomarcoindia@gmail.com`. |
| `TRADE_ENQUIRY_FROM` | Sender address. **Must be verified with the provider.** |
| `TRADE_ENQUIRY_API_KEY` | Provider API key. |
| `TRADE_ENQUIRY_API_URL` | Optional. Overrides the endpoint (testing, or a regional endpoint). |

All are read **server-side only** — none has a `NEXT_PUBLIC_` prefix, and
`lib/email/index.ts` starts with `import "server-only"`, which makes it a build
error to pull the key into a Client Component. No secrets are committed;
`.env*` is git-ignored apart from `.env.example`.

**Delivery is live as soon as `TRADE_ENQUIRY_FROM` and `TRADE_ENQUIRY_API_KEY`
are both set.** No code change and no redeploy of the form is needed —
`/contact` is rendered per request, so it picks the configuration up
immediately.

Until then the site is honest about it: `/contact` shows a notice pointing at
direct email and phone *before* the form, and a submitted enquiry ends in a
"could not be sent" state rather than a false confirmation. The full enquiry is
written to the server log in that case, so nothing submitted during the gap is
lost.

### …deploy

The site is fully static apart from future form handling, so any Node host
works. Vercel is the path of least resistance:

1. Push the branch and import the repository.
2. Set the environment variables from `.env.example` in the project settings.
3. Add `amglobalcommodities.com` as the production domain.
4. Build command `npm run build`, output handled by the Next.js adapter.

Confirm after the first deploy that `https://amglobalcommodities.com/robots.txt`
and `/sitemap.xml` resolve, and that canonical URLs use the apex domain.

---

## The trade enquiry

`/contact` is the site's only conversion. The pieces:

| File | Role |
| --- | --- |
| `data/enquiry.ts` | Field options, section headings, copy |
| `lib/enquiry.ts` | Validation, sanitisation, anti-spam — the single definition of a valid enquiry |
| `app/contact/actions.ts` | Server Action: re-validates, builds, delivers |
| `lib/email/message.ts` | Builds the notification (subject, text and HTML parts) |
| `lib/email/index.ts` | Provider abstraction and delivery status |
| `components/enquiry/` | The form and its field primitives |

Things worth knowing before changing it:

- **The form works without JavaScript.** It is a Server Action on a plain
  `<form>`; JavaScript adds the pending state, focus management and the
  conditional required-field logic, but gates nothing. Verified in a browser
  with scripting disabled, including delivery.
- **Validation runs twice.** The client's checks are a convenience; the server
  re-validates every field, constrains every select to its allowed values, caps
  every length and strips control characters. Nothing the browser sends is
  trusted.
- **A validation error must not clear the form.** React resets an uncontrolled
  form once its action resolves, so the server echoes the sanitised values back
  and they are re-applied as `defaultValue`. Assuming DOM values simply persist
  is wrong — it was caught in a browser, not in review.
- **The UI never claims an email was sent unless it was.** `deliver()` returns
  `sent` / `not-configured` / `failed`, and the three states render
  differently. Keep it that way.
- **Anti-spam is a honeypot plus a minimum completion time**, both
  non-intrusive. There is no CAPTCHA: it would add friction and a third-party
  dependency to the only conversion on the site. Automated submissions get the
  ordinary acceptance response so a bot learns nothing.
- **An acknowledgement email to the buyer is deliberately not enabled.** The
  hook is in `lib/email/index.ts` (`ACKNOWLEDGEMENT_ENABLED`). What it should
  say — and whether it implies a response time — is a commercial decision.

## Design system

All tokens live at the top of `app/globals.css` and are exposed to Tailwind
through `@theme inline`. **Change a brand colour in one place and it changes
everywhere.**

| Token | Value | Use |
| --- | --- | --- |
| `--am-ink` | `#0e0f0d` | Primary dark ground |
| `--am-paper` | `#f4f1ea` | Primary light ground |
| `--am-forest` / `--am-forest-deep` | `#1f3a2e` / `#14261e` | Botanical green |
| `--am-brass` | `#b08a4f` | Accent on **dark** grounds (6.0:1 on ink) |
| `--am-brass-deep` | `#7a5c28` | Accent on **light** grounds (5.5:1 on paper) |

Body/heading pairs (`--am-text-on-dark`, `--am-text-on-light` and their muted
variants) are all at least 6.4:1 — comfortably past WCAG AA. Brass is
deliberately split into two tones because the lighter one does **not** pass on
paper.

> The palette is a **restrained temporary system**. It must be re-derived from
> the official Antonio Marco logo before launch. The logo itself is not
> yet supplied — `components/layout/Logo.tsx` currently renders a typographic
> wordmark and documents how to swap in the real asset. Never recolour or
> distort the supplied logo.

**Typography** — `Instrument Serif` for oversized editorial display, and
`Instrument Sans` for UI and body. Both are loaded and self-hosted by
`next/font`, so there is no external request and no swap-induced layout shift.
Sizes are `clamp()`-based utilities (`display-hero`, `display-xl`,
`display-lg`, `display-md`, `label-xs`, `label-sm`, `body-lg`).

### One Tailwind 4 gotcha worth knowing

Custom `@utility` rules are emitted **after** Tailwind's core utilities in the
same layer, so a custom utility that sets a property core utilities also set
will win. Concretely: do not give a custom utility a `position`, or it will
override `fixed`/`absolute`/`sticky` on any element that uses both. Likewise,
base element styles must sit inside `@layer base` — unlayered CSS outranks
every layered rule, and an unlayered `a { color: inherit }` silently defeats
every text-colour utility on the site.

---

## Animation

Built on `useGSAP()` from `@gsap/react`, which reverts every tween and
ScrollTrigger created in its scope on unmount — so animations behave correctly
across client-side route changes and leave nothing behind.

Principles applied throughout:

- Only `transform`, `opacity` and `clip-path` are animated.
- Content is server-rendered in its **final, visible** state; the pre-animation
  state is applied inside `useGSAP` (a layout effect, before paint). With
  JavaScript disabled, every page is complete and simply static.
- `prefers-reduced-motion` is honoured **in JavaScript**, not only in CSS:
  timelines are not built at all, scrubbing is disabled, and all content
  renders normally.
- **No `pin`.** The homepage's cinematic commodity section holds its media
  stage with native CSS `position: sticky` and crossfades layers with GSAP.
  Pin-spacers plus a collapsing mobile URL bar are the classic cause of jumpy
  scroll sections on Android; sticky avoids the whole problem.
- `ScrollTrigger.config({ ignoreMobileResize: true })` is set globally in
  `components/animation/MotionRoot.tsx` for the same reason.
- Scroll is never hijacked. There is no Lenis and no smooth-scroll library.

---

## Accessibility

Semantic landmarks and heading order, a skip link, visible focus rings on every
interactive element, labelled sections, meaningful `alt` text driven from the
image manifest, decorative graphics hidden from assistive technology, a focus
trap and Escape handling on the mobile menu, and AA-or-better contrast
throughout.

Verified in-browser: no headings or paragraphs sit at zero opacity with
JavaScript disabled or with reduced motion enabled, and there is no horizontal
overflow at 390, 430, 768 or 1440 px.
