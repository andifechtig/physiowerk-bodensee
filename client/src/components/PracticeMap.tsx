import { CONTACT } from "@/site-config";

const mapQuery = encodeURIComponent(`${CONTACT.name}, ${CONTACT.address}`);
const mapUrl = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;

export function PracticeMap() {
  return (
    <section className="map-section" aria-label="Anfahrtskarte">
      <div className="site-shell">
        <iframe
          className="practice-map"
          title="Physiowerk Bodensee, Tettnanger Str. 14, 88074 Meckenbeuren"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
