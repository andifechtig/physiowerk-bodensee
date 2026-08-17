import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  MessageCircle,
  MonitorSmartphone,
  MoveRight,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Target,
  UserRoundCheck,
  Video,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Seo } from "@/components/Seo";
import { COACHING_WHATSAPP_URL, SEO } from "@/site-config";

const problems = [
  "Du warst schon bei 5 Ärzten und 3 Physiotherapeuten, aber nichts hilft langfristig.",
  "Du bekommst 6x Krankengymnastik verschrieben, aber nach 3 Wochen ist alles wie vorher.",
  "Du hast Angst, dass deine Schmerzen dich ein Leben lang begleiten werden.",
] as const;

const solutionPoints = [
  [Target, "Ursachenanalyse statt Symptombehandlung"],
  [UserRoundCheck, "1:1 Betreuung durch Andreas persönlich"],
  [CalendarCheck, "6 Monate für nachhaltige Veränderung"],
  [MonitorSmartphone, "Online und offline. Flexibel und individuell."],
] as const;

const programSteps = [
  {
    title: "Infogespräch",
    text: "Wir lernen uns kennen. Du schilderst deine Situation und ich prüfe, ob das Coaching das Richtige für dich ist.",
  },
  {
    title: "Analyse & Diagnostik",
    text: "Biomechanische Analyse deiner Bewegungsmuster, Haltung und Beschwerden. Das ist die Grundlage für deinen individuellen Plan.",
  },
  {
    title: "Individueller Trainingsplan",
    text: "Auf Basis der Analyse erstelle ich deinen persönlichen Trainings- und Therapieplan.",
  },
  {
    title: "6 Monate Betreuung",
    text: "Regelmäßige 1:1 Calls, angepasste Trainingspläne, Video-Module und WhatsApp-Support. Ich begleite dich den gesamten Weg.",
  },
] as const;

const programFeatures = [
  [Video, "1:1 Video-Calls", "Regelmäßige persönliche Gespräche für Analyse, Anpassung und Motivation."],
  [Dumbbell, "Individuelle Trainingspläne", "Auf dich zugeschnittene Übungen, die sich mit deinem Fortschritt weiterentwickeln."],
  [PlayCircle, "Video-Kurse & Module", "Lernmodule zum Selbststudium, jederzeit abrufbar in deinem Tempo."],
  [MessageCircle, "WhatsApp-Support", "Schnelle Antworten auf deine Fragen, direkt von Andreas."],
  [Smartphone, "App-Zugang", "Alle Trainings, Videos und Pläne übersichtlich in einer App."],
  [Stethoscope, "Vor-Ort-Termine", "Optional: Persönliche Termine in der Praxis am Bodensee."],
] as const;

const comparison = [
  ["Dauer", "6 Termine", "6 Monate"],
  ["Ansatz", "Symptombehandlung", "Ursachenanalyse"],
  ["Betreuung", "Nur in der Praxis", "Online + Offline"],
  ["Trainingsplan", "Standardübungen", "Individuell angepasst"],
  ["Support", "Nur zum Termin", "WhatsApp + App"],
  ["Nachhaltigkeit", "Oft kurzfristig", "Langfristige Veränderung"],
] as const;

const audiences = [
  "Du hast chronische Schmerzen am Bewegungsapparat",
  "Du bist nach einer OP und willst nachhaltig wieder fit werden",
  "Du bist Sportler und willst Verletzungen vorbeugen",
  "Du sitzt viel im Büro und leidest unter Verspannungen",
  "Du möchtest dein Gewicht reduzieren und fitter werden",
  "Du bist zwischen 30 und 65 Jahre alt",
] as const;

const faqs = [
  ["Warum dauert das Coaching 6 Monate?", "Nachhaltige Veränderung braucht Zeit. 6 Monate ist das Minimum, um Muster zu durchbrechen, neue Gewohnheiten zu etablieren und echte Ergebnisse zu sehen."],
  ["Ist das Coaching für mich geeignet?", "Ideal bei chronischen Schmerzen, nach OP, oder wenn du langfristige Veränderung statt schnelle Fixes suchst."],
  ["Wie läuft das Coaching ab?", "Umfassende Analyse, individueller Trainingsplan, regelmäßige 1:1 Video-Calls, Video-Module, WhatsApp-Support. Optional Vor-Ort-Termine."],
  ["Kann ich das Coaching online machen?", "Ja, komplett online möglich. Vor-Ort-Termine optional."],
  ["Wie viel kostet das Coaching?", "Preise im kostenlosen Infogespräch. Verschiedene Optionen je nach Bedarf."],
  ["Gibt es eine Geld-zurück-Garantie?", "Ja! Nach 4 Wochen Geld zurück, wenn es nicht passt."],
] as const;

