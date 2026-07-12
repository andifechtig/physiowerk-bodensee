import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { BookingLink } from "@/components/SiteLayout";
import { CONTACT } from "@/site-config";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

export function PageHero({
  title,
  intro,
  media,
  booking = false,
}: {
  title: ReactNode;
  intro: ReactNode;
  media: ReactNode;
  booking?: boolean;
}) {
  return (
    <section className="page-hero">
      <div className="site-shell page-hero-grid">
        <div className="page-hero-media">{media}</div>
        <div className="page-hero-copy">
          <h1>{title}</h1>
          <p>{intro}</p>
          {booking ? <BookingLink className="booking-button-light" /> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </>
  );

  return isExternal ? (
    <a className="arrow-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className="arrow-link" href={href}>
      {content}
    </Link>
  );
}

export function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="site-shell contact-cta-grid">
        <div>
          <Eyebrow light>Kontakt</Eyebrow>
          <h2>
            Bereit für Deinen
            <br />
            Neustart in Bewegung?
          </h2>
          <p>
            Egal ob akute Beschwerden, chronische Schmerzen oder einfach der Wunsch nach mehr Beweglichkeit – wir sind für Dich da. Melde Dich jetzt für ein unverbindliches Erstgespräch oder direkt zur Therapie an.
          </p>
          <BookingLink className="booking-button-light" />
        </div>
        <div className="contact-cta-details">
          <a href={CONTACT.phoneHref}>
            <Phone aria-hidden="true" />
            <span>{CONTACT.phoneLabel}</span>
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            <Mail aria-hidden="true" />
            <span>{CONTACT.email}</span>
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin aria-hidden="true" />
            <span>
              {CONTACT.name}, {CONTACT.address}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function BookingSection() {
  return (
    <section className="booking-section" id="terminbuchung">
      <div className="site-shell booking-section-grid">
        <div>
          <Eyebrow>Online-Terminreservierung</Eyebrow>
          <h2>Termin online buchen</h2>
          <BookingLink />
        </div>
        <div className="booking-placeholder" aria-label="Platzhalter für das THEORG- oder TheraConnect-Buchungswidget">
          <span>THEORG / TheraConnect</span>
          <strong>Buchungs-Widget</strong>
          <small>Iframe-ready · zentral konfigurierbar</small>
        </div>
      </div>
    </section>
  );
}
