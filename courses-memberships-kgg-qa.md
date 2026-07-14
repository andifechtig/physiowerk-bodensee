# QA: Präventionskurse, Mitgliedschaften und KGG

Die neue Route `/kurse/`, der Startseiten-Teaser, die Trainingsseite und die Physiotherapie-Seite wurden vollständig bei 1440 × 900 Pixeln sowie 390 × 844 Pixeln gerendert. Navigation, Hero, Erstattungs-Hinweis, Kursformate, „Prävention digital“, Teilnahmeablauf und Kontakt-CTAs blieben in beiden Ansichten ohne horizontalen Seitenüberlauf.

Die drei Mitgliedschaftskarten zeigen Wellpass, sechs Monate zu 60 Euro pro Monat und zwölf Monate zu 50 Euro pro Monat klar getrennt. Auf Mobilgeräten stapeln sich die Karten, wobei das zwölfmonatige Angebot weiterhin visuell hervorgehoben bleibt. Die KGG-Leistung erscheint in der bestehenden Leistungsübersicht mit physiotherapeutischer Anleitung, vier Trainingszielen, Heilmittelverordnung, medizinischem Trainingsbereich und maximal drei Teilnehmenden.

Die Erstattungsangabe wird ausdrücklich als mögliche, kassen- und kursabhängige Bezuschussung beschrieben. Direkt neben der Prozentangabe steht der Hinweis, dass eine Kostenerstattung nicht pauschal garantiert werden kann und vorab bei der Krankenkasse geprüft werden sollte.

Die DOM-Prüfung bestätigte genau eine H1, den Titel „ZPP-Präventionskurse – Physiowerk Bodensee“, die Canonical-URL `https://www.physiowerk-bodensee.de/kurse/`, aktive Kurslinks mit `aria-current="page"` in Desktop- und Mobilnavigation, den vollständigen Erstattungs-Hinweis, „Prävention digital“ und beide Kursanfrage-CTAs.

Nach dem öffentlichen Redeployment wurde `https://physiowerk-5xfysgit.manus.space/kurse/` erneut geöffnet. Nach dem kurzen Lazy-Loading-Zustand renderten Navigation, Hero, Kursformate, Erstattungsbereich, Digitalangebot, Teilnahmeablauf und Kursanfrage vollständig.
