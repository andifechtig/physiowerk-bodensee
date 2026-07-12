# Kritischer Produktionsfix: weiße Seite mit Diff-Symbolen

## Reproduktion

Die veröffentlichte Startseite zeigte ausschließlich `@@ - + @@ - - + + + + + +` auf weißem Hintergrund. Der Produktions-DOM enthielt keinen gerenderten React-Inhalt; die Zeichen standen direkt im ausgelieferten HTML.

## Ursache

`client/index.html` enthielt hinter dem schließenden `</html>` versehentlich wörtliche Patch-/Diff-Zeilen aus einer früheren Bearbeitung. Vite übernahm diese Zeilen in `dist/public/index.html`, wodurch sie als sichtbarer Text ausgegeben wurden. Gleichzeitig blieb der React-Root nach dem Deployment mit der neu eingeführten manuellen `manualChunks`-Aufteilung leer. Weil diese Optimierung zeitlich mit dem Produktionsausfall zusammenfiel und für die Funktion nicht erforderlich ist, wurde sie vollständig auf die stabile Vite-Standardausgabe zurückgesetzt.

## Korrektur

Die HTML-Einstiegsdatei wurde vollständig neu und valide geschrieben. Sie endet nun exakt mit `</html>`, enthält `lang="de"`, den React-Root und das Modulskript, jedoch keinerlei Diff-Artefakte. Die manuelle Vendor-Chunk-Konfiguration wurde aus `vite.config.ts` entfernt. Ein neuer Regressionstest verhindert künftig HTML-Dateien mit `@@`-, `+`- oder `-`-Patchzeilen und prüft React-Root sowie Moduleinstieg.

## Technischer Nachweis

Nach der Korrektur bestanden 27 Tests sowie die TypeScript-Prüfung. Der Produktionsbuild wurde erfolgreich erzeugt. `dist/public/index.html` enthält den React-Root und keine Diff-Artefakte; die Datei endet sauber mit `</html>`. Die abschließende Browser- und Produktionsprüfung erfolgt vor beziehungsweise unmittelbar nach dem Notfall-Redeployment.

Die Browserregression der korrigierten Vorschau zeigte auf Startseite, Physiotherapie, medizinischem Training, Team, Karriere, Coaching, Kontakt, Impressum und Datenschutz wieder Navigation, Hero und reguläre Inhalte. Die mobile Start- und Datenschutzansicht renderten ebenfalls vollständig mit Hamburger-Menü, Hero und Textinhalten. Die zuvor sichtbaren Diff-Symbole waren nicht mehr vorhanden.

Anschließend wurden alle neun Seiten nochmals als vollständige Desktop-Langbilder über die gesamte Seitenhöhe erfasst. Startseite, beide Leistungsseiten, Team, Karriere, Coaching, Kontakt, Impressum und die vollständige Datenschutzerklärung renderten bis zum Footer. Navigation, Heroes, Inhaltssektionen, THEORG-Bereich, Formular und Rechtsinhalte waren vorhanden; keine Seite zeigte die vorherigen Sonderzeichen oder einen leeren React-Root.
