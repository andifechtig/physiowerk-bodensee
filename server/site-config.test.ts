import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BOOKING_CONFIG,
  COACHING_WHATSAPP_URL,
  NAVIGATION,
  SEO,
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
      "/kontakt/",
      "/impressum/",
      "/datenschutzerklaerung/",
    ]);
  });

  it("keeps the primary navigation on canonical paths", () => {
    expect(NAVIGATION.every(entry => entry.href.endsWith("/"))).toBe(true);
    expect(NAVIGATION.at(-1)).toEqual({ label: "Coaching", href: "/coaching/" });
  });

  it("uses the exact coaching WhatsApp conversation URL", () => {
    expect(COACHING_WHATSAPP_URL).toBe(
      "https://wa.me/4917680148726?text=Hallo%20Andreas%2C%20ich%20bin%20interessiert%20am%20Coaching%20Programm%20%22Schmerzfrei%20Jetzt%22.",
    );
  });

  it("publishes the coaching route in the sitemap", () => {
    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf8");
    expect(sitemap).toContain("https://www.physiowerk-bodensee.de/coaching/");
  });

  it("uses the active THEORG iframe and canonical contact anchor", () => {
    expect(BOOKING_CONFIG.isPlaceholder).toBe(false);
    expect(BOOKING_CONFIG.directUrl).toBe("/kontakt/#terminbuchung");
    expect(BOOKING_CONFIG.iframeUrl).toBe(
      "https://4d6a4d304e4445363152753455457a4437657765302b5151.proxy.sovd.cloud/otrs",
    );
  });
});
