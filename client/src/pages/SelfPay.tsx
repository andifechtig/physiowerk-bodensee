import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Dumbbell,
  Hand,
  Heart,
  MoveRight,
  Sparkles,
  StretchHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { ContactCta, SectionHeading } from "@/components/PageElements";
import { SEO } from "@/site-config";

type Offer = {
  icon: LucideIcon;
  title: string;
  detail?: string;
  description: string;
  badge?: string;
};

const treatmentOffers: readonly Offer[] = [
  {
    icon: MoveRight,
    title: "Strukturelle Integration / Rolfing",
    detail: "Einzelsitzung · 60 Minuten",
    description: "Eine individuelle Behandlung mit Blick auf Faszien, Haltung und Bewegung.",
  },
  {
    icon: MoveRight,
    title: "Strukturelle Integration / Rolfing",
    detail: "10er-Serie",
    badge: "Sparpaket",
    description: "Ein Behandlungszyklus mit zehn Terminen für eine kontinuierliche Begleitung.",
  },
  {
    icon: Activity,
    title: "Krankengymnastik",
    description: "Physiotherapeutische Behandlung, abgestimmt auf Ihren Befund und Ihre Bewegungsziele.",
  },
  {
    icon: Hand,
    title: "Manuelle Therapie",
    description: "Gezielte physiotherapeutische Untersuchung und Behandlung des Bewegungsapparats.",
  },
  {
    icon: Heart,
    title: "Narbenbehandlung",
    detail: "60 Minuten",
    description: "Individuelle Behandlung des Narbengewebes und der umliegenden Strukturen.",
  },
  {
    icon: Sparkles,
    title: "Massage",
    description: "Eine manuelle Anwendung zur Entspannung und Lockerung.",
  },
  {
    icon: Heart,
    title: "Fango",
    description: "Wärmeanwendung als eigenständiges Selbstzahlerangebot.",
  },
  {
    icon: StretchHorizontal,
    title: "Kinesio-Tape",
    description: "Elastisches Tape als ergänzende Maßnahme, individuell abgestimmt.",
  },
];

const trainingOffers: readonly Offer[] = [
  {
    icon: Dumbbell,
    title: "Funktionelles Personal Krafttraining",
    detail: "60 Minuten",
    description: "Persönliche Betreuung beim funktionellen Krafttraining mit einem Training, das sich an Ihren Zielen orientiert.",
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    detail: "10 × 60 Minuten",
    badge: "Sparpaket",
    description: "Zehn persönliche Trainingseinheiten für eine kontinuierliche Begleitung.",
  },
];

function OfferGrid({ offers }: { offers: readonly Offer[] }) {
  return (
    <div className="selfpay-offer-grid">
      {offers.map(({ icon: Icon, title, detail, description, badge }, index) => (
        <article className="selfpay-offer-card" key={`${title}-${detail ?? index}`}>
          <div className="selfpay-offer-icon"><Icon aria-hidden="true" /></div>
          {badge ? <span className="selfpay-offer-badge">{badge}</span> : null}
          <h3>{title}</h3>
          {detail ? <p className="selfpay-offer-detail">{detail}</p> : null}
          <p className="selfpay-offer-description">{description}</p>
        </article>
      ))}
    </div>
  );
}

export default function SelfPay() {
  return (
    <>
      <Seo {...SEO.selfpay} />
      <section className="selfpay-hero">
        <div className="site-shell selfpay-hero-grid">
          <div>
            <p className="selfpay-eyebrow">Individuelle Angebote</p>
            <h1>Selbstzahlerangebote in Meckenbeuren.</h1>
            <p className="selfpay-hero-intro">
              Von physiotherapeutischen Einzelbehandlungen über Rolfing bis zum persönlichen Krafttraining:
              Entdecken Sie unsere Angebote und finden Sie gemeinsam mit uns heraus, was zu Ihnen passt.
            </p>
            <a className="selfpay-hero-link" href="#angebote">
              Angebote ansehen <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="selfpay-hero-mark" aria-hidden="true">
            <Heart aria-hidden="true" />
            <span>Persönlich.<br />Individuell.</span>
          </div>
        </div>
      </section>

      <section className="content-section" id="angebote">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Therapie & Anwendungen"
            title="Behandlung, die zu Ihnen passt."
            intro="Diese physiotherapeutischen und ergänzenden Leistungen können Sie als Selbstzahlerangebot in Anspruch nehmen. Dauer und Schwerpunkt stimmen wir persönlich mit Ihnen ab."
          />
          <OfferGrid offers={treatmentOffers} />
          <p className="selfpay-price-note">Informationen zu Preisen und verfügbaren Terminen erhalten Sie direkt bei uns.</p>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Persönlich trainieren"
            title="Kraft und Bewegung gezielt stärken."
            intro="Mit persönlicher Begleitung trainieren Sie an Ihren individuellen Zielen, einzeln oder als 10er-Serie."
          />
          <OfferGrid offers={trainingOffers} />
        </div>
      </section>

      <section className="selfpay-courses-section">
        <div className="site-shell selfpay-courses-grid">
          <div className="selfpay-courses-seal" aria-hidden="true">
            <BadgeCheck />
            <span>§20 SGB V</span>
          </div>
          <div>
            <p className="selfpay-eyebrow">ZPP-zertifizierte Onlinekurse</p>
            <h2>Gesundheitskurse, flexibel von zu Hause.</h2>
            <p>
              Entdecken Sie unsere zertifizierten Online-Präventionskurse aus verschiedenen Gesundheitsbereichen.
              Ob eine Erstattung möglich ist, hängt von Ihrer Krankenkasse und dem gewählten Kurs ab.
            </p>
            <Link className="selfpay-courses-link" href="/kurse/">
              Onlinekurse und Fördermöglichkeiten ansehen <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
