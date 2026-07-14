# QA: Live-Google-Rezensionen

Der vorhandene Google-Places-Proxy identifizierte das Business-Profil **Physiowerk Bodensee** an der Tettnanger Straße 14 eindeutig über die Place-ID `ChIJYW-ZsXQFm0cRQVoX1sckuA8`. Der Place-Details-Abruf lieferte die Gesamtbewertung, Bewertungsanzahl und fünf aktuelle Google-Review-Objekte. Rezensionen ohne Text werden nicht dargestellt und durch keinerlei statischen Ersatzinhalt ergänzt.

Die Startseitenprüfung rendert aktuell vier von Google bereitgestellte Rezensionen mit nicht leerem Text. Jede Karte enthält fünf Sterne, den verlinkten Google-Autorennamen, ein semantisches `time`-Element mit absolutem Datum und die sichtbare Attribution `Google Maps` mit `translate="no"`. Die Zusammenfassung zeigt 5,0 Sterne bei 43 Google-Bewertungen und verlinkt auf das Google-Business-Profil.

Google-Review-Inhalte werden nicht in der Datenbank oder in statischen Dateien gespeichert. Nur die laut Google-Richtlinie dauerhaft speicherbare Place-ID ist fest konfiguriert. Bei jedem neuen Startseitenaufruf wird Place Details serverseitig live abgerufen. Bei Ausfall werden ausschließlich ein neutraler Fehlerzustand und ein Link zu Google Maps angezeigt – niemals gespeicherte oder erfundene Rezensionstexte.[1]

Die vollständige Startseite wurde mit geladenen Live-Daten bei 1440 × 900 Pixeln sowie 390 × 844 Pixeln geprüft. Auf Desktop verteilt sich die Auswahl auf drei Spalten; auf Mobilgeräten stapeln sich die Karten ohne horizontalen Seitenüberlauf. Lange Rezensionstexte umbrechen innerhalb der Karte, Sterne, Name, Datum und Attribution bleiben sichtbar.

## References

[1]: https://developers.google.com/maps/documentation/places/web-service/policies "Policies and attributions for Places API"
