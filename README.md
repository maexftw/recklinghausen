# RLC 1952 Website

Statische Website fuer den Recklinghaeuser Leichtathletik Club 1952 e.V.

Das Repo ist bewusst auf den Website-Kern reduziert. Es soll fuer Mitwirkende schnell lesbar sein: oeffentliche Seiten, gemeinsam genutzte Styles und Skripte, Hosting-Konfiguration und die minimale News-Pflegekette.

## Was hier drin ist

- `index.html`: Startseite.
- `pages/`: oeffentliche Unterseiten wie News, Training, Team, Kontakt, Galerie und Mitgliedschaft.
- `pages/news/`: generierte News-Detailseiten.
- `assets/css/`: globales Styling, Design-Tokens und Subpage-Layouts.
- `assets/js/components.js`: gemeinsame Navigation, Footer, Theme-Toggle und Shared Shell.
- `assets/js/news_data.js`: kompakter News-Datensatz fuer Startseite und News-Archiv.
- `news_assets/`: lokale Bilder fuer News-Beitraege.
- `wrangler.toml`: Deployment-Konfiguration fuer Cloudflare Pages.

## Technischer Aufbau

- Reine statische HTML/CSS/JS-Seite ohne Build-Toolchain.
- Shared UI-Komponenten werden clientseitig ueber `assets/js/components.js` eingebunden.
- Die News-Uebersicht laeuft ueber `assets/js/news_data.js`; Detailseiten liegen statisch unter `pages/news/`.
- Externe Laufzeit-Abhaengigkeiten:
  - Tailwind per CDN
  - Google Fonts
  - Material Icons
- Deployment-Ziel: Cloudflare Pages mit Root-Ausgabe gemaess `wrangler.toml`.

## Lokal starten

Im Repo-Root:

```bash
python server.py
```

Danach ist die Website unter `http://localhost:8001` erreichbar.

## Wo man typischerweise aendert

- Inhalte und Seitenstruktur: `index.html`, `pages/*.html`
- Gemeinsame Navigation / Footer / Theme-Verhalten: `assets/js/components.js`
- Styling: `assets/css/*.css`
- News-Ausspielung auf Startseite und Archiv: `assets/js/news_data.js`
- News-Bilder: `news_assets/`

## News-Pflege

Die oeffentliche Website nutzt zur Laufzeit nur die generierten Dateien. Fuer Pflege und Aktualisierung bleiben die folgenden Hilfsdateien bewusst im Repo:

- `news_archive.json`: groesserer Rohdatenbestand fuer News
- `scraper.py`: Scraping-Quelle
- `sync_news.py`: synchronisiert lokale Bilder und aktualisiert `assets/js/news_data.js`
- `generate_detail_pages.py`: erzeugt statische Detailseiten in `pages/news/`
- `update_js_data.py`: kleinere Datenaktualisierung

Praktisch bedeutet das:

1. Rohdaten aktualisieren
2. lokale Bilder synchronisieren
3. Detailseiten neu generieren
4. Ergebnis im Browser pruefen

## Bereinigter Repo-Zuschnitt

Nicht mehr Teil dieses Repos sind:

- interner Demo-Bereich
- KI-/IDE-Artefakte
- Audit- und Lighthouse-Reports
- Export-ZIPs und Entwurfsreste
- Seiten-Prototypen und Screens

Das Ziel ist, dass externe Mitwirkende hier nur noch das sehen, was fuer die Website und ihre Pflege wirklich relevant ist.

## Hinweis fuer Mitwirkende

- Dieses Repo ist kein App-Framework-Projekt, sondern eine statische Site.
- Bitte keine neuen lokalen Tooling-, Meeting-, Audit- oder Export-Dateien einchecken.
- Wenn Header/Footer oder globale Navigation geaendert werden, immer `assets/js/components.js` mitpruefen.

## Bekannter Befund

`pages/gallery.html` verweist aktuell auf fehlende Dateien unter `assets/img/gallery-*.png`. Das ist ein bestehender Inhaltspunkt und nicht Teil des Repo-Cleanups.
