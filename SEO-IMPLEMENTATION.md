# SEO-Implementierung für Physiowerk Bodensee

Stand: 18. September 2026. Ausgangscommit: `19d19869bbfbfd2194947636edcb34817e2e47a2`.

## Status und Geltungsbereich

Die Änderungen sind lokal implementiert und getestet. Sie sind **nicht zu GitHub übertragen und nicht produktiv bereitgestellt**. Die Domain, DNS-Einträge, Hosting-Einstellungen und externen Unternehmensprofile bleiben unverändert. `SITE_ORIGIN` bleibt `https://www.physiowerk-bodensee.de`.

## Was geändert wurde

Alle elf bestehenden öffentlichen Seiten werden serverseitig gerendert. Seitenspezifische Titel, Beschreibungen, Canonicals, Social-Metadaten und strukturierte Praxisdaten stehen bereits im ersten HTML. Die bestehende Code-Aufteilung bleibt bestehen: Der Server und der Browser laden die jeweilige Einstiegsroute vor dem Rendering beziehungsweise der Hydration.

`client/src/seo.ts` ist die gemeinsame Quelle für die Server- und Browserausgabe. `Physiotherapy` wird als `medicalSpecialty` einer `MedicalClinic` verwendet. Adresse, Telefon, vorhandene Social-Profile und sichtbare Öffnungszeiten werden berücksichtigt. Es wurden keine Geokoordinaten, Bewertungen, Qualifikationen oder weiteren Standorte erfunden. Keine selbstbezogenen Bewertungssterne im JSON-LD.

Bekannte URL-Varianten werden mit HTTP 301 auf die vorhandenen Slash-URLs umgeleitet; Query-Parameter bleiben erhalten. Unbekannte Seiten liefern HTTP 404 und `noindex`. Fehlende Mediendateien liefern ebenfalls 404. Gehashte JS-/CSS-Dateien erhalten ein Jahr `immutable`-Cache; HTML bleibt revalidierbar. HTML- und JSON-Ausgaben werden escaped.

Die Titel und Beschreibungen aller elf Seiten wurden überarbeitet. Die H1 auf Startseite, Physiotherapie, Training, Team/Praxis und Kontakt nennt Meckenbeuren. Die Startseite besitzt verständlichere interne Linktexte. Das große Herzmotiv und das Kontakt-Hero verwenden kleinere WebP-Dateien; das Kontaktbild erhält responsive Varianten. Originaldateien bleiben erhalten.

Die wesentlichen Inhalte sind statisch. Google-Rezensionen bleiben bewusst clientseitig geladen. SSR liest keine Cookies, keine Patientendaten und keine privaten Benutzerinformationen und benötigt keine zusätzlichen API-Schlüssel. Bestehende Buchungs-, Kontakt-, Karten- und Förderformulare wurden nicht inhaltlich verändert.

## Installation und Tests

Node.js 22 und die im Projekt festgelegte pnpm-Version verwenden. In einem sauberen Arbeitsverzeichnis:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
PORT=4101 NODE_ENV=production node dist/index.js
```

In einem zweiten Terminal:

```bash
FULL_UA_MATRIX=1 BASE=http://localhost:4101 bash scripts/verify-ssr.sh
```

Der Prüfharness kontrolliert alle elf Seiten einschließlich Körperinhalt ohne JavaScript, Metadaten, Canonical, Social-Image, Weiterleitungen und echte 404-Antworten. Nach jeder Änderung an Routen oder Rendering erneut ausführen. Die gesamte Ausgabe darf nicht ausschließlich aus dem App-Shell bestehen.

Das vorhandene Dockerfile kopiert das vollständige `dist`-Verzeichnis und übernimmt damit auch `dist/server-ssr`. Der Build wurde lokal mit Node getestet; ein Docker-Image wurde in dieser Sitzung nicht gebaut. Ein reiner Static-Host reicht nach dieser SSR-Umstellung nicht aus: Es muss wie im vorhandenen Self-Hosting-Setup der Node-/Express-Prozess laufen.

## Einspielen aus dem Übergabepaket

Das Paket enthält einen Git-Mail-Patch einschließlich Binärbildern und zusätzlich einen vollständigen Quellcode-Snapshot. Bevorzugt den Patch auf einem neuen Branch anwenden, nicht die bestehende Installation überschreiben. Spätere Änderungen im Repository müssen bei Abweichung vom Ausgangscommit zusammengeführt werden.

```bash
git switch -c seo/meckenbeuren
# Zunächst prüfen, ob der Patch auf den aktuellen Stand passt:
git apply --check /pfad/zu/seo-meckenbeuren.patch
# Danach den dokumentierten Commit übernehmen:
git am /pfad/zu/seo-meckenbeuren.patch
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

