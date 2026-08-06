import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BOOKING_CONFIG,
  CANONICAL_REDIRECTS,
  COACHING_WHATSAPP_URL,
  NAVIGATION,
  SEO,
  SOCIAL_LINKS,
  THERACONNECT,
} from "../client/src/site-config";

describe("stable site routes", () => {
  it("keeps every required canonical route with a trailing slash", () => {
    expect(Object.values(SEO).map(entry => entry.path)).toEqual([
      "/",
      "/physiotherapie/",
      "/medizinisches-training-und-fitness/",
      "/team-praxis/",
      "/karriere/",
      "/coaching/",
      "/app/",
      "/kurse/",
      "/kontakt/",
      "/impressum/",
      "/datenschutzerklaerung/",
    ]);
  });

  it("keeps the primary navigation on canonical paths", () => {
    expect(NAVIGATION.every(entry => entry.href.endsWith("/"))).toBe(true);
    expect(NAVIGATION.at(-1)).toEqual({ label: "Kurse", href: "/kurse/" });
  });

  it("redirects every non-slash URL to its canonical trailing-slash route", () => {
    expect(CANONICAL_REDIRECTS).toEqual({
      "/physiotherapie": "/physiotherapie/",
      "/medizinisches-training-und-fitness": "/medizinisches-training-und-fitness/",
      "/team-praxis": "/team-praxis/",
      "/karriere": "/karriere/",
      "/coaching": "/coaching/",
      "/app": "/app/",
      "/kurse": "/kurse/",
      "/kontakt": "/kontakt/",
      "/impressum": "/impressum/",
      "/datenschutzerklaerung": "/datenschutzerklaerung/",
    });
  });

  it("uses the exact coaching WhatsApp conversation URL", () => {
    expect(COACHING_WHATSAPP_URL).toBe(
      "https://wa.me/4917680148726?text=Hallo%20Andreas%2C%20ich%20bin%20interessiert%20am%20Coaching%20Programm%20%22Schmerzfrei%20Jetzt%22.",
    );
  });

  it("keeps the established social profiles and renders highlighted brand icons in the footer", () => {
    const siteLayout = readFileSync(new URL("../client/src/components/SiteLayout.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(SOCIAL_LINKS).toEqual([
      { label: "Instagram", href: "https://www.instagram.com/andi_physiowerk/" },
      { label: "Facebook", href: "https://www.facebook.com/deinbiomechaniker/" },
    ]);
    expect(siteLayout).toContain('Facebook, Instagram');
    expect(siteLayout).toContain('className="social-link"');
    expect(siteLayout).toContain('aria-label={`Physiowerk Bodensee auf ${item.label}`}');
    expect(siteLayout).toContain('rel="noopener noreferrer"');
    expect(siteLayout).toContain('item.label === "Instagram"');
    expect(styles).toContain('.social-link { min-height: 44px; display: inline-flex;');
    expect(styles).toContain('.social-link-icon { width: 1.15rem; height: 1.15rem; }');
    expect(styles).toContain('.social-link:hover { border-color: var(--brand);');
  });

  it("uses the existing heart image instead of the career placeholder on the home page", () => {
    const home = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(home).toContain('const CAREER_HEART_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/fQdaxpLmlxGQXsAH.jpg"');
    expect(home).toContain('className="career-banner-heart"');
    expect(home).toContain('alt="Rotes Herz als Symbol für Karriere im Physiowerk Bodensee"');
    expect(home).not.toContain('filename="Gruppe-99.svg" description="Anatomische Herzdekoration" dark');
    expect(styles).toContain('.career-banner-heart { width: 100%; max-width: 500px; justify-self: end; aspect-ratio: 1; object-fit: cover; object-position: center;');
  });

  it("uses all six supplied media sources in their corresponding home-page placements", () => {
    const home = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
    const mediaUrls = [
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/tTQDcPvqnXwIiMoX.webp",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/OHHoxsvHutuBBXuv.svg",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/YQeESqWyCJYEgyZk.webp",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/AuoAGnYdQvFitYcA.webp",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/zqBCyoEGBifCsLze.webp",
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/CePFuZnJCcjyUzGR.webp",
    ];

    mediaUrls.forEach(url => expect(home).toContain(url));
    expect(home).toContain('src={HOME_MEDIA.heroTherapy}');
    expect(home).toContain('src={HOME_MEDIA.boneIllustration}');
    expect(home).toContain('src={card.imageUrl}');
    expect(home).toContain('src={HOME_MEDIA.lauraAndLea}');
    expect(home).not.toContain('filename="Rechteck-35.jpg"');
    expect(home).not.toContain('filename="Knochen-1.svg"');
    expect(home).not.toContain('filename="Karriere-Bodensee-Jobs-Physiotherapeut.jpg"');
    expect(styles).toContain('.home-hero-photo { width: 100%; min-height: 220px; aspect-ratio: 1; object-fit: cover;');
    expect(styles).toContain('.focus-card-image { width: 100%; aspect-ratio: 746 / 450; object-fit: cover;');
    expect(styles).toContain('.mission-grid-photo { width: 100%; aspect-ratio: 1382 / 894; object-fit: cover;');
  });

  it("publishes the coaching, app and course routes in the sitemap", () => {
    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf8");
    expect(sitemap).toContain("https://www.physiowerk-bodensee.de/coaching/");
    expect(sitemap).toContain("https://www.physiowerk-bodensee.de/app/");
    expect(sitemap).toContain("https://www.physiowerk-bodensee.de/kurse/");
  });

  it("keeps current membership prices, course funding contracts and KGG details explicit", () => {
    const training = readFileSync(new URL("../client/src/pages/Training.tsx", import.meta.url), "utf8");
    const physiotherapy = readFileSync(new URL("../client/src/pages/Physiotherapy.tsx", import.meta.url), "utf8");
    const courses = readFileSync(new URL("../client/src/pages/Courses.tsx", import.meta.url), "utf8");

    expect(training).toContain('name: "Monatlich"');
    expect(training).toContain('price: "70 €"');
    expect(training).toContain('name: "12 Monate"');
    expect(training).toContain('price: "60 €"');
    expect(training).toContain('name: "24 Monate"');
    expect(training).toContain('price: "50 €"');
    expect(training).toContain("Wellpass-Mitgliedschaft");
    expect(training).not.toContain('name: "6 Monate"');
    expect(training.indexOf('name: "Monatlich"')).toBeLessThan(training.indexOf('name: "EGYM Wellpass"'));
    expect(training.indexOf('name: "12 Monate"')).toBeLessThan(training.indexOf('name: "EGYM Wellpass"'));
    expect(training.indexOf('name: "24 Monate"')).toBeLessThan(training.indexOf('name: "EGYM Wellpass"'));
    expect(physiotherapy).toContain("Krankengymnastik am Gerät (KGG)");
    expect(physiotherapy).toContain("maximal drei Personen");
    expect(courses).toContain("Online-Präventionskurse – bis zu 100 % gefördert");
    expect(courses).toContain('const FUNDING_FORM_URL = "https://krankenkassen-cashback.typeform.com/Physiowerk"');
    expect(courses).toContain("href={FUNDING_FORM_URL}");
    expect(courses).toContain('target="_blank"');
    expect(courses).toContain('rel="noopener noreferrer"');
    expect(courses).not.toContain("#foerderung-pruefen");
    expect((courses.match(/<FundingCta label=/g) ?? [])).toHaveLength(4);
    expect(courses).toContain("Kostenlos · unverbindlich · in weniger als 30 Sekunden");
    expect(courses).toContain("Unser unabhängiger Förderpartner");
    expect(courses).not.toContain("Prävention digital");
    expect(courses).not.toContain("In vier Schritten zum Präventionskurs");
  });

  it("uses the supplied training-room photo in the medical training hero", () => {
    const training = readFileSync(new URL("../client/src/pages/Training.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(training).toContain('const TRAINING_HERO_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/XeGaePDfCrPpepHM.webp"');
    expect(training).toContain('className="training-hero-photo"');
    expect(training).toContain('alt="Trainingsraum mit Kraftgeräten im Physiowerk Bodensee"');
    expect(training).not.toContain('filename="paar-trainiert-zusammen-im-fitnessstudio-2.jpg" description="Medizinisches Training" dark');
    expect(styles).toContain('.page-hero-media > .team-hero-photo, .page-hero-media > .training-hero-photo { width: 100%; min-height: 220px; aspect-ratio: 800 / 534; object-fit: cover;');
  });

  it("keeps team portraits square, face-oriented and their names readable", () => {
    const team = readFileSync(new URL("../client/src/pages/Team.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");
    const portraits = [
      ["Andreas Fechtig", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/PoWYIAWoCZSqpiFF.webp"],
      ["Laura Knapp", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/ZjKXnqXaALGOqQDC.webp"],
      ["Lea Jäger", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/raIDLFFsURHnKBUj.webp"],
      ["Madeleine Seitz", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/YkAPXyQZvEqpJLkk.webp"],
      ["Luise Schwab", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/HTwmBqkaovwHeJZo.webp"],
      ["Selina Lanz", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/SOJwLGJAfyoLtAtQ.webp"],
      ["Stefanie Ruhstorfer", "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/HNYcFjfSLlQBCSZN.webp"],
    ];
    const names = portraits.map(([name]) => name);

    expect(team).toContain('className="team-card-media"');
    expect(team).toContain('className="team-card-photo"');
    expect(team).toContain("alt={`Portrait ${member.name}`}");
    expect(team).toContain('className="team-card-photo team-card-photo-heart"');
    expect(team).toContain('alt="Rotes Herz als Symbol für einen offenen Teamplatz"');
    expect(names.map(name => team.indexOf(name))).toEqual([...names.map(name => team.indexOf(name))].sort((a, b) => a - b));
    portraits.forEach(([name, imageUrl]) => {
      expect(team).toContain(`name: "${name}"`);
      expect(team).toContain(`imageUrl: "${imageUrl}"`);
    });
    expect(styles).toContain(".team-card-media { position: relative; aspect-ratio: 1;");
    expect(styles).toContain(".team-card-photo { width: 100%; height: 100%; display: block; object-fit: cover; object-position: 50% 24%; }");
    expect(styles).toContain(".team-card-photo-heart { object-position: center; }");
    expect(styles).toContain(".team-card h3 { margin: 1.2rem .25rem 0; color: var(--brand); font-size: clamp(1.5rem, 2.2vw, 2.1rem); font-weight: 600;");
  });

  it("uses the supplied reception photo in the team hero", () => {
    const team = readFileSync(new URL("../client/src/pages/Team.tsx", import.meta.url), "utf8");
    const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(team).toContain('const TEAM_HERO_IMAGE_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663456215423/rSQQTljhWGQMIZzP.webp"');
    expect(team).toContain('className="team-hero-photo"');
    expect(team).toContain('alt="Empfangsbereich des Physiowerk Bodensee in Meckenbeuren"');
    expect(team).not.toContain('description="Team und Praxis in Meckenbeuren"');
    expect(styles).toContain(".page-hero-media > .team-hero-photo, .page-hero-media > .training-hero-photo { width: 100%; min-height: 220px; aspect-ratio: 800 / 534; object-fit: cover; object-position: 50% 50%;");
  });

  it("keeps the TheraConnect downloads and QR asset exact", () => {
    expect(THERACONNECT).toEqual({
      qrCode: "/manus-storage/theracode-qr_3bdbe30f.png",
      googlePlay: "https://play.google.com/store/apps/details?id=de.sovdwaer.theraconnect",
      appStore: "https://apps.apple.com/de/iphone/today",
    });
  });

  it("uses the active THEORG iframe and canonical contact anchor", () => {
    expect(BOOKING_CONFIG.isPlaceholder).toBe(false);
    expect(BOOKING_CONFIG.directUrl).toBe("/kontakt/#terminbuchung");
    expect(BOOKING_CONFIG.iframeUrl).toBe(
      "https://4d6a4d304e4445363152753455457a4437657765302b5151.proxy.sovd.cloud/otrs",
    );
  });
});
