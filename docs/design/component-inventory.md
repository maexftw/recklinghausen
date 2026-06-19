# RLC Component Inventory

Status: first-pass inventory from the current static HTML/CSS implementation, updated after the initial Hero/Meta/CTA variant pass.

Sources checked:

- `docs/NEXT_CHAT_HANDOFF.md`
- `docs/design/component-system-roadmap.md`
- `docs/design/subpage-gallery-alignment-handoff.md`
- `assets/css/subpages.css`
- `assets/js/components.js`
- `index.html`, `pages/*.html`, and a sample of generated `pages/news/*.html`

Context7 check:

- `hermes mcp test context7` connected successfully and discovered `resolve-library-id` + `query-docs`.
- Context7 Vite docs confirm a possible later multi-page HTML path with HTML entry points and build inputs.
- This inventory intentionally does **not** start a Vite/React migration. The current repo is still static HTML/CSS/JS and the roadmap says to formalize the static component system first.

## Initial variant pass implemented

The first implementation pass now makes the core Hero/Meta/CTA contracts explicit in markup and CSS:

- Hero variants: `subpage-intro--standard`, `subpage-intro--data-heavy`, `subpage-intro--compact`, `subpage-intro--process`, plus `gallery-hero--editorial`.
- Meta variants: `subpage-meta-row--3`, `subpage-meta-row--4`, `subpage-meta-row--dynamic`.
- CTA variants: `subpage-actions--hero`, `subpage-actions--feature`, `subpage-actions--form-footer`.
- Dynamic rows on Training/Team/Sportstätten are intentional JS-populated components, not accidental empty rows; empty dynamic rows are hidden until populated.
- Latest component QA evidence: `.gstack/design-reports/component-qa-20260619-143343/REPORT.md` with 14 routes × 2 viewports, 28 records, 0 failures. The critical 4-meta rows measured as desktop `[4]` and mobile `[2,2]` on Training and Abendlauf.

The older page-level table below preserves the original discovery snapshot. Treat the variant pass and `docs/design/component-contracts.md` as the current contract source for Hero/Meta/CTA.

## Current implementation map

The site currently has reusable building blocks, but most variants are implicit or page-specific.

- Shared shell: `assets/js/components.js`
  - Injects header/footer.
  - Adds Tailwind config fallback and shared shell styles.
  - Current component contract level: shell is reusable, but not documented in this inventory beyond the site chrome.
- Shared subpage system: `assets/css/subpages.css`
  - Main reusable families: `subpage-intro`, `subpage-meta-row`, `subpage-actions`, `subpage-panel`, `subpage-surface`, `subpage-card-grid`, `subpage-table`, `gallery-*`, `subpage-news-*`.
  - Current CSS already contains some named modifiers (`subpage-intro--full`, `subpage-intro--visual`, `subpage-surface--flush`, `subpage-panel--plain`) and many page-specific classes (`subpage-stats-intro`, `subpage-news-intro`, `subpage-register-intro`, etc.).
- News detail pages: 818 generated `pages/news/*.html` files inherit the subpage/news-detail baseline and should be treated as one generated template family, not individually redesigned.

## Page-level component coverage

| Page | Hero | MetaRow | CTA | SectionHeader | Panel/Surface | Cards/Data/Gallery |
| --- | --- | --- | --- | --- | --- | --- |
| `pages/abendlauf.html` | `subpage-intro subpage-intro--visual` | 4 meta items | 2 buttons + 1 link | 2 | 2 panels | `subpage-grid`, event/resource cards |
| `pages/contact.html` | `subpage-intro subpage-intro--full` | 3 meta items | 2 buttons + 1 link | 2 | 2 surfaces | contact form/cards |
| `pages/datenschutz.html` | `subpage-intro subpage-intro--full` | none | none | implicit/legal | 1 surface | legal content |
| `pages/events.html` | `subpage-intro subpage-intro--full` | none | 2 buttons | 1 | 1 panel | event list/timeline |
| `pages/facilities.html` | `subpage-intro subpage-intro--visual` | empty row currently present | 1 button | 1 | none | `subpage-card-grid--facilities` |
| `pages/gallery.html` | `gallery-hero` | gallery-local meta | 2 actions | gallery-specific | gallery cards | `gallery-series-card`, `gallery-index-card` |
| `pages/impressum.html` | `subpage-intro subpage-intro--full` | none | none | implicit/legal | 1 surface | legal content |
| `pages/membership-info.html` | `subpage-intro subpage-membership-intro` | 3 meta items | 2 hero buttons + 1 link; second CTA group lower page | 3 | 4 panels + 1 surface | choice/route/prep cards |
| `pages/news.html` | `subpage-intro subpage-news-intro` | custom news intro meta | 2 hero actions + feature actions | 3 | 3 surfaces | `subpage-news-*` list/card archive |
| `pages/register.html` | `subpage-intro subpage-register-intro` | 3 meta items | 4 CTA groups total | 2 | 3 panels + 1 surface | registration form/cards |
| `pages/sponsors.html` | `subpage-intro subpage-intro--full subpage-sponsors-intro` | none | 2 buttons | 2 | 2 panels | partner/people grids |
| `pages/stats.html` | `subpage-intro subpage-stats-intro` | 3 meta items | 2 buttons + 1 link | 2 | 2 panels + 1 surface | `subpage-table`, mobile cards, stats cards |
| `pages/team.html` | `subpage-intro subpage-intro--visual` | empty row currently present | 2 buttons | 1 | 1 surface | `subpage-card-grid--team`, person cards |
| `pages/training.html` | `subpage-intro subpage-intro--visual` | empty row currently present | 2 buttons + 1 link | 1 | 1 surface | training filters/table/mobile schedule |

