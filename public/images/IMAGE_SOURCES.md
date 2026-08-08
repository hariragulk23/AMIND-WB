# Image sources

Provenance record for every photograph used on this site.

**Status: no photography is present yet.** The four commodity images below are
the site's most important visual assets and are currently the only thing
standing between the homepage and completion.

They could not be obtained in the build environment this project was developed
in: outbound network access is restricted to an allowlist, and every stock
photography host — `unsplash.com`, `images.unsplash.com`, `pexels.com`,
`upload.wikimedia.org`, `commons.wikimedia.org` — is blocked at the proxy
(HTTP 403 on CONNECT). Rather than leave the sections filled with gradients and
call them finished, the exact requirement for each asset is recorded here.

---

## Required — the four commodity photographs

Drop each file at the path shown, then set `available: true` on the matching
entries in `data/images.ts` (each photograph is used by two entries: the
full-bleed `journey-*` slot and the `tile-*` slot).

| Path | Commodity | Min. resolution | Must show | Must not show |
| --- | --- | --- | --- | --- |
| `public/images/commodities/coffee.webp` | Coffee | 2400×1350 or larger | Green coffee beans in bulk, coffee cherries, drying beds, jute bags of green coffee, hands grading or inspecting green coffee | Latte art, cups, cafés, espresso lifestyle, retail coffee packaging |
| `public/images/commodities/teak.webp` | Teak | 2400×1350 or larger | Teak logs, sawn timber, stacked boards, timber grain, timber being measured or inspected in a yard | Finished furniture as the primary subject, interiors, showrooms |
| `public/images/commodities/spices.webp` | Spices | 2400×1350 or larger | Black pepper, cardamom, turmeric, dried chilli, cinnamon or cloves in bulk — sacks, heaps, grading trays | Plated meals, restaurant food, kitchen flat-lays, consumer spice jars |
| `public/images/commodities/nuts.webp` | Nuts (cashew-led) | 2400×1350 or larger | Raw cashew or graded kernels in bulk, sorting and grading, sacks or crates | Snack bowls, gift packs, consumer nut packaging |

Framing notes that apply to all four:

- The composition is cropped to **16:9** full-bleed on the homepage and to
  **4:5** in the commodity grid, so keep the subject away from the extreme
  edges and leave some quieter area in the lower third — headings and the
  Explore link sit there over a scrim.
- Shoot or select for **texture**. These are raw commodities; the photograph
  should read as material, not as a styled product shot.
- WebP or AVIF preferred. JPEG is accepted — Next.js re-encodes on request.

## Required — the official logo

| Path | Notes |
| --- | --- |
| `public/brand/antonio-marco-logo-original.png` | The supplied artwork, preserved untouched |
| `public/brand/antonio-marco-logo.webp` | Optimised derivative, visually identical |

Then set `available: true` in `data/brand.ts`. The header and footer switch
from the typographic lockup to the real artwork automatically. Trimming excess
empty canvas around the mark is fine; cropping any bar, letter or rule is not.

## Optional

| Path | Used by | Notes |
| --- | --- | --- |
| `public/images/origin/hero-origin.webp` | Homepage hero | Not currently rendered — the hero is a typographic composition on the light canvas |
| `public/images/trade/trade-documentation.webp` | Reserved | Documentation, inspection notes or a sample tray |
| `public/images/company/operational-base.webp` | Reserved | Genuine locations only — never a stock office interior |

---

## Provenance log

Complete one row per image as it is added. Anything used temporarily must be
recorded here so it can be found and replaced before launch.

| File | Source | Source URL | Photographer / attribution | Licence | Temporary? |
| --- | --- | --- | --- | --- | --- |
| _(none yet)_ | | | | | |

Rules for temporary staging imagery:

- Royalty-free only — Unsplash, Pexels, or Wikimedia Commons where the licence
  permits commercial use. Download into the repository; never hotlink.
- No watermarks, no visible competitor branding, no imagery whose licence
  cannot be evidenced.
- Every temporary image must be marked `Temporary? = yes` and replaced with the
  company's own photography before public launch.
