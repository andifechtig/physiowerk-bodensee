# QA: Performance, Medien, Animationen und SEO

Im Verzeichnis `client/public/` liegen ausschließlich kleine Konfigurationsdateien: `robots.txt`, `sitemap.xml`, Versionsdaten und der Entwicklungs-Debug-Collector. Es gibt keine Bild-, Video- oder sonstigen großen Mediendateien und keine Datei über 100 kB. Logo und Favicon werden über dauerhafte `/manus-storage/`-URLs referenziert. Die Inhaltsbilder bleiben bewusst dimensionsgetreue Platzhalter und erzeugen deshalb keine lokalen Medienlasten.

Alle acht Nicht-Home-Seiten werden per React `lazy()` geladen. Zusätzlich wurde die Produktionsausgabe in React-, Daten-, UI- und sonstige Vendor-Chunks getrennt. Der zuvor rund 609 kB große Einstiegschunk sank auf rund 69 kB; der größte verbleibende JavaScript-Chunk ist `react-vendor` mit rund 401 kB. Die Build-Warnung für Chunks über 500 kB ist damit behoben.

Sämtliche UI-Transitionen liegen zwischen 160 und 220 Millisekunden. Buttons verwenden `transform: scale(0.97)` im aktiven Zustand. Die längeren Animationen sind ausschließlich der kontinuierliche Lauftext und der Lade-Spinner; der Lauftext ist an `prefers-reduced-motion: no-preference` gebunden, während die globale Reduced-Motion-Regel Animationen und Transitionen bei entsprechender Systemeinstellung auf praktisch null reduziert.

Alle neun Seiten besitzen eindeutige Meta-Titel, nicht leere Meta-Descriptions, korrekte Canonical-URLs und vollständige Open-Graph-Daten. Die Sitemap enthält exakt Startseite, Physiotherapie, medizinisches Training, Team, Karriere, Coaching, Kontakt, Impressum und Datenschutz. `robots.txt` verweist auf diese Sitemap. Acht nicht-kanonische URLs ohne abschließenden Slash werden über einen zentral getesteten Redirect-Vertrag auf ihre Canonical-Pfade geführt.
