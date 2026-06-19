# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-06-19T08:56:33+02:00
Branch: `codex/rlc-customer-go-content-round`
PR: https://github.com/maexftw/recklinghausen/pull/21
Status: Meeting-Feedback ist als Website-Überarbeitungsrunde umgesetzt, gepusht, von Cloudflare gebaut und auf der exakten UI-Preview geprüft. Kein Merge auf `main` ohne finale Abnahme.

## Aktuelle Links

- Kundentauglicher Branch-Alias: https://codex-rlc-customer-go-conten.rlc-1952-recklinghausen.pages.dev
- Exakte UI-/Content-Preview für den geprüften Website-Stand:
  - https://42f1713e.rlc-1952-recklinghausen.pages.dev
  - Cloudflare Deployment: `42f1713e-993d-45e1-8cb6-68dfad58a3b2`
  - Source/Commit: `892598f fix(content): finish RLC feedback list items`
- PR: https://github.com/maexftw/recklinghausen/pull/21
- Cloudflare Pages Projekt: `rlc-1952-recklinghausen`

Hinweis: Handoff-/Docs-only-Commits nach `892598f` erzeugen ebenfalls neue Cloudflare-Preview-URLs, ändern aber nicht die sichtbare Website-UI. Für die jeweils neueste exakte Branch-Spitze immer den erfolgreichen `Cloudflare Pages`-Check im PR oder `wrangler pages deployment list --project-name rlc-1952-recklinghausen` verwenden und kurz HTTP-smoken.

## Git-/Deploy-Stand

- Remote: `https://github.com/maexftw/recklinghausen.git`
- Branch: `codex/rlc-customer-go-content-round`
- PR `#21` ist offen gegen `main`.
- UI-/Content-Commit: `892598fa6e5401e91796eb9438804d062159a8cd`.
- Aktuelle Branch-Spitze kann durch spätere Handoff-/Docs-only-Commits neuer sein; diese Handoff-Commits sind Teil des PRs, aber nicht als weitere UI-Änderung zu werten.
- Rohmaterial aus dem Meeting bleibt untracked und wird durch `.gitignore` geschützt: `Neues Meeting/`.

## In dieser Runde umgesetzt

### Startseite

- Hero-Headline auf `Recklinghäuser Leichtathletik Club.` geändert.
- Jahreszahl `1952` aus der großen Hero-Headline entfernt; nur noch in kleinem Kontext/Claim.
- Dopplung um `Leidenschaft seit 1952` bereinigt.
- Desktop: `Schnelle Wege` bleibt sichtbar.
- Mobile: `Schnelle Wege` wird ausgeblendet, weil dieselben Links weiter unten unter `Rund um den Verein` verfügbar sind.
- Trainerteam-Teaser gekürzt und langfristiger formuliert.

### Aktuelles / News

- News-Seite zeigt jetzt:
  1. eine große neueste Meldung,
  2. zwei weitere aktuelle Meldungen,
  3. danach das Archiv.
- Neue Zwischenrubrik `Weitere aktuelle Beiträge` ergänzt.
- Responsive Grid-Styling für die zwei aktuellen Karten ergänzt.

### Termine / Veranstaltungen

- Intro-Text gekürzt.
- sichtbare Quellenzeile entfernt.
- Abendlauf-Links aus vorheriger Runde bleiben eingebunden: RaceResult, Flyer, 5-km-/10-km-Streckenplan.
- Terminstruktur bleibt auf `Was / Wann / Wo / Anmeldung/Infos` ausgerichtet.

### Training / Trainerteam

- Trainingsfilter bleibt vorhanden, ist mobil/initial eingeklappt.
- Überschriften ohne pflegeintensive Jahreszahl.
- erklärende Texte gekürzt.
- Trainerteam-Karten zeigen weiterhin zentrale Gruppen-/Bereichsinformationen und vermeiden unnötige, schnell veraltende Detailzeilen.
- Trainerfotos bleiben ein Material-/Freigabe-Thema und sind nicht frei erfunden.

### Sportstätten

- separate Kraftraum-Karte entfernt.
- Stadion Hohenhorst ist jetzt als Gesamt-Standort formuliert, nicht mehr eng als reine `Outdoor`-Karte, damit auch Hohenhorst-/Kraftraum-nahe Trainingsgruppen nicht falsch verschwinden.
- alle Trainingsgruppen sind wieder einer Standortkarte zugeordnet.
- Google-Maps-Links und kurzer Eindruck stehen im Vordergrund.
- Stadion-Copyright bleibt sichtbar: `©RVR, 2020 DL-DE/BY-2-0`.

### Kontakt / Mitmachen

- Kontaktformular sendet primär an `/api/contact` über eine Cloudflare Pages Function.
- Honeypot, Pflichtfeldvalidierung und JSON-Antworten ergänzt.
- Wenn der Mail-Zustellweg noch nicht konfiguriert ist oder die Function nicht erreichbar ist, fällt das Formular auf eine vorbereitete E-Mail an `info@rlc1952.de` zurück.
- Wichtiger Gate: echte direkte Formularzustellung ist vorbereitet, aber erst aktiv, wenn `CONTACT_WEBHOOK_URL` und optional `CONTACT_WEBHOOK_TOKEN` in Cloudflare gesetzt und mit einem echten Ziel getestet sind.

