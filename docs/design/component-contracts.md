# RLC Component Contracts

Status: initial contract layer for the static component system.

This file turns the current static HTML/CSS patterns into explicit component rules. It is not a React/Vite migration plan. The current implementation remains static HTML/CSS/JS until the component contracts, variants and QA gates are stable.

Related docs:

- `docs/design/component-system-roadmap.md`
- `docs/design/component-inventory.md`
- `docs/design/subpage-gallery-alignment-handoff.md`

## Operating rules

1. Fix visual defects at component/variant level first.
2. Add a new named variant before adding a broad page-specific override.
3. Use real RLC content in QA. Placeholder-perfect components do not count.
4. Component QA must include desktop and mobile evidence plus measurements.
5. Gallery/Bilder remains the visual quality baseline, but its classes are not copied globally without a contract.
6. Dynamic components are allowed in this static architecture when the contract names the data source and loaded state.

## Variant class naming

Preferred static class shape:

```html
<section class="subpage-intro subpage-intro--visual subpage-intro--data-heavy">
  ...
  <div class="subpage-meta-row subpage-meta-row--4">...</div>
  <div class="subpage-actions subpage-actions--hero">...</div>
</section>
```

Naming rules:

- Base class owns the component identity.
- `--variant` class owns behavior.
- Page-specific classes may remain for content-specific imagery/data, but should not define the general component contract.

## PageHero

### Purpose

Create the first orientation block of a page: page type, promise, short explanation, optional facts, optional actions and optional visual/aside.

### Shared structure

Required for all `subpage-intro` heroes:

- one semantic `section` with an accessible label via `aria-labelledby`;
- exactly one visible page `h1`;
- optional eyebrow before `h1`;
- optional lead paragraph;
- optional `MetaRow` after lead;
- optional `CtaGroup` after meta/lead;
- optional visual (`subpage-intro__visual`) or aside (`subpage-intro__aside`).

### Variants

#### `PageHero / editorial`

Class:

- `gallery-hero gallery-hero--editorial`

Used by:

- `pages/gallery.html`

Contract:

- Strong visual lead with curated imagery.
- Hero may include a gallery-local meta list.
- Image crop/focal quality is part of the component, not decorative fallback.
- Desktop may use asymmetric image composition.
- Mobile must keep the H1, lead and first visual readable without oversized height.

QA gate:

- Desktop screenshot at ~1440px.
- Mobile screenshot at 375-390px.
- Verify no image area is empty/gray/focal-point-free.
- Verify H1 and CTA hierarchy are visible before the first major scroll.

#### `PageHero / standard`

Class:

- `subpage-intro subpage-intro--standard`
- May combine with `subpage-intro--full` when no visual/aside exists.

Used by:

- normal overview pages such as Contact, Events, Sponsors, News archive.

Allowed content:

- H1: target 1-2 lines desktop, 2-4 lines mobile.
- Lead: target 1 short paragraph, max about 320 characters.
- Meta: 0 or 3 short facts.
- CTAs: 1 primary, optional secondary, optional tertiary text link.

Responsive behavior:

- Desktop: text block should not span full width if it hurts line length.
- Tablet/mobile: one-column layout.
- No horizontal overflow.

Spacing contract:

- Eyebrow -> H1: clear pre-heading pause.
- H1 -> lead: visibly larger than eyebrow gap but not detached.
- Lead -> meta/actions: separate zones, never visually glued.

QA gate:

- Measure eyebrow/H1/lead/meta/actions vertical gaps.
- Verify CTA touch targets >= 44px.
- Verify mobile actions stack cleanly.

#### `PageHero / visual`

Class:

- `subpage-intro subpage-intro--visual`
- May combine with `subpage-intro--standard` or `subpage-intro--data-heavy`.

Used by:

- Facilities, Team, Training, Abendlauf.

Allowed content:

- Same as standard, plus one visual block.
- Image must have meaningful `alt` text unless purely decorative.
- If image is missing/unreliable, use an intentional information panel, not a gray placeholder.

Responsive behavior:

- Desktop: text and visual form a two-column component.
- Tablet/mobile: visual moves below content.
- Mobile visual height must be bounded; no hero should consume the whole first screen without reason.

