import { Activity, BadgeCheck, Dumbbell, HeartHandshake, HeartPulse, SearchCheck, Sparkles, Smartphone, UsersRound } from "lucide-react";
import {
  ArrowLink,
  BookingSection,
  ContactCta,
  Eyebrow,
  SectionHeading,
} from "@/components/PageElements";
import { Seo } from "@/components/Seo";
import { GoogleReviewsWidget } from "@/components/GoogleReviewsWidget";
import { SEO, THERACONNECT } from "@/site-config";

const CAREER_HEART_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/fQdaxpLmlxGQXsAH.jpg";
const HOME_MEDIA = {
  heroTherapy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/tTQDcPvqnXwIiMoX.webp",
  boneIllustration: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/OHHoxsvHutuBBXuv.svg",
  boneModel: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/YQeESqWyCJYEgyZk.webp",
  medicalTraining: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/AuoAGnYdQvFitYcA.webp",
  ropeTherapy: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/zqBCyoEGBifCsLze.webp",
  lauraAndLea: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/CePFuZnJCcjyUzGR.webp",
} as const;

const focusCards = [
  {
    title: "Physiotherapie & Biomechanik",
    text: "Ursachen erkennen, gezielt behandeln – für langfristige Beschwerdefreiheit.",
    href: "/physiotherapie/",
    imageUrl: HOME_MEDIA.boneModel,
    description: "Knochenmodell aus der physiotherapeutischen Praxis",
  },
  {
    title: "Medizinisches Training und Fitness",
    text: "Aufbau, Stabilität und Fitness – individuell betreut, effektiv und sicher.",
    href: "/medizinisches-training-und-fitness/",
    imageUrl: HOME_MEDIA.medicalTraining,
    description: "Keiser Bikes und Trainingsgeräte im medizinischen Trainingsraum",
  },
  {
    title: "Team & Praxis",
    text: "Moderne Praxis und Individuelle Betreuung durch erfahrene Therapeut:innen.",
    href: "/team-praxis/",
    imageUrl: HOME_MEDIA.ropeTherapy,
    description: "Therapeut zeigt eine Übung mit Kletterwand im Hintergrund",
  },
] as const;

const benefits = [
  [UsersRound, "Individuelle Betreuung durch erfahrene Therapeut:innen"],
  [SearchCheck, "Moderne Diagnostik & biomechanische Analysen"],
  [HeartHandshake, "Persönliche Atmosphäre statt Massenbetrieb"],
  [Activity, "Interdisziplinäres Team aus Physiotherapie & Training"],
  [Sparkles, "Zentrale Lage im Bodenseekreis"],
  [Dumbbell, "Hochwertige Ausstattung und funktionelle Trainingsflächen"],
] as const;

const conditions = {
  "Einige typische Krankheitsbilder": [
    "Unspezifische Rückenschmerzen (Syndrome)",
    "Bandscheibenprolaps /-vorfälle",
    "Skoliose",
    "CMD craniomandibuläre Dysfunktion",
    "Ödeme",
    "Impingment Syndrome (Schulterschmerzen)",
    "Verletzungen an Knochen, Gelenke und Bandstrukturen",
    "ISG Störungen",
    "Schwindel",
    "Und viele mehr",
  ],
  "Selbstzahler Angebot": [
    "Unspezifische Rückenschmerzen (Syndrome)",
    "Bandscheibenprolaps /-vorfälle",
    "Skoliose",
    "CMD craniomandibuläre Dysfunktion",
    "Ödeme",
  ],
  "Angebot Kassenleistungen": [
    "Manuelle Therapie",
    "Atem Physiotherapie",
    "T-RENA (Trainingstherapeutische Rehabilitationsnachsorge)",
    "Manuelle Lymphdrainage",
    "KGZNS Bobath",
    "Klassische Massage",
  ],
} as const;

