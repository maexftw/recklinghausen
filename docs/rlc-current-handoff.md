# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-07-08T16:47:47+02:00
Branch: `preview-rlc-qa-polish-2026-07-08`
HEAD: `fc375b5 fix: harden mobile subpage widths`
Status: Kundenfeedback-Bundle aus `C:\Users\User\Documents\RLC Update` wurde ausgewertet, sichtbare Feedbackpunkte wurden auf einem Preview-Branch umgesetzt, gepusht, von Cloudflare gebaut und mit echten Browser-/Screenshot-Checks geprüft. Kein Merge auf `main` und keine Production-Aktualisierung ohne finale Abnahme.

## Source of Truth

- Canonical repo: `https://github.com/maexftw/recklinghausen`
- Canonical local worktree: `D:/Arbeit/0_ACTIVE/Recklinghausen`
- Canonical Cloudflare Pages project: `rlc-1952-recklinghausen`
- Do not use old/archived worktrees as deploy source, especially:
  - `C:/Users/User/Documents/antigravity/happy-chandrasekhar`
  - `D:/Arbeit/9_ARCHIVE/Alt V1/Recklinghausen`

## Current preview links

- Exact commit preview checked after the final mobile fix:
  - https://cd7b2703.rlc-1952-recklinghausen.pages.dev
  - Cloudflare status: Deploy successful
  - Source/Commit: `fc375b55157bf8e950b1c8d5b8418e27957f5f12`
- Stable branch preview:
  - https://preview-rlc-qa-polish-2026-0.rlc-1952-recklinghausen.pages.dev

Note: Cloudflare truncates/normalizes long branch aliases. Always extract preview URLs from the successful `Cloudflare Pages` check-run; do not guess them.

## Customer feedback sources reviewed

Feedback folder: `C:/Users/User/Documents/RLC Update`

Inventory checked:

- `Textdokument (neu).txt`
- `WhatsApp Chat - Dev_ Neue RLC-Hompage (1).zip`
- ZIP extracted folder: `extracted-2026-07-06/`
- `extracted-2026-07-06/_chat.txt`
- `extracted-2026-07-06/00003033-RLC_Webseite_Feedback_Desktopansicht.docx`
- DOCX embedded media/screenshots: 20 media files were detected and reviewed via local contact sheets.
- `extracted-2026-07-06/00003042-Abendlauf2026-komprimiert_A4.pdf`
- `extracted-2026-07-06/00003022-Logo sparkasse.pdf`
- `extracted-2026-07-06/00003023-Lauflust Recklinghausen Logo.svg`
- `extracted-2026-07-06/00003024-Bodynostic_logo_Abmessungen.odt`
- `extracted-2026-07-06/00003047-PHOTO-2026-06-22-12-27-56.jpg`
- `WhatsApp Ptt 2026-07-06 at 08.58.59.transcript.txt`
- `WhatsApp Ptt 2026-07-06 at 08.58.59.transcript.srt`
- `WhatsApp Ptt 2026-07-01 at 09.56.23.ogg`
- `WhatsApp Ptt 2026-07-01 at 10.20.24.ogg`

Important evidence notes:

- The two PDFs `Logo sparkasse.pdf` and `Abendlauf2026-komprimiert_A4.pdf` yielded no extractable text. They were treated as visual/image PDFs and rendered/reviewed as assets, not as textual requirement documents.
- The two older 2026-07-01 WhatsApp voice notes were transcribed during the final audit. They confirmed these points: header stability at `Bilder`, hero-link contrast, and alignment of `Rund um den Verein` cards.
- Raw customer exports, audio files, screenshots, contact sheets, and local QA artifacts must not be committed.

## Implemented / verified customer-visible work

### Source-drift recovery

- Corrected the wrong-base problem reported by the customer: the preview is back on the dark-blue hero direction, not the old/bright stale stand.
- The forbidden old mobile/start-page copy `Alles Wichtige in Menü-Reihenfolge` is absent.
- Intermediate/old “Alles über den Verein” style headings are not present on the current homepage.

### Homepage

- Dark blue hero restored/preserved.
- `Schnelle Wege` remains desktop-only and is hidden on mobile.
- `Der Verein auf einen Blick` is removed.
- `Rund um den Verein` cards are in menu-like order and are aligned in rows on desktop.
- Homepage term cards link to event details.
- Footer Instagram icon/text is visible.

### News / Aktuelles

- News page shows a latest-news/current-post structure.
- Print function is removed.
- Latest/current news cards render without broken-image findings in the final screenshot/browser pass.

### Termine / Veranstaltungen

- Event names use the green club accent.
- Unfitting `Aktuelle Meldungen ansehen` link is removed from Rückfragen.
- `Quelle`, `Details folgen`, and stale placeholder-style event text are removed from the current checked preview.
- `RLC 1952 / ...` labels were removed from event `Wer` entries after final review.
- Event cards expose structured details for `Was / Wann / Wo / Wer / Anmeldung`.

### Abendlauf

- Abendlauf page is structured as: Hero, Beschreibung, Anmeldung & Strecken, Bilder, Kontakt.
- Flyer image/PDF, RaceResult registration, 5-km route PDF, and 10-km route PDF are linked.
- Duplicate/awkward RaceResult CTA repetition was reduced; the current page keeps the external RaceResult link in the Anmeldung card.

### Training / Trainerteam

- Training filter remains available and is initially collapsed/mobile-friendly.
- U6 filter behavior was checked in earlier QA and no customer-blocking issue remains.
- Trainer/team cards use readable placeholders where approved photos are missing; no invented trainer photos.

### Sportstätten

