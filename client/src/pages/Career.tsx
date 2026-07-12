import { Check } from "lucide-react";
import { ArrowLink, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Seo } from "@/components/Seo";
import { CONTACT, SEO } from "@/site-config";

const benefits = ["moderne, helle Praxisräume", "abwechslungsreicher Mix aus Therapie & Training", "wertschätzendes Miteinander", "Zeit für Qualität statt Fließband", "faire Arbeitszeiten & Fortbildungssupport"] as const;

export default function Career() {
  return (
    <>
      <Seo {...SEO.career} />
      <PageHero
        title="Werde Teil unseres Teams!"
        intro="Physiotherapie mit Herz, Know-how und modernem Umfeld."
        media={<MediaPlaceholder width={800} height={534} filename="Physiowerk_Bodensee©patrickdunst-042-0349.jpg" description="Karriere beim Physiowerk Bodensee" dark />}
      />

      <section className="content-section">
        <div className="site-shell career-benefits-grid">
          <SectionHeading eyebrow="Was dich erwartet" title="Arbeiten mit Qualität, Wertschätzung und Perspektive" />
          <div className="career-benefits">
            {benefits.map(item => (
              <div key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell opportunity-grid">
          <div>
            <SectionHeading eyebrow="Deine Chance" title="Gesucht: Physiotherapeut:in (m/w/d)" />
            <p className="lead-copy">Vollzeit, Teilzeit oder Wiedereinstieg.<br />Du bringst Interesse an moderner Therapie, Motivation und Freude am Umgang mit Menschen mit? Perfekt!</p>
          </div>
          <MediaPlaceholder width={800} height={518} filename="Karriere-Bodensee-Jobs-Physiotherapeut.jpg" description="Teamfoto Karriere" />
        </div>
      </section>

      <section className="application-cta">
        <div className="site-shell application-cta-grid">
          <div>
            <SectionHeading eyebrow="Jetzt durchstarten" title="Jetzt bewerben – schnell & unkompliziert" intro={<>Schicke uns eine kurze Mail mit Deinem Lebenslauf.<br /><br />Wir freuen uns auf Dich!</>} light />
            <ArrowLink href={`mailto:${CONTACT.applicationEmail}`}>Jetzt bewerben!</ArrowLink>
          </div>
          <div className="application-details">
            <a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a>
            <a href={`mailto:${CONTACT.applicationEmail}`}>{CONTACT.applicationEmail}</a>
            <span>{CONTACT.name}, {CONTACT.address}</span>
          </div>
        </div>
      </section>
    </>
  );
}