### Bildergalerie

- Navigationspunkt `Bilder` ist weiterhin vorhanden und in der Preview erreichbar.

## Verifikation

### Code / Review

- `git diff --check`: OK.
- Inline-JS-/Function-Syntaxchecks: OK.
- Sportstätten-Datencheck:
  - `unmatched_count 0`
  - Stadion Hohenhorst, Vestische Arena und Hohenzollernhalle decken die Trainingsdaten ab.
- `codex review --commit HEAD`: nach mehreren Review-Fixes sauber; keine blockierenden Findings.

### Cloudflare / HTTP

Exakte UI-Preview: `https://42f1713e.rlc-1952-recklinghausen.pages.dev`

HTTP-Smoke mit `curl -L`:

- `200 /`
- `200 /pages/news`
- `200 /pages/training`
- `200 /pages/team`
- `200 /pages/facilities`
- `200 /pages/contact`
- `200 /pages/events`
- `200 /pages/gallery`

Markerchecks:

- Startseite enthält `Recklinghäuser` und `Leichtathletik Club`.
- Kontaktseite enthält `/api/contact`, `mail_delivery_not_configured` und Fallback-Text für vorbereitete E-Mail.
- Newsseite enthält `news-current-container`, `Weitere aktuelle Beiträge` und `subpage-news-current-grid`.

Kontakt-API auf der exakten UI-Preview:

- `POST /api/contact` mit Testdaten liefert aktuell erwartungsgemäß `503 mail_delivery_not_configured`, weil noch kein Mailprovider/Webhook in Cloudflare konfiguriert ist.
- Das ist kein Fake-Erfolg; die UI nutzt dafür den Mailto-Fallback.

### GStack Browser QA

GStack-Report:

- `.gstack/qa-reports/final-preview-892598f-20260619-085510/`

Geprüft auf der exakten UI-Preview `42f1713e`:

- Desktop Startseite:
  - H1: `Recklinghäuser Leichtathletik Club.`
  - `Schnelle Wege`: sichtbar (`display: grid`)
  - horizontaler Overflow: `0`
- Mobile Startseite `375x812`:
  - H1: `Recklinghäuser Leichtathletik Club.`
  - `Schnelle Wege`: ausgeblendet (`display: none`)
  - horizontaler Overflow: `0`
- Seiten geprüft mit Browser-Navigation und DOM-Probe:
  - `/pages/news`
  - `/pages/training`
  - `/pages/team`
  - `/pages/facilities`
  - `/pages/contact`
  - `/pages/events`
  - `/pages/gallery`
- Alle geprüften Seiten: `200`, H1 vorhanden, horizontaler Overflow `0`.
- Trainingsfilter mobil: echtes `<details>`-Element, `open=false`.
- Screenshots:
  - `.gstack/qa-reports/final-preview-892598f-20260619-085510/screenshots/home-desktop-42f1713e.png`
  - `.gstack/qa-reports/final-preview-892598f-20260619-085510/screenshots/home-mobile-42f1713e.png`
  - `.gstack/qa-reports/final-preview-892598f-20260619-085510/screenshots/news-current-42f1713e.png`
  - `.gstack/qa-reports/final-preview-892598f-20260619-085510/screenshots/training-mobile-filter-42f1713e.png`

## Offene Gates vor finalem Livegang / Merge

1. **Kunden-/Maxi-Abnahme der Preview**
   Der aktuelle Stand ist ein Freigabeentwurf, nicht ungeprüft live mergen.

2. **Kontaktformular-Zustellung aktivieren**
   Cloudflare Env Vars setzen:
   - `CONTACT_WEBHOOK_URL`
   - optional `CONTACT_WEBHOOK_TOKEN`
   Danach echten Submit-End-to-End testen.

3. **PagesCMS / Redaktionsübergabe**
   Noch nicht umgesetzt. Dafür braucht es einen eigenen Setup-Schritt: Content-Modell, Branch-Konzept, Editor-Test und Deploy-Test.

4. **Kundenmaterial**
   Noch abhängig von Freigaben/Lieferung:
   - Trainerfotos mit Namen/Zuordnung und Einverständnissen
   - Sportstättenfotos oder Bildquellen/Copyright-Hinweise
   - optionale Telefonnummern / persönliche Kontaktangaben
   - finale Bestätigung weiterer Veranstaltungsmaterialien

5. **Production-Härtung**
   - rechtliche finale Prüfung Impressum/Datenschutz
   - Tailwind-CDN-Warnung vor echtem Production-Livegang separat bewerten/härten

## Wiederanlauf für nächste Session

```bash
cd /home/llm/workspaces/recklinghausen
git fetch origin
git status --short --branch
gh pr view 21 --json url,state,headRefName,baseRefName,statusCheckRollup
wrangler pages deployment list --project-name rlc-1952-recklinghausen | sed -n '1,20p'
```

Kundentauglicher Branch-Alias:

```text
https://codex-rlc-customer-go-conten.rlc-1952-recklinghausen.pages.dev
```

Exakte UI-Preview des geprüften Website-Commits:

```text
https://42f1713e.rlc-1952-recklinghausen.pages.dev
```
