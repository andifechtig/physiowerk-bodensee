import { ArrowLink, ContactCta, PageHero, SectionHeading } from "@/components/PageElements";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Seo } from "@/components/Seo";
import { SEO } from "@/site-config";

const team = [
  ["Andreas Fechtig", "Inhaber und Physiotherapeut", "andreas-fechtig.jpg"],
  ["Laura Knapp", "Inhaberin und Physiotherapeutin", "laura-knapp.jpg"],
  ["Lea Jäger", "Physiotherapeutin", "lea-jaeger.jpg"],
  ["Luise Schwab", "Physiotherapeutin", "luise-schwab.jpg"],
  ["Selina Lanz", "Physiotherapeutin", "selina-lanz.jpg"],
] as const;

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
            {team.map(([name, role, filename]) => (
              <article className="team-card" key={name}>
                <MediaPlaceholder filename={filename} width={450} height={450} description={`Portrait ${name}`} />
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
            <article className="team-card team-card-open">
              <MediaPlaceholder filename="physiowerk-herz.jpg" width={450} height={450} description="Offener Teamplatz" />
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
            <SectionHeading eyebrow="Karriere" title={<>Werde Teil<br />unseres Teams!</>} intro="Du bist Physiotherapeut:in mit Herz und möchtest in einem modernen, wertschätzenden Umfeld arbeiten? Dann bist Du bei uns genau richtig." light />
            <ArrowLink href="/karriere/">Jetzt bewerben</ArrowLink>
          </div>
          <MediaPlaceholder width={500} height={522} filename="Gruppe-99.svg" description="Anatomische Herzdekoration" dark />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
