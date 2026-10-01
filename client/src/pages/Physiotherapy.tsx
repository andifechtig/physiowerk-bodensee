import { Check } from "lucide-react";
import { ContactCta, PageHero, SectionHeading } from "@/components/PageElements";
import { TreatmentImageCarousel } from "@/components/TreatmentImageCarousel";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";

const PHYSIOTHERAPY_HERO_IMAGE_URL = "/images/GkQILUktqlJZyduB.webp";

const therapyImages = [
  { src: "/images/aSNziaOgvcZJGxOH.webp", alt: "Andreas mit Trainingsstange vor der Kletterwand", objectPosition: "50% 28%" },
  { src: "/images/mbKyRwtlOANsaJAN.webp", alt: "Klangschalen auf einer Holzbank", objectPosition: "50% 50%" },
  { src: "/images/mRiGoOlvsOqmywSR.webp", alt: "Physiotherapeutische Behandlung des Rückens", objectPosition: "50% 45%" },
  { src: "/images/LvZMfNGauYHNvPpc.webp", alt: "Therapeut mit Patientin am Keiser Seilzug", objectPosition: "50% 32%" },
  { src: "/images/ZKXgJjLSkzRbLOPG.webp", alt: "Behandlungsraum mit roter Therapieliege", objectPosition: "50% 50%" },
] as const;

const BIOMECHANICS_MEDIA = {
  citrus: "/images/tCNnCFqldOpYbfHM.jpg",
  fascia: "/images/NnZNqSAhjozokZik.jpg",
} as const;

const services = [
  ["Physiotherapie/Krankengymnastik (KG)", "Wir rechnen alle klassischen Kassenrezepte im Bereich Physiotherapie ab."],
  ["Manuelle Therapie (MT)", "Mobilisation spezifischer Gelenke auf Basis physiotherapeutischer Aus- und Weiterbildungen."],
  ["Lymphdrainage (MLD)", "Therapie zur Entwässerung des Körpers von Ödemen/Flüssigkeitseinlagerungen unterschiedlicher Art."],
  ["Bobath (KG ZNS)", "Physiotherapie für Neurologische Themen rund um das zentrale und periphere Nervensystems (Schlaganfall, Paresen, MS ect)."],
  ["Krankengymnastik am Gerät (KGG)", "KGG ist ein gerätegestütztes Training unter physiotherapeutischer Anleitung. Ziel ist es, Kraft, Ausdauer, Koordination und Beweglichkeit zu verbessern. Die Leistung wird vom Arzt über eine Heilmittelverordnung verordnet und findet in unserem Trainingsbereich mit medizinischen Trainingsgeräten statt. Trainiert wird einzeln oder in Kleingruppen mit maximal drei Personen."],
  ["Faszientherapie (Strukturelle Integration)", "Ganzheitliche Behandlung des Bewegungsapparats mit Hinblick auf die Faszialen Strukturen nach Dr. Ida Rolf. 10er Serie (Selbstzahlerleistung)."],
  ["Kinesiotaping", "Taping bei Verletzungen oder Schmerzen (Entlastung der betroffenen Strukturen)."],
  ["Elektrotherapie/Ultraschalltherapie/Fango", "Zusatzleistungen auf den Physio-Rezepten."],
] as const;

const process = ["Erstgespräch & Anamnese", "Bewegungsanalyse & Befund", "Individuelle Therapieplanung", "Kontinuierliche Betreuung & Re-Checks"] as const;

