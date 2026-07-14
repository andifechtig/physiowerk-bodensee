# QA: TheraConnect App-Seite

Die Route `/app/` und der neue Startseiten-Teaser wurden vollständig bei 1440 × 900 Pixeln sowie 390 × 844 Pixeln gerendert. Navigation, Hero, Store-Buttons, fünf Vorteilskarten, Downloadbereich, fünf Einrichtungsschritte, Hinweis für bestehende Zugangsdaten, Praxis-Verbindungsbereich, QR-Code und FAQ waren in beiden Ansichten vollständig sichtbar.

Der bereitgestellte TheraCode wird ohne Skalierungsunschärfe über `/manus-storage/theracode-qr_3bdbe30f.png` geladen und in Hero, Downloadbereich, Praxisbereich und Startseiten-Teaser korrekt dargestellt. Auf Mobilgeräten stapeln sich Store-Buttons, Vorteile, Schritte und QR-Bereiche ohne horizontalen Seitenüberlauf. Die aktive App-Navigation verwendet das bestehende Pill-System; Footer und Hamburger-Navigation übernehmen den App-Link aus der zentralen Navigationskonfiguration.

Die DOM-Prüfung bestätigte genau eine H1, den Titel „TheraConnect App – Physiowerk Bodensee“, die Canonical-URL `https://www.physiowerk-bodensee.de/app/`, aktive App-Links mit `aria-current="page"` in Desktop- und Mobilnavigation, drei vollständig geladene QR-Bilder mit aussagekräftigen Alternativtexten, vier korrekte Store-Links und drei zugängliche FAQ-Buttons.

Nach dem öffentlichen Redeployment wurde `https://physiowerk-5xfysgit.manus.space/app/` erneut geöffnet. Nach dem kurzen Lazy-Loading-Zustand renderten Navigation, Hero, QR-Code, Vorteile, Downloadbereich, Einrichtungsschritte, Praxis-Verbindung und FAQ vollständig; Titel und alle Links entsprachen dem geprüften Vorschau-Stand.
