import { Check } from "lucide-react";
import { ArrowLink, PageHero, SectionHeading } from "@/components/PageElements";
import { Seo } from "@/components/Seo";
import { CONTACT, SEO } from "@/site-config";

const CAREER_HERO_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/BjmnaxpzwbfZKOwc.webp";
const CAREER_HEART_IMAGE_URL = "/manus-storage/physiowerk-herz-vollflaechig_cdd7affc.png";

const benefits = ["moderne, helle Praxisräume", "abwechslungsreicher Mix aus Therapie & Training", "wertschätzendes Miteinander", "Zeit für Qualität statt Fließband", "faire Arbeitszeiten & Fortbildungssupport"] as const;

export default function Career() {
  return (
    <>
      <Seo {...SEO.career} />
      <PageHero
        title="Werde Teil unseres Teams!"
        intro="Physiotherapie mit Herz, Know-how und modernem Umfeld."
        media={<img className="career-hero-photo" src={CAREER_HERO_IMAGE_URL} alt="Andreas beim Training mit einer Patientin am Seilzug" width="800" height="534" decoding="async" fetchPriority="high" />}
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
          <img className="career-team-heart" src={CAREER_HEART_IMAGE_URL} alt="Rotes Herz als Symbol für eine Karriere im Physiowerk Bodensee" width="1200" height="1200" loading="lazy" decoding="async" />
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
