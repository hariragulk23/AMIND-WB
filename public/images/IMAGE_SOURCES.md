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

| File | Used by | Intrinsic | Ratio | On disk | Shows |
| --- | --- | --- | --- | --- | --- |
| `coffee/hero-coffee.jpg` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | 126 KB | Ripe coffee cherries on the branch |
| `coffee/hero-coffee-mobile.jpg` | Homepage journey, phones | 768×1376 | 9:16 | 125 KB | Same scene, portrait crop |
| `coffee/tile-coffee.jpg` | Commodity grid | 928×1152 | 4:5 | 183 KB | Green coffee beans in an open jute sack |
| `teak/hero-teak.jpg` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | 295 KB | Squared teak logs stacked end-on |
| `teak/hero-teak-mobile.jpg` | Homepage journey, phones | 768×1376 | 9:16 | 301 KB | Same scene, portrait crop |
| `teak/tile-teak.jpg` | Commodity grid | 928×1152 | 4:5 | 154 KB | Sawn teak billets stacked, end grain out |
| `spices/hero-spices.jpg` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | 221 KB | Black pepper, star anise, cardamom, dried chilli |
| `spices/hero-spices-mobile.jpg` | Homepage journey, phones | 768×1376 | 9:16 | 289 KB | Same scene, portrait crop |
| `spices/tile-spices.jpg` | Commodity grid | 928×1152 | 4:5 | 111 KB | Heaps of peppercorns, dried chillies, turmeric |
| `nuts/hero-nuts.jpg` | Homepage journey, tablet + desktop | 1376×768 | 16:9 | 313 KB | Cashews, almonds, pistachios, walnuts in bulk |
| `nuts/hero-nuts-mobile.jpg` | Homepage journey, phones | 768×1376 | 9:16 | 292 KB | Same scene, portrait crop |
| `nuts/tile-nuts.jpg` | Commodity grid | 928×1152 | 4:5 | 162 KB | A cloth sack spilling mixed nuts |

### Two notes on how these are delivered

**Art direction, not scaling.** The hero frames are two genuinely different
crops. `<Media>` renders a real `<picture>` with a `(min-width: 768px)` media
query, so a phone downloads only the portrait file. Scaling the landscape file
down to a 9:16 box would destroy the composition, so it is never done.

**Source format is JPEG; delivered format is not.** The sources are stored as
high-quality JPEG (mozjpeg, quality 90, 4:4:4 chroma — no chroma subsampling, so
the saturated reds and greens stay clean). They are deliberately *not*
pre-converted to AVIF or WebP: Next.js negotiates the modern format per request
and resizes to the breakpoint, so a full homepage — all four hero frames and all
four tiles — transfers around **0.29 MB** in total. The source format affects
repository weight and build time only, never what a visitor downloads.

### Filename and format history

These arrived named `hero-coffee.jpg.png` and so on — a double extension, with
PNG being the true format. They were renamed with `git mv` to drop the
misleading `.jpg`.

They were later re-exported in place as JPEG, which took the twelve files from
**21.6 MB to 2.5 MB — a 19.1 MB saving** — with no visible difference and no
change to the delivered pipeline. The largest source file is now 313 KB, so
none exceeds the 600 KB source budget. Referenced paths in `data/images.ts`
match the files on disk exactly.

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
| `trade/trade-documentation.jpg` | Documentation, inspection notes or a sample tray |
| `company/operational-base.jpg` | Genuine locations only — never a stock office interior |

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