`index.html` currently does not use the `subpage-*` component system and should be treated separately if/when the homepage is componentized.

## Component families

### 1. PageHero

Current classes:

- Base: `subpage-intro`, `subpage-intro__content`, `subpage-display`, `subpage-lead`, `subpage-eyebrow`
- Structural children: `subpage-intro__visual`, `subpage-intro__aside`, `subpage-intro__aside--accent`
- Existing modifiers: `subpage-intro--full`, `subpage-intro--visual`
- Page-specific implicit variants: `subpage-news-intro`, `subpage-stats-intro`, `subpage-sponsors-intro`, `subpage-membership-intro`, `subpage-register-intro`
- Gallery baseline: `gallery-hero`, `gallery-hero__image`, `gallery-hero__meta`

Appears in:

- All main `pages/*.html` subpages except `index.html`.
- Generated news detail pages through the news detail template family.

Current implicit variants:

- `full`: legal/contact/events/sponsors/news archive style with one-column hero.
- `visual`: text plus image/visual zone on Abendlauf, Facilities, Team, Training.
- `editorial`: Gallery-only baseline via `gallery-hero`.
- `data-heavy`: Training/Abendlauf/Stats behavior currently handled by a mix of content and late CSS rather than a named hero modifier.
- `compact/legal`: Datenschutz/Impressum currently reuse `subpage-intro--full` without a named compact contract.
- `form/process`: Register/Membership use custom page classes and an aside.

Known bad/risk instances:

- Training was the original visible failure: dense hero actions and data context were too compressed before the detail polish.
- Abendlauf is still information-rich and has lower-page image/detail placeholder concerns from the handoff.
- Stats has a lighter hero after polish, but still uses a page-specific `subpage-stats-intro` instead of a named data/records variant.
- `facilities.html`, `team.html`, and `training.html` currently include empty `subpage-meta-row` nodes; these should be removed or replaced with an intentional variant/content.
- News archive and 818 generated news details can drift if CSS/font/version references diverge.

Should become named variants:

- `subpage-intro--editorial` for Gallery-quality editorial hero rhythm.
- `subpage-intro--standard` for normal content pages with title, lead, meta and actions.
- `subpage-intro--visual` kept, but with a clearer contract for image/placeholder dimensions.
- `subpage-intro--data-heavy` for Training, Abendlauf and Stats-style pages with multiple facts and action hierarchy.
- `subpage-intro--compact` for legal/detail/archive pages.
- `subpage-intro--process` for Register/Membership if their aside/progress pattern remains reusable.

### 2. MetaRow

Current classes:

- `subpage-meta-row`
- `subpage-meta`
- icon support via `.material-icons-round`

Appears in:

- 4 items: `pages/abendlauf.html`
- 3 items: `pages/contact.html`, `pages/membership-info.html`, `pages/register.html`, `pages/stats.html`
- Empty row currently present: `pages/facilities.html`, `pages/team.html`, `pages/training.html`

Current variants:

- No explicit count variants yet.
- Base CSS uses flex-wrap, so 4 items can accidentally become 3+1 depending on viewport/content.
- Detail polish already corrected the Training-triggered 4-fact issue conceptually, but the variant is not named.

Known bad/risk instances:

- `abendlauf.html` has 4 facts and needs intentional 2x2 or responsive grid behavior.
- Empty meta rows on Facilities/Team/Training are component debt.
- Long German values need wrapping inside the cell, not row overflow.

Should become named variants:

- `subpage-meta-row--2`
- `subpage-meta-row--3`
- `subpage-meta-row--4`
- `subpage-meta-row--compact`
- Optional `subpage-meta-row--empty-hidden` is **not** preferred; better remove empty markup.

