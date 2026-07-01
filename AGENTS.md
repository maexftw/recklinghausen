# Repository Guidelines

## Project Structure & Module Organization

This repository is a static website for RLC 1952. The root `index.html` is the homepage. Public subpages live in `pages/`, with generated news detail pages in `pages/news/`. Shared styles are under `assets/css/`, shared behavior and injected header/footer live in `assets/js/components.js`, and news data is in `assets/js/news_data.js`. News images are stored in `news_assets/`; other assets are under `assets/`, `RLC-Logo_vector/`, and `Termine/`. Cloudflare Pages config is in `wrangler.toml`.

Do not commit local meeting exports, audit artifacts, preview ZIPs, screenshots, or temporary design files.

## Build, Test, and Development Commands

- `python server.py` starts the local static server at `http://localhost:8001`.
- `python sync_news.py` refreshes news images/data from the source archive.
- `python generate_detail_pages.py` regenerates static files in `pages/news/`.
- `python update_js_data.py` updates the compact JavaScript news dataset.
- `npx wrangler pages deploy . --project-name rlc-1952-recklinghausen` deploys the current static root to Cloudflare Pages when authenticated.

There is no npm build step and no framework compile phase.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and vanilla JavaScript. Keep indentation consistent with surrounding files, generally four spaces in HTML and JS. Prefer semantic HTML, descriptive class names, and existing BEM-like patterns such as `subpage-*`, `home-*`, and `site-*`. Put shared navigation/footer changes in `assets/js/components.js` and verify all pages after changing it. Keep generated news output stable; edit the data source/scripts instead of hand-editing many `pages/news/*.html` files.

## Testing Guidelines

There is no formal test framework. Before handing off changes, run the local server and manually check desktop and mobile widths for the touched pages. For navigation, verify header links, mobile menu, footer links, and key CTAs. For content/data changes, check `index.html`, `pages/news.html`, and at least one representative `pages/news/*.html` detail page. For forms or external links, confirm behavior without sending real customer data.

## Commit & Pull Request Guidelines

Recent history uses short imperative messages, often with `fix:` or a concise implementation summary, for example `fix: finalize RLC customer feedback cleanup` or `Implement customer audit fixes`. Keep commits focused. Pull requests should include a short change summary, touched pages, manual test notes, screenshots for visual changes, and any known blockers such as missing approved photos or source material.

## Security & Configuration Tips

Never commit secrets, credentials, private customer exports, or raw personal data. Treat contact forms, DNS/MX changes, and Cloudflare settings as deployment-sensitive; document what was verified and what still needs owner confirmation.
