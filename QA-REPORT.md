# Umfassender Qualitätsbericht

**Projekt:** Physiowerk Bodensee GmbH  
**Prüfdatum:** 12. Juli 2026  
**Geprüfter Umfang:** neun öffentliche Seiten, drei Viewportklassen, Navigation, Accessibility, Performance, SEO, Formulare und externe Integrationen

## Zusammenfassung

Die vollständige Website wurde auf Desktop mit 1440 × 900 Pixeln, Tablet mit 768 × 1024 Pixeln und Mobil mit 390 × 844 Pixeln geprüft. Alle neun kanonischen Seiten wurden vollständig gerendert. Die Navigation, responsiven Raster, Rechtsseiten, Coaching-Tabelle, Formulare und Iframes blieben ohne sichtbaren Seitenüberlauf oder blockierenden Layoutfehler. Sämtliche kanonischen Routen, `robots.txt` und `sitemap.xml` antworteten in der Vorschau mit HTTP-Status 200.[1]

Der Audit führte zu einer dauerhaft beibehaltenen technischen Verbesserung: Die acht Canonical-Weiterleitungen wurden als zentraler, automatisch getesteter Vertrag umgesetzt. Eine anschließend erprobte manuelle Vendor-Chunk-Aufteilung wurde nach einem kritischen Produktionsproblem vollständig zurückgesetzt; die Website verwendet wieder die stabile Vite-Standardausgabe bei weiterhin aktivem Lazy Loading der acht Nicht-Home-Seiten.[2]

| Prüfbereich | Ergebnis | Nachweis |
| --- | --- | --- |
| Navigation und interne Links | Bestanden | Neun Seiten erreichbar; aktive Pill und Hamburger-Menü geprüft |
| Desktop, Tablet und Mobil | Bestanden | Vollständige Screenshots aller Seiten in drei Viewports |
| Accessibility | Bestanden | Fokus-Ringe, Labels, ARIA, Landmarken, H1 und Tastaturziele geprüft |
| Medien und Deployment | Bestanden | Keine großen oder binären Medien in `client/public/` |
| Performance | Stabil | Seiten-Lazy-Loading aktiv; manuelles Vendor-Splitting zurückgesetzt |
| Animationen | Bestanden | UI-Transitionen 160–220 ms; Reduced Motion aktiv |
| SEO | Bestanden | Neun eindeutige Titles, Descriptions, Canonicals und Sitemap-URLs |
| Kontaktformular | Bestanden | Browservalidierung und 13 Formular-/Router-/E-Mail-Tests |
| THEORG | Bestanden | Ressource geladen; 100 % Breite; 750 Pixel Höhe; Fallback-Link |
| WhatsApp | Bestanden | Empfänger Andreas Fechtig und Nachrichtentext bestätigt |
| TypeScript, Tests, Build | Bestanden | 26 Tests, `pnpm check` und `pnpm build` erfolgreich |

## Navigation und Responsivität

Die aktive Hauptseite wird auf Physiotherapie, Training, Team, Karriere, Coaching und Kontakt durch genau eine hellrote Pill mit `aria-current="page"` gekennzeichnet. Impressum und Datenschutz haben bewusst keinen Hauptmenüpunkt; dort wird kein anderer Link fälschlich aktiviert. Auf der Startseite dient das Logo als Home-Link, weshalb kein Inhaltsmenüpunkt aktiv ist. Das kompakte Menü öffnet und schließt synchron mit `aria-expanded`, enthält alle sieben Ziele und hält die aktive Pill korrekt.[1]

Alle Seiten wurden vollständig in den drei Viewports geprüft. Kartenraster wechseln auf Tablet und Mobil in kleinere Spaltenzahlen, Formulare stapeln sich korrekt, lange Rechtstexte behalten eine lesbare Inhaltsbreite und die Coaching-Tabelle bleibt in einem horizontal scrollbaren Container. Der THEORG-Iframe bleibt innerhalb seines Containers und behält seine vorgesehene Höhe.[3]

## Accessibility

Jede Seite besitzt genau eine H1-Überschrift sowie Header-, Navigations-, Main- und Footer-Landmarken. Der gemeinsame Skip-Link führt zu `#main-content`. Native Links und Buttons bleiben in der Tab-Reihenfolge; der Menübutton besitzt `aria-controls` und `aria-expanded`. Alle Kontaktformular-Pflichtfelder sind beschriftet. Der aktive Fokus-Ring wurde mit 3 Pixel Markenrot und 4 Pixel Abstand berechnet. Die FAQ verwendet zugängliche Accordion-Buttons.[4]