- Stadion Hohenhorst copyright remains visible.
- `OUTDOOR` marker is used instead of the old `BAHN` wording.
- Standalone Kraftraum card was removed.
- `Zum Trainingsplan` CTA is removed from facilities.
- Hall/location placeholders remain honest where approved photos/source material are missing.

### Kontakt

- Contact page hero/content is shortened.
- `Und jetzt?` block is removed.
- Legal `Impressum/Datenschutz auf einen Blick` block is removed from the contact content area.
- Direct website form exists and posts to `/api/contact`.
- Turnstile markup/payload support exists, but preview config currently has no site key until Cloudflare env vars are set.

### Galerie

- Gallery is accessible as its own page/menu item.
- Filter buttons are present and visible.
- Old unnecessary training-time/end links are absent.
- Gallery cards/images render in the screenshot pass.

## Final verification performed

### Cloudflare deploy

- Commit `fc375b5` pushed to `preview-rlc-qa-polish-2026-07-08`.
- Cloudflare Pages check completed successfully.
- Exact preview URL from the check-run: `https://cd7b2703.rlc-1952-recklinghausen.pages.dev`.

### Remote route / marker smoke

Remote preview `cd7b2703` checked on these representative routes:

- `/`
- `/pages/events.html`
- `/pages/abendlauf.html`
- `/pages/contact.html`
- `/pages/facilities.html`
- `/pages/gallery.html`
- `/api/contact-config`

Observed at final smoke stage:

- Routes returned HTTP 200.
- Homepage no longer contains `Alles Wichtige in Menü-Reihenfolge`.
- Events page no longer contains `RLC 1952 /`, `Aktuelle Meldungen ansehen`, or `Details folgen`.
- Abendlauf contains the flyer, 5-km link, 10-km link, and one RaceResult registration URL.
- Contact page no longer contains `Und jetzt` or the removed legal overview block.
- Facilities contains copyright and `OUTDOOR`, and does not contain `Zum Trainingsplan`.
- Gallery has expected filters.
- `/api/contact-config` currently returns an empty Turnstile key object until env vars are configured.

### Browser / screenshot QA

Browser QA was done with real Chrome/Puppeteer rendering, not only code/string checks.

Final screenshot evidence folders are local QA artifacts and intentionally not committed:

- Desktop/final mixed screenshot pass:
  - `.hermes/rlc-feedback-sources/final-browser-check-169b7dde/`
- Final mobile breakpoint pass after the mobile-width fix:
  - `.hermes/rlc-feedback-sources/mobile-breakpoint-check-cd7b2703/`
  - Contact sheet: `.hermes/rlc-feedback-sources/mobile-breakpoint-check-cd7b2703/mobile-contact-sheet.jpg`

Remote mobile QA after `fc375b5`:

- Base: `https://cd7b2703.rlc-1952-recklinghausen.pages.dev`
- Pages checked: `/`, `/pages/news.html`, `/pages/events.html`, `/pages/abendlauf.html`, `/pages/training.html`, `/pages/contact.html`, `/pages/facilities.html`, `/pages/gallery.html`
- Widths checked: `320`, `360`, `390`, `430`
- Total checks: `32`
- Result: no problems reported.
- No horizontal overflow.
- No console errors/request failures from the checked pages.
- Mobile menu opens and is visible.
- Mobile home keeps `Schnelle Wege` hidden.

Extra regression checks from the 2026-07-01 voice notes:

- Header/nav dimensions are stable across `Bilder`/Gallery and other pages.
- Hero links no longer have the old black-on-dark low-contrast problem.
- `Rund um den Verein` cards align in rows with consistent heights on desktop.

### Code / syntax checks

- `node --check assets/js/components.js`: OK.
- `node --check functions/api/contact.js`: OK in earlier pass when contact was checked.
- `node --check functions/api/contact-config.js`: OK in earlier pass when contact was checked.
- `node tests/contact-api.test.mjs`: OK in earlier pass (`contact-api selftest ok`).
- `git diff --check`: OK after the final mobile CSS fix.

## Known open gates before merge / production

1. Customer/Maxi acceptance of the current preview.
   - The preview is customer-ready for review, but not merged to `main` and not production-live.

2. Turnstile/Captcha activation.
   - Required Cloudflare env vars:
     - `TURNSTILE_SITE_KEY`
     - `TURNSTILE_SECRET_KEY`
   - Current `/api/contact-config` returns an empty site key until these are set.

3. Real contact-mail delivery.
   - `CONTACT_WEBHOOK_URL` must be configured in Cloudflare.
   - Optional `CONTACT_WEBHOOK_TOKEN` if the webhook requires auth.
   - Then perform a real end-to-end submit test with owner-approved test data.
   - Do not claim real mail delivery until this is verified.

4. Missing approved materials.
   - Schutzkonzept PDF.
   - Ehrenkodex PDF.
   - Approved trainer photos / board photos / location photos where desired.
   - Do not invent these assets.

5. Production/domain/redaktionelle Übergabe.
   - Domain/DNS and PagesCMS/editorial workflow are separate go-live tasks.
   - Tailwind CDN warning should be evaluated/hardened before final production if required.

## Restart checklist for the next agent/session

```bash
cd 'D:/Arbeit/0_ACTIVE/Recklinghausen'
git fetch --all --prune
git status --short --branch
git log --oneline -5 --decorate
```

Expected current branch/HEAD for this handoff:

```text
preview-rlc-qa-polish-2026-07-08
fc375b5 fix: harden mobile subpage widths
```

Confirm the exact Cloudflare preview from the latest check-run instead of guessing:

```bash
SHA=$(git rev-parse HEAD)
gh api repos/maexftw/recklinghausen/commits/$SHA/check-runs \
  --jq '.check_runs[] | select(.name=="Cloudflare Pages") | .output.summary'
```

Then smoke the current preview and only report success if the actual URL returns expected content.
