---
status: in-progress
project: RLC Recklinghausen website
branch: codex/rlc-customer-go-content-round
head: ac095f4
pr: https://github.com/maexftw/recklinghausen/pull/21
timestamp: 2026-06-19T14:14:24+02:00
---

# Next Chat Handoff — RLC Component System

## Read this first

The current chat context was too large. A fresh chat in workspace `/home/llm/workspaces/recklinghausen` should start here instead of reconstructing from memory.

The active goal is **not** to keep manually polishing every visible passage. The next phase is to make the Recklinghausen site component-system-first: reusable responsive components with explicit contracts, variants, and QA gates.

## Current repo state

- Workspace: `/home/llm/workspaces/recklinghausen`
- Branch: `codex/rlc-customer-go-content-round`
- HEAD: `ac095f4 docs(design): add component system roadmap`
- PR: https://github.com/maexftw/recklinghausen/pull/21
- PR status at handoff: open, Cloudflare Pages check `SUCCESS`
- Preview URL used during this round: `https://codex-rlc-customer-go-conten.rlc-1952-recklinghausen.pages.dev`
- Untracked file intentionally left untouched: `kunden-aufgabenliste-abnahme-rlc-meeting.md`

## Important project decisions

1. **Component-system-first going forward.**
   - Do not fix every passage as a one-off.
   - If a section looks wrong, identify the underlying component/variant first.
   - Fix the component contract, then verify all instances.

2. **Current site is not React/Vite yet.**
   - No `package.json`, no `vite.config.*`, no `src/` structure found.
   - Current implementation is static HTML/CSS/JS.
   - Shared header/footer are injected through `assets/js/components.js`.
   - Reuse exists through CSS class families in `assets/css/subpages.css`, but contracts/variants are not formal enough yet.

3. **Do not jump straight into a React/Vite migration.**
   - First stabilize the static component system.
   - After contracts and component QA exist, decide whether a React/Vite migration is worth the extra scope.

4. **Context7 is now visible and enabled in MCP list.**
   - Last `hermes mcp list` showed `context7 ... ✓ enabled`.
   - In the next chat, verify with `hermes mcp test context7` or `/reload-mcp` before relying on it.
   - Use Context7 for current Vite/React docs if and when planning migration or modern component architecture.

5. **Visual quality baseline.**
   - The Stitch-ported Gallery/Bilder page is still the source of truth for visual quality.
   - But the Gallery look must be translated into component variants, not copied globally.

## What was completed in this session

Recent key commits:

- `1503414 feat(design): port Stitch gallery page direction`
- `b58e95a style(design): align subpages to Stitch gallery baseline`
- `75e35d2 style(design): polish subpage hero detail rhythm`
- `ac095f4 docs(design): add component system roadmap`

Main work completed:

- Gallery/Stitch direction integrated as visual baseline.
- `DESIGN.md` corrected so blue is primary and green secondary.
- Shared subpage styling adjusted toward Gallery rhythm.
- Training Hero detail issue fixed after user screenshot feedback:
  - the old 3-column meta layout caused a bad 3+1/2+2 break with 4 meta items;
  - hero content spacing was too compressed;
  - actions were not treated as their own zone.
- CSS cache/version refs bumped to `subpages.css?v=9` across pages.
- Montserrat links replaced with Lexend across affected pages.
- `stats`, `training`, and `abendlauf` received page-specific hero detail fixes where necessary.
- Design review skill/project memory updated: broad contact sheets are not enough; component-level spacing QA is required.
- Component system roadmap created: `docs/design/component-system-roadmap.md`.

## Key files to inspect next

- `docs/design/component-system-roadmap.md`
  - Main plan for component-system-first work.
- `docs/design/subpage-gallery-alignment-handoff.md`
  - Explains Gallery alignment and the component-level review gap.
- `docs/NEXT_CHAT_HANDOFF.md`
  - This file.
- `assets/css/subpages.css`
  - Current shared subpage styling, including Gallery alignment and detail polish.
- `assets/js/components.js`
  - Current shared header/footer injection.
