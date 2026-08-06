import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { BookingSection, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { PracticeMap } from "@/components/PracticeMap";
import { Seo } from "@/components/Seo";
import { CONTACT, OPENING_HOURS, SEO } from "@/site-config";

const CONTACT_HERO_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/wGgICEiGwgJWmdPo.PNG";
const CONTACT_MESSAGE_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/XqWXZETIrfFmZHjk.webp";

export default function Contact() {
  return (
    <>
      <Seo {...SEO.contact} />
      <PageHero
        title={<>Wir sind für Dich da –<br />nimm Kontakt auf.</>}
        intro="Ob Termin, Frage oder Beratung – wir freuen uns, von Dir zu hören."
        booking
        media={
          <img
            className="contact-hero-photo"
            src={CONTACT_HERO_IMAGE_URL}
            alt="Rezeptübergabe am Empfangstisch im Physiowerk Bodensee"
            width="800"
            height="539"
            decoding="async"
            fetchPriority="high"
          />
        }
      />

      <BookingSection />

      <section className="content-section">
        <div className="site-shell contact-page-grid">
          <div>
            <SectionHeading eyebrow="Kontaktformular" title="Nachricht senden" />
            <ContactForm />
          </div>
          <div>
            <img
              className="contact-message-photo"
              src={CONTACT_MESSAGE_IMAGE_URL}
              alt="Offener Briefkasten als Symbol für Ihre Nachricht an das Physiowerk Bodensee"
              width="800"
              height="539"
              loading="lazy"
              decoding="async"
            />
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
