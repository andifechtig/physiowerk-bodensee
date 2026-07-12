# Qualitätsprüfung

## Visuelle Desktop-Abnahme

Alle acht stabilen Routen wurden bei 1440 × 900 Pixeln vollständig gerendert. Header, Proxima-Nova-Typografie, Markenrot, abgerundete Medienflächen, CTA-Hierarchie, Kartenraster, Leistungslisten, Kontaktformular, Footer und lange Rechtstexte sind konsistent. Es wurden keine abgeschnittenen Überschriften, horizontalen Seitenüberläufe oder kontrastarmen Kerntexte festgestellt.

## Visuelle Mobil-Abnahme

Alle acht Routen wurden bei 390 × 844 Pixeln vollständig gerendert. Die Desktop-Navigation wechselt in das fokussierbare Mobilmenü, Hero-Bereiche und Inhaltsgrids stapeln sich in sinnvoller Reihenfolge, Formulareingaben nutzen die volle Breite, Team- und Leistungskarten bleiben lesbar und der Footer ordnet seine Bereiche vertikal. Die sehr lange Datenschutzerklärung bleibt ohne horizontalen Überlauf lesbar.

## Kartenstatus

Die zunächst eingesetzte integrierte Maps-SDK-Ladung wurde in der Vorschau blockiert und deshalb auf die auch von der bisherigen Website verwendete lazy-loaded Google-Maps-`iframe`-Einbettung umgestellt. Adresse, Titel und Zoomstufe 15 sind korrekt konfiguriert. Die automatisierten Full-Page-Screenshots bilden den Cross-Origin-Iframe-Inhalt nicht sichtbar ab; deshalb wird der Netzwerkstatus zusätzlich in den Browserprotokollen geprüft. Die helle Kartenfläche ist in den Screenshots der reservierte Iframe-Bereich und kein Layoutbruch.

## Technische Prüfung

Die Vitest-Suite umfasst Kontaktvalidierung, Honeypot, Telefonnummern-Pattern, DSGVO-Zustimmung, zeitbasierte Plausibilitätsprüfung, Rate-Limit, Datenbankablauf, deaktivierte SMTP-Zustellung, fest definierte spätere Empfängeradresse sowie alle acht kanonischen URLs. TypeScript-Prüfung und Produktionsbuild wurden erfolgreich ausgeführt.
