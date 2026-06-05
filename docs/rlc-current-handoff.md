# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-06-05
Branch: `codex/rlc-customer-go-content-round`
Status: lokale Umsetzungsrunde nach Kunden-Go, noch **nicht gepusht** und **nicht deployed**.

## Kontext

Der Kunde hat die nächste Runde abgesegnet. Ziel dieser Runde war:

- Startseite visuell und textlich stärker Richtung Royal Blue / Premium Navy ziehen.
- Neues Bildmaterial gezielt einsetzen, keine Bilderflut.
- Abendlauf am 29.08. als sichtbaren Event vorbereiten.
- Training, Sportstätten, Verein/Partner und Legal-Bereiche aus den neuen Unterlagen vorbereiten.
- Intake-Dateien und Secret-Dateien aus Git heraushalten.

## Branch-/Repo-Scope

- Arbeitsbranch: `codex/rlc-customer-go-content-round`
- Keine Cloudflare-Aktion ausgeführt.
- Kein Push ausgeführt.
- Kein Deploy ausgeführt.
- Intake/Secret-Dateien sind per `.gitignore` aus dem Commit-Scope gehalten:
  - ZIPs
  - DOCX
  - WhatsApp-Export / `_chat.txt`
  - `Neuer Ordner/`
  - `client_secret*.json`

## Umgesetzte Änderungen

### Startseite

- Hero-Bildpfad von altem Mockup-/Sketch-Pfad auf trackbares Asset verschoben:
  - `assets/images/rlc-hero-stadion.jpg`
- Hero-Copy aktualisiert:
  - „Leidenschaft seit 1952. Leichtathletik lebt hier.“
- Stadion-Copyright bleibt sichtbar:
  - `© RVR, 2020, dl-de/by-2-0`
- Royal/Navy-Theme bleibt erhalten.
- Abendlauf-Kachel und Eventtermin ergänzt.
- Schnellwege angepasst: Verein & Vorstand statt reine Partnerlogik.

### Bilder

Neue trackbare Assets:

- `assets/images/rlc-hero-stadion.jpg`
- `assets/images/rlc-training-action.jpg`
- `assets/images/rlc-sportstaetten-stadion.jpg`
- `assets/images/rlc-team-nachwuchs.jpg`
- `assets/images/abendlauf-2025/abendlauf-start-banner.jpg`
- `assets/images/abendlauf-2025/abendlauf-startfeld.jpg`
- `assets/images/abendlauf-2025/abendlauf-start-dynamik.jpg`
- `assets/images/abendlauf-2025/abendlauf-laufgruppe-bahn.jpg`
- `assets/images/abendlauf-2025/abendlauf-waldstrecke.jpg`
- `assets/images/abendlauf-2025/abendlauf-zielgerade.jpg`
- `assets/images/abendlauf-2025/abendlauf-verpflegung.jpg`
- `assets/images/abendlauf-2025/abendlauf-siegerehrung.jpg`

Hinweis: Trainer-Portraits bleiben bewusst „Porträt folgt“, weil komplette Trainerprofile mit Fotos nicht Teil dieser Runde sind.

### Abendlauf

Neue Seite:

- `pages/abendlauf.html`

Enthält:

- Event-Hero für Abendlauf am 29.08.
- Statuskarten: Inhalte in Vorbereitung, Bildauswahl vorhanden, finale Freigabe nötig.
- Galerie mit sechs ausgewählten Motiven.
- CTA zu News/Kontakt.

Offen für finale Kunden-/Vereinsdaten:

- genaue Ausschreibung
- Strecken-/Anmeldedetails
- finale Bildfreigaben
- ggf. Flyer/Download

### Training

- Trainings-Hero-Platzhalter durch echtes RLC-Motiv ersetzt.
- Copy um Einstieg/Probetraining/Mitgliedschaft ergänzt.
- Filterbereich in aufklappbare Disclosure-Struktur überführt.
- Hinweise zu Gültigkeit, Leistungsgruppen und Einstieg unter dem Plan ergänzt.

### Sportstätten

- Hero-Platzhalter durch Stadionbild ersetzt.
- Sportstättenliste auf vier reale/konkrete Orte fokussiert:
  - Stadion Hohenhorst
  - Kraftraum am Stadion Hohenhorst
  - Vestische Arena Alfons Schütt
  - Sporthalle Hohenzollernschule
