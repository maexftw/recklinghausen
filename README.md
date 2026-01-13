# RLC 1952 Website

Dies ist die Website des Recklinghäuser Leichtathletik Club 1952 e.V.

## Entwicklung

Das Projekt verwendet:
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript

### Struktur
- `index.html`: Startseite
- `pages/`: Unterseiten (News, Kontakt, Team, etc.)
- `assets/`: Bilder und Skripte
- `generate_detail_pages.py`: Generiert statische Detailseiten für News-Artikel aus `news_archive.json`.

## Deployment auf GitHub Pages

Diese Website ist für das Deployment via **GitHub Actions** vorbereitet.

### Einrichtung

1.  Gehe zu **Settings** > **Pages** in deinem GitHub Repository.
2.  Unter **Build and deployment** > **Source**, wähle **GitHub Actions**.
3.  GitHub sollte den Workflow `.github/workflows/deploy.yml` automatisch erkennen.

Sobald du Änderungen auf den `main` Branch pushst, wird die Seite automatisch neu gebaut und veröffentlicht.

### Lokales Testen

Um die Seite lokal zu testen:
1.  Führe `python generate_detail_pages.py` aus, um die News-Artikel zu generieren.
2.  Öffne `index.html` in deinem Browser (oder nutze einen lokalen Server wie Live Server).
