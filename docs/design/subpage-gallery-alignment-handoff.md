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

## Component-level detail polish update

Customer screenshot feedback exposed a review gap: broad contact sheets showed the subpages as directionally aligned, but the Training hero content block still had cramped internal rhythm.

Fixed in the follow-up detail pass:

- Added a final hero detail polish CSS block for non-gallery subpages.
- Reduced long subpage H1 scale slightly while preserving the Gallery-inspired editorial look.
- Separated hero zones more clearly: eyebrow, H1, lead, meta row, actions.
- Fixed Training meta layout so 4 facts no longer render as an awkward 3+1 layout.
- Made mobile meta rows compact but not cramped via auto-fit columns.
- Shortened mobile visual areas for Training and Abendlauf.
- Removed heavy Stats hero point/checklist load from the hero; Stats now uses a lighter H1 and hides its long aside on mobile.
- Bumped every `subpages.css` reference to `?v=9` and replaced old Montserrat page links with Lexend so all generated/news detail subpages receive the same baseline.

Verification report:

- `.gstack/design-reports/subpage-hero-detail-polish-20260619-124151/`

## Remaining polish candidates

- `training` and `abendlauf` remain information-rich on mobile, but their hero internals are no longer visibly broken or compressed.
- Abendlauf has lower-page image/detail placeholders that should be reviewed in a later page-specific polish pass.
- News detail pages now inherit the updated CSS/font baseline, but they were not individually redesigned in this pass.
- Tailwind CDN warning is pre-existing technical debt and was not introduced by this alignment pass.