Bei Konflikten nicht erzwingen und keine unbeteiligten Dateien zurücksetzen. `git am --abort` beendet einen fehlgeschlagenen Einspielversuch. Nach Prüfung kann der Branch über den normalen Repository-/Pull-Request-Prozess übernommen werden. Kein Force-Push ist erforderlich.

## Bereitstellung ohne Domainwechsel

Den bestehenden Hosting-/Coolify-Prozess mit dem neuen Commit neu bauen und bereitstellen. DNS, Domainzuordnung und `SITE_ORIGIN` nicht verändern. Auf separaten öffentlichen Testhosts die Indexierung durch Zugriffsschutz oder `X-Robots-Tag: noindex` verhindern; die Produktionsdomain darf diese Sperre nicht erhalten. Es wurde kein neuer öffentlicher Dauer-Testhost eingerichtet.

Nach Bereitstellung den Prüfharness gegen `https://www.physiowerk-bodensee.de` laufen lassen. Zusätzlich JSON-LD im Schema.org-Validator und Googles Rich Results Test prüfen. Die lokalen Strukturtests sind kein Nachweis einer Google-Rich-Result-Freigabe. Eine manuelle Kontrolle von Buchung und Kontakt darf keine Testanfragen an echte Patienten-/Praxisabläufe senden.

Im Serverlog `[SSR] render failed, serving shell:` beobachten. Dieser Fallback hält die Client-App funktionsfähig, erfüllt jedoch nicht die beabsichtigte vollständige SSR-Ausgabe. Ein solcher Eintrag muss vor Abschluss der Produktionsabnahme behoben werden. Bei Problemen den bisherigen erfolgreichen Deployment-Stand erneut bereitstellen; für den Code einen Revert-Commit statt eines destruktiven Resets verwenden.

## Verifizierte Ergebnisse dieser Sitzung

| Prüfung | Ergebnis |
|---|---|
| TypeScript `pnpm check` | Bestanden |
| Vitest | 71 Tests bestanden; 53 vorhandene plus 18 neue SEO-Tests |
| Produktionsbuild | Client, SSR und Express erfolgreich gebaut |
| Produktions-Crawlerprüfung | 123 Prüfungen bestanden, 0 Fehler |
| Entwicklungs-Crawlerprüfung | 32 Prüfungen bestanden, 0 Fehler |
| Browserprüfung | Elf Routen bei 1440 und 390 px: 22 Ansichten ohne erfasste Hydration-/Laufzeitfehler oder horizontale Überläufe |
| Navigation | Desktop, mobiles Menü und 404-Rücknavigation geprüft |
| HTTP | Sitemap XML, robots Text, unveränderter Canonical-Host, Asset-Cache und fehlende Assets geprüft |
| Produktive SEO-Wirkung | Nicht geprüft; Änderungen noch nicht bereitgestellt |

## Offene externe Maßnahmen

Google Search Console, Bing Webmaster Tools und das Google Unternehmensprofil benötigen Eigentümerzugang. Erst nach erfolgreicher Bereitstellung Sitemap einreichen und Kernseiten prüfen. Kategorie, Geschäftsbezeichnung, Öffnungszeiten, Dienstleistungen und Bilder im Unternehmensprofil sachlich pflegen. Bewertungen nur ehrlich und ohne Anreize oder Vorauswahl erbitten; Antworten dürfen keine Patientendaten oder Behandlung bestätigen. IndexNow ist eine optionale spätere Erweiterung, keine Voraussetzung für dieses Paket.

Es werden keine Top-Platzierung und kein bestimmter Indexierungstermin zugesagt. Suchmaschinen bestimmen Darstellung und Reihenfolge selbst.