- `pages/training.html`
  - Example of the `PageHero / data-heavy` problem that triggered the component-system discussion.
- `pages/gallery.html`
  - Visual baseline/source-of-truth page.

## Next work, in order

### 1. Verify Context7 in the fresh chat

Run:

```bash
hermes mcp list
hermes mcp test context7
```

If tools are not visible in the fresh WebUI session, run `/reload-mcp` or restart the WebUI/Hermes session.

Only use Context7 for React/Vite after it is confirmed available.

### 2. Create component inventory

Create:

```text
docs/design/component-inventory.md
```

Inventory should map existing page sections to component families:

- `PageHero`
- `MetaRow`
- `CtaGroup`
- `SectionHeader`
- `Panel`
- `Surface`
- `CardGrid`
- `NewsCard`
- `TrainingSchedule`
- `GalleryGrid`
- `Table/DataCards`

For each component:

- where it appears;
- current classes;
- current variants, even if implicit;
- known bad instances;
- what should become a named variant.

### 3. Create component contracts

Create:

```text
docs/design/component-contracts.md
```

Contracts should define for each component:

- purpose;
- allowed content length/count;
- variants;
- desktop/tablet/mobile behavior;
- spacing contract;
- color/CTA hierarchy;
- accessibility requirements;
- QA gate.

Important first contracts:

- `PageHero / editorial`
- `PageHero / standard`
- `PageHero / visual`
- `PageHero / data-heavy`
- `PageHero / compact`
- `MetaRow / 2`, `/3`, `/4`, `/compact`
- `CtaGroup / hero`, `/inline`, `/stacked-mobile`

### 4. Refactor CSS toward named variants

Do not keep adding broad late overrides unless necessary.

Move toward explicit classes such as:

```css
.subpage-intro--editorial
.subpage-intro--standard
.subpage-intro--visual
.subpage-intro--data-heavy
.subpage-intro--compact

.subpage-meta-row--2
.subpage-meta-row--3
.subpage-meta-row--4
.subpage-actions--hero
```

The goal is not a huge rewrite in one shot. Start with `PageHero`, `MetaRow`, and `CtaGroup`, because those caused the visible issue.

### 5. Add component-level QA

Before calling a page preview-ready, check isolated components, not only whole pages/contact sheets.

For every major hero variant, capture desktop and mobile and measure:

- Eyebrow → H1
- H1 → Lead
- Lead → Meta
- Meta → Actions
- action button spacing
- mobile height
- horizontal overflow
- whether 4 meta items become intentional 2x2, not accidental 3+1

The previous miss happened because macro screenshots looked directionally okay while the actual Training content block was cramped.

### 6. Only then consider Vite/React

If the static component contracts are clear, decide whether migrating to Vite/React is worth it.

If migration is chosen later, use Context7 for current docs and plan it as a separate architecture task, not as part of this immediate UI polish branch.

## QA evidence from previous pass

Training live check after detail polish:

- `subpages.css?v=9` confirmed live.
- no horizontal overflow.
- Training meta no longer accidental 3+1.
- component-level screenshots were written under:

```text
.gstack/design-reports/subpage-hero-detail-polish-20260619-124151/screenshots/live/
```

Do not assume those report files exist on another machine; regenerate if needed.

## Known caveats

- `kunden-aufgabenliste-abnahme-rlc-meeting.md` is untracked. Do not add/commit it unless explicitly requested.
- The PR currently includes a large mechanical change touching many news detail pages because `subpages.css?v=9` and Lexend references were synchronized. Treat that as intentional but reviewable.
- Some lower-page/detail sections may still need componentization. Do not mark all UI work complete just because the hero issue is fixed.
- The right next move is inventory/contracts, not another one-off visual sweep.

## Suggested opening prompt for the next chat

> Lies `docs/NEXT_CHAT_HANDOFF.md` und `docs/design/component-system-roadmap.md`. Prüfe dann Context7 (`hermes mcp test context7`) und starte mit `docs/design/component-inventory.md`, damit Recklinghausen component-system-first weitergebaut wird statt passageweise gefixt.
