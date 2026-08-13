# Self-Hosting der Physiowerk-Bodensee-Website

Diese Anleitung beschreibt den Betrieb der Website auf eigener Infrastruktur, konkret auf einem Hetzner-Server mit **Coolify**. Die Anwendung benötigt keine plattformspezifischen Dienste mehr: Rezensionen, Bilder und Markenelemente sind vollständig im Projekt enthalten.

## Architektur im Überblick

Die Anwendung ist ein Node-Server (Express) mit einem vorgebauten React-Frontend. Der Server liefert die statischen Dateien aus `dist/public` aus und stellt die tRPC-Schnittstelle unter `/api/trpc` bereit. Für das Kontaktformular wird eine MySQL-Datenbank über Drizzle ORM verwendet.

| Bereich | Umsetzung | Externe Abhängigkeit |
| --- | --- | --- |
| Bilder und Markenelemente | Lokale Dateien unter `client/public/images` und `client/public/brand` | keine |
| Google-Rezensionen | Statischer Snapshot in `server/google-reviews-static.ts` | keine |
| Terminbuchung THEORG | iframe auf `proxy.sovd.cloud` | THEORG (unverändert) |
| Schriften | Adobe Typekit über `use.typekit.net` | Adobe Fonts |
| Kontaktformular | MySQL-Speicherung, optional SMTP-Versand | MySQL, optional SMTP |
| Login/OAuth | im öffentlichen Auftritt nicht genutzt | keine |

## Environment-Variablen

Die folgenden Variablen werden in Coolify unter *Environment Variables* der Anwendung gesetzt. Eine vollständige Vorlage liegt als `.env.example` im Repository.

| Variable | Pflicht | Beispiel / Hinweis |
| --- | --- | --- |
| `NODE_ENV` | ja | `production` |
| `PORT` | ja | `3000` |
| `HOST` | empfohlen | `0.0.0.0` |
| `DATABASE_URL` | ja | `mysql://physiowerk:<Passwort>@<Host>:3306/physiowerk` |
| `VITE_APP_TITLE` | ja | `Physiowerk Bodensee GmbH` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | optional | Nur für E-Mail-Weiterleitung des Kontaktformulars |

> Wichtig: Die Datenbank ist **MySQL**, nicht PostgreSQL. Das Drizzle-Schema in `drizzle/schema.ts` verwendet `mysqlTable`, der Server nutzt den `mysql2`-Treiber.

## Datenbank einrichten

Nach dem Start eines MySQL-Dienstes und dem Setzen von `DATABASE_URL` werden die Tabellen mit den mitgelieferten Migrationen erzeugt:

```bash
pnpm install
pnpm db:push
```

Die Anwendung startet auch ohne erreichbare Datenbank; in diesem Fall funktionieren alle Inhalte, lediglich das Absenden des Kontaktformulars schlägt fehl.

## Build und Start

```bash
pnpm install
pnpm build     # erzeugt dist/public (Frontend) und dist/index.js (Server)
pnpm start     # startet den Produktionsserver auf PORT
```

Für den Containerbetrieb liegt ein mehrstufiges `Dockerfile` bei. Coolify erkennt es automatisch und benötigt keine weitere Build-Konfiguration. Der Container stellt unter `/health` einen Health-Check bereit.

## Google-Rezensionen aktualisieren

Die Rezensionen liegen als statischer Snapshot in `server/google-reviews-static.ts`. Zur Aktualisierung werden Bewertung, Anzahl und Rezensionstexte in dieser Datei ersetzt und das Datum in `GOOGLE_REVIEWS_SNAPSHOT_DATE` angepasst. Anschließend genügt ein Commit und ein Redeployment.

Sind die optionalen Variablen `BUILT_IN_FORGE_API_URL` und `BUILT_IN_FORGE_API_KEY` gesetzt, versucht die Anwendung zusätzlich einen Live-Abruf und fällt bei Fehlern automatisch auf den Snapshot zurück.

## Qualitätssicherung

```bash
pnpm check     # TypeScript-Prüfung
pnpm test      # 49 automatisierte Tests
```

Die Testsuite prüft unter anderem, dass keine Verweise auf plattformspezifische CDN- oder Storage-Pfade mehr im Frontend existieren.
