# Repository Guidelines

## Project Structure & Module Organization

This repository is a static website for RLC 1952. The root `index.html` is the homepage. Public subpages live in `pages/`, with generated news detail pages in `pages/news/`. Shared styles are under `assets/css/`, shared behavior and injected header/footer live in `assets/js/components.js`, and news data is in `assets/js/news_data.js`. News images are stored in `news_assets/`; other assets are under `assets/`, `RLC-Logo_vector/`, and `Termine/`. Cloudflare Pages config is in `wrangler.toml`.

Do not commit local meeting exports, audit artifacts, preview ZIPs, screenshots, or temporary design files.

## Source of Truth & Duplicate Avoidance

- Canonical GitHub repo: `https://github.com/maexftw/recklinghausen`; default branch is `main`.
- Canonical local Hermes worktree: `D:/Arbeit/0_ACTIVE/Recklinghausen`.
- Do **not** edit or deploy from `C:/Users/User/Documents/antigravity/happy-chandrasekhar` unless the user explicitly says to use that older feedback workspace.
- Do **not** treat `D:/Arbeit/9_ARCHIVE/Alt V1/Recklinghausen` or other archive/export folders as the deploy source; use them only as reference material when explicitly needed.
- Canonical Cloudflare Pages project is the Git-connected `rlc-1952-recklinghausen` (`rlc-1952-recklinghausen.pages.dev`). Legacy Direct Upload projects `rlc1952` and `rlc-1952` exist and must not be used for normal deployment.
- For any manual Wrangler deploy, pass `--project-name rlc-1952-recklinghausen` and verify the returned deployment URL/check-run before calling it successful.
- Before editing, run `git status --short` and identify the active branch. Preserve existing uncommitted changes unless the user explicitly asks to discard or overwrite them.

## Build, Test, and Development Commands

- `python server.py` starts the local static server at `http://localhost:8001`.
- `python sync_news.py` refreshes news images/data from the source archive.
- `python generate_detail_pages.py` regenerates static files in `pages/news/`.
- `python update_js_data.py` updates the compact JavaScript news dataset.
- `npx wrangler pages deploy . --project-name rlc-1952-recklinghausen` deploys the current static root to the canonical Cloudflare Pages project when authenticated. Keep the project name explicit for manual deploys so older clones/configs cannot target legacy Direct Upload projects by accident.

There is no npm build step and no framework compile phase.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and vanilla JavaScript. Keep indentation consistent with surrounding files, generally four spaces in HTML and JS. Prefer semantic HTML, descriptive class names, and existing BEM-like patterns such as `subpage-*`, `home-*`, and `site-*`. Put shared navigation/footer changes in `assets/js/components.js` and verify all pages after changing it. Keep generated news output stable; edit the data source/scripts instead of hand-editing many `pages/news/*.html` files.

## Testing Guidelines

There is no formal test framework. Before handing off changes, run `git diff --check` and any direct syntax checks for touched scripts (for example `node --check assets/js/components.js`, `node --check functions/api/contact.js`, and `node tests/contact-api.test.mjs` when the contact API is touched). Run the local server and manually check desktop and mobile widths for the touched pages. For navigation, verify header links, mobile menu, footer links, and key CTAs. For content/data changes, check `index.html`, `pages/news.html`, and at least one representative `pages/news/*.html` detail page. For forms or external links, confirm behavior without sending real customer data.

## Commit & Pull Request Guidelines

Recent history uses short imperative messages, often with `fix:` or a concise implementation summary, for example `fix: finalize RLC customer feedback cleanup` or `Implement customer audit fixes`. Keep commits focused. Pull requests should include a short change summary, touched pages, manual test notes, screenshots for visual changes, and any known blockers such as missing approved photos or source material.

## Security & Configuration Tips

Never commit secrets, credentials, private customer exports, or raw personal data. Treat contact forms, DNS/MX changes, and Cloudflare settings as deployment-sensitive; document what was verified and what still needs owner confirmation.

## RLC Feedback Handoff Notes

### Current preview handoff (2026-07-08)

- Latest repo handoff is `docs/rlc-current-handoff.md`; `docs/NEXT_CHAT_HANDOFF.md` points there. Read these before continuing RLC feedback work.
- Current preview branch: `preview-rlc-qa-polish-2026-07-08`.
- Current checked HEAD at handoff: `fc375b5 fix: harden mobile subpage widths`.
- Exact checked Cloudflare preview: `https://cd7b2703.rlc-1952-recklinghausen.pages.dev`.
- Stable branch preview: `https://preview-rlc-qa-polish-2026-0.rlc-1952-recklinghausen.pages.dev`.
- This pass audited `C:/Users/User/Documents/RLC Update`, including extracted ZIP contents, DOCX screenshot feedback, PDF/image assets, WhatsApp chat export, and voice-note transcripts. Do not commit raw customer exports, audio, screenshots, `.hermes/`, `.agent/`, or secrets.
- Final browser QA used real Chrome/Puppeteer screenshots plus mobile breakpoint checks at 320/360/390/430px across key pages. Keep evidence local; summarize only in tracked handoff docs.
- Production/main was not updated by this preview branch. Do not merge or deploy production until the user accepts the preview and the open gates in `docs/rlc-current-handoff.md` are understood.

### Historical corrected pass (2026-07-06)

- The corrected customer-feedback pass was built from `origin/fix/ui-ux-politur` to match the approved Cloudflare preview ending in `6ea933f8`. That fix is now contained in `origin/main` via `78fab5b merge: release RLC feedback preview`.
- For normal new work, start from current `origin/main` unless the user names a specific trusted preview/branch. For forensic recovery of the July 6 feedback pass, use `a47c236` / `origin/preview-rlc-feedback-pass-2026-07-06-corrected` as the corrected checkpoint.
- Implemented in that pass: latest-news section on `pages/news.html`, green event names on `pages/events.html`, Abendlauf page cleanup/restructure, sponsor/club history/document updates, contact subject prefill and Turnstile payload, gallery structure labels/import cleanup, header stability for `Bilder`, homepage alignment in `Rund um den Verein`, and the current handoff files.
- Verify before handoff: `node --check assets/js/components.js`, `node --check functions/api/contact.js`, `node --check functions/api/contact-config.js`, `node tests/contact-api.test.mjs`, `git diff --check`, plus desktop/mobile browser checks on homepage, news, training, events, Abendlauf, contact, facilities, sponsors, and gallery.
- Still needs owner/deployment confirmation: Cloudflare Turnstile sitekey/`TURNSTILE_SECRET_KEY`, webhook must map `to`/`cc` into real mail delivery, and missing approved PDFs/photos must not be invented.
- Handoff files are intentionally versioned for continuity between agents. Do not commit secrets, private customer exports, screenshots, preview ZIPs, or raw personal data.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- `graphify-out/` is intentionally local and ignored; do not commit graph artifacts unless the user explicitly asks.
- In this Hermes/Windows terminal, prefix Graphify commands with `PYTHONPATH=` (for example `PYTHONPATH= graphify query "<question>"`) so the uv tool does not accidentally import packages from Hermes' own venv.
- For codebase questions, first run `PYTHONPATH= graphify query "<question>"` when graphify-out/graph.json exists. Use `PYTHONPATH= graphify path "<A>" "<B>"` for relationships and `PYTHONPATH= graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `PYTHONPATH= graphify update .` to keep the graph current (AST-only, no API cost).
