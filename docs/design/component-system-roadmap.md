# RLC Component System Roadmap

## Why this exists

The RLC website should not be redesigned passage by passage. The site needs a reusable component system with documented rules, variants, responsive behavior, and review gates.

The Stitch-ported `pages/gallery.html` page remains the visual quality baseline. Future pages and sections should be assembled from reusable components whose spacing, typography, color behavior, and mobile layouts are already proven.

## Current state

The project currently has partial reuse:

- `assets/js/components.js` injects shared header and footer.
- `assets/css/subpages.css` contains reusable class families such as:
  - `subpage-intro`
  - `subpage-intro__content`
  - `subpage-meta-row`
  - `subpage-actions`
  - `subpage-panel`
  - `subpage-surface`
  - `subpage-card-grid`
  - `gallery-hero`
- Many pages copy similar HTML structures manually.

This is not yet a true component system because:

- component contracts are not documented;
- variants are implicit, not named;
- responsive rules are spread through CSS overrides;
- QA has been page-level first, component-level second;
- generated/news detail pages can drift unless CSS/version/font references stay synchronized.

## Target operating model

Build pages from named components, not from fresh layout decisions.

Each component must define:

1. Purpose: what job this component has.
2. Allowed content: title length, number of meta items, CTA count, image requirements.
3. Variants: e.g. hero with image, hero without image, compact hero, data-heavy hero.
4. Responsive behavior: desktop, tablet, mobile.
5. Spacing contract: internal gaps, padding, margins to the next section.
6. Color contract: blue/green/gold usage rules.
7. QA gate: screenshots and bounding-box metrics that must pass before the component is considered safe.

## Core components to formalize first

### 1. Page Hero

Base class family:

- `subpage-intro`
- `subpage-intro__content`
- `subpage-display`
- `subpage-lead`
- `subpage-meta-row`
- `subpage-actions`
- optional `subpage-intro__visual`
- optional `subpage-intro__aside`

Required variants:

- `hero-editorial`: strong visual, page-defining section. Gallery is the reference.
- `hero-standard`: normal subpage hero with title, lead, meta, actions.
- `hero-visual`: text plus image.
- `hero-data-heavy`: for pages like Training/Abendlauf with 4 meta items and 3 actions.
- `hero-compact`: for legal/contact/archive/detail pages.

Rules:

- Do not create ad-hoc hero spacing per page unless a new variant is named.
- 4 meta facts must render as 2x2 or an intentional responsive grid, never accidental 3+1.
- Actions must be a distinct zone, not visually glued to meta content.
- Mobile hero height should be measured, not guessed.

QA gate:

- isolate hero in desktop and mobile screenshots;
- measure eyebrow → H1, H1 → lead, lead → meta, meta → actions;
- verify no meta item wraps into a visually broken row;
- verify CTA hierarchy: primary, secondary, tertiary.

### 2. Meta Row

Base class:

- `subpage-meta-row`
- `subpage-meta`

Variants:

- `meta-row-2`
- `meta-row-3`
- `meta-row-4`
- `meta-row-compact`

Rules:

- Each meta item must have equal visual weight.
- Long German values must wrap inside their own cell.
- Icons are optional; text hierarchy must work without relying on icons.
- Mobile may use 2 columns when labels are short enough, otherwise 1 column.

QA gate:

- compare actual item count to grid behavior;
- no orphan item in a 3+1 layout unless intentionally documented;
- no horizontal overflow;
- label/value hierarchy remains readable at 390px width.

### 3. CTA Group

Base class:

- `subpage-actions`
- `subpage-button`
- `subpage-button--secondary`
- `subpage-link`

Variants:

- `cta-group-primary-secondary`
- `cta-group-primary-secondary-link`
- `cta-group-stacked-mobile`

Rules:

- One primary action per hero.
- Secondary action must not visually compete with primary.
- Tertiary text link must have enough separation and clear click affordance.
- Mobile buttons must be full-width or intentionally grouped, never squeezed.

QA gate:

- touch targets >= 44px;
- primary/secondary hierarchy visible in grayscale;
- group has enough top margin from previous content.

### 4. Section Header

Base classes:

- `subpage-title-row`
- `subpage-eyebrow`
- `subpage-title`
- `subpage-copy`

Rules:

- Heading belongs visually to the section below, not the previous block.
- Eyebrow is optional but must not become decorative noise.
- Long German headings need balanced wrapping.

QA gate:

- heading is closer to its own content than to the prior section;
- line length remains readable;
- mobile does not create orphan words unnecessarily.

### 5. Surface / Panel

Base classes:

- `subpage-surface`
- `subpage-panel`
- `subpage-note`
- `subpage-empty`

Variants:

