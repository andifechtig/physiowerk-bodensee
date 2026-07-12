import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { BookingSection, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { PracticeMap } from "@/components/PracticeMap";
import { Seo } from "@/components/Seo";
import { CONTACT, OPENING_HOURS, SEO } from "@/site-config";

export default function Contact() {
  return (
    <>
      <Seo {...SEO.contact} />
      <PageHero
        title={<>Wir sind für Dich da –<br />nimm Kontakt auf.</>}
        intro="Ob Termin, Frage oder Beratung – wir freuen uns, von Dir zu hören."
        booking
        media={<MediaPlaceholder width={800} height={539} filename="Teamseite-Header-Physiowerk-Bodensee.jpg" description="Physiowerk Bodensee Team" dark />}
      />

      <BookingSection />

      <section className="content-section">
        <div className="site-shell contact-page-grid">
          <div>
            <SectionHeading eyebrow="Kontaktformular" title="Nachricht senden" />
            <ContactForm />
          </div>
          <div>
            <MediaPlaceholder width={800} height={539} filename="Therapieansatz-Slides_0001_Physiowerk_Bodensee©patrickdunst-051-0371.jpg" description="Therapie am Seilzug" />
            <div className="contact-detail-list">
              <a href={CONTACT.phoneHref}><Phone aria-hidden="true" /><span>{CONTACT.phoneLabel}</span></a>
              <a href={`mailto:${CONTACT.email}`}><Mail aria-hidden="true" /><span>{CONTACT.email}</span></a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>{CONTACT.company}<br />{CONTACT.street}<br />{CONTACT.city}</span></a>
            </div>
            <div className="contact-hours">
              <h2>Öffnungszeiten</h2>
              {OPENING_HOURS.map(item => <div key={item.days}><strong>{item.days}</strong><span>{item.hours}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <PracticeMap />
    </>
  );
}
