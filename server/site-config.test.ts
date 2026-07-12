import { describe, expect, it } from "vitest";
import { BOOKING_CONFIG, NAVIGATION, SEO } from "../client/src/site-config";

describe("stable site routes", () => {
  it("keeps every required canonical route with a trailing slash", () => {
    expect(Object.values(SEO).map(entry => entry.path)).toEqual([
      "/",
      "/physiotherapie/",
      "/medizinisches-training-und-fitness/",
      "/team-praxis/",
      "/karriere/",
      "/kontakt/",
      "/impressum/",
      "/datenschutzerklaerung/",
    ]);
  });

  it("keeps the primary navigation on canonical paths", () => {
    expect(NAVIGATION.every(entry => entry.href.endsWith("/"))).toBe(true);
  });

  it("uses the iframe-ready booking placeholder until THEORG is configured", () => {
    expect(BOOKING_CONFIG.isPlaceholder).toBe(true);
    expect(BOOKING_CONFIG.directUrl).toBe("/kontakt/#terminbuchung");
    expect(BOOKING_CONFIG.iframeUrl).toBe("");
  });
});
