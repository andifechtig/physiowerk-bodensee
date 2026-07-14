import {
  BadgeCheck,
  CalendarCheck,
  Check,
  FileCheck2,
  Laptop,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { ArrowLink } from "@/components/PageElements";
import { Seo } from "@/components/Seo";
import { CONTACT, SEO } from "@/site-config";

const formats = [
  {
    icon: UsersRound,
    title: "ZPP-Kurse vor Ort",
    text: "Zertifizierte Präventionskurse in festen Kurseinheiten mit persönlicher Anleitung im Physiowerk Bodensee.",
  },
  {
    icon: Laptop,
    title: "Prävention digital",
    text: "Unser digitales Präventionsangebot läuft über die ZPP-Kurse und ermöglicht eine flexible Teilnahme mit strukturierten Inhalten.",
  },
  {
    icon: FileCheck2,
    title: "Teilnahmebescheinigung",
    text: "Nach erfolgreicher Teilnahme erhalten Sie die erforderliche Bescheinigung zur Einreichung bei Ihrer Krankenkasse.",
  },
] as const;

const participationSteps = [
  ["Kurs auswählen", "Informieren Sie sich bei uns über aktuelle Kursformate, Termine und freie Plätze."],
  ["Anmelden", "Melden Sie sich telefonisch, per E-Mail oder über unsere Kontaktseite für den passenden Kurs an."],
  ["Teilnehmen", "Absolvieren Sie die vorgesehenen Kurseinheiten vor Ort oder über unser digitales Präventionsangebot."],
  ["Bescheinigung einreichen", "Reichen Sie die Teilnahmebescheinigung anschließend bei Ihrer Krankenkasse ein."],
] as const;

export default function Courses() {
  return (
    <>
      <Seo {...SEO.courses} />

      <section className="courses-hero">
        <div className="site-shell courses-hero-grid">
          <div>
            <div className="courses-badges">
              <span><BadgeCheck aria-hidden="true" /> ZPP-zertifiziert</span>
              <span>§20 SGB V</span>
            </div>
            <p className="courses-eyebrow">ZPP-Kurse</p>
            <h1>Zertifizierte Prävention für mehr Bewegung im Alltag</h1>
            <p className="courses-hero-intro">
              Unsere zertifizierten Präventionskurse unterstützen Sie dabei, gesundheitsfördernde
              Bewegung nachhaltig in Ihren Alltag zu integrieren – persönlich vor Ort oder digital.
            </p>
            <ArrowLink href="/kontakt/">Jetzt Kursplatz anfragen</ArrowLink>
          </div>
          <div className="courses-hero-panel">
            <ShieldCheck aria-hidden="true" />
            <strong>Bis zu 80–100 %</strong>
            <span>Bezuschussung kann je nach Krankenkasse und Kurs möglich sein.</span>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="site-shell">
          <div className="courses-heading">
            <p className="courses-eyebrow">Unsere Kursformate</p>
            <h2>Prävention, die zu Ihrem Alltag passt</h2>
            <p>
              Die Kurse verbinden verständliche Wissensvermittlung mit gezielten, alltagstauglichen
              Übungen. Aktuelle Schwerpunkte und Kurstermine erfahren Sie direkt bei unserem Team.
            </p>
          </div>
          <div className="courses-format-grid">
            {formats.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-section courses-refund-section">
        <div className="site-shell courses-refund-grid">
          <div>
            <p className="courses-eyebrow courses-eyebrow-light">Krankenkassen-Zuschuss</p>
            <h2>Gesundheit fördern und Kosten erstatten lassen</h2>
            <p>
              Viele gesetzliche Krankenkassen bezuschussen zertifizierte Präventionskurse nach §20
              SGB V. Je nach Krankenkasse, Tarif, Kurs und erfolgreicher Teilnahme kann eine Erstattung
              von bis zu 80–100 % der Kursgebühr möglich sein.
            </p>
            <div className="courses-refund-note">
              <ReceiptText aria-hidden="true" />
              <span>
                Bitte klären Sie die konkrete Erstattung vor der Anmeldung direkt mit Ihrer
                Krankenkasse. Eine Kostenerstattung kann nicht pauschal garantiert werden.
              </span>
            </div>
          </div>
          <div className="courses-refund-card">
            <span>Mögliche Bezuschussung</span>
            <strong>80–100 %</strong>
            <small>abhängig von Krankenkasse, Kurs und Teilnahmebedingungen</small>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="site-shell courses-digital-grid">
          <div className="courses-digital-mark" aria-hidden="true"><Laptop /></div>
          <div>
            <p className="courses-eyebrow">Prävention digital</p>
            <h2>Digital teilnehmen – strukturiert und flexibel</h2>
            <p>
              „Prävention digital“ ist unser digitales Präventionsangebot innerhalb der ZPP-Kurse.
              Nach der Anmeldung erhalten Sie alle Informationen zum Ablauf und können die
              vorgesehenen Inhalte flexibel in Ihren Alltag integrieren.
            </p>
            <ul className="courses-check-list">
              <li><Check aria-hidden="true" /> Über einen aktuellen ZPP-Kurs anmelden</li>
              <li><Check aria-hidden="true" /> Zugang und Teilnahmeinformationen erhalten</li>
              <li><Check aria-hidden="true" /> Digitale Einheiten entsprechend dem Kursplan absolvieren</li>
              <li><Check aria-hidden="true" /> Teilnahmebescheinigung nach erfolgreichem Abschluss nutzen</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="courses-section courses-steps-section">
        <div className="site-shell">
          <div className="courses-heading">
            <p className="courses-eyebrow">So nehmen Sie teil</p>
            <h2>In vier Schritten zum Präventionskurs</h2>
          </div>
          <ol className="courses-steps">
            {participationSteps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="courses-registration">
        <div className="site-shell courses-registration-grid">
          <div>
            <p className="courses-eyebrow courses-eyebrow-light">Anmeldung</p>
            <h2>Aktuelle Kurse und freie Plätze anfragen</h2>
            <p>
              Unser Team informiert Sie persönlich über Kursstart, Teilnahmevoraussetzungen und das
              passende Präsenz- oder Digitalangebot.
            </p>
            <ArrowLink href="/kontakt/">Zur Kursanfrage</ArrowLink>
          </div>
          <div className="courses-contact-links">
            <a href={CONTACT.phoneHref}><Phone aria-hidden="true" /><span>{CONTACT.phoneLabel}</span></a>
            <a href={`mailto:${CONTACT.email}`}><Mail aria-hidden="true" /><span>{CONTACT.email}</span></a>
            <div><CalendarCheck aria-hidden="true" /><span>Aktuelle Termine erhalten Sie direkt bei unserem Team.</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
