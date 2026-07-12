# QA: Formular, THEORG und Terminbuchung

Das Kontaktformular wurde ohne Eingabe personenbezogener Daten geprüft. Alle fünf Pflichtfelder – Name, E-Mail, Telefon, Nachricht und Datenschutz-Einwilligung – besitzen zugängliche Labels und melden im leeren Zustand korrekt ungültig. Ein programmatischer Absendeversuch des leeren Formulars wurde durch die native Browservalidierung blockiert; es entstand keine Kontakt-API-Anfrage.

Das Honeypot-Feld `website` besitzt `autocomplete="off"`, `tabIndex=-1` und liegt im visuell versteckten Honeypot-Container. Die vorhandenen Server-Tests decken Zod-Validierung, Zeitplausibilität, Honeypot, Rate-Limit, Persistenz und Zustellstatus ab.

Der THEORG-Iframe lud als Browserressource erfolgreich. Quelle und zugänglicher Titel stimmen, die gerenderte Größe betrug im kompakten Browser 676 × 750 Pixel. Alle drei sichtbaren „Termin online buchen“-Links auf der Kontaktseite zeigen einheitlich auf `/kontakt/#terminbuchung`. Ein externer Fallback-Link öffnet dieselbe THEORG-Seite separat.
