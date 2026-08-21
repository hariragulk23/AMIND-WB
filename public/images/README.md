# Photography brief — AM INDIA

This directory is where real photography goes. **No external stock-photo URLs
are embedded anywhere in the project**, and nothing here is required for the
site to build or render: until an asset exists, its slot paints a tonal ground
of exactly the same dimensions, so dropping in the real file causes no layout
shift.

The machine-readable version of this brief — and the switch that activates each
asset — is `data/images.ts`.

## Activating an asset

1. Save the file at exactly the path below (AVIF or WebP preferred, JPG fine).
2. In `data/images.ts`, set `available: true` on that entry.
3. Refine its `alt` text to describe the delivered photograph.

## Slots

| Path | Section | Ratio | Min. resolution | Subject |
| --- | --- | --- | --- | --- |
| `origin/hero-origin.webp` | Homepage hero | 16:9 | 2880×1620 | Cinematic wide origin frame — raw commodity in bulk or an origin landscape at low light. Dark, atmospheric. |
| `coffee/journey-coffee.webp` | Homepage journey | 16:9 | 2560×1440 | Macro of green coffee in bulk, or hands grading over a tray. |
| `teak/journey-teak.webp` | Homepage journey | 16:9 | 2560×1440 | Macro of sawn teak end-grain, or stacked sawn timber in a yard. |
| `spices/journey-spices.webp` | Homepage journey | 16:9 | 2560×1440 | Spices in bulk shot as texture, not as a styled kitchen scene. |
| `nuts/journey-nuts.webp` | Homepage journey | 16:9 | 2560×1440 | Cashew kernels in bulk, or grading/sorting at a processing facility. |
| `coffee/tile-coffee.webp` | Commodity tile | 4:5 | 1200×1500 | Vertical crop — beans in a jute bag or a grading tray. |
| `teak/tile-teak.webp` | Commodity tile | 4:5 | 1200×1500 | Vertical crop — a stack of boards or a single sawn face. |
| `spices/tile-spices.webp` | Commodity tile | 4:5 | 1200×1500 | Vertical crop — a single spice in bulk, as texture. |
| `nuts/tile-nuts.webp` | Commodity tile | 4:5 | 1200×1500 | Vertical crop — graded, sorted cashew kernels. |
| `trade/trade-documentation.webp` | Homepage / trade | 4:5 | 1600×2000 | Close frame of trade documentation, inspection notes or a sample tray. Hands acceptable. |
| `company/operational-base.webp` | Company | 3:2 | 2000×1333 | Honest frame of the operational base in Tamil Nadu. Genuine locations only. |

## Direction

**Favour:** macro texture · hands handling product · raw commodities · origin
landscapes · grading and inspection · bags and crates · timber grain · spices in
bulk · cashew processing.

**Avoid:** stock handshakes · generic cargo-ship heroes · flag imagery · generic
corporate interiors · anything that could not honestly be connected to this
company.