## Performance, Medien und Animationen

`client/public/` enthält nur kleine Konfigurationsdateien; keine Datei überschreitet 100 kB und es befinden sich dort keine Bilder oder Videos. Logo und Favicon werden über `/manus-storage/` referenziert. Acht Nicht-Home-Seiten werden mit React `lazy()` geladen. Die Buildausgabe verwendet bewusst wieder Vites stabile Standard-Chunk-Strategie.[2]

Alle UI-Transitionen liegen bei maximal 220 Millisekunden. Buttons verwenden beim Drücken `transform: scale(0.97)`. Der kontinuierliche Lauftext und der Lade-Spinner sind keine Interaktionsübergänge. Der Lauftext läuft nur bei `prefers-reduced-motion: no-preference`; die globale Reduced-Motion-Regel reduziert Animationen und Transitionen bei entsprechender Systemeinstellung.[2]

## SEO

Alle neun Seiten besitzen eindeutige Meta-Titel, nicht leere Meta-Descriptions, korrekte Canonical-URLs und vollständige Open-Graph-Daten. Die Sitemap listet exakt dieselben neun Canonical-URLs einschließlich `/coaching/`. Acht Pfade ohne abschließenden Slash werden auf die korrekten Canonical-Pfade geführt. Der QA-Test prüft diese Verträge dauerhaft bei jedem Testlauf.[2]

## Funktionalität

Die Browservalidierung blockiert ein leeres Kontaktformular, bevor eine API-Anfrage entsteht. Name, E-Mail, Telefon, Nachricht und Einwilligung sind Pflichtfelder mit Labels. Der Honeypot ist aus der Tab-Reihenfolge entfernt und für automatische Ausfüllung deaktiviert. Die Servertests prüfen Schema, Zeitplausibilität, Honeypot, Rate-Limit, Persistenzaufruf und Zustellstatus. Es wurde bewusst keine künstliche Kontaktanfrage in die Produktivdatenbank geschrieben.[5]

Der THEORG-Iframe wurde als geladene Browserressource bestätigt und rendert mit 100 Prozent Breite sowie 750 Pixel Höhe. Alle Termin-CTAs führen auf `/kontakt/#terminbuchung`; ein separater Fallback-Link öffnet die Buchung extern. Der WhatsApp-Link löst korrekt zu Andreas Fechtig auf und enthält den vollständigen Coaching-Nachrichtentext.[5]

## Codequalität und Regression

Die Notfall-Regression umfasst sechs Testdateien mit insgesamt 27 erfolgreichen Tests, einschließlich eines neuen HTML-Korruptionsschutzes. `pnpm check` lief ohne TypeScript-Fehler. `pnpm build` erzeugte Client- und Serverbuild erfolgreich. Die stabile Standardausgabe weist wieder auf den großen gemeinsamen Einstiegschunk hin; die acht Inhaltsseiten bleiben dennoch separat lazy geladen.[6]

## Verbleibende Hinweise

Cross-Origin-Inhalte von THEORG und Google Maps erscheinen in automatisierten Full-Page-Screenshots als helle Fläche. Die tatsächliche Ressourcenladung wurde deshalb zusätzlich programmatisch im Browser geprüft und bestätigt. Die bestehende Datenschutzerklärung wurde als Migrationsstand übernommen; ihre Angaben zu Hosting, Karten, Analyse und Formularverarbeitung sollten unabhängig von der technischen QA weiterhin fachlich-rechtlich auf die produktive Umgebung abgestimmt werden.

## References

[1]: [Navigation und Links](./qa-navigation-and-links.md)  
[2]: [Performance und SEO](./qa-performance-seo.md)  
[3]: [Desktop](./qa-responsive-desktop.md), [Tablet](./qa-responsive-tablet.md) und [Mobil](./qa-responsive-mobile.md)  
[4]: [Tastatur und Fokus](./qa-keyboard-accessibility.md)  
[5]: [Funktionalität](./qa-functionality.md), [THEORG](./theorg-runtime-and-mobile-qa.md) und [WhatsApp](./qa-whatsapp.md)  
[6]: [Korrekturen und Regression](./qa-corrections.md)
