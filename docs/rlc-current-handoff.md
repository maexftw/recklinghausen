# RLC Recklinghausen – aktueller Arbeitsstand

Stand: 2026-06-18T17:50:00Z
Branch: `codex/rlc-customer-go-content-round`
Status: Kundenbestätigung aus Meeting liegt vor; die nachgereichten Abendlauf-Infos sind eingearbeitet, lokal mit GStack Browse geprüft und Review-Gate wurde gegen den aktuellen Commit ausgeführt.

## Links

- PR: https://github.com/maexftw/recklinghausen/pull/21
- Stabiler Branch-Alias: https://codex-rlc-customer-go-conten.rlc-1952-recklinghausen.pages.dev
- Projekt: `rlc-1952-recklinghausen`
- Letzte vor dieser Handoff-Korrektur geprüfte commit-spezifische Branch-Preview:
  - `https://fe269b1a.rlc-1952-recklinghausen.pages.dev`
  - Source: `709a4aa`
- Vorheriger Direct Deploy aus lokalem Archiv: https://63b66c98.rlc-1952-recklinghausen.pages.dev

Hinweis: Jede Docs-only-Handoff-Korrektur erzeugt bei Cloudflare Pages eine neue commit-spezifische Preview-URL. Für den jeweils neuesten exakten Link die erfolgreiche `Cloudflare Pages`-Check-Run-URL im PR oder `wrangler pages deployment list --project-name rlc-1952-recklinghausen` verwenden. Die sichtbaren UI-Inhalte stammen aus dem UI-/Content-Commit `7e7477a`; spätere Commits in diesem Branch sind Handoff-Dokumentation.

## Git-/Deploy-Stand

- Remote: `https://github.com/maexftw/recklinghausen.git`
- Branch: `codex/rlc-customer-go-content-round`
- PR: `#21`, offen gegen `main`
- UI-/Content-Commit: `7e7477a feat(content): finalize RLC photos and preview copy`
- Handoff-/Docs-Commits danach:
  - `a9c015c docs: update RLC final preview handoff`
  - `709a4aa docs: record RLC gbrain sync limitation`
- Branch ist auf GitHub gepusht und trackt `origin/codex/rlc-customer-go-content-round`.
- Cloudflare Pages Check im PR war zuletzt grün für die Branch-Spitze.

## Nachtrag 2026-06-18 – Kundenbestätigung und Abendlauf-Unterlagen

Neu eingearbeitet:

- RaceResult-Anmeldung: `https://my.raceresult.com/397333/info`
- 5-km-Streckenplan: `https://www.rlc1952.de/assets/pdf/RLC_Laufstrecke_5km_Hohenhorst.pdf`
- 10-km-Streckenplan: `https://www.rlc1952.de/assets/pdf/RLC_Laufstrecke_10km_Hohenhors.pdf`
  - Wichtig: Die Kunden-URL mit `Hohenhors.pdf` ist korrekt erreichbar (`200 application/pdf`). Die naheliegende Schreibweise `Hohenhorst.pdf` liefert `404` und darf nicht automatisch korrigiert werden.
- Neuer Flyer aus dem Workspace wurde als Website-Asset abgelegt:
  - PDF: `assets/pdf/abendlauf-2026-flyer.pdf`
  - Vorschau: `assets/images/abendlauf-2026-flyer.jpg`

Sichtbare Änderungen:

- `pages/abendlauf.html`: primärer Anmelde-CTA, Flyer-Download, Flyer-Vorschau, Startzeit, Gebühr, 5-km-/10-km-Streckenlinks und Rückfrage-CTA.
- `pages/events.html`: Abendlauf-Karte mit RaceResult, Flyer und Streckenlinks.
- `index.html`: Startseiten-Termintext mit Startzeit ergänzt.
- `assets/js/components.js`: `Bilder` als eigener Navigationspunkt in Desktop-, Mobile- und Footer-Navigation.
- `assets/css/subpages.css`: Ressourcen-/Flyer-Karten und Event-Linkleisten ergänzt.

Neue Review-/QA-Evidenz:

- Externe Linkprüfung:
  - RaceResult: `GET 200 text/html`
  - 5-km-PDF: `HEAD 200 application/pdf`
  - 10-km-PDF Kunden-URL: `HEAD 200 application/pdf`
  - 10-km-PDF mit korrigierter Schreibweise: `404`
- Lokaler HTTP-Smoke auf `127.0.0.1:52835`: `200` für `/`, `/index.html`, `/pages/events.html`, `/pages/abendlauf.html`, `/pages/gallery.html`, `/assets/pdf/abendlauf-2026-flyer.pdf`, `/assets/images/abendlauf-2026-flyer.jpg`.
- Lokale Referenzprüfung: `index.html`, `pages/abendlauf.html`, `pages/events.html`, `pages/gallery.html` ohne fehlende lokale `href`/`src`-Referenzen.
- GStack Browse:
  - Abendlauf Desktop: Inhalte/Links vorhanden, keine Browser-Fehler außer bekannter Tailwind-CDN-Warnung.
  - Abendlauf Mobile 375px: `scrollWidth=clientWidth=375`, keine horizontale Überläufe.
  - Screenshots unter `.gstack/qa-reports/abendlauf-info-20260618-173819/screenshots/`.
- `codex review --commit HEAD`: ein P2-Hinweis zur vermeintlich falsch geschriebenen 10-km-URL; als False Positive unterdrückt, weil URL real erreichbar und die naheliegende Korrektur nicht erreichbar ist.

## Was finalisiert wurde

### Fotos / Assets

- Abendlauf-Galerie wurde auf 9 echte, weboptimierte Motive erweitert:
  - `assets/images/abendlauf-2025/abendlauf-start-banner.jpg`
  - `assets/images/abendlauf-2025/abendlauf-startfeld.jpg`
  - `assets/images/abendlauf-2025/abendlauf-start-dynamik.jpg`
  - `assets/images/abendlauf-2025/abendlauf-laufgruppe-bahn.jpg`
  - `assets/images/abendlauf-2025/abendlauf-waldstrecke.jpg`
  - `assets/images/abendlauf-2025/abendlauf-zielgerade.jpg`
  - `assets/images/abendlauf-2025/abendlauf-verpflegung.jpg`
  - `assets/images/abendlauf-2025/abendlauf-siegerehrung.jpg`
  - `assets/images/abendlauf-2025/abendlauf-stadion-atmosphaere.jpg`
- Team-/Nachwuchs-Intro nutzt jetzt ein höherwertiges Vereinsalltag-/Sprintmotiv:
  - `assets/images/rlc-team-nachwuchs.jpg`
- Rohmaterial bleibt aus Git herausgehalten:
  - ZIPs
  - DOCX
  - WhatsApp-Export / `_chat.txt`
  - `Neuer Ordner/`
  - `client_secret*.json`

### Copy / sichtbare Platzhalter

- Abendlauf-Seite wirkt nicht mehr wie ein vorbereiteter Platzhalter.
- `Details folgen` und `Porträt folgt` wurden aus den geprüften Kundenflächen entfernt.
- Kontaktseiten-Hinweis wurde von „Spezielle Details folgen bei Bedarf“ auf kundenfähige Formulierung geändert.
- Externe `placeholder.com`-Fallbacks wurden aus den geprüften HTML-Flächen entfernt.
- Der frühere sichtbare `ROYAL / NAVY` Theme-Schalter bleibt entfernt.

### Geänderte Dateien im UI-/Content-Commit

- `index.html`
- `pages/abendlauf.html`
- `pages/team.html`
- `pages/contact.html`
- `assets/images/rlc-team-nachwuchs.jpg`
- `assets/images/abendlauf-2025/abendlauf-startfeld.jpg`
- `assets/images/abendlauf-2025/abendlauf-start-dynamik.jpg`
- `assets/images/abendlauf-2025/abendlauf-laufgruppe-bahn.jpg`
- `assets/images/abendlauf-2025/abendlauf-siegerehrung.jpg`
- `assets/images/abendlauf-2025/abendlauf-stadion-atmosphaere.jpg`

## Verifikation

### Lokal

- Lokaler Static Server auf `127.0.0.1:52835`.
- HTTP-Smoke: `200` für:
  - `/`
  - `/index.html`
  - `/pages/abendlauf.html`
  - `/pages/team.html`
  - `/pages/training.html`
  - `/pages/facilities.html`
  - `/pages/contact.html`
  - `/pages/news.html`
  - `/pages/membership-info.html`
- Statische Bildreferenzprüfung: `missing_img_refs=0`.
- Textflags geprüft: kein `Porträt folgt`, kein `Details folgen`, kein `placeholder.com`, kein `ROYAL/NAVY` in den geprüften Flächen.
- `git diff --check`: OK vor Commit.

### Cloudflare Preview Snapshots

