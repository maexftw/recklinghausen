# RLC Subpage Alignment Handoff

## Source of truth

The Stitch-ported Bilder/Gallery page is the visual baseline for the RLC subpages.

Reference route:

- `pages/gallery.html`
- Preview path: `/pages/gallery`

Reference principles:

- editorial hero rhythm
- Lexend display typography
- strong but not overloaded Club Blue accents
- green as athletic label/kicker accent
- tighter section rhythm: about 32px desktop, 16px mobile between major blocks
- calm rounded surfaces, light borders, controlled shadows
- mobile layouts must be designed, not only stacked desktop remnants

## Customer/task-list design note

The customer-facing task list names the blue design line as a carried-through design decision. `DESIGN.md` now reflects that:

- Primary: Club Blue `#20488E`
- Deep Navy `#10284F`
- Secondary sport accent: Track Green `#006860`
- Podium Gold remains a sparse highlight color

## Changed approach

This pass does **not** rebuild every subpage as a bespoke Stitch page. It applies a shared CSS baseline so the existing subpages inherit the Gallery rhythm while preserving their current content and behavior.

Changed files in this pass:

- `DESIGN.md`
- `assets/css/subpages.css`
- main subpage font links in `pages/*.html`

## Local verification artifacts

Report directory:

- `.gstack/design-reports/subpage-gallery-alignment-20260619-115415/`

Key screenshots:

- Desktop before: `screenshots/contact-sheet-desktop.jpg`
- Mobile before: `screenshots/contact-sheet-mobile.jpg`
- Desktop final local: `screenshots/contact-sheet-desktop-final-local.jpg`
- Mobile final local: `screenshots/contact-sheet-mobile-final-local.jpg`

Metrics after local pass:

- Gallery stays unchanged.
- Main subpages now use Lexend for H1/section headings.
- Main subpage hero-to-next-section gap is aligned to Gallery rhythm: about `32px` desktop and `16px` mobile.
- Primary buttons use Club Blue.
- Secondary buttons remain light/quiet.
- No horizontal overflow was measured on the checked pages.

## Checked pages

- `/pages/gallery`
- `/pages/news`
- `/pages/events`
- `/pages/training`
- `/pages/team`
- `/pages/facilities`
- `/pages/contact`
- `/pages/sponsors`
- `/pages/abendlauf`

## Remaining polish candidates

- Training and Abendlauf mobile heros are still long because they contain many meta fields, multiple CTAs, and imagery. They are readable, but they can be shortened in a later page-specific pass if desired.
- News detail pages may still need a separate detail-template typography pass. The current pass focused on the main subpages.
- Tailwind CDN warning is pre-existing technical debt and was not introduced by this alignment pass.
