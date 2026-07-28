import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  FileCheck2,
  Laptop,
  Mail,
  Phone,
  ReceiptText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { CONTACT, SEO } from "@/site-config";

const FUNDING_FORM_URL = "https://krankenkassen-cashback.typeform.com/Physiowerk";

const onlineCourseBenefits = [
  {
    icon: Laptop,
    title: "Flexibel online teilnehmen",
    text: "Alle Kurseinheiten sind bereits für Sie aufgezeichnet. So können Sie selbst entscheiden, wann und wo Sie trainieren möchten – ganz ohne feste Kurszeiten.",
  },
  {
    icon: UsersRound,
    title: "Vielfältige Kursauswahl",
    text: "Wählen Sie aus verschiedenen Bereichen wie Krafttraining, Mobility, Yoga oder Ernährung und finden Sie den Kurs, der am besten zu Ihren persönlichen Zielen passt.",
  },
  {
    icon: FileCheck2,
    title: "Förderung individuell prüfen",
    text: "Unser unabhängiger Förderpartner prüft Ihre aktuelle Krankenkasse und ermittelt gemeinsam mit Ihnen, welche Erstattung für Ihren gewünschten Kurs möglich ist. Auf Wunsch wird zusätzlich geprüft, ob andere Krankenkassen höhere Fördermöglichkeiten bieten.",
  },
] as const;

const audienceBenefits = [
  {
    icon: CalendarCheck,
    title: "Flexibel trotz vollem Alltag",
    text: "Ideal, wenn feste Kurszeiten nur schwer in Ihren Alltag passen. Die aufgezeichneten Einheiten können Sie flexibel dann durchführen, wenn es für Sie am besten passt.",
  },
  {
    icon: BadgeCheck,
    title: "Neue Schwerpunkte entdecken",
    text: "Ob Krafttraining, Mobility, Yoga oder Ernährung – entdecken Sie verschiedene Gesundheitsbereiche und finden Sie den Schwerpunkt, der zu Ihren persönlichen Zielen passt.",
  },
  {
    icon: Laptop,
    title: "Bequem von zu Hause",
    text: "Absolvieren Sie die Kurse ortsunabhängig von zu Hause, machen Sie die Übungen direkt mit und bestimmen Sie Ihr eigenes Tempo.",
  },
] as const;

const fundingBenefits = [
  {
    icon: FileCheck2,
    title: "Kostenlose Prüfung",
    text: "Für die individuelle Förderprüfung entstehen Ihnen keine Kosten.",
  },
  {
    icon: UsersRound,
    title: "Persönliche Beratung",
    text: "Nach der Abfrage meldet sich der unabhängige Förderpartner persönlich bei Ihnen.",
  },
  {
    icon: ShieldCheck,
    title: "Individuelle Prüfung",
    text: "Gemeinsam werden der passende Kurs sowie Ihre mögliche Erstattung geprüft.",
  },
] as const;

