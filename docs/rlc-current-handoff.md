# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-08-12
Branch: `preview-rlc-customer-update-2026-07-21`
Status: Kundenänderungswünsche vom 04.08.2026 (WhatsApp + E-Mail Ludger.eml, Christian Dahmen) umgesetzt, committet und per Browser-Check verifiziert. Commits: `3fbe927` (Content) + `7bef74d` (News-Datum + Trainerfoto-Fix). Preview-URL (stabil): `https://preview-customer-update-2026.rlc-1952-recklinghausen.pages.dev`. Offene Rückfragen: Gespräch mit Daniel (vertragliche Dinge), Bilder-Diskrepanz (2 statt 3 Fotos), Trainerteam-Fotos Barbara/Carsten/Sebastian fehlen.

## Umgesetzt in dieser Runde (2026-08-12, Working Tree – uncommitted)

### Satzung direkt auf der Webseite (Kundenwunsch: nicht verlinken, alte Seite geht offline)
- Neue Seite `pages/satzung.html` mit dem vollständigen Satzungstext (Fassung „gendert", geändert 05.12.2016, in Kraft per 2016) im `legal-page-content`-Stil – eingebunden unter Verein → Dokumente.
- Dokumente-Karte „Satzung" in `pages/sponsors.html` zeigt jetzt „Satzung ansehen" → lokale `satzung.html` statt externe `rlc1952.de`-URL.

### Alle externen rlc1952.de-Links lokalisiert (GoLive-Absicherung)
- `assets/pdf/` neu: `rlc_aufnahmeantrag_2024.pdf`, `Protokoll_JHV26_03_unterschrie.pdf`, `RLC_Laufstrecke_5km_Hohenhorst.pdf`, `RLC_Laufstrecke_10km_Hohenhors.pdf` (alle von der alten Seite gesichert).
- `pages/sponsors.html`: Mitgliedsantrag + Protokoll JHV 2026 → lokale PDFs.
- `pages/abendlauf.html`: 5-km-/10-km-Strecken → lokale PDFs.
- Verifiziert: kein `href="https://www.rlc1952.de/..."` mehr in `pages/*.html` (nur mailto).

### Vorstands-/Trainerbilder (Ludger.eml, 07.08.2026, von Christian Dahmen)
- Nur **2** Bilder in der Mail (nicht 3 wie angekündigt): `PXL_...PORTRAIT.jpg` = Ludger Zander (Sportwart, im Trikot), `UMoschner_01.JPG` = Ulrich Moschner (Trainerteam Sen 1).
- Aufbereitet als WebP: `assets/images/vorstand/vorstand-portrait-05.webp` (Zander), `vorstand-portrait-06.webp` (Moschner); Trainer-Kopien in `assets/images/trainer/trainer-ludger-zander.webp`, `trainer-ulrich-moschner.webp`.
- Vorstandsseite: Ludger Zander-Karte hat jetzt sein Foto (ersetzt Initialen-Platzhalter).
- Trainerteam `pages/team.html`: Foto-Slot ergänzt – Trainer mit Foto zeigen Bild, alle anderen bleiben beim Initialen-Platzhalter. Ludger Zander + Ulrich Moschner haben jetzt Fotos.
- Laut Mailtext gehören **Ludger, Barbara Ziesmer-Praßni, Carsten Praßni, Sebastian Stephani zusätzlich zum Trainerteam** – für Barbara/Carsten/Sebastian sind KEINE Fotos geliefert (Platzhalter bleiben).

### Seiten-Header vereinheitlicht (blauer Kasten)
- Ursache der wahrgenommenen Abweichung: Intro-Layout-Varianten (Training `--visual` mit Bild rechts = schmalere Überschriftsspalte, Termine `--full` volle Breite) plus echte Größen-Ausreißer bei Facilities (`clamp(1.8–2.75rem)`) und News-Intro (`clamp(1.48–2.2rem)`).
- Fix in `assets/css/subpages.css`: Facilities- und News-Intro-Überschriften auf die Standardgröße (`clamp(1.62rem, 2.65vw, 2.55rem)`) gesetzt. Verifiziert: Training, Termine, Facilities, News zeigen jetzt alle **33.337px / weight 400**.
- CSS-Version unverändert `subpages.css?v=15` (kein weiterer Bump nötig, da keine Verlinkung geändert).

### News-Datum: Anzeigezeitraum entfernt (beseitigt falsche Jahresgruppe) [Commit 7bef74d]
- Ursache: Die alte Site legt im `.redDate`-Feld einen **Veröffentlichungszeitraum** ab (z.B. `19. Juli 2026 - 19. Juli 2027`), den der Scraper 1:1 als `date` übernahm. Die Render-Logik extrahiert das **letzte** 4-stellige Jahr → Meldung 10241 (Jonathan Perner EM Rieti) landete fälschlich unter einer eigenen Gruppe **2027** statt 2026.
- Fix: `news_archive.json` bereinigt – 36 Anzeigezeiträume → nur Startdatum; 10 echte 2-Tages-Termine + 2 Monatsbereiche sauber formatiert. Verifiziert per Python: nur 48 `date`-Felder geändert, 0 sonstige Felder, 866→866 IDs.
- Danach `update_js_data.py` + `generate_detail_pages.py` regeneriert. News-Seite zeigt jetzt „36 Meldungen · 1 Jahr", nur Gruppe 2026. Startseite-Daten korrekt (27./20./19. Juli 2026).

### Trainerfoto-Verzerrung/Anschnitt [Commit 7bef74d]
- Ursache: Trainer-Karten fielen auf `object-fit: fill` zurück → 900×1200-Porträt wurde auf die flache Bildzone (~370×129) gestreckt (verzerrt) bzw. bei `cover` der Kopf abgeschnitten.
- Fix in `assets/css/subpages.css`: `body.subpage-team img.subpage-person-card__image { object-fit: cover; object-position: center 24%; }` + höhere Porträt-Bildzone (`clamp(12rem, 18vw, 15.5rem)`) **nur für Karten mit Foto** via `:has(img)`. Initialen-Platzhalter-Karten bleiben flach.
- Verifiziert: Zander + Moschner zeigen jetzt Gesicht/Kopf vollständig, nicht verzerrt.

### Aktuelle News-Meldungen gesichert (Kunde: „inkl. aktueller News-Meldungen")
- Lokales Archiv endete am 06.01.2026 (ID 10193); alte Seite hatte 48 neuere Meldungen (IDs 10194–10243, bis 27.07.2026).
- `scrape_new_news.py` (neu, temporär) holte die 48 Meldungen inkl. 40 Bilder nach `news_assets/`. `news_archive.json`: 818 → 866 Artikel, genau +48, 0 entfernt, 0 Altdaten verändert (verifiziert).
- `generate_detail_pages.py` Template-Bug behoben: hatte veraltetes Head (kein Favicon, `subpages.css?v=11`, `components.js` ohne `?v=3`). Jetzt korrekt: Favicons + `v=15` + `components.js?v=3`. Alle Detailseiten konsistent (0 tracked Dateien verändert, nur die 48 neuen untracked).
- `assets/js/news_data.js` regeneriert → zeigt jetzt die 36 neuesten (bis 27.07.2026: Bronze 4x400m DM, DM Masters, EM Rieti Jonathan Perner). News-Seite + Startseite verifiziert aktuell.
- 8 neue Meldungen ohne Bild sind legitim (Terminankündigungen, Traueranzeige, Trainingsplan/Saison).

## Verifikation dieser Runde
- Browser-QA lokal (http://localhost:8791): Satzung-Seite rendert sauber; Vorstand Zander-Foto; Trainerteam Zander+Moschner mit Foto, Rest Platzhalter; News aktuell bis 27.07.2026; Header-Größe Training/Termine/Facilities/News = 33.337px/400.
- `git diff --check` und Struktur-Checks ok (archiv exakt +48, keine externen rlc1952.de-Links mehr).

## Offene Punkte für den Kunden (Stand 04.08.2026)
1. **Daniel/vertragliche Dinge:** Kunde fragt, ob du (Maxi) schon mit Daniel gesprochen hast – muss beantwortet werden (nicht Website).
2. **Bilder-Diskrepanz:** Kunde schrieb „drei weitere Bilder", Mail enthielt nur 2 (Zander, Moschner). Barbara/Carsten/Sebastian-Fotos fürs Trainerteam fehlen – nachliefern lassen.
3. **Fehlende Materialien (alt, weiter offen):** Mitgliedsbeiträge-PDFs (aktuell + 01.01.2027), Schutzkonzept-Volltext/PDF, Ehrenkodex-PDF.
4. **Schreibweise Trainerin:** „Leni Nefendev" (Excel) vs. „Leni Nefedev" (Repo) – bestätigen.
5. **Vereinsbeschreibung-Text:** zur Freigabe.
6. **Favicon-Variante:** Weiß-auf-Blau umgesetzt, Grün als Alternative.
7. **Sportstätten-Credit-Interpretation** bestätigen.
8. **Zeitplan:** Kunde wollte Umsetzung bis Vorstandssitzung 12.08.2026 (heute) für Veröffentlichungsbeschluss + GoLive.

## Bekannte offene Gates (unverändert)
1. Turnstile: `TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` setzen.
2. Mail: `CONTACT_WEBHOOK_URL` (+ Token) setzen, End-to-End-Test.
3. Domain/DNS, redaktionelle Übergabe (PagesCMS), Tailwind-CDN-Härtung.

---
*Historie untenstehend (Stand 2026-07-21) weiterhin gültig als Referenz.*

---

# RLC Recklinghausen – Runde 2026-07-21 (Referenz)

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

## Design-Review-Pass 2026-07-21 (nach dem Feature-Commit)

Eigener UI/UX-Durchgang über alle in dieser Runde geänderten Seiten (Desktop + Mobile, automatisierte Prüfungen auf Heading-Hierarchie, Textgröße, Zeilenlänge, Touch-Targets, Fonts). Ergebnis: Design-System sauber (nur Inter + Lexend/Montserrat, keine AI-Slop-Muster, keine Farbabweichungen von DESIGN.md, kein Overflow). Zwei echte Befunde behoben (Commit `bb87f94`):

- **Lesebreite Verein-Texte:** Vereinsbeschreibung und Vereinsgeschichte liefen über die volle Panelbreite (~138 Zeichen/Zeile). Jetzt via `.verein-history-text p { max-width: 70ch }` auf komfortable Lesebreite begrenzt.
- **Touch-Targets Inline-Links:** „PDF öffnen", „Seite öffnen" und die Verbandslinks waren auf Mobile nur ~24px hoch. Jetzt `@media (pointer: coarse) .subpage-inline-link { min-height: 2.75rem }` → 44px.
- CSS-Version `subpages.css?v=15`.

Bewusst NICHT geändert (bei Bedarf für eine spätere Runde):

- **Footer-Spaltenüberschriften „Verein"/„Rechtliches" sind `<h4>`** während Seitenabschnitte `<h2>` sind → semantischer Sprung h2→h4 in der Heading-Outline. Betrifft alle 835 Seiten (globales Footer-Template in `components.js`), rein a11y-semantisch, kein sichtbarer Fehler. Fix wäre ein globaler Wechsel auf `<h2>`/`<h3>` im Footer.
- **Kleine Inline-Textlinks „Über Kontaktformular"** in den Trainerkarten (`team.html`, ~20px). Sind Fließtext-Links in einer Definitionsliste, keine eigenständigen Buttons; eine 44px-Erzwingung würde das Kartenlayout brechen. Konvention lässt Inline-Textlinks kleiner zu.
- **Footer-/Meta-/Eyebrow-Text bei 12–14px:** bewusst kleiner als die 16px-Body-Vorgabe, da Labels/Kicker/Footer laut DESIGN.md ausdrücklich sparsam und klein sein dürfen.

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
bb87f94 style(design): UI/UX-Politur nach Design-Review 2026-07-21
2df7a79 feat: umsetzen des Kundenfeedbacks vom 2026-07-17 (19 Punkte + Chat-Nachzügler)
```

Preview-URL immer aus dem Cloudflare-Check-Run extrahieren, nie raten:

```bash
SHA=$(git rev-parse HEAD)
gh api repos/maexftw/recklinghausen/commits/$SHA/check-runs \
  --jq '.check_runs[] | select(.name=="Cloudflare Pages") | .output.summary'
```
