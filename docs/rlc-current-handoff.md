# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-07-21
Branch: `preview-rlc-customer-update-2026-07-21`
Content-Commit: `2df7a79 feat: umsetzen des Kundenfeedbacks vom 2026-07-17 (19 Punkte + Chat-Nachzügler)`
Status: Gebündeltes Kundenfeedback vom 2026-07-17 (Excel, 19 Punkte) plus vier Chat-Nachzügler vom 09./10.07. wurden umgesetzt und mit lokalem Browser-QA (60 Checks: 12 Seiten × Desktop + 320/360/390/430 px) verifiziert. Kundenfreigabe steht noch aus.

## Source of Truth

- Canonical repo: `https://github.com/maexftw/recklinghausen`
- Canonical local worktree: `D:/Arbeit/0_ACTIVE/Recklinghausen`
- Canonical Cloudflare Pages project: `rlc-1952-recklinghausen`
- Produktion (main): https://rlc-1952-recklinghausen.pages.dev
- Feedback-Quellen dieser Runde:
  - `2026-07-17 RLC Neue Homepage - Feedback.xlsx` (19 Punkte, Melder: Barbara, Christina, Mike, Carsten, Ludger) – nicht committen
  - WhatsApp-Chatverlauf bis 20.07. (Chat-Nachzügler vom 09./10.07.)
- Keine Roh-Exporte, Screenshots, `.hermes/`, `.agent/`, `.claude/` oder Excel/WhatsApp-Dateien committen (.gitignore erweitert).

## Umgesetzt in dieser Runde (Commit 2df7a79)

### Trainingszeiten (Excel P1, P2, P3, P5)

- Dienstag U10: Trainer jetzt Carsten Praßni, Maja Rothers.
- Donnerstag U12 und U14: Trainer jeweils Barbara Ziesmer-Praßni & Max Esther.
- U6: Linda Beerhorst ergänzt (jetzt Nefedev, Ribbrock, Beerhorst).
- Montag U14: 17:00–18:30 Uhr (vorher bis 19:00).

### Training-Bugfixes (P4, P14)

- Altersgruppen-Filter U8/U10/U12/U14 repariert. Root Cause: `pages/training.html` enthielt echte Backspace-Bytes (0x08) an den Stellen, wo `\b`-Word-Boundaries in den Filter-Regexes stehen sollten – die Filter konnten nie matchen. U6/U16/Erwachsene funktionierten nur über ihre `includes()`-Fallbacks. Byte-Fix auf `\b`, alle Filter liefern jetzt korrekte Treffer.
- Doppelter Hero-Meta-Eintrag entfernt: „Stand" und „Gültig" zeigten beide `meta.validRange`; „Stand" wurde entfernt, Meta-Row auf 3 Einträge umgestellt.

### Termine (P13, P18)

