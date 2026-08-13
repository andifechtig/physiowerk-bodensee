import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { PageHero } from "@/components/PageElements";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";

const IMPRINT_HERO_IMAGE_URL = "/images/XrFqmLOCULpwHzPO.webp";

export default function Imprint() {
  return (
    <>
      <Seo {...SEO.imprint} />
      <PageHero
        title="Impressum"
        intro="Physiowerk Bodensee GmbH"
        media={
          <img
            className="imprint-hero-photo"
            src={IMPRINT_HERO_IMAGE_URL}
            alt="Außenansicht des Gebäudes vom Physiowerk Bodensee"
            width="800"
            height="441"
            decoding="async"
            fetchPriority="high"
          />
        }
      />
      <article className="site-shell legal-page">
        <section>
          <p>Physiowerk Bodensee GmbH<br />Tettnanger Straße 14<br />88074 Meckenbeuren</p>
          <p>Registergericht: Amtsgericht Ulm<br />Handelsregister: HRB 750803</p>
          <p>Vertreten durch:<br />Andreas Fechtig</p>
        </section>
        <section><h2>Kontakt</h2><p>Telefon: +49 (0) 7542 2 919 731<br />E-Mail: <a href="mailto:info@physiowerk-bodensee.de">info@physiowerk-bodensee.de</a></p></section>
        <section><h2>Umsatzsteuer-ID</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE458726215</p></section>
        <section><h2>Redaktionell verantwortlich</h2><p>Physiowerk Bodensee GmbH</p></section>
        <section><h2>Werbeagentur Bodensee / Webdesign</h2><p><a href="https://www.das-hinterland.de" target="_blank" rel="noreferrer">www.das-hinterland.de</a></p></section>
        <section><h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p><p>Quelle: e-recht24.de</p><p>Wordpress Programmierung: sem-webagentur.de</p></section>
      </article>
    </>
  );
}