QA gate:

- Check image crop/focal point at desktop and mobile.
- Verify visual does not compress text/meta/actions.
- Verify mobile image height.

#### `PageHero / data-heavy`

Class:

- `subpage-intro subpage-intro--data-heavy`

Used by:

- Training
- Abendlauf
- Stats/records
- any future page with 4 facts, dense operational context or multiple next-step actions.

Allowed content:

- H1 and lead as above.
- Meta: 3-4 facts, or dynamic facts that resolve to 3-4 facts after JS loads.
- CTAs: max 3 actions; exactly one primary.
- Optional aside allowed only if it reduces cognitive load. Hide or simplify aside on mobile if it duplicates the hero.

Responsive behavior:

- 4 meta facts must render as intentional 2x2 or 4-column desktop grid, never accidental 3+1.
- On mobile, use one column or two balanced columns depending on label length; no orphaned fourth fact.
- CTA group must be a separate zone below facts.

Spacing contract:

- Lead -> meta: substantial separator with a border/top rule or clear gap.
- Meta -> actions: at least the same perceived distance as H1 -> lead.
- Buttons must not appear visually attached to meta facts.

QA gate:

- Desktop + mobile screenshots for every data-heavy hero instance.
- Measure hero zones: eyebrow -> H1, H1 -> lead, lead -> meta, meta -> actions.
- Confirm 4 facts are not 3+1.
- Confirm no horizontal overflow at 390px.

#### `PageHero / compact`

Class:

- `subpage-intro subpage-intro--compact`
- Usually combines with `subpage-intro--full`.

Used by:

- Datenschutz
- Impressum
- generated detail/legal/archive pages when content does not need a large hero.

Allowed content:

- Eyebrow, H1, optional short lead.
- No hero meta unless it serves visitor orientation.
- No image unless page content genuinely needs it.

Responsive behavior:

- Shorter vertical rhythm than standard/visual/data-heavy.
- Legal/detail pages must not feel like oversized marketing landing pages.

QA gate:

- Verify first content surface appears quickly on mobile.
- Verify H1 readable and not over-scaled.

#### `PageHero / process`

Class:

- `subpage-intro subpage-intro--process`

Used by:

- Membership
- Register

Allowed content:

- H1 + lead.
- 3 process facts.
- Optional hero points if they clarify a decision path.
- Optional aside with a concise explanation/checklist.
- Max 3 hero CTAs.

Responsive behavior:

- Desktop may use aside.
- Mobile must not show duplicated process explanation before the user reaches the form/next step.

QA gate:

- Verify first actionable step is visible without excessive scroll on mobile.
- Verify form/process CTAs are distinguishable from generic page navigation.

## MetaRow

### Purpose

Summarize high-value facts inside a hero or detail component.

### Shared structure

- Container: `subpage-meta-row`
- Item: `subpage-meta`
- Optional icon: `.material-icons-round`
- Label inside `strong`

### Variants

#### `MetaRow / 2`

Class: `subpage-meta-row--2`

Rules:

- Use when two facts are equally important.
- Desktop: two balanced columns or compact inline pair.
- Mobile: one column unless both facts are short.

#### `MetaRow / 3`

Class: `subpage-meta-row--3`

Rules:

- Default for standard/process heroes.
- Desktop: three columns.
- Mobile: one column or auto-fit two-column if labels stay readable.

Current instances:

- Contact
- Membership
- Register
- Stats

#### `MetaRow / 4`

Class: `subpage-meta-row--4`

Rules:

- Required for four facts.
- Desktop: four columns when enough width exists.
- Tablet: intentional 2x2.
- Mobile: one column or balanced auto-fit; never 3+1.

Current instances:

- Abendlauf
- Training after dynamic meta load if it resolves to four facts.

#### `MetaRow / dynamic`

Class: `subpage-meta-row--dynamic`

Rules:

- Used when JS populates facts from `training_schedule.js` or related data.
- Empty initial markup is allowed only if the component is populated on `DOMContentLoaded`.
- If JS/data fails, the row should remain visually harmless and not create an empty divider.

