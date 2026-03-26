# Planung für Logo-Integration und Mitgliederbereich

## 1. Logo in Navigation einbinden

### 1.1 Aktueller Stand
- Das SVG-Logo `RLC-Logo_vector_transparent.svg` ist im Ordner `RLC-Logo_vector` vorhanden
- Die Navigation wird über die Datei `assets/js/components.js` dynamisch generiert
- Das Logo ist bereits in der internen Seite (`pages/internal/index.html`) eingebunden

### 1.2 Zielsetzung
- Logo in die Hauptnavigation auf allen Seiten einbinden
- Konsistente Darstellung auf allen Seiten des Vereins-Websites
- Responsive Design für mobile und Desktop-Ansichten

### 1.3 Umsetzungsschritte
1. Logo in das Header-Element der Navigation einfügen
2. Stilistische Anpassungen für die korrekte Darstellung
3. Responsives Verhalten sicherstellen
4. Testen auf verschiedenen Seiten und Bildschirmgrößen

## 2. Mitgliederbereich Vorschau

### 2.1 Aktueller Stand
- Es gibt bereits eine interne Bereichsstruktur unter `pages/internal/`
- Die Authentifizierungslogik ist in `assets/js/auth.js` implementiert
- Die Zugangsdaten sind in `assets/config/internal-access.json` definiert

### 2.2 Zielsetzung
- Vorschau des Mitgliederbereichs mit passwortgeschütztem Zugang
- UI-Vorschau für interne Kommunikationsplattform
- Unterscheidung zwischen Mitgliedern und Administratoren

### 2.3 Funktionen der Vorschau
1. Login-Funktion für Vorschau-Sitzungen (Name + Rolle)
2. Dashboard mit Benutzerinformationen
3. Zugriffskontrolle basierend auf Rollen (Mitglied/Admin)
4. Navigation zu internen Unterseiten
5. Abmeldungsfunktion

### 2.4 Struktur der internen Seiten
- `pages/internal/index.html` - Startseite mit Login/Vorschau
- `pages/internal/announcements.html` - Interne Mitteilungen
- `pages/internal/training-plans.html` - Trainingspläne
- `pages/internal/documents.html` - Dokumente
- `pages/internal/content-management.html` - Inhalte verwalten (Admin)
- `pages/internal/user-management.html` - Benutzerverwaltung (Admin)

## 3. Technische Umsetzung

### 3.1 Logo Integration
Die Navigation wird in `assets/js/components.js` definiert. Das Logo muss in den Header-Bereich eingefügt werden:

```javascript
const headerHTML = `
<header class="site-shell border-b border-slate-200 dark:border-slate-800">
    <div class="site-shell__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="site-shell__bar flex justify-between items-center h-20">
            <div class="flex items-center space-x-3">
                <a href="${basePath}index.html" class="site-wordmark flex items-center gap-3 focus:outline-none">
                    <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- SVG Logo Content -->
                    </svg>
                    <div class="flex flex-col leading-tight">
                        <span class="font-display font-black text-2xl tracking-tighter text-slate-900 dark:text-white">RLC<span class="text-primary">1952</span></span>
                        <span class="site-submark font-semibold opacity-80">Recklinghausen</span>
                    </div>
                </a>
            </div>
            <!-- Rest der Navigation -->
        </div>
    </div>
</header>
`;
```

### 3.2 Authentifizierungslogik
Die bestehende Logik in `assets/js/auth.js` wird erweitert, um:
- Konsistente Navigation auf allen internen Seiten
- Sicherheitsmaßnahmen für die Vorschau
- Rollenbasierte Zugriffskontrolle

## 4. Umsetzungsschritte

### 4.1 Logo Integration
1. SVG-Inhalt des Logos in `assets/js/components.js` einfügen
2. Stilistische Anpassungen für das Logo
3. Testen auf allen Seiten

### 4.2 Mitgliederbereich Vorschau
1. Überprüfung und Optimierung der bestehenden Authentifizierungslogik
2. Anpassung der Navigation für interne Seiten
3. Sicherstellung der konsistenten Darstellung
4. Testen der Rollenzuweisung (Mitglied/Admin)

## 5. Technische Details

### 5.1 Dateien zur Bearbeitung
- `assets/js/components.js` - Navigation mit Logo
- `assets/js/auth.js` - Authentifizierungslogik
- `pages/internal/index.html` - Startseite des internen Bereichs
- `assets/config/internal-access.json` - Zugangsrechte

### 5.2 Responsive Design
- Das Logo muss auf mobilen Geräten korrekt skaliert werden
- Die Navigation muss für verschiedene Bildschirmgrößen angepasst sein
- Mobile Menü-Struktur bleibt unverändert

## 6. Testplan
1. Überprüfung der Logo-Darstellung auf allen Seiten
2. Testen der Authentifizierung mit verschiedenen Rollen
3. Validierung der Navigation auf internen Seiten
4. Responsive Testing auf verschiedenen Geräten

## 7. Sicherheitshinweise
- Die Vorschau ist rein clientseitig und nicht sicher für echte Daten
- Es wird keine serverseitige Authentifizierung implementiert
- Alle Änderungen in der Vorschau sind nur im Browser lokal gespeichert