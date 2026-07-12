import {
  Apple,
  BellRing,
  CalendarCheck,
  Check,
  Download,
  MailCheck,
  QrCode,
  Repeat2,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import { SEO, THERACONNECT } from "@/site-config";

const features = [
  [CalendarCheck, "Termine einsehen und verwalten"],
  [Repeat2, "Termine online buchen – auch Serientermine"],
  [XCircle, "Termine absagen"],
  [BellRing, "Push-Benachrichtigungen für Terminangebote"],
  [ShieldCheck, "Sichere Verbindung zu unserer Praxis"],
] as const;

const steps = [
  {
    title: "App herunterladen",
    text: "Laden Sie die TheraConnect App aus dem App Store (iOS) oder Google Play Store (Android) herunter.",
    icon: Download,
  },
  {
    title: "TheraCode scannen",
    text: "Scannen Sie den QR-Code in unserer Praxis oder auf dieser Seite, um sich mit unserer Praxis zu verbinden.",
    icon: QrCode,
  },
  {
    title: "Anmelden",
    text: "Melden Sie sich mit Ihrer bei uns hinterlegten E-Mail-Adresse und Ihrem Geburtsdatum an.",
    icon: Smartphone,
  },
  {
    title: "Verifizierung",
    text: "Sie erhalten eine E-Mail mit einem Sicherheitscode. Damit vergeben Sie Ihr persönliches Passwort.",
    icon: MailCheck,
  },
  {
    title: "Fertig!",
    text: "Sie können jetzt Ihre Termine einsehen, buchen und verwalten.",
    icon: Check,
  },
] as const;

const faqs = [
  ["Welche Daten brauche ich?", "Ihre bei uns hinterlegte E-Mail-Adresse und Ihr Geburtsdatum."],
  ["Ist die App kostenlos?", "Ja, die App ist für unsere Patienten kostenlos."],
  ["Was mache ich bei Problemen?", "Sprechen Sie uns gerne an der Rezeption an oder rufen Sie uns an."],
] as const;

function StoreLink({
  href,
  type,
}: {
  href: string;
  type: "google" | "apple";
}) {
  const Icon = type === "apple" ? Apple : Download;
  return (
    <a className="app-store-link" href={href} target="_blank" rel="noreferrer">
      <Icon aria-hidden="true" />
      <span>
        <small>{type === "apple" ? "Platzhalter für" : "Jetzt bei"}</small>
        <strong>{type === "apple" ? "App Store" : "Google Play"}</strong>
      </span>
    </a>
  );
}

export default function AppPage() {
  return (
    <>
      <Seo {...SEO.app} />

      <section className="app-hero">
        <div className="site-shell app-hero-grid">
          <div className="app-hero-copy">
            <p className="app-eyebrow">TheraConnect</p>
            <h1>TheraConnect App – Ihre digitale Praxis in der Tasche</h1>
            <p>
              Mit unserer TheraConnect App haben Sie die Möglichkeit, Ihre Termine bequem online zu
              verwalten, einzusehen und direkt zu buchen. Mehr Flexibilität und Kontrolle über Ihre
              Terminplanung.
            </p>
            <div className="app-store-links">
              <StoreLink href={THERACONNECT.googlePlay} type="google" />
              <StoreLink href={THERACONNECT.appStore} type="apple" />
            </div>
          </div>

          <div className="app-phone" aria-label="TheraConnect Praxis-Verbindungscode">
            <div className="app-phone-speaker" aria-hidden="true" />
            <div className="app-phone-screen">
              <Smartphone aria-hidden="true" />
              <span>Physiowerk Bodensee</span>
              <strong>TheraConnect</strong>
              <img
                src={THERACONNECT.qrCode}
                alt="TheraCode QR-Code zur Verbindung mit der Physiowerk Bodensee Praxis"
                width="250"
                height="250"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="site-shell">
          <div className="app-heading">
            <p className="app-eyebrow">Ihre Vorteile</p>
            <h2>Terminplanung, die zu Ihrem Alltag passt</h2>
          </div>
          <div className="app-feature-grid">
            {features.map(([Icon, title]) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="app-section app-download-section">
        <div className="site-shell app-download-grid">
          <div>
            <p className="app-eyebrow app-eyebrow-light">App herunterladen</p>
            <h2>Direkt starten und mit unserer Praxis verbinden</h2>
            <p>
              Laden Sie TheraConnect auf Ihr Smartphone. Anschließend scannen Sie den Praxiscode und
              verbinden Ihr persönliches App-Konto mit dem Physiowerk Bodensee.
            </p>
            <div className="app-store-links">
              <StoreLink href={THERACONNECT.googlePlay} type="google" />
              <StoreLink href={THERACONNECT.appStore} type="apple" />
            </div>
          </div>
          <figure className="app-qr-card">
            <img
              src={THERACONNECT.qrCode}
              alt="TheraCode QR-Code des Physiowerk Bodensee"
              width="250"
              height="250"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <strong>Praxis-Verbindungscode</strong>
              <span>Mit TheraConnect scannen</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="app-section">
        <div className="site-shell">
          <div className="app-heading">
            <p className="app-eyebrow">Einrichtung</p>
            <h2>In fünf Schritten startklar</h2>
          </div>
          <ol className="app-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <span className="app-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="app-step-icon"><Icon aria-hidden="true" /></div>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              );
            })}
          </ol>
          <aside className="app-login-note">
            <ShieldCheck aria-hidden="true" />
            <p>
              Wenn Sie bereits die Online-Terminreservierung nutzen, können Sie sich mit Ihren
              bestehenden Zugangsdaten direkt in der App anmelden.
            </p>
          </aside>
        </div>
      </section>

      <section className="app-section app-connect-section">
        <div className="site-shell app-connect-grid">
          <figure className="app-connect-qr">
            <img
              src={THERACONNECT.qrCode}
              alt="QR-Code zum Verbinden der TheraConnect App mit der Physiowerk Bodensee Praxis"
              width="250"
              height="250"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <p className="app-eyebrow">Praxis-QR-Code</p>
            <h2>Jetzt mit unserer Praxis verbinden</h2>
            <p>
              Scannen Sie diesen QR-Code mit der TheraConnect App, um sich mit der Physiowerk Bodensee
              Praxis zu verbinden.
            </p>
          </div>
        </div>
      </section>

      <section className="app-section app-faq-section">
        <div className="site-shell app-faq-grid">
          <div className="app-heading">
            <p className="app-eyebrow">FAQ</p>
            <h2>Häufige Fragen zur App</h2>
          </div>
          <Accordion type="single" collapsible className="app-faq">
            {faqs.map(([question, answer], index) => (
              <AccordionItem value={`app-faq-${index}`} key={question}>
                <AccordionTrigger className="app-faq-trigger">{question}</AccordionTrigger>
                <AccordionContent className="app-faq-content">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
