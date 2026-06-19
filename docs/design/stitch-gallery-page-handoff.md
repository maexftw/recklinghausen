# Stitch Gallery Page Direction – RLC 1952

Date: 2026-06-19
Project: `RLC Homepage Redesign`
Stitch project ID: `13132429926733127146`
Generated screen ID: `0418f766938246f2bf39015f44436f65`
Design system asset: `assets/d4c0eb7b935b4ddab87b4e1226242cbb` (`Athletic Pulse`)

## Source of truth

- Repo design spec: `DESIGN.md`
- Stitch screenshot: `docs/design/stitch-gallery-page-screen.png`
- Stitch HTML export: `docs/design/stitch-gallery-page-export.html`
- Current implementation to replace/polish: `pages/gallery.html`

## Verdict

**With adjustments, usable.**

The Stitch direction is materially better than the current gallery page because it establishes a calm editorial hierarchy, a clear hero, curated series, and a structured gallery index instead of a chaotic image wall. It should be treated as visual reference, not code to paste blindly.

## What to keep from Stitch

- Editorial left-aligned hero: "Bilder aus Training, Wettkampf und Vereinsleben."
- Controlled hero collage / large visual anchor.
- Metadata strip for `4 Bildwelten`, `2025/2026`, `Training · Wettkampf · Verein`.
- Featured section with one large Abendlauf card plus smaller supporting series.
- Calm gallery index with category chips.
- Specific closing CTA: "Du möchtest Training live erleben?"

## What must be fixed when porting

- Header/logo scale and spacing must match the live site shell, not the tiny Stitch header.
- Replace stock-looking imagery with real RLC images already in the repo where possible.
- Preserve current route semantics and shared shell: no new JS app, no generated router.
- Do not import Stitch code blindly. Rebuild the visual structure in the existing static HTML/CSS system.
- Keep mobile as a first-class layout, not a collapsed desktop afterthought.
- Keep links real:
  - Training: `training.html`
  - Termine: `events.html`
  - Kontakt: `contact.html#contact`
  - Abendlauf: `abendlauf.html`

## Implementation plan

1. Use `DESIGN.md` and the Stitch screenshot as the gallery target.
2. Replace `pages/gallery.html` structure with:
   - editorial hero
   - featured series layout
   - structured gallery index
   - concrete CTA
3. Add/adjust only gallery-specific CSS in `assets/css/subpages.css`.
4. Use existing repo images first:
   - `assets/images/abendlauf-2025/*`
   - `assets/images/rlc-training-action.jpg`
   - `assets/images/rlc-team-nachwuchs.jpg`
   - `assets/images/rlc-hero-stadion.jpg`
5. Verify via local Wrangler preview, desktop/mobile GStack Browse, design review, and Cloudflare preview.

## Implementation status

Ported into the existing static site instead of copying Stitch code directly.

Changed files:

- `pages/gallery.html`
- `assets/css/subpages.css`

Local verification artifacts:

- Desktop hero: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-desktop-bgfix.png`
- Desktop series: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-desktop-series-final.png`
- Desktop index: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-desktop-index-final.png`
- Mobile hero: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-mobile-final.png`
- Mobile series: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-mobile-series-final.png`
- Mobile index: `.gstack/design-reports/gallery-stitch-port-20260619-105200/screenshots/gallery-stitch-mobile-index-final.png`

Notes:

- Hero/series/index image surfaces are rendered via CSS background images for stable crops while keeping `<img>` elements in the DOM for loading/alt context.
- The only local console warning observed is the existing Tailwind CDN production warning.