- Adressen und Google-Maps-Links ergänzt.
- Vestische Arena steht vor Hohenzollernhalle.

### Verein / Partner

`pages/sponsors.html` ist inhaltlich zur Vereinsseite umgebaut:

- Titel/Intro: Verein statt nur Partner.
- Vorstand/Zuständigkeiten eingetragen.
- Hinweise zu Geschichte und noch nicht finalen Unterlagen.
- Partner ergänzt:
  - bodynostic by Lückenotto
  - Sparkasse Vest Recklinghausen
  - Lauflust

Navigation/Footer wurden entsprechend auf „Verein“, „Trainerteam“, „Partner“ angepasst.

### Kontakt / Legal

- Impressum deutlich erweitert:
  - Vereinsname/Postfach/E-Mail
  - vertretungsberechtigter Vorstand
  - Vereinsregister-Hinweis
  - Haftungshinweis externe Links
- Datenschutz-Kurzfassung vorbereitet.
- Datenschutz bleibt mit Hinweis auf rechtliche Prüfung markiert.

## Verifikation

Lokale Vorschau:

```bash
python3 -m http.server 4177 --bind 127.0.0.1
```

HTTP-Smoke: alle geprüft mit `200`:

- `/`
- `/index.html`
- `/pages/training.html`
- `/pages/facilities.html`
- `/pages/sponsors.html`
- `/pages/team.html`
- `/pages/contact.html`
- `/pages/abendlauf.html`
- neue Bildassets unter `/assets/images/...`

Statische Validierung:

- HTML parser: 12 HTML-Dateien, 0 Parse-Fehler
- lokale `src`/`href`-Prüfung: 0 fehlende lokale Ziele
- `node --check assets/js/components.js`: OK
- `node --check assets/js/training_schedule.js`: OK
- `git diff --check`: OK

GStack Headless-Smoke:

- Startseite rendert neuen H1, Hero-Bild lädt, Abendlauf-Link vorhanden, Copyright vorhanden.
- Training rendert 24 Tabellenzeilen und 24 mobile Karten; U10-Filter reduziert auf 3 sichtbare Einheiten.
- Sportstätten rendert 4 Karten, 4 Google-Maps-Links, Vestische Arena vor Hohenzollernhalle.
- Verein rendert Vorstand und 3 Partnerkarten.
- Kontakt rendert Formular, Impressum und Datenschutz-Hinweis.
- Abendlauf rendert Eventseite und 6 Galerie-Bilder.

Visuelle GStack-Screenshots geprüft:

- Desktop/Mobile Startseite: keine harten Layoutfehler, Hero lesbar, CTA sichtbar.
- Mobile Training: keine harten Layoutfehler; Filter und mobile Trainingskarten sichtbar.
- Desktop Abendlauf: Galerie im echten Scroll-Viewport sichtbar; Fullpage-Screenshot kann wegen Browser-Stitching/Lazy-Painting leere Galeriekacheln zeigen, DOM/Network/Viewport sind aber grün.
- Mobile Verein: geprüft, keine harten Layoutfehler gesehen.

Bekannte Console-Warnung:

- Tailwind CDN warnt: `cdn.tailwindcss.com should not be used in production`.
- Das ist kein neu eingeführter App-Fehler, aber ein technischer Production-Hinweis für spätere Build-Härtung.

## Offene Review-Gates

Vor Push/Preview/Deploy noch prüfen lassen:

1. Visuelle Abnahme durch Maxi/Kunde: passt Royal/Navy-Richtung, Startseite und Verein-Struktur?
2. Rechtliche Prüfung/Freigabe von Datenschutz und Impressum.
3. Abendlauf finalisieren: Ausschreibung, Anmeldung, Strecke, Bildrechte/Freigaben.
4. Entscheiden, ob der lokale ältere Commit `f877eaf` plus diese Runde zusammen auf Remote/Preview gehen soll.
5. Danach erst Push/Cloudflare-Preview/QA/Deploy.

## Nächste sinnvolle Schritte

1. Lokalen Stand im Browser/Preview anschauen.
2. Kleine visuelle Korrekturen direkt einarbeiten.
3. Dann Branch pushen und Cloudflare-Preview erzeugen.
4. Preview mit Desktop/Mobile-GStack final testen.
5. Erst danach an Kunden schicken.
