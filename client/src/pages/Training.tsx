import { BadgeCheck, Check, Dumbbell } from "lucide-react";
import { ContactCta, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";

const trainingImages = [
  "paar-trainiert-zusammen-im-fitnessstudio-2.jpg",
  "Fitness-Slides_0005_Physiowerk_Bodensee©patrickdunst-062-0389.jpg",
  "Fitness-Slides_0004_Physiowerk_Bodensee©patrickdunst-105-0201.jpg",
  "Fitness-Slides_0003_Physiowerk_Bodensee©patrickdunst-131-0272.jpg",
  "Fitness-Slides_0002_Physiowerk_Bodensee©patrickdunst-132-0274.jpg",
  "Fitness-Slides_0000_2U5A4023.jpg",
] as const;

const advantages = ["Reduziert Rückenschmerzen", "Unterstützt den Heilungsprozess", "Stärkt Gelenke & Muskulatur", "Verbessert Alltagsbewegungen"] as const;

const offers = [
  ["Krankengymnastik am Gerät (KG-G)", "Wir rechnen Rezepte für gerätegestützes therapeutisches Training ab."],
  ["Fitness & Prävention", "Sie haben körperliche Ziele? Beweglichkeit, Schmerzfreiheit; Kraftaufbau, Koordination? Wir helfen Ihnen gern dabei diese Ziele zu erreichen und arbeiten gemeinsam an einer Lösung die nachhaltig erfolgreich bleibt."],
  ["T-RENA", "T-RENA ist ein Nachsorge Programm der deutschen Rentenversicherung und ist im Anschluss an die Reha verordnet. Sie können bis zu einem halben Jahr regelmäßig unter therapeutischer Aufsicht trainieren. Weitere Infos finden Sie auf der Website der deutschen Rentenversicherung."],
  ["Trainingsräume & Ausstattung", "Unsere Geräte sind von der Firma Keiser und sind hydraulisch betrieben. Dadurch können wir den Widerstand auf 100g genau einstellen. Die Geräte umfassen alle wichtigen Regionen des Körpers und deren Funktionen. Auch für Cardiotraining ist gesorgt. Zusätzlich stehen Ihnen zwei Seilzüge, sowie diverse Gewichte und Trainingsutensilien für ein Offenes Training zur Verfügung."],
  ["Mitgliedschaft", "Sie wollen regelmäßig etwas für sich tun? Wählen Sie zwischen einer monatlichen Mitgliedschaft sowie Laufzeiten von 12 oder 24 Monaten. Wir helfen Ihnen dabei, Ihre Ziele zu erreichen. Sprechen Sie uns gerne darauf an."],
  ["EGYM Wellpass", "Sie sind Inhaber eines Wellpass? Top. Wir sind Partner von Wellpass. Informieren Sie sich gerne bei uns über die Konditionen."],
] as const;

const memberships = [
  {
    name: "Monatlich",
    price: "70 €",
    unit: "pro Monat",
    text: "Reguläre Mitgliedschaft mit monatlicher Laufzeit für einen flexiblen Einstieg in Ihr Training.",
    icon: Dumbbell,
    featured: false,
  },
  {
    name: "12 Monate",
    price: "60 €",
    unit: "pro Monat",
    text: "Regulärer Mitgliedsvertrag mit zwölf Monaten Laufzeit für kontinuierliches Training in unserem Trainingsbereich.",
    icon: Dumbbell,
    featured: false,
  },
  {
    name: "24 Monate",
    price: "50 €",
    unit: "pro Monat",
    text: "Regulärer Mitgliedsvertrag mit vierundzwanzig Monaten Laufzeit und unserem günstigsten monatlichen Beitrag.",
    icon: Dumbbell,
    featured: true,
  },
  {
    name: "EGYM Wellpass",
    price: "Wellpass",
    unit: "Mitgliedschaft",
    text: "Training ist mit einer aktiven Wellpass-Mitgliedschaft möglich. Es gelten die separaten Konditionen von Wellpass.",
    icon: BadgeCheck,
    featured: false,
  },
] as const;

export default function Training() {
  return (
    <>
      <Seo {...SEO.training} />
      <PageHero
        title={<>Gezieltes Training.<br />Therapeutisch betreut.</>}
        intro="Baue Kraft, Stabilität und Mobilität auf – mit medizinisch begleitetem Training im Physiowerk Bodensee."
        booking
        media={<MediaPlaceholder width={800} height={441} filename="paar-trainiert-zusammen-im-fitnessstudio-2.jpg" description="Medizinisches Training" dark />}
      />

      <section className="content-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Was ist medizinisches Training?"
            title="Unser medizinisches Training schließt die Lücke zwischen Therapie und Fitness."
            intro="Unter physiotherapeutischer Betreuung trainierst Du gezielt Deine Schwachstellen, verbesserst Haltung, Koordination und Kraft."
          />
          <div className="media-strip media-strip-six">
            {trainingImages.map(filename => (
              <MediaPlaceholder key={filename} filename={filename} width={800} height={441} description="Medizinisches Training und Fitness" />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-dark">
        <div className="site-shell">
          <SectionHeading eyebrow="Vorteile" title="Gezielt stärker im Alltag" light />
          <div className="advantage-grid">
            {advantages.map(item => (
              <article key={item}>
                <Check aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-shell">
          <SectionHeading eyebrow="Leistungen und Angebote" title="Training, Nachsorge und Prävention" />
          <div className="offer-list">
            {offers.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section membership-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Trainieren bei uns"
            title="Die Mitgliedschaft, die zu Ihrem Training passt"
            intro="Nutzen Sie unseren medizinisch ausgestatteten Trainingsbereich über Wellpass oder mit einem regulären Mitgliedsvertrag."
          />
          <div className="membership-grid">
            {memberships.map(({ name, price, unit, text, icon: Icon, featured }) => (
              <article className={`membership-card ${featured ? "membership-card-featured" : ""}`} key={name}>
                {featured ? <span className="membership-badge">Bestes Monatsangebot</span> : null}
                <Icon aria-hidden="true" />
                <p className="membership-name">{name}</p>
                <div className="membership-price"><strong>{price}</strong><span>{unit}</span></div>
                <p>{text}</p>
                <a href="/kontakt/" className="membership-link">Konditionen anfragen</a>
              </article>
            ))}
          </div>
          <p className="membership-footnote">
            Die Wellpass-Nutzung richtet sich nach den jeweils gültigen Konditionen Ihres Wellpass-Vertrags.
          </p>
        </div>
      </section>

      <section className="training-entry">
        <div className="site-shell">
          <SectionHeading eyebrow="Einstieg und Probetraining" title={<>Einstieg und<br />Probetraining</>} intro="Starte jetzt Dein Training mit medizinischem Know-how." light />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