function FundingCta({ label }: { label: string }) {
  return (
    <div className="courses-funding-cta">
      <a
        className="arrow-link"
        href={FUNDING_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (öffnet in einem neuen Tab)`}
      >
        <span>{label}</span>
        <ArrowRight aria-hidden="true" />
      </a>
      <small>Kostenlos · unverbindlich · in weniger als 30 Sekunden</small>
    </div>
  );
}

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
            <p className="courses-eyebrow">Zertifizierte Online-Präventionskurse</p>
            <h1>Online-Präventionskurse – bis zu 100 % gefördert</h1>
            <p className="courses-hero-intro">
              Entdecken Sie zertifizierte Online-Präventionskurse aus verschiedenen Gesundheitsbereichen
              und lassen Sie kostenlos prüfen, welche Förderung über Ihre Krankenkasse für Sie möglich ist.
            </p>
            <FundingCta label="Förderung kostenlos prüfen" />
          </div>
          <div className="courses-hero-panel">
            <ShieldCheck aria-hidden="true" />
            <strong>Bis zu 100 %</strong>
            <span>Die mögliche Erstattung ist abhängig von Krankenkasse und Kurs.</span>
          </div>
        </div>
      </section>

      <section className="courses-section">
        <div className="site-shell">
          <div className="courses-heading">
            <p className="courses-eyebrow">Online-Präventionskurse</p>
            <h2>Ihr Kurs. Ihr Tempo. Ihr Zuhause.</h2>
            <p>
              Die zertifizierten Online-Präventionskurse sind bereits vollständig aufgezeichnet und können
              bequem von zu Hause absolviert werden. Machen Sie die Übungen direkt mit und führen Sie die
              einzelnen Einheiten ganz flexibel in Ihrem eigenen Tempo durch.
            </p>
          </div>
          <div className="courses-format-grid">
            {onlineCourseBenefits.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <FundingCta label="Förderung kostenlos prüfen" />
        </div>
      </section>

      <section className="courses-section courses-refund-section">
        <div className="site-shell courses-refund-grid">
          <div>
            <p className="courses-eyebrow courses-eyebrow-light">Individuelle Förderprüfung</p>
            <h2>Gesundheit fördern und Kosten erstatten lassen</h2>
            <p>
              Je nach Krankenkasse und gewähltem Präventionskurs ist eine Erstattung von bis zu 100 % der
              Kurskosten möglich. Unser unabhängiger Förderpartner prüft Ihre individuelle Situation kostenlos
              und zeigt Ihnen, welche Förderung mit Ihrer aktuellen Krankenkasse für Sie möglich ist.
            </p>
            <div className="courses-refund-note">
              <ReceiptText aria-hidden="true" />
              <span>
                Sie müssen Ihre Fördermöglichkeiten nicht selbst recherchieren. Unser unabhängiger
                Förderpartner übernimmt die Prüfung für Sie und bespricht das Ergebnis anschließend persönlich
                mit Ihnen. Auf Wunsch wird zusätzlich geprüft, ob andere Krankenkassen höhere
                Fördermöglichkeiten für Sie bieten.
              </span>
            </div>
            <FundingCta label="Meine Förderung kostenlos prüfen" />
          </div>
          <div className="courses-refund-card">
            <strong>Bis zu 100 % Förderung</strong>
            <small>Abhängig von Krankenkasse und gewähltem Kurs.</small>
          </div>
        </div>
      </section>

      <section className="courses-section courses-steps-section">
        <div className="site-shell">
          <div className="courses-heading">
            <p className="courses-eyebrow">Flexibel in den Alltag integrierbar</p>
            <h2>Für wen sind die Online-Präventionskurse interessant?</h2>
            <p>
              Die Online-Präventionskurse eignen sich für alle, die aktiv etwas für ihre Gesundheit tun möchten
              und dabei Wert auf eine flexible Durchführung legen. Je nach persönlichem Ziel stehen
              unterschiedliche Kursbereiche zur Auswahl.
            </p>
          </div>
          <div className="courses-format-grid">
            {audienceBenefits.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="courses-registration">
        <div className="site-shell courses-registration-grid">
          <div>
            <p className="courses-eyebrow courses-eyebrow-light">Kostenlose Förderprüfung</p>
            <h2>Jetzt Ihre persönliche Förderung prüfen lassen</h2>
            <p>
              Füllen Sie einfach unsere kurze Abfrage aus. Anschließend meldet sich unser unabhängiger
              Förderpartner persönlich bei Ihnen und prüft gemeinsam mit Ihnen den passenden Präventionskurs
              sowie Ihre mögliche Erstattung.
            </p>
            <FundingCta label="Förderung kostenlos prüfen" />
          </div>
          <div className="courses-registration-aside">
            <div className="courses-contact-links">
              {fundingBenefits.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon aria-hidden="true" />
                  <span><strong>{title}</strong><small>{text}</small></span>
                </div>
              ))}
            </div>
            <div className="courses-contact-secondary">
              <span>Fragen an das Physiowerk?</span>
              <a href={CONTACT.phoneHref}><Phone aria-hidden="true" />{CONTACT.phoneLabel}</a>
              <a href={`mailto:${CONTACT.email}`}><Mail aria-hidden="true" />{CONTACT.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
