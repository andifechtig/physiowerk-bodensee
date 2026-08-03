import { Link, useLocation } from "wouter";
import { useEffect, useState, type PropsWithChildren } from "react";
import { ArrowUpRight, CalendarDays, Facebook, Instagram, Menu, X } from "lucide-react";
import {
  BOOKING_CONFIG,
  BRAND_ASSETS,
  CONTACT,
  NAVIGATION,
  OPENING_HOURS,
  SOCIAL_LINKS,
} from "@/site-config";

function isActive(currentPath: string, href: string) {
  return currentPath === href || currentPath === href.slice(0, -1);
}

export function BookingLink({ className = "" }: { className?: string }) {
  return (
    <a className={`booking-button ${className}`} href={BOOKING_CONFIG.directUrl}>
      <CalendarDays aria-hidden="true" />
      <span>Termin online buchen</span>
    </a>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <div className="site-shell header-inner">
        <Link href="/" className="brand-link" aria-label="Physiowerk Bodensee – Startseite">
          <img
            src={BRAND_ASSETS.logo}
            width="202"
            height="73"
            alt="Physiowerk Bodensee"
            className="brand-logo"
          />
        </Link>

        <nav className="desktop-navigation" aria-label="Hauptnavigation">
          {NAVIGATION.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(location, item.href) ? "active" : ""}
              aria-current={isActive(location, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt/"
            className={`contact-pill ${isActive(location, "/kontakt/") ? "active" : ""}`}
            aria-current={isActive(location, "/kontakt/") ? "page" : undefined}
          >
            Kontakt
          </Link>
          <BookingLink />
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(value => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${open ? "open" : ""}`}
        aria-label="Mobile Hauptnavigation"
      >
        <div className="site-shell mobile-navigation-inner">
          {NAVIGATION.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(location, item.href) ? "active" : ""}
              aria-current={isActive(location, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt/"
            className={isActive(location, "/kontakt/") ? "active" : ""}
            aria-current={isActive(location, "/kontakt/") ? "page" : undefined}
          >
            Kontakt
          </Link>
          <BookingLink />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <section className="footer-about" aria-labelledby="footer-about-heading">
          <p className="footer-eyebrow" id="footer-about-heading">
            Physiowerk Bodensee
          </p>
          <h2>Deine Praxis für Physiotherapie, Biomechanik und medizinisches Training in Meckenbeuren.</h2>
          <p>
            Wir bieten individuelle Behandlungen für Rücken, Gelenke, Muskeln und
            Bewegungseinschränkungen. Unsere erfahrenen Physiotherapeut:innen kombinieren moderne
            Analyseverfahren mit praxisnaher Betreuung für nachhaltige Ergebnisse – für mehr
            Beweglichkeit, Kraft und Lebensqualität.
          </p>
        </section>

        <section aria-labelledby="footer-nav-heading">
          <p className="footer-eyebrow" id="footer-nav-heading">
            Navigation
          </p>
          <div className="footer-links">
            {NAVIGATION.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/kontakt/">Kontakt</Link>
            <Link href="/impressum/">Impressum</Link>
            <Link href="/datenschutzerklaerung/">Datenschutz</Link>
          </div>
        </section>

        <section aria-labelledby="footer-contact-heading">
          <p className="footer-eyebrow" id="footer-contact-heading">
            Kontakt
          </p>
          <div className="footer-links">
            <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              {CONTACT.name}
              <br />
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </a>
          </div>
        </section>

        <section aria-labelledby="footer-hours-heading">
          <p className="footer-eyebrow" id="footer-hours-heading">
            Öffnungszeiten
          </p>
          <dl className="opening-hours">
            {OPENING_HOURS.map(item => (
              <div key={item.days}>
                <dt>{item.days}</dt>
                <dd>{item.hours}</dd>
              </div>
            ))}
          </dl>
          <div className="social-links">
            {SOCIAL_LINKS.map(item => (
              <a
                key={item.label}
                className="social-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Physiowerk Bodensee auf ${item.label}`}
              >
                {item.label === "Instagram" ? (
                  <Instagram className="social-link-icon" aria-hidden="true" />
                ) : (
                  <Facebook className="social-link-icon" aria-hidden="true" />
                )}
                <span>{item.label}</span>
                <ArrowUpRight className="social-link-arrow" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} Physiowerk Bodensee GmbH</span>
        <span>Physiotherapie · Biomechanik · medizinisches Training</span>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="site-root">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
