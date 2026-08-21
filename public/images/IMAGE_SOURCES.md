# Image sources

Provenance record for every photograph and brand asset used on this site.

**Status: all commodity photography and the logo are in place.**

The single source of truth for paths, dimensions, crops and alt text is
`data/images.ts`. No component hard-codes an image path. This file is the
human-readable companion: what each asset is, where it came from, and the
constraints it has to satisfy.

---

## Commodity photography — SUPPLIED AND LIVE

Each commodity ships as three files: a landscape hero frame, a portrait hero
frame for phones, and a studio tile.

| File | Used by | Intrinsic | Ratio | Shows |
| --- | --- | --- | --- | --- |
| `coffee/hero-coffee.png` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | Ripe coffee cherries on the branch |
| `coffee/hero-coffee-mobile.png` | Homepage journey, phones | 768×1376 | 9:16 | Same scene, portrait crop |
| `coffee/tile-coffee.png` | Commodity grid | 928×1152 | 4:5 | Green coffee beans in an open jute sack |
| `teak/hero-teak.png` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | Squared teak logs stacked end-on |
| `teak/hero-teak-mobile.png` | Homepage journey, phones | 768×1376 | 9:16 | Same scene, portrait crop |
| `teak/tile-teak.png` | Commodity grid | 928×1152 | 4:5 | Sawn teak billets stacked, end grain out |
| `spices/hero-spices.png` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | Black pepper, star anise, cardamom, dried chilli |
| `spices/hero-spices-mobile.png` | Homepage journey, phones | 768×1376 | 9:16 | Same scene, portrait crop |
| `spices/tile-spices.png` | Commodity grid | 928×1152 | 4:5 | Heaps of peppercorns, dried chillies, turmeric |
| `nuts/hero-nuts.png` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | Cashews, almonds, pistachios, walnuts in bulk |
| `nuts/hero-nuts-mobile.png` | Homepage journey, phones | 768×1376 | 9:16 | Same scene, portrait crop |
| `nuts/tile-nuts.png` | Commodity grid | 928×1152 | 4:5 | A cloth sack spilling mixed nuts |

### Two notes on how these are delivered

**Art direction, not scaling.** The hero frames are two genuinely different
crops. `<Media>` renders a real `<picture>` with a `(min-width: 768px)` media
query, so a phone downloads only the portrait file. Scaling the landscape file
down to a 9:16 box would destroy the composition, so it is never done.

**Source format is PNG; delivered format is not.** The files were supplied as
PNG, which is why they are 1.2–2.7 MB each on disk. They are deliberately not
pre-converted: Next.js negotiates AVIF or WebP per request and resizes to the
breakpoint, so a full homepage — all four hero frames and all four tiles —
transfers around **0.4 MB** in total. The source size affects repository weight
and build time only.

If repository size becomes a concern, re-exporting the sources as high-quality
JPEG or WebP would cut roughly 20 MB with no visible difference. It would not
change what visitors download.

### Filename note

These arrived named `hero-coffee.jpg.png` and so on — a double extension, with
PNG being the true format. They were renamed with `git mv` to drop the
misleading `.jpg`, so history follows the files. Referenced paths in
`data/images.ts` match the files on disk exactly.

---

## The official logo — SUPPLIED AND LIVE

| Path | Notes |
| --- | --- |
| `../brand/antonio-marco-logo-original.png` | Supplied artwork, preserved untouched — 1774×887, 829 KB |
| `../brand/antonio-marco-logo.webp` | Derivative the site renders — 1567×365, 74 KB |

Two things were done to produce the derivative, neither of which alters the
mark: the empty canvas was trimmed to the artwork plus 7% brand safe space, and
the flat white backdrop was lifted to transparency with a soft edge so the
antialiasing survives. No bar, letterform, proportion or colour was changed.

Because the artwork's lettering is brown and navy it needs a light ground. The
footer places it on a light panel rather than inverting it — a supplied logo is
never recoloured to suit a background.

---

## Reserved slots

Declared in `data/images.ts` with `available: false`, so the layout and the
photography brief stay in one place. Nothing is requested for them and no
broken image request is ever made.

| Path | Notes |
| --- | --- |
| `trade/trade-documentation.png` | Documentation, inspection notes or a sample tray |
| `company/operational-base.png` | Genuine locations only — never a stock office interior |

Also outstanding: **`brand/og-card.png`** (1200×630), the social share card.
See the `TODO(og-card)` comment in `app/layout.tsx`. No `og:image` is emitted
until it exists.

---

## Provenance log

| File | Source | Photographer / attribution | Licence | Temporary? |
| --- | --- | --- | --- | --- |
| `brand/antonio-marco-logo-original.png` | Supplied by the company | Antonio Marco Exports and Trade Private Limited | Company's own mark | No |
| `brand/antonio-marco-logo.webp` | Derived from the above | — | Company's own mark | No |
| All twelve commodity files above | Supplied by the company | To be confirmed | To be confirmed | To be confirmed |

**Action required:** confirm the source and licence of the twelve commodity
images and complete the last row. If any of them is temporary staging imagery
rather than the company's own, mark it so it can be found and replaced before
public launch.
