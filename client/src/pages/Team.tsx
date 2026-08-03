import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";
import { PageHero, SectionHeading, ArrowLink, ContactCta } from "@/components/PageElements";

const team = [
  { name: "Andreas Fechtig", role: "Inhaber und Physiotherapeut", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/PoWYIAWoCZSqpiFF.webp" },
  { name: "Laura Knapp", role: "Inhaberin und Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/ZjKXnqXaALGOqQDC.webp" },
  { name: "Lea Jäger", role: "Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/raIDLFFsURHnKBUj.webp" },
  { name: "Madeleine Seitz", role: "Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/YkAPXyQZvEqpJLkk.webp" },
  { name: "Luise Schwab", role: "Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/HTwmBqkaovwHeJZo.webp" },
  { name: "Selina Lanz", role: "Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/SOJwLGJAfyoLtAtQ.webp" },
  { name: "Stefanie Ruhstorfer", role: "Physiotherapeutin", imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/HNYcFjfSLlQBCSZN.webp" },
];

export default function Team() {
  return (
    <>
      <Seo {...SEO.team} />
      <PageHero
        title={<>Bewegung ist Leben –<br />und unsere Leidenschaft</>}
        intro="Wir sind das Physiowerk Bodensee – ein Team aus erfahrenen Therapeut:innen, das Menschen in Bewegung bringt."
        media={<MediaPlaceholder width={800} height={534} filename="Physiowerk_Bodensee©patrickdunst-095-0601.jpg" description="Team und Praxis in Meckenbeuren" dark />}
      />

      <section className="content-section">
        <div className="site-shell philosophy-grid">
          <SectionHeading eyebrow="Philosophie" title="Nachhaltige Gesundheit durch Bewegung, Wissen und Motivation." />
          <p>Im Physiowerk Bodensee vereinen wir medizinisches Wissen, biomechanische Analyse und persönliches Engagement.</p>
        </div>
      </section>

      <section className="content-section content-section-soft">
        <div className="site-shell">
          <SectionHeading eyebrow="Team" title="Menschen, die Menschen bewegen" />
          <div className="team-grid">
            {team.map((member) => (
              <article className="team-card" key={member.name}>
                <img src={member.imageUrl} alt={`Portrait ${member.name}`} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '2.8rem' }} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
            <article className="team-card team-card-open">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/fQdaxpLmlxGQXsAH.jpg" alt="Offener Teamplatz" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '2.8rem' }} />
              <h3>Du?</h3>
              <p>Werde Teil unseres Teams</p>
              <ArrowLink href="/karriere/">Jetzt bewerben</ArrowLink>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-shell rooms-grid">
          <div>
            <SectionHeading eyebrow="Räumlichkeiten" title="Helle Räume. Moderne Ausstattung. Persönliche Atmosphäre." />
            <p>Unsere Praxis bietet helle, moderne Behandlungsräume und einen bestens ausgestatteten Trainingsbereich. Hochwertige medizinische Geräte, funktionelle Trainingsflächen und eine angenehme Atmosphäre schaffen ideale Bedingungen für effektive Therapie und gezieltes Training.</p>
          </div>
          <MediaPlaceholder width={800} height={534} filename="Physiowerk_Bodensee©patrickdunst-095-0601.jpg" description="Räumlichkeiten des Physiowerk Bodensee" />
        </div>
      </section>

      <section className="career-banner">
        <div className="site-shell career-banner-grid">
          <div>
            <SectionHeading eyebrow="Karriere" title={<>Werde Teil<br />unseres Teams!</>} intro="Du bist Physiotherapeut:in mit Herz und möchtest in einem modernen, wertschätzenden Umfeld arbeiten?" />
            <ArrowLink href="/karriere/">Jetzt bewerben</ArrowLink>
          </div>
          <MediaPlaceholder width={500} height={522} filename="Gruppe-99.svg" description="Anatomische Herzdekoration" dark />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