- „Kalender"-Chip aus dem Hero entfernt (alle Viewports, konsistent Desktop/Mobile).
- Kategorien: Stadtmeisterschaften → „Wettkampf", Silvesterlauf → „Laufveranstaltung" (Abendlauf war bereits „Laufveranstaltung").

### Verein-Seite `pages/sponsors.html` (P8, P15, P16)

- Neue Abschnitts-Reihenfolge: Hero → Vereinsbeschreibung (neu) → Vereinsgeschichte → Vorstand → Dokumente → Partner; Hero enthält Anker-Chips zu allen fünf Bereichen.
- Vereinsbeschreibung wurde neu getextet (aus vorhandenem Material abgeleitet, keine erfundenen Fakten) – **Kundenfreigabe für den Text einholen**.
- Marc Manderlas Portrait (`vorstand-portrait-04.webp`): eigener Fokuspunkt `object-position: center 34%` (Modifier `subpage-person-card__image--focus-low`), Gesicht jetzt vollständig sichtbar.
- Footer-Link „Dokumente" → `sponsors.html#dokumente`.

### Dokumente & Schutzkonzept (P6, P7, P17)

- Mitgliedsantrag: verlinkt auf das aktuelle PDF der alten Website (`rlc1952.de/assets/pdf/rlc_aufnahmeantrag_2024.pdf`, Stand Okt. 2024).
- Mitgliedsbeiträge (aktuell) und Mitgliedsbeiträge ab 01.01.2027: als „folgt"-Karten angelegt – **PDFs vom Verein nachliefern lassen**.
- Neue Seite `pages/schutzkonzept.html`: Anspruch, Ansprechperson (Christina Sip), Hinweis auf ausstehenden Volltext; im Footer unter „Rechtliches" verlinkt. **Schutzkonzept-Text/PDF weiterhin offen.**
- Ehrenkodex bleibt „folgt"-Karte.

### Footer-Rubrik Links (P11)

- Neue Seite `pages/links.html` mit FLVW, DLV, SSV RE, KSB RE (alle `target="_blank"`); nur im Footer verlinkt, nicht im Hauptmenü.

### Favicon (P12)

- Weißer RLC-Läufer (aus dem Logo extrahiert) auf Vereinsblau `#0B1F3D`: `favicon.ico` (Root) + `assets/images/favicon/` (32/192/apple-touch); in allen 835 HTML-Seiten verlinkt.
- Alternative „grüner Läufer auf Weiß" liegt als Vergleichsbild lokal vor (nicht committet) – dem Kunden zur Wahl zeigen.

### Trainerteam (P9, P10)

- Standard-Sortierung alphabetisch nach Nachname; Umschalter „Nach Trainingsgruppe" (U6 → Erwachsene/Senioren) als Chip-Toggle im Teamverzeichnis.

### Galerie (P19)

- Kleinere, vollständig sichtbare Kacheln (`object-fit: contain`, auto-fill-Grid ab 13rem).
- Gruppen nach Veranstaltung mit Datum, zeitlich absteigend sortiert (`data-event-date`).
- Lightbox-Viewer: Klick öffnet Overlay mit Bildunterschrift, Vor/Zurück, Escape, „Originalgröße"-Link (neuer Tab); Kacheln sind echte Links aufs Original (Fallback ohne JS/Mittelklick).

### Chat-Nachzügler (09./10.07., nicht in der Excel)

- Sportstätten-Copyright: der lose Credit-Text im Kartenkörper (mutmaßlich Mikes „Kommentar muss noch entfernt werden") wurde als Overlay auf das Stadionbild der Karte gelegt – gleicher Stil wie im Hero. **Interpretation dem Kunden bestätigen lassen** (Screenshot aus dem Chat lag nicht vor).
- Mobile-Bug „fehlende Zwischenüberschriften" (iPhone 16, 10.07.): auf aktueller Produktion und lokal nicht mehr reproduzierbar – wurde durch `fc375b5` behoben. Verifiziert.
- Grüne Veranstaltungstitel auf der Startseite: bereits umgesetzt, verifiziert.

### Responsive-Fixes

- Vorstandskarten-Overflow bei 320 px behoben: Team-Grid mobil auf `minmax(0, 1fr)`, lange E-Mail-Adressen mit `overflow-wrap: anywhere`.
- Asset-Versionen gebumpt: `subpages.css?v=14`, `components.js?v=3`, `training_schedule.js?v=3`.

## Verifikation

- Puppeteer-QA: 12 Seiten × 5 Viewports (Desktop, 320, 360, 390, 430) = 60 Checks. Ergebnis: kein horizontaler Überlauf, keine kaputten Bilder, keine Konsolen-/Seitenfehler. Einzige Ausnahme: lokaler 404 auf `/api/contact-config` (Cloudflare Function, existiert nur im Pages-Deploy – kein Bug).
- Screenshots: Verein (Desktop + 320), Galerie inkl. Lightbox, Training, Termine mobil, Trainerteam, Links, Sportstätten – visuell geprüft.
- `node --check` components.js/training_schedule.js OK; `node tests/contact-api.test.mjs` OK; `py_compile` OK; `git diff --check` OK.
- Filter-Verifikation Training: U6=1, U8=1, U10=3, U12=3, U14=3, U16-U23=4, Erwachsene=3, Senioren=6 Einheiten.

## Offene Punkte für die Kundenrückmeldung

1. **Fehlende Materialien:** Mitgliedsbeiträge-PDFs (aktuell + ab 01.01.2027), Schutzkonzept-Text/PDF, Ehrenkodex-PDF, weitere Vorstands-/Trainerfotos. Nichts erfinden.
2. **Schreibweise Trainerin:** Excel sagt „Leni Nefendev", Repo durchgehend „Leni Nefedev" – bestätigen lassen.
3. **Vereinsbeschreibung:** neuer Text zur Freigabe.
4. **Favicon-Variante:** Weiß-auf-Blau ist umgesetzt; grüne Variante als Alternative anbieten.
5. **„Kommentar entfernt"-Interpretation** (Sportstätten-Credit) bestätigen lassen.
6. Mike wartet seit 20.07. auf Rückmeldung zu Machbarkeit + Zeitplan.

## Bekannte offene Gates (unverändert aus dem 2026-07-10-Release)

1. Turnstile: `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` in Cloudflare setzen.
2. Mailzustellung: `CONTACT_WEBHOOK_URL` (+ optional `CONTACT_WEBHOOK_TOKEN`) setzen, dann echter End-to-End-Test.
3. Domain/DNS, redaktionelle Übergabe (PagesCMS), Tailwind-CDN-Härtung vor finaler Produktion.

## Restart-Checkliste für die nächste Session

```bash
cd 'D:/Arbeit/0_ACTIVE/Recklinghausen'
git fetch --all --prune
git status --short --branch
git log --oneline -5 --decorate
```

Erwarteter Stand für dieses Handoff:

```text
preview-rlc-customer-update-2026-07-21
2df7a79 feat: umsetzen des Kundenfeedbacks vom 2026-07-17 (19 Punkte + Chat-Nachzügler)
```

Preview-URL immer aus dem Cloudflare-Check-Run extrahieren, nie raten:

```bash
SHA=$(git rev-parse HEAD)
gh api repos/maexftw/recklinghausen/commits/$SHA/check-runs \
  --jq '.check_runs[] | select(.name=="Cloudflare Pages") | .output.summary'
```