### 3. CtaGroup

Current classes:

- `subpage-actions`
- `subpage-button`
- `subpage-button--secondary`
- `subpage-link`

Appears in:

- Hero CTA groups on Abendlauf, Contact, Events, Facilities, Membership, News, Register, Sponsors, Stats, Team, Training.
- Lower-page/form CTA groups on Register, Membership and News feature content.

Current implicit variants:

- Hero group: usually 1 primary + 1 secondary + optional tertiary link.
- Simple group: one primary/secondary button.
- Form footer group: Register form footer uses `register-form-footer__actions` plus `subpage-actions`.
- Feature actions: News feature uses `subpage-news-feature__actions` plus `subpage-actions`.

Known bad/risk instances:

- Training and Abendlauf are dense because three hero actions compete with data-heavy hero content.
- Mobile full-width/stacked behavior is not yet documented as a contract.
- Lower-page CTA groups reuse the same base class but may need smaller spacing than hero CTAs.

Should become named variants:

- `subpage-actions--hero`
- `subpage-actions--inline`
- `subpage-actions--form-footer`
- `subpage-actions--stacked-mobile`
- `subpage-actions--feature`

### 4. SectionHeader

Current classes:

- `subpage-title-row`
- `subpage-eyebrow`
- `subpage-title`
- `subpage-panel__title`
- supporting copy via `subpage-copy`

Appears in:

- Abendlauf, Contact, Events, Facilities, Membership, News, Register, Sponsors, Stats, Team, Training.

Current variants:

- Split header with action/status on the right.
- Simple section header inside panels/surfaces.
- Surface header via `subpage-surface__header`.

Known bad/risk instances:

- No explicit spacing contract says that the heading belongs closer to its own content than the previous block.
- `subpage-panel__title` is used for both panel titles and CTA-band headings, so title levels/spacing can drift.

Should become named variants:

- `subpage-title-row--section`
- `subpage-title-row--surface`
- `subpage-title-row--with-action`
- `subpage-title-row--compact`

### 5. Panel / Surface / Note

Current classes:

- `subpage-panel`, `subpage-panel--plain`, `subpage-panel__title`
- `subpage-surface`, `subpage-surface--plain`, `subpage-surface--flush`, `subpage-surface__header`
- `subpage-note`, `subpage-note--warning`, `subpage-note--info`, `subpage-note--success`
- `subpage-empty`

Appears in:

- Panels: Abendlauf, Events, Membership, Register, Sponsors, Stats.
- Surfaces: Contact, Datenschutz, Impressum, Membership, News, Register, Stats, Team, Training.
- Notes occur in CSS and should be inventoried per page during the next contract pass.

Current variants:

- Plain panel/surface.
- Elevated default card/surface.
- Flush surface for table/form content.
- Note variants by status.

Known bad/risk instances:

- Generic card stacking can become decorative if every content chunk gets identical borders/radius.
- `subpage-panel--plain` and side panels are being used as layout escape hatches; decide if side panels are a real variant.

Should become named variants:

- `subpage-surface--elevated`
- `subpage-surface--flush`
- `subpage-surface--table`
- `subpage-panel--side`
- `subpage-panel--cta`
- `subpage-note--info|warning|success` with content rules.

### 6. CardGrid / Content Cards

Current classes:

- `subpage-card-grid`
- `subpage-grid`, `subpage-grid--two`, `subpage-grid--sidebar`
- `subpage-highlight-strip`
- Page-specific card classes: `subpage-person-card`, `abendlauf-resource-card`, `membership-*card`, `register-contact-card`, `stats-insight-card`, facilities card classes.

Appears in:

- Facilities, Team, Training, Stats, Sponsors, Abendlauf, Membership, Register.

Current variants:

- Team/person grid.
- Facilities grid.
- Highlight strip.
- Sidebar content grid.
- Membership/register route/prep cards.

Known bad/risk instances:

- Several page-specific card families may be legitimate content types, but their shared card contract is not formalized.
- Avoid a generic 3-card AI layout unless each card is scannable and useful.

Should become named variants:

- `subpage-card-grid--2|3|auto`
- `subpage-card--person`
- `subpage-card--resource`
- `subpage-card--route`
- `subpage-card--insight`

### 7. NewsCard / NewsArchive / NewsDetail

Current classes:

- Archive: `subpage-news-intro`, `subpage-news-feature`, `subpage-news-current-grid`, `subpage-news-archive-list`, `subpage-news-list`, `subpage-news-list-item`, `subpage-news-date-chip`, `subpage-news-category`
- Detail/template: generated `pages/news/*.html` with news detail hero/content classes.