HTTP/Marker:

- `200 /`
- `200 /pages/abendlauf`
- `200 /pages/team`
- `200 /pages/contact`
- `200 /assets/images/abendlauf-2025/abendlauf-stadion-atmosphaere.jpg`
- `200 /assets/images/rlc-team-nachwuchs.jpg`
- Marker auf `/pages/abendlauf`:
  - `Bildauswahl online`: vorhanden
  - `Stadionatmosphäre`: vorhanden
  - `abendlauf-stadion-atmosphaere.jpg`: vorhanden
  - `Details folgen`: nicht vorhanden
  - `Porträt folgt`: nicht vorhanden

GStack Browser:

- Startseite: `missing` images = `0`; keine geprüften Placeholder-/Debugflags.
- Abendlauf-Galerie: alle 9 Bilder geladen, `naturalWidth > 0`.
- Desktop-Screenshot Startseite geprüft.
- Desktop-Element-Screenshot der Abendlauf-Galerie geprüft: alle 9 Bilder sichtbar, keine leeren Karten.
- Mobile-Screenshot Startseite bei 375px geprüft: Hero/Navigation/Content stabil.

QA-Artefakte der geprüften Snapshots:

- `.gstack/qa-reports/final-content-pass-20260609-075909/screenshots/git-preview-home-fa4cb371.png`
- `.gstack/qa-reports/final-content-pass-20260609-075909/screenshots/git-preview-abendlauf-gallery-fa4cb371.png`
- `.gstack/qa-reports/final-content-pass-20260609-075909/screenshots/git-preview-home-mobile-fa4cb371.png`
- `.gstack/qa-reports/final-content-pass-20260609-075909/screenshots/git-preview-home-a9c015c.png`
- `.gstack/qa-reports/final-content-pass-20260609-075909/screenshots/git-preview-home-709a4aa.png`

## Bekannte technische Hinweise

- Tailwind-CDN-Warnung ist weiterhin in der Browser-Konsole sichtbar:
  - `cdn.tailwindcss.com should not be used in production`
- Das ist für Besucher nicht sichtbar, sollte aber vor finalem Livegang/Production-Härtung separat gelöst werden.
- Die aktuelle Preview ist kundenfähig als finaler Zwischenstand/Freigabe-Link, aber nicht als Production-Merge ohne finales Review-Gate zu behandeln.

## GBrain / GStack

- GStack Browse wurde für lokale und Cloudflare-Preview-QA genutzt und ist für diesen Final-Check grün.
- GBrain-CLI ist installiert (`gbrain 0.42.26.0`) und diese Worktree ist gepinnt über `.gbrain-source`:
  - `gstack-code-c1d3b65a-240242`
- GBrain ist für diese Runde **nicht als grün geladen** zu werten:
  - `gbrain sync --source gstack-code-c1d3b65a-240242` lief, aber die statischen HTML-Seiten wurden als nicht suchbare Code-Pages behandelt.
  - `gbrain put` für den finalen Handoff und eine Kurzfassung scheiterte mit `[embed(ollama:nomic-embed-text)] Bad Request`.
  - `ollama` ist in dieser WSL-Umgebung nicht auf PATH und `127.0.0.1:11434` war nicht erreichbar.
- Verlässlicher Wiederanlauf ist deshalb: GitHub PR, dieser Handoff und Cloudflare-Preview. GBrain semantische Suche erst nach Reparatur/Start der lokalen Embedding-Engine wieder als Quelle nutzen.

## Offene Gates vor Merge/Production

1. Maxi/Kunde finale visuelle Abnahme der Preview.
2. Rechtliche finale Prüfung von Datenschutz/Impressum, falls das als Production-Inhalt gelten soll.
3. Entscheidung, ob Tailwind-CDN vor Livegang gehärtet wird.
4. Optional später: `pages/sponsors.html` sauber als Vereinsseite/URL migrieren. Nicht ohne Abstimmung umbenennen.

## Kundentext-Vorschlag

```text
Hier ist der aktuelle finale Preview-Stand der Website:
https://codex-rlc-customer-go-conten.rlc-1952-recklinghausen.pages.dev

Bilder, Abendlauf-Seite, Navigation und die wichtigsten Inhalte sind jetzt sauber eingearbeitet und auf Desktop sowie mobil geprüft. Bitte einmal in Ruhe durchklicken und Bescheid geben, ob aus eurer Sicht noch letzte Text- oder Bildkorrekturen fehlen.
```
