# RLC Update Handoff - 2026-07-06

## Zweck

Diese Datei ist bewusst im Repo, damit neue Agenten den Stand ohne lokale Notizen rekonstruieren koennen.

## Quellen

- Mike-Feedback aus dem Chat
- WhatsApp-Voice 2026-07-01 09:56
- WhatsApp-Voice 2026-07-01 10:20
- Bestehende RLC-Webseite fuer Vereinsgeschichte und PDF-Links

## Voice-Transkript Kurzfassung

09:56:
Header verschiebt sich beim Hover/Aktivzustand von `Bilder`. Auf `Aktuelles`, `Training` und vergleichbaren Hero-Bereichen sind letzte Meta-/Texteintraege zu dunkel bzw. kontrastarm.

10:20:
Auf der Startseite ist im unteren Bereich `Rund um den Verein` noch leichter horizontaler Versatz; Karten/Links sollen sauber auf Linie stehen.

Unsicherer Whisper-Satz `Vater nehmen` wurde nicht als Aufgabe uebernommen.

## Umgesetzt

- `pages/news.html`: Bereich `Neueste Meldungen` rendert die letzten drei News analog zur Startseite.
- `pages/events.html`: Veranstaltungsnamen in Vereinsgruen `#00c78f`, Hero-Icons ergaenzt, unpassender Link `Aktuelle Meldungen ansehen` entfernt.
- `pages/abendlauf.html`: Hero mit Flyer, Platzhalter entfernt, Aufbau Hero/Beschreibung/Anmeldung und Strecken/Bilder/Kontakt.
- `pages/sponsors.html`: Fehlende Vorstandsmails auf `info@rlc1952.de`, Vereinsgeschichte erweitert, Dokumentbereich mit Satzung/JHV und Platzhaltern fuer Schutzkonzept/Ehrenkodex.
- `pages/contact.html` und `assets/js/components.js`: Header-CTA `Mitmachen` setzt `Probetraining`; normaler Kontakt bleibt `Allgemeine Anfrage`.
- `functions/api/contact.js`: Kontakt-Payload mit `to=info@rlc1952.de`, `cc` an Absenderadresse und Cloudflare Turnstile-Pruefung vorbereitet.
- `pages/gallery.html`: Galerie nach Veranstaltung und Datum strukturiert.
- `pages/facilities.html`: Copyright am Stadionbild sichtbar.
- `assets/css/shell.css`: Header-Link-Stabilisierung fuer `Bilder`.
- `assets/css/homepage.css`: `Rund um den Verein`-Karten/Links ausgerichtet.
- `assets/css/subpages.css`: Hero-Meta-Kontrast verbessert, `Aktuelles`-Meta-Text lesbarer gesetzt.

## Verifikation Lokal

- `node --check assets/js/components.js`
- `node --check functions/api/contact.js`
- `node --check functions/api/contact-config.js`
- `node tests/contact-api.test.mjs`
- `git diff --check` nur CRLF-Warnungen
- Browser-Gesamtlauf lokal: 29 Checks, keine Fehler; Desktop/Tablet/Mobile, kein horizontaler Overflow, Header `Bilder` stabil.

## Noch Extern Offen

- Cloudflare Turnstile: `TURNSTILE_SITE_KEY` und `TURNSTILE_SECRET_KEY` im Deployment setzen.
- Mailversand: `CONTACT_WEBHOOK_URL` muss real `to` und `cc` in Mailzustellung mappen.
- Schutzkonzept- und Ehrenkodex-PDF fehlen als freigegebene Dateien. Nicht erfinden.

## Commit-/Deploy-Hinweis

Fuer Preview nicht `main` pushen. Auf Preview-Branch committen und pushen; Cloudflare Pages erzeugt daraus automatisch einen Preview-Link.
