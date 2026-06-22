# RLC Recklinghausen Website — Agent Guide

This repo is the static website for Recklinghäuser Leichtathletik Club 1952 e.V.

## Default operating mode: GStack-first

For any website, GitHub, preview, QA, deploy, or production task, work in the GStack flow instead of ad-hoc shell commands.

Start by stating the active flow/phase in plain language, for example:

- `/ship`: repo check → checks → preview/main → production verification
- `/qa` or `/qa-only`: browser/HTTP QA → findings/evidence → fixes or report
- `/review`: diff review → findings → fixes or handoff
- `/design-review`: responsive/spacing/visual QA → screenshots/findings
- `/investigate`: reproduce → root cause → smallest verified fix

When the user's wording is ambiguous or Git terminology is wrong, briefly correct the workflow before acting. Example: if the user says “push the preview branch to main”, interpret it as: verify the preview branch, confirm it fast-forwards from `origin/main`, run checks, push/merge safely, then verify production. Do not blindly run `git push origin HEAD:main` without explaining the step.

## Required GitHub / deploy safety checks

Before pushing, merging, or deploying:

1. Verify repo identity and branch state:
   ```bash
   git status --short --branch
   git remote -v
   git branch --show-current
   git log --oneline --decorate --graph --max-count=20 --all
   ```
2. Check whether `origin/main` is an ancestor of the candidate branch:
   ```bash
   git fetch origin main
   git merge-base --is-ancestor origin/main HEAD
   ```
3. Inspect untracked/unstaged files and stage only intentional files.
4. Run relevant checks listed below.
5. Push the preview branch first when applicable.
6. Move to `main` only via PR/merge or a verified fast-forward. Never force-push unless the user explicitly approves and the risk is explained.
7. Verify Cloudflare/GitHub checks and smoke the live URL after production deploy.

## Repo-specific checks

This is a static HTML/CSS/JS site with no build toolchain.

Baseline checks:

```bash
git diff --check origin/main..HEAD
node --check assets/js/components.js
[ -f assets/js/news_data.js ] && node --check assets/js/news_data.js
[ -f assets/js/training_schedule.js ] && node --check assets/js/training_schedule.js
python3 -m py_compile server.py generate_detail_pages.py scraper.py sync_news.py update_js_data.py tools/component_qa.py
```

Local smoke:

```bash
python3 server.py
# Then smoke key routes:
# /, /pages/training.html, /pages/abendlauf.html, /pages/events.html, /pages/contact.html
```

Production smoke after deploy:

```bash
curl -L -sS -o /tmp/rlc-home.html -w '%{http_code}\n' https://rlc-1952-recklinghausen.pages.dev/
curl -L -sS -o /tmp/rlc-training.html -w '%{http_code}\n' https://rlc-1952-recklinghausen.pages.dev/pages/training.html
curl -L -sS -o /tmp/rlc-abendlauf.html -w '%{http_code}\n' https://rlc-1952-recklinghausen.pages.dev/pages/abendlauf.html
curl -L -sS -o /tmp/rlc-contact.html -w '%{http_code}\n' https://rlc-1952-recklinghausen.pages.dev/pages/contact.html
```

Cloudflare Pages status:

```bash
wrangler pages deployment list --project-name rlc-1952-recklinghausen
```

## Communication rule for Maxi

Maxi sometimes uses Git/GitHub terms loosely. Do not treat that as exact low-level command intent. Translate it into the safe flow, briefly explain the step, then execute only after the prerequisite checks pass.

Examples:

- “Push Preview auf Main” → “I will verify the preview branch, check fast-forward safety, push/update preview, then move that exact commit to main and verify production.”
- “Ist live?” → Check Cloudflare/GitHub state and HTTP-smoke production, do not answer from memory.
- “Mach GStack-Flow” → Name the matching GStack skill/phase and follow its gates.

## Scope discipline

- Do not add app frameworks, build systems, or new dependencies unless explicitly needed.
- Prefer small static HTML/CSS/JS fixes.
- Keep customer-facing wording plain and nontechnical.
- Do not commit local meeting notes, audit scratch files, exported zips, or tool artifacts unless explicitly requested.
- Do not delete Cloudflare resources.

## Current known repo shape

- `index.html`: homepage
- `pages/`: public subpages
- `pages/news/`: generated news detail pages
- `assets/css/`: shared styles and design tokens
- `assets/js/components.js`: shared navigation/footer/theme behavior
- `assets/js/news_data.js`: compact news dataset
- `wrangler.toml`: Cloudflare Pages config with `pages_build_output_dir = "."`
