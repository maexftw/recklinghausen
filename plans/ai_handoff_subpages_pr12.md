# AI Handoff: Public Subpages Quality Pass

## Branch / PR
- Current working branch: `ag-subpages-quality-pass`
- Existing PR: [#12](https://github.com/maexftw/recklinghausen/pull/12)

## Current State
- The homepage in [`index.html`](../index.html) and [`assets/css/homepage.css`](../assets/css/homepage.css) is the visual baseline.
- Shared public subpage styling has been consolidated into [`assets/css/subpages.css`](../assets/css/subpages.css).
- These public pages are already upgraded and aligned to the shared subpage system:
  - [`pages/training.html`](../pages/training.html)
  - [`pages/team.html`](../pages/team.html)
  - [`pages/facilities.html`](../pages/facilities.html)
  - [`pages/contact.html`](../pages/contact.html)
  - [`pages/news.html`](../pages/news.html)
  - [`pages/membership-info.html`](../pages/membership-info.html)
  - [`pages/sponsors.html`](../pages/sponsors.html)
  - [`pages/gallery.html`](../pages/gallery.html)
  - [`pages/stats.html`](../pages/stats.html)
  - [`pages/register.html`](../pages/register.html)

## Do Not Change
- Do not visually change the homepage baseline in [`index.html`](../index.html) and [`assets/css/homepage.css`](../assets/css/homepage.css).
- Do not modify unrelated files.
- Keep [`pages/scope-contract.html`](../pages/scope-contract.html) out of the shared navigation for now.

## Shared Design-System Files
- [`assets/css/homepage.css`](../assets/css/homepage.css) — homepage-specific baseline styling
- [`assets/css/subpages.css`](../assets/css/subpages.css) — shared public subpage system
- [`assets/css/design-tokens.css`](../assets/css/design-tokens.css) — tokens used across styles
- [`assets/css/style.css`](../assets/css/style.css) — broader site styling context
- [`assets/js/components.js`](../assets/js/components.js) — shared UI/component behavior if navigation or common fragments are touched

## Remaining Work (Priority Order)
1. Finish the news detail pages under [`pages/news/`](../pages/news/).
2. Verify each news detail page aligns with the shared subpage design system without altering homepage visuals.
3. Check navigation consistency so public pages stay aligned while [`pages/scope-contract.html`](../pages/scope-contract.html) remains excluded.
4. Run a final quality pass for layout consistency, spacing, typography, and responsive behavior on the upgraded public pages.

## Important Constraints / Decisions
- The homepage is the design reference and must remain visually untouched.
- Public subpages should converge on the shared CSS system in [`assets/css/subpages.css`](../assets/css/subpages.css).
- The main unfinished area is not top-level public pages, but the news detail pages in [`pages/news/`](../pages/news/).
- Any future updates should preserve the current PR scope and avoid expanding into unrelated redesign work.

## Suggested Next Steps for Another AI
1. Audit a representative sample of files in [`pages/news/`](../pages/news/) to identify current template/layout variation.
2. Define or confirm the intended shared structure for news detail pages using [`assets/css/subpages.css`](../assets/css/subpages.css).
3. Update the news detail pages in batches, preserving content while aligning layout, spacing, media handling, and navigation.
4. Validate links, responsive behavior, and visual consistency against [`pages/news.html`](../pages/news.html) and the already-upgraded public pages.
5. Prepare the branch for final PR review once the news detail pages are consistent.