- plain surface
- elevated surface
- flush/table surface
- info note
- CTA note

Rules:

- Cards/panels must earn their existence.
- Do not create generic 3-card AI layout unless cards are real interactions or scannable content units.
- Radius, inner padding, shadow, and border must follow the same scale.

QA gate:

- content density appropriate;
- no nested cards with identical radius everywhere;
- no decorative left-border/card-grid slop unless it serves comprehension.

### 6. Data Table / Data Cards

Used by Training, Stats and any structured lists.

Rules:

- Desktop table can be dense if scanning is strong.
- Mobile must become intentional cards, not a crushed table.
- Key info must appear first: day/time/group/location/contact.
- Long names must wrap cleanly.

QA gate:

- 390px mobile screenshot through several rows;
- no horizontal overflow;
- each row/card answerable in 3 seconds.

### 7. Gallery / Image Card

Baseline:

- `gallery-hero`
- `gallery-series-card`
- `gallery-index-card`

Rules:

- Use real RLC imagery when possible.
- Crops must be intentional, not gray/empty focal areas.
- CSS background fallback is allowed if `<img>` crop is unreliable in the layout.

QA gate:

- hero and card crops checked visually;
- every visible image area has a meaningful focal point;
- no stock/placeholder feel.

## Implementation plan

### Phase 1: Inventory and contracts

Create a component inventory from current pages:

- list every recurring class family;
- map each page section to one of the target components;
- mark one-off sections that should become variants or be removed.

Deliverable:

- `docs/design/component-inventory.md`

### Phase 2: Component spec in DESIGN.md

Extend `DESIGN.md` with a `Components` section:

- component purpose;
- allowed variants;
- spacing tokens;
- responsive rules;
- blue/green/gold color roles;
- anti-patterns.

Deliverable:

- updated `DESIGN.md`

### Phase 3: CSS architecture cleanup

Turn late override blocks into named component rules.

Preferred shape:

```css
/* Component: Subpage Hero */
.subpage-intro { ... }
.subpage-intro--visual { ... }
.subpage-intro--data-heavy { ... }
.subpage-intro--compact { ... }

/* Component: Meta Row */
.subpage-meta-row { ... }
.subpage-meta-row--2 { ... }
.subpage-meta-row--3 { ... }
.subpage-meta-row--4 { ... }
```

Avoid page-specific selectors unless the content really is unique.

Deliverable:

- cleaner `assets/css/subpages.css`
- page-specific selectors reduced or documented

### Phase 4: Template/helpers decision

Choose one of these paths:

A. Stay static HTML, but document component snippets and use strict class contracts.

B. Add a tiny build-time generator for repeated HTML components.

C. Move to a lightweight static site generator/template layer.

Recommendation for this repo right now: start with A, then move to B only if the manual copy/paste remains painful. Avoid a full framework migration while the preview branch is still being stabilized.

### Phase 5: Component QA harness

Add a repeatable browser script/check that captures:

- hero component screenshots desktop/mobile;
- meta row metrics;
- CTA group metrics;
- overflow checks;
- image crop checks for gallery/image cards.

Deliverable:

- `.gstack/design-reports/...` output per run
- optionally a script under `tools/` or `scripts/` if this becomes routine

### Phase 6: Existing page migration

Migrate page by page, but by component type, not by passage.

Order:

1. Heros across all main subpages.
2. Meta rows and CTA groups.
3. Panels/surfaces/notes.
4. Data tables/cards.
5. Gallery/image cards.
6. News detail template.

Each migration must include:

- before screenshot;
- after screenshot;
- desktop/mobile metrics;
- no overflow;
- Cloudflare preview check.

## What the user should not have to do

The user should not mark every passage manually.

Better workflow:

1. User marks 2-5 representative screenshots that feel wrong.
2. We identify the underlying component failure.
3. We fix the component/variant.
4. We run the component QA harness across all pages using that component.
5. We only do page-specific polish when content truly needs a unique treatment.

Manual marking is useful for calibration, not as the operating model.

## Acceptance criteria

A component is accepted only when:

- it has documented rules and variants;
- it works on desktop and mobile;
- it has real-content examples, not idealized placeholder content;
- it has screenshot evidence;
- component-level spacing metrics pass;
- it does not require page-by-page CSS hacks to look acceptable.

## Immediate next step

Create `docs/design/component-inventory.md` from the current repo and tag all main subpage sections with their component type. Then refactor the current hero/detail-polish overrides into named variants, starting with:

- `subpage-intro--standard`
- `subpage-intro--visual`
- `subpage-intro--data-heavy`
- `subpage-intro--compact`
- `subpage-meta-row--2/3/4`
- `subpage-actions--hero`
