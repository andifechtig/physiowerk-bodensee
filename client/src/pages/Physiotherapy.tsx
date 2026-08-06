import { Check } from "lucide-react";
import { ContactCta, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";

const therapyImages = [
  ["paar-trainiert-zusammen-im-fitnessstudio-1.jpg", 800, 441, "Gemeinsames Training im Fitnessstudio"],
  ["Therapieansatz-Slides_0000_2U5A2992.jpg", 800, 539, "Therapieansatz"],
  ["Therapieansatz-Slides_0001_Physiowerk_Bodensee©patrickdunst-051-0371.jpg", 800, 539, "Therapie am Seilzug"],
  ["Therapieansatz-Slides_0003_Physiowerk_Bodensee©patrickdunst-003-0060.jpg", 800, 539, "Physiotherapeutische Behandlung"],
  ["Therapieansatz-Slides_0005_2U5A4005.jpg", 800, 539, "Klangschalen"],
] as const;

const services = [
  ["Physiotherapie/Krankengymnastik (KG)", "Wir rechnen alle klassischen Kassenrezepte im Bereich Physiotherapie ab."],
  ["Manuelle Therapie (MT)", "Mobilisation spezifischer Gelenke auf Basis physiotherapeutischer Aus- und Weiterbildungen."],
  ["Lymphdrainage (MLD)", "Therapie zur Entwässerung des Körpers von Ödemen/Flüssigkeitseinlagerungen unterschiedlicher Art."],
  ["Bobath (KG ZNS)", "Physiotherapie für Neurologische Themen rund um das zentrale und periphere Nervensystems (Schlaganfall, Paresen, MS ect)."],
  ["Krankengymnastik am Gerät (KGG)", "KGG ist ein gerätegestütztes Training unter physiotherapeutischer Anleitung. Ziel ist es, Kraft, Ausdauer, Koordination und Beweglichkeit zu verbessern. Die Leistung wird vom Arzt über eine Heilmittelverordnung verordnet und findet in unserem Trainingsbereich mit medizinischen Trainingsgeräten statt – einzeln oder in Kleingruppen mit maximal drei Personen."],
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
        title={<>Ursachen erkennen.<br />Bewegung zurückgewinnen.</>}
        intro="Wir kombinieren klassische Physiotherapie mit moderner Biomechanik – für nachhaltige Ergebnisse und echte Lebensqualität."
        booking
        media={<MediaPlaceholder width={800} height={441} filename="paar-trainiert-zusammen-im-fitnessstudio-1.jpg" description="Physiotherapie und Bewegung" dark />}
      />

      <section className="content-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Unser Therapieansatz"
            title="Im Physiowerk Bodensee steht der Mensch im Mittelpunkt."
            intro={<>Wir behandeln nicht nur Symptome, sondern analysieren die Bewegungsursachen – präzise, ganzheitlich und individuell.<br />Unser Ziel: Schmerzfrei bewegen – heute, morgen und langfristig.</>}
          />
          <div className="media-strip">
            {therapyImages.map(([filename, width, height, description]) => (
              <MediaPlaceholder key={filename} filename={filename} width={width} height={height} description={description} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell biomechanics-grid">
          <div>
            <SectionHeading
              eyebrow="Biomechanische Analyse"
              title="Bewegung verstehen – mit moderner Biomechanik."
              intro="Mit geschultem Auge und ganzheitlichem Verständnis analysieren wir Bewegungsabläufe, Gelenkwinkel und Muskelaktivität. Das ermöglicht präzise Diagnosen und maßgeschneiderte Therapiepläne."
            />
            <blockquote>
              „Faszien sind viel mehr als ein Ansammlung wabbeliger Gummibänder. Es ist ein kompliziertes Netzwerk aus Beobachtungs- und Meldeaussenposten. Alle sammeln eingehende Informationen und übermitteln sie dem Gehirn. Faszien sind so reich an sensorischen Input wie die Zunge oder gar die Augen. Wahrscheinlich sogar noch mehr, da sie Informationen von überall herbekommen.“
              <cite>Dr. R. Schleipp</cite>
            </blockquote>
          </div>
          <div className="biomechanics-media">
            <img
              className="biomechanics-media-image"
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/tCNnCFqldOpYbfHM.jpg"
              alt="Nahaufnahme einer Zitronenscheibe"
              width="488"
              height="479"
              loading="lazy"
              decoding="async"
            />
            <img
              className="biomechanics-media-image"
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/NnZNqSAhjozokZik.jpg"
              alt="Anatomische Darstellung von Faszien im Querschnitt"
              width="419"
              height="480"
              loading="lazy"
              decoding="async"
            />
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
