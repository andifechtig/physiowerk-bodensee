# THEORG-Einbettungsprüfung

Der aktive Buchungsbereich wurde auf der Kontaktseite und der Startseite in der Desktopansicht gerendert. Der frühere gestrichelte Platzhalter ist vollständig entfernt. Der neue Bereich enthält die Überschrift „Termin online buchen“, die kurze Bedieninformation und den zugänglichen Fallback-Link zur externen Terminreservierung. Der Iframe-Container hält die vorgesehene Breite, Rundung und eine Höhe von 750 Pixeln.

Die automatisierten Full-Page-Screenshots zeigen Cross-Origin-Iframe-Inhalte als leere weiße Fläche; dies entspricht auch dem bekannten Verhalten bei der eingebetteten Google-Maps-Karte und ist kein Beleg für einen Ladefehler. Im gerenderten DOM ist der Buchungsbereich unter `#terminbuchung` vorhanden, der Navigations-CTA verweist auf `/kontakt/#terminbuchung`, und der externe Fallback-Link verwendet die vom Nutzer bereitgestellte THEORG-URL. Die tatsächliche Frame-Quelle und das Ladeereignis werden zusätzlich programmatisch im Browser geprüft.