export default function Physiotherapy() {
  return (
    <>
      <Seo {...SEO.physiotherapie} />
      <PageHero
        title={<>Physiotherapie & Biomechanik<br />in Meckenbeuren.</>}
        intro="Wir kombinieren klassische Physiotherapie mit moderner Biomechanik. Für nachhaltige Ergebnisse und echte Lebensqualität."
        booking
        media={<img className="physiotherapy-hero-photo" src={PHYSIOTHERAPY_HERO_IMAGE_URL} alt="Manuelle Nackenbehandlung im Physiowerk Bodensee" width="800" height="441" decoding="async" fetchPriority="high" />}
      />

      <section className="content-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Unser Therapieansatz"
            title="Im Physiowerk Bodensee steht der Mensch im Mittelpunkt."
            intro={<>Wir behandeln nicht nur Symptome, sondern analysieren Bewegungsursachen präzise, ganzheitlich und individuell.<br />Unser Ziel: schmerzfrei bewegen. Heute, morgen und langfristig.</>}
          />
          <TreatmentImageCarousel images={therapyImages} label="Bilder unseres Therapieansatzes" />
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell biomechanics-grid">
          <div>
            <SectionHeading
              eyebrow="Biomechanische Analyse"
              title="Bewegung verstehen mit moderner Biomechanik."
              intro="Mit geschultem Auge und ganzheitlichem Verständnis analysieren wir Bewegungsabläufe, Gelenkwinkel und Muskelaktivität. Das ermöglicht präzise Diagnosen und maßgeschneiderte Therapiepläne."
            />
            <blockquote>
              „Faszien sind viel mehr als ein Ansammlung wabbeliger Gummibänder. Es ist ein kompliziertes Netzwerk aus Beobachtungs- und Meldeaussenposten. Alle sammeln eingehende Informationen und übermitteln sie dem Gehirn. Faszien sind so reich an sensorischen Input wie die Zunge oder gar die Augen. Wahrscheinlich sogar noch mehr, da sie Informationen von überall herbekommen.“
              <cite>Dr. R. Schleipp</cite>
            </blockquote>
          </div>
          <div className="biomechanics-media">
            <div className="biomechanics-original-media">
              <img className="biomechanics-original-image biomechanics-citrus-image" src={BIOMECHANICS_MEDIA.citrus} alt="Zitronenscheibe" width="488" height="479" loading="lazy" decoding="async" />
            </div>
            <div className="biomechanics-original-media">
              <img className="biomechanics-original-image" src={BIOMECHANICS_MEDIA.fascia} alt="Anatomische Darstellung von Faszien im Querschnitt" width="419" height="480" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-shell">
          <SectionHeading eyebrow="Leistungen" title="Physiotherapie & Behandlung" />
          <div className="service-grid">
            {services.map(([title, text]) => (
              <article key={title}>
                <Check aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Information zu Kassenrezepten"
            title="Gesetzliche Zuzahlung"
            intro={
              <>
                Für ein Physiotherapie-Rezept der gesetzlichen Krankenkasse zahlen Patientinnen und Patienten ab 18 Jahren ohne gültige Befreiung 10 % der Behandlungskosten plus 10 € je Verordnung, wenn die erste Behandlung bis einschließlich 31.12.2026 stattfindet. Die Zuzahlung ist höchstens so hoch wie die Kosten der tatsächlich erbrachten Behandlung. Für Verordnungen, bei denen die erste Behandlung ab 01.01.2027 stattfindet, beträgt die Pauschale 15 € je Verordnung.
                <br />
                <br />
                Kinder und Jugendliche unter 18 Jahren sind zuzahlungsfrei. Wenn Sie Ihre Belastungsgrenze erreicht haben, können Sie bei Ihrer Krankenkasse eine Befreiungsbescheinigung beantragen. Die Grenze liegt grundsätzlich bei 2 % der jährlichen Bruttoeinnahmen zum Lebensunterhalt, bei schwerwiegend chronisch Kranken unter gesetzlichen Voraussetzungen bei 1 %.
                <br />
                <br />
                Die gesamte Zuzahlung ist am ersten Behandlungstag fällig – zu Beginn Ihrer Behandlungsserie. Bitte bringen Sie eine gültige Befreiungsbescheinigung mit.
              </>
            }
          />
          <p className="physiotherapy-copayment-sources">
            Rechtsgrundlagen: {" "}
            <a href="https://www.gesetze-im-internet.de/sgb_5/__32.html" target="_blank" rel="noreferrer">
              §§ 32, 61 und 62 SGB V
            </a>{" "}
            <a href="https://www.gkv-heilmittel.de/fuer_heilmittelerbringer/vertraege/vertraege.jsp" target="_blank" rel="noreferrer">
              Physiotherapie-Vertrag, § 8
            </a>{" "}
            <a href="https://www.recht.bund.de/eli/bund/bgbl-1/2026/228" target="_blank" rel="noreferrer">
              Änderung ab 2027 (Bundesgesetzblatt)
            </a>
            .
          </p>
        </div>
      </section>

      <section className="content-section content-section-dark">
        <div className="site-shell">
          <SectionHeading eyebrow="Therapieablauf" title="Schritt für Schritt" light />
          <ol className="process-grid">
            {process.map((item, index) => (
              <li key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
