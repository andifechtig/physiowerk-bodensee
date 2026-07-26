import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BOOKING_CONFIG,
  CANONICAL_REDIRECTS,
  COACHING_WHATSAPP_URL,
  NAVIGATION,
  SEO,
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
    expect(courses).toContain('href="#foerderung-pruefen"');
    expect(courses).toContain("Kostenlos · unverbindlich · in weniger als 30 Sekunden");
    expect(courses).toContain("Unser unabhängiger Förderpartner");
    expect(courses).not.toContain("Prävention digital");
    expect(courses).not.toContain("In vier Schritten zum Präventionskurs");
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
