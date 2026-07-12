# QA: Tastatur und Fokus

Die Hauptnavigation verwendet native Links; das Hamburger-Steuerelement ist ein natives `<button type="button">` mit `aria-controls="mobile-navigation"` und synchronisiertem `aria-expanded`. Alle sieben Ziele der kompakten Navigation besitzen `tabIndex=0` und sind damit in der natürlichen Tab-Reihenfolge erreichbar. Der aktive Coaching-Link führt als einziges mobiles Ziel `aria-current="page"`.

Ein fokussierter aktiver Desktop-Link erfüllte `:focus-visible` und zeigte den berechneten Fokus-Ring `3px solid rgb(230, 55, 70)` mit `4px` Abstand. Das Stylesheet enthält eine globale `:focus-visible`-Regel, sodass derselbe sichtbare Ring für Links, Buttons, Formularfelder und den im mobilen Breakpoint sichtbaren Menübutton gilt. Die globale `prefers-reduced-motion`-Regel ist ebenfalls vorhanden. Das Öffnen und Schließen des Hamburger-Menüs mit aktualisiertem `aria-expanded` wurde separat mit asynchroner Zustandsprüfung bestätigt.
