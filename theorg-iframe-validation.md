# THEORG-Iframe-Prüfung

**Geprüfte URL:** `https://4d6a4d304e4445363152753455457a4437657765302b5151.proxy.sovd.cloud/otrs`

Die URL war am 12. Juli 2026 im Browser erreichbar und lieferte die Seite „Terminreservierung“. Sichtbar waren die Startseite des Online-Reservierungssystems, eine optionale Anmeldung und der auswählbare Leistungsbereich „Therapieleistungen“. Es wurde keine Anmeldung und keine Terminbuchung durchgeführt.

Die HTTP-Antwort lieferte Status `200` und `Content-Type: text/html; charset=Windows-1252`. Es wurden weder ein `X-Frame-Options`-Header noch eine `Content-Security-Policy` mit blockierender `frame-ancestors`-Regel ausgeliefert; die Seite ist daher serverseitig grundsätzlich einbettbar. Das lokale curl-CA-Bundle konnte die Zertifikatskette nicht vollständig auflösen, während Chromium die Seite ohne sichtbare Zertifikatswarnung lud. Die finale Einbettung wird deshalb zusätzlich in der Webvorschau und nach Deployment visuell geprüft.