Appears in:

- `pages/news.html`
- 818 generated `pages/news/*.html`

Current variants:

- Featured news card.
- Compact news list item.
- Archive/year grouping.
- Detail hero/content template.

Known bad/risk instances:

- Generated news pages are many; any CSS/font/cache change must stay synchronized.
- Source images can be small, so archive cards intentionally avoid large banner presentation.

Should become named variants:

- `subpage-news-card--feature`
- `subpage-news-card--compact`
- `subpage-news-list--archive`
- `subpage-news-detail--standard`

### 8. TrainingSchedule

Current classes:

- `training-filter-disclosure`, `training-plan-notes`, `training-badge`
- `training-table-cell`, `training-card-top`, `training-card-group`
- `subpage-table`, `subpage-table-shell`, `subpage-table-note`
- `subpage-mobile-schedule`, `subpage-schedule-cards`, `subpage-schedule-card`, `subpage-schedule-card__*`

Appears in:

- `pages/training.html`

Current variants:

- Desktop table.
- Mobile schedule cards.
- Filter disclosure/chips.
- Table notes.

Known bad/risk instances:

- This is a real data component and must not be treated like generic cards.
- Mobile needs intentional card order: day/time/group/location/contact.
- Training hero itself should be `data-heavy` even if the schedule table is separate.

Should become named variants:

- `training-schedule--desktop-table`
- `training-schedule--mobile-cards`
- `training-filter--disclosure`
- `subpage-table-note--intro|footer`

### 9. GalleryGrid / Image Cards

Current classes:

- `gallery-hero`
- `gallery-series-card`, `gallery-series-card--lead`, `gallery-series-card__media`
- `gallery-index-card`
- `subpage-gallery*` CSS family

Appears in:

- `pages/gallery.html`

Current variants:

- Editorial hero.
- Lead series card.
- Standard series card.
- Index card.

Known bad/risk instances:

- Gallery is the visual quality baseline, not a component API yet.
- Image crops and focal points must be checked visually, not assumed.

Should become named variants:

- `gallery-hero--editorial`
- `gallery-card--lead`
- `gallery-card--series`
- `gallery-card--index`

### 10. Data Table / Data Cards

Current classes:

- Shared table: `subpage-table`, `subpage-table-shell`, `subpage-table-note`
- Mobile card container: `subpage-mobile-schedule`
- Stats-specific: `stats-table`, `stats-mobile-cards`, `stats-table-note`, `stats-insight-*`
- Training-specific schedule card classes listed above.

Appears in:

- `pages/training.html`
- `pages/stats.html`

Current variants:

- Training schedule table/cards.
- Stats records table/cards.

Known bad/risk instances:

- Tables must not become crushed desktop tables on mobile.
- Stats and Training may share shell behavior but need different row/card content order.

Should become named variants:

- `subpage-data-table--records`
- `subpage-data-table--schedule`
- `subpage-data-cards--records`
- `subpage-data-cards--schedule`

## Immediate cleanup candidates before contracts

1. Remove or fill empty `subpage-meta-row` markup in:
   - `pages/facilities.html`
   - `pages/team.html`
   - `pages/training.html`
2. Convert current hero modifiers/page-specific selectors into named variants, starting with:
   - `subpage-intro--standard`
   - `subpage-intro--visual`
   - `subpage-intro--data-heavy`
   - `subpage-intro--compact`
3. Add count variants for meta rows before more page-level polish:
   - `subpage-meta-row--3`
   - `subpage-meta-row--4`
4. Split CTA group intent:
   - hero vs inline vs form-footer vs feature.
5. Keep Gallery as the visual reference but do not copy `gallery-*` globally without a named component contract.

## Next contract targets

Create `docs/design/component-contracts.md` with contracts for:

1. `PageHero / editorial`
2. `PageHero / standard`
3. `PageHero / visual`
4. `PageHero / data-heavy`
5. `PageHero / compact`
6. `MetaRow / 2`, `/3`, `/4`, `/compact`
7. `CtaGroup / hero`, `/inline`, `/form-footer`, `/stacked-mobile`
8. `DataTable / schedule`, `/records`
9. `GalleryCard / lead`, `/series`, `/index`

## QA gates to add after contracts

- Hero desktop/mobile screenshots per named variant.
- Measurements: eyebrow -> H1, H1 -> lead, lead -> meta, meta -> actions.
- Meta row grid behavior by item count, especially 4 items.
- No horizontal overflow at 390px.
- CTA touch targets at least 44px.
- Gallery/card image focal-point check.
- Generated news detail sample check after CSS/font/cache changes.