export default function Home() {
  return (
    <>
      <Seo {...SEO.home} />
      <section className="home-hero">
        <div className="site-shell home-hero-grid">
          <img
            className="home-hero-media home-hero-photo"
            src={HOME_MEDIA.heroTherapy}
            alt="Therapie-Szene am Seilzug mit Patientin und Therapeut"
            width="1170"
            height="1170"
            decoding="async"
            fetchPriority="high"
          />
          <div className="home-hero-copy">
            <h1>Physiotherapie, Biomechanik und medizinisches Training in Meckenbeuren</h1>
            <p>
              Wir bringen Dich wieder in Bewegung – individuell, nachhaltig und mit modernsten Methoden aus Physiotherapie, Biomechanik und ganzheitlichem Training.
              <br />
              Kassen- & Privatpatienten willkommen!
            </p>
            <ArrowLink href="/kontakt/">Jetzt Termin vereinbaren</ArrowLink>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-shell focus-intro-grid">
          <SectionHeading
            eyebrow="Unsere Schwerpunkte"
            title="Dein Körper im Fokus – von Therapie bis Training."
            intro="Im Physiowerk Bodensee verbinden wir fundierte Physiotherapie mit biomechanischer Analyse und modernem medizinischem Training. Ob akute Beschwerden, Rehabilitation nach Verletzungen oder gezielte Prävention – wir entwickeln gemeinsam mit Dir ein Konzept, das dir wirklich hilft."
          />
          <img
            className="focus-intro-bone-illustration"
            src={HOME_MEDIA.boneIllustration}
            alt="Rote Knochen-Illustration"
            width="562"
            height="151"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="site-shell card-grid focus-card-grid">
          {focusCards.map(card => (
            <article className="focus-card" key={card.href}>
              <img
                className="focus-card-image"
                src={card.imageUrl}
                alt={card.description}
                width="746"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ArrowLink href={card.href}>Mehr erfahren</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-coaching-teaser">
        <div className="site-shell home-coaching-teaser-grid">
          <div>
            <p className="eyebrow eyebrow-light">Neu im Physiowerk Bodensee</p>
            <h2>NEU: Schmerzfrei Jetzt — Dein 6-Monats-Coaching</h2>
            <p>Das ganzheitliche Coaching-Programm für nachhaltige Schmerzfreiheit. Biomechanisch fundiert, persönlich betreut von Andreas Fechtig.</p>
            <ArrowLink href="/coaching/">Mehr erfahren</ArrowLink>
          </div>
          <div className="home-coaching-teaser-mark" aria-hidden="true">
            <HeartPulse />
            <span>6 Monate</span>
          </div>
        </div>
      </section>

      <section className="home-app-teaser">
        <div className="site-shell home-app-teaser-grid">
          <div className="home-app-teaser-icon" aria-hidden="true">
            <Smartphone />
          </div>
          <div>
            <p className="eyebrow">Neu: TheraConnect App</p>
            <h2>Ihre Termine. Direkt auf Ihrem Smartphone.</h2>
            <p>
              Termine einsehen, online buchen und verwalten – sicher verbunden mit dem Physiowerk
              Bodensee.
            </p>
            <ArrowLink href="/app/">App kennenlernen</ArrowLink>
          </div>
          <img
            src={THERACONNECT.qrCode}
            alt="TheraCode QR-Code des Physiowerk Bodensee"
            width="250"
            height="250"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="home-courses-teaser">
        <div className="site-shell home-courses-teaser-grid">
          <div className="home-courses-seal" aria-hidden="true">
            <BadgeCheck />
            <span>§20 SGB V</span>
          </div>
          <div>
            <p className="eyebrow eyebrow-light">ZPP-Kurse</p>
            <h2>Zertifizierte Prävention – vor Ort und digital</h2>
            <p>
              Gesundheitsfördernde Kurse mit möglicher Bezuschussung durch Ihre Krankenkasse. Lernen
              Sie auch unser digitales Angebot „Prävention digital“ kennen.
            </p>
            <ArrowLink href="/kurse/">Kurse entdecken</ArrowLink>
          </div>
        </div>
      </section>

      <GoogleReviewsWidget />

      <div className="marquee" aria-label="Physiotherapie, Biomechanik, medizinisches Training, Fitness">
        <span>Physiotherapie — Biomechanik — medizinisches Training — Fitness —</span>
        <span aria-hidden="true">Physiotherapie — Biomechanik — medizinisches Training — Fitness —</span>
      </div>

      <section className="content-section content-section-dark">
        <div className="site-shell why-grid">
          <SectionHeading
            eyebrow="Warum zum Physiowerk Bodensee?"
            title="Mehr als Therapie – wir begleiten Dich auf Deinem Weg zur Bewegung."
            intro="Bei uns steht der Mensch im Mittelpunkt. Wir analysieren Bewegungsabläufe, erkennen Ursachen und entwickeln ein individuelles Trainings- und Therapiekonzept. So erreichst Du nicht nur schnelle, sondern nachhaltige Ergebnisse."
            light
          />
          <div className="benefit-grid">
            {benefits.map(([Icon, text]) => (
              <article key={text}>
                <Icon aria-hidden="true" />
                <h3>{text}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-shell mission-grid">
          <img
            className="mission-grid-photo"
            src={HOME_MEDIA.lauraAndLea}
            alt="Laura und Lea vor der Kletterwand im Physiowerk Bodensee"
            width="1382"
            height="894"
            loading="lazy"
            decoding="async"
          />
          <div>
            <Eyebrow>Team & Praxis</Eyebrow>
            <h2>
              Die Praxis,
              <br />
              das Team und unsere Mission
            </h2>
            <p>
              Unser Ziel ist es, das Problem bei der Wurzel zu packen.
              <br />
              Wir suchen gemeinsam die Ursache für deine Beschwerden. Nicht immer liegt diese offensichtlich auf der Hand, bzw. der Grund für deine Beschwerden nicht zwingend beim aktuellen Problem selbst.
            </p>
            <ArrowLink href="/team-praxis/">Mehr erfahren</ArrowLink>
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell condition-grid">
          {Object.entries(conditions).map(([title, items]) => (
            <article key={title}>
              <h2>{title}</h2>
              <ul>
                {items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <BookingSection />
      <ContactCta />

      <section className="career-banner">
        <div className="site-shell career-banner-grid">
          <div>
            <Eyebrow light>Karriere</Eyebrow>
            <h2>Werde Teil unseres Teams!</h2>
            <p>Du bist Physiotherapeut:in mit Herz und möchtest in einem modernen, wertschätzenden Umfeld arbeiten? Dann bist Du bei uns genau richtig.</p>
            <ArrowLink href="/karriere/">Jetzt bewerben</ArrowLink>
          </div>
          <img
            className="career-banner-heart"
            src={CAREER_HEART_IMAGE_URL}
            alt="Rotes Herz als Symbol für Karriere im Physiowerk Bodensee"
            width="450"
            height="450"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </>
  );
}