function WhatsAppCta({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <a
      className={`coaching-whatsapp-cta ${light ? "coaching-whatsapp-cta-light" : ""}`}
      href={COACHING_WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle aria-hidden="true" />
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

export default function Coaching() {
  return (
    <>
      <Seo {...SEO.coaching} />

      <section className="coaching-hero">
        <div className="site-shell coaching-hero-grid">
          <div className="coaching-hero-copy">
            <div className="coaching-badges" aria-label="Programminformationen">
              <span>6-Monats-Programm</span>
              <span>⚡ Nur 3 Plätze/Monat</span>
            </div>
            <p className="coaching-kicker">Schmerzfrei Jetzt</p>
            <h1>Schmerzfrei Jetzt. Deine 6 Monate in ein neues Leben.</h1>
            <p className="coaching-hero-intro">
              Das ganzheitliche Coaching-Programm von Andreas Fechtig: biomechanisch fundiert,
              persönlich betreut, nachhaltig wirksam.
            </p>
            <WhatsAppCta light>Infogespräch sichern</WhatsAppCta>
          </div>
          <div className="coaching-hero-panel" aria-label="Coaching-Kennzahlen">
            <div><strong>20+</strong><span>Jahre Erfahrung</span></div>
            <div><strong>5.000+</strong><span>Behandlungen</span></div>
            <div><strong>6</strong><span>Monate Betreuung</span></div>
          </div>
        </div>
      </section>

      <section className="coaching-section coaching-problem">
        <div className="site-shell coaching-problem-grid">
          <div>
            <p className="coaching-eyebrow">Das Problem</p>
            <h2>Kennst du das?</h2>
          </div>
          <div className="coaching-problem-list">
            {problems.map((problem, index) => (
              <article key={problem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{problem}</p>
              </article>
            ))}
            <blockquote>Das muss nicht so bleiben. Es gibt einen anderen Weg.</blockquote>
          </div>
        </div>
      </section>

      <section className="coaching-section coaching-solution">
        <div className="site-shell">
          <div className="coaching-heading coaching-heading-light">
            <p className="coaching-eyebrow">Die Lösung</p>
            <h2>Dein Weg zu nachhaltiger Veränderung</h2>
            <p>„Schmerzfrei Jetzt“ ist kein schneller Fix. Es ist ein 6-monatiges Coaching-Programm, das an der Wurzel deiner Probleme ansetzt. Biomechanisch fundiert und ganzheitlich betreut.</p>
          </div>
          <div className="coaching-solution-grid">
            {solutionPoints.map(([Icon, title]) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-section">
        <div className="site-shell">
          <div className="coaching-heading">
            <p className="coaching-eyebrow">Programmablauf</p>
            <h2>Vier Schritte. Ein klares Ziel.</h2>
          </div>
          <ol className="coaching-steps">
            {programSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <MoveRight aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="coaching-section coaching-features-section">
        <div className="site-shell">
          <div className="coaching-heading">
            <p className="coaching-eyebrow">Leistungen im Programm</p>
            <h2>Alles, was du für deinen Weg brauchst</h2>
          </div>
          <div className="coaching-feature-grid">
            {programFeatures.map(([Icon, title, text]) => (
              <article key={title}>
                <div className="coaching-feature-icon"><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-section coaching-comparison-section">
        <div className="site-shell coaching-comparison-grid">
          <div className="coaching-heading coaching-heading-light">
            <p className="coaching-eyebrow">Der Unterschied</p>
            <h2>Coaching vs. klassische Physiotherapie</h2>
          </div>
          <div className="coaching-table-card">
            <Table className="coaching-table">
              <TableHeader>
                <TableRow>
                  <TableHead><span className="sr-only">Vergleich</span></TableHead>
                  <TableHead>Klassisch</TableHead>
                  <TableHead>Schmerzfrei Jetzt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.map(([label, classic, coaching]) => (
                  <TableRow key={label}>
                    <TableCell className="coaching-table-label">{label}</TableCell>
                    <TableCell>{classic}</TableCell>
                    <TableCell className="coaching-table-highlight">{coaching}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="coaching-section">
        <div className="site-shell coaching-audience-grid">
          <div className="coaching-heading">
            <p className="coaching-eyebrow">Für wen ist es?</p>
            <h2>Für Menschen, die es wirklich verändern wollen</h2>
          </div>
          <div className="coaching-audience-list">
            {audiences.map(item => (
              <div key={item}><Check aria-hidden="true" /><span>{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="coaching-section coaching-faq-section">
        <div className="site-shell coaching-faq-grid">
          <div className="coaching-heading">
            <p className="coaching-eyebrow">FAQ</p>
            <h2>Häufige Fragen</h2>
          </div>
          <Accordion type="single" collapsible className="coaching-faq">
            {faqs.map(([question, answer], index) => (
              <AccordionItem value={`faq-${index}`} key={question}>
                <AccordionTrigger className="coaching-faq-trigger">{question}</AccordionTrigger>
                <AccordionContent className="coaching-faq-content">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="coaching-final-cta">
        <div className="site-shell coaching-final-cta-grid">
          <div>
            <p className="coaching-eyebrow">Dein erster Schritt</p>
            <h2>Bereit für den ersten Schritt?</h2>
            <p>Sichere dir dein kostenloses Infogespräch mit Andreas. Unverbindlich, persönlich und ohne Risiko.</p>
          </div>
          <WhatsAppCta light>Jetzt Infogespräch sichern</WhatsAppCta>
        </div>
        <div className="site-shell coaching-disclaimer">
          <ShieldCheck aria-hidden="true" />
          <p>Ergebnisse sind individuell und können nicht garantiert werden. Das Coaching ersetzt keine notwendige ärztliche Diagnostik oder medizinische Behandlung. Angaben zu Erfahrung, Behandlungszahlen, Verfügbarkeit und Garantiebedingungen stammen vom Anbieter und sollten vor der Buchung geprüft werden.</p>
        </div>
      </section>

      <a
        className="coaching-floating-whatsapp"
        href={COACHING_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Coaching-Infogespräch über WhatsApp sichern"
      >
        <MessageCircle aria-hidden="true" />
        <span>Infogespräch</span>
      </a>
    </>
  );
}