Current instances:

- Training
- Team
- Facilities

QA gate for all MetaRows:

- Count actual rendered `.subpage-meta` items.
- Compare count against variant class.
- Verify labels/values wrap inside each cell.
- Verify no horizontal overflow at 390px.
- For `--dynamic`, verify post-JS rendered item count.

## CtaGroup

### Purpose

Offer clear next actions without making every link compete equally.

### Shared structure

- Container: `subpage-actions`
- Primary: `subpage-button`
- Secondary: `subpage-button subpage-button--secondary`
- Tertiary: `subpage-link`

### Variants

#### `CtaGroup / hero`

Class: `subpage-actions--hero`

Rules:

- Max 3 actions.
- Exactly one primary button.
- Secondary button is visually quieter.
- Tertiary link is allowed only if it is a navigation aid, not another primary decision.
- On mobile, stack actions or make layout intentionally grouped; never squeezed inline.

Current instances:

- Hero actions on main subpages.

#### `CtaGroup / inline`

Class: `subpage-actions--inline`

Rules:

- Used inside panels, cards or text sections.
- Smaller top margin than hero groups.
- May contain only a link or a secondary button.

#### `CtaGroup / form-footer`

Class: `subpage-actions--form-footer`

Rules:

- Used at form decision points.
- Primary submit/next action must be visually dominant.
- Secondary/cancel/back action must remain clear but quieter.
- On mobile, stack full-width controls.

Current instances:

- Register form footer.

#### `CtaGroup / feature`

Class: `subpage-actions--feature`

Rules:

- Used inside feature cards/news modules.
- Must align with card content density.
- Can use one primary and one tertiary link.

Current instances:

- News feature card.

QA gate for all CtaGroups:

- Primary action visible and unique.
- Touch targets >= 44px.
- Mobile has no squeezed buttons.
- Grayscale hierarchy remains legible.

## Component QA matrix

The first mandatory QA pass covers these concrete rendered instances:

| Component | Variant | Routes |
| --- | --- | --- |
| PageHero | editorial | `/pages/gallery.html` |
| PageHero | standard/full | `/pages/contact.html`, `/pages/events.html`, `/pages/news.html` |
| PageHero | visual | `/pages/facilities.html`, `/pages/team.html` |
| PageHero | data-heavy | `/pages/training.html`, `/pages/abendlauf.html`, `/pages/stats.html` |
| PageHero | compact | `/pages/datenschutz.html`, `/pages/impressum.html` |
| PageHero | process | `/pages/membership-info.html`, `/pages/register.html` |
| MetaRow | 3 | Contact, Membership, Register, Stats |
| MetaRow | 4 | Abendlauf and dynamic Training if it renders 4 facts |
| MetaRow | dynamic | Training, Team, Facilities |
| CtaGroup | hero | all hero CTAs |
| CtaGroup | form-footer | Register form footer |
| CtaGroup | feature | News feature |

## Browser/GStack measurement requirements

For every hero variant in the matrix:

- Capture desktop screenshot around the hero.
- Capture mobile screenshot around the hero at 375-390px.
- Record bounding-box metrics for:
  - eyebrow bottom -> H1 top;
  - H1 bottom -> lead top;
  - lead bottom -> meta row top;
  - meta row bottom -> actions top;
  - hero height;
  - viewport/document horizontal overflow.
- Record actual `.subpage-meta` count and grid column behavior.
- Record CTA count and minimum button/link height.

Acceptance thresholds for the first pass:

- Horizontal overflow: `0px` over viewport.
- CTA min touch target: `>= 44px`.
- Meta 4 layout: no 3+1 desktop/tablet arrangement.
- Hero mobile height: must not hide all next content below a visually bloated hero unless editorial/gallery variant intentionally does so.

## Known exceptions to resolve later

- `gallery-*` is still its own component family and should be normalized separately after Hero/Meta/CTA.
- Generated news detail pages need a sample-based template QA pass before any claim that all 818 pages are visually clean.
- `subpage-hero-points` is currently used by process/data pages but is not yet a formal component. It should become `HeroPointGrid` or be folded into `Panel/CardGrid` after the first variant pass.
