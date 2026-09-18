import { describe, it, expect } from "vitest";
import { SEO, SITE_ORIGIN } from "../client/src/site-config";
import { buildSeoHead, structuredData, seoForPath, NOT_FOUND_SEO } from "../client/src/seo";
import { composeHtml, redirectForUrl } from "./seo";

const template = '<html><head><!--app-head--></head><body><div id="root"><!--app-html--></div></body></html>';

describe("local SEO contracts", () => {
  it.each(Object.values(SEO))("renders unique metadata for $path without JavaScript", page => {
    const head = buildSeoHead(page);
    expect((head.match(/<title\b/g) ?? [])).toHaveLength(1);
    expect((head.match(/rel="canonical"/g) ?? [])).toHaveLength(1);
    expect(head).toContain(new URL(page.path, SITE_ORIGIN).href);
    expect(head).toContain('property="og:title"');
    expect(head).toContain('name="twitter:card"');
    expect(head).not.toContain('content="noindex');
    expect(seoForPath(page.path + '?utm_source=x?y=1')).toEqual(page);
  });
  it("keeps the existing domain and route scheme", () => {
    expect(SITE_ORIGIN).toBe("https://www.physiowerk-bodensee.de");
    expect(Object.values(SEO)).toHaveLength(11);
  });
  it("uses the real town in main service titles", () => {
    for (const key of ["home", "physiotherapie", "training", "team", "contact", "career"]) {
      expect(SEO[key].title).toContain("Meckenbeuren");
    }
  });
  it("redirects only known local paths and preserves query parameters", () => {
    expect(redirectForUrl('/Kontakt//?utm_source=x')).toBe('/kontakt/?utm_source=x');
    expect(redirectForUrl('/index.html?x=1')).toBe('/?x=1');
    expect(redirectForUrl('/kontakt/')).toBeUndefined();
    expect(redirectForUrl('//evil.example/')).toBeUndefined();
    expect(redirectForUrl('/missing/')).toBeUndefined();
    expect(redirectForUrl('/assets')).toBeUndefined();
  });
  it("marks genuine missing pages noindex without a misleading canonical", () => {
    expect(seoForPath('/missing/')).toEqual(NOT_FOUND_SEO);
    const head = buildSeoHead(NOT_FOUND_SEO);
    expect(head).toContain('content="noindex, follow"');
    expect(head).not.toContain('rel="canonical"');
    expect(head).not.toContain('application/ld+json');
  });
  it("models Physiotherapy as a medical specialty, not a business type", () => {
    const graph = structuredData(SEO.home)["@graph"];
    const business = graph[0];
    expect(business["@type"]).toBe("MedicalClinic");
    expect(business.medicalSpecialty).toBe("https://schema.org/Physiotherapy");
    expect(business.telephone).toBe("+4975422919731");
    expect(business.address?.addressLocality).toBe("Meckenbeuren");
    expect(business.openingHoursSpecification).toHaveLength(3);
    expect(JSON.stringify(graph)).not.toContain("aggregateRating");
    expect(JSON.stringify(graph)).not.toContain('"geo"');
  });
  it("escapes head values and embedded JSON against injection", () => {
    const head = buildSeoHead({ ...SEO.home, title: '</title><script>alert(1)</script>', description: '\" onload=\"bad' });
    expect(head).not.toContain('</title><script>alert(1)');
    expect(head).toContain('&lt;/title&gt;');
    expect(head).toContain('\\u003c/script>');
    const html = composeHtml(template, '<p>safe</p>', SEO.home, { bad: '</script><script>alert(1)</script>' });
    expect(html).not.toContain('</script><script>alert(1)');
  });
  it("never interprets dollar replacement tokens in content", () => {
    const body = '<p>$$50 $& $` $\'</p>';
    const result = composeHtml(template, body, SEO.home, { queries: [], mutations: [] });
    expect(result).toContain(body);
    expect(result).not.toContain('<!--app-');
    expect(result).toContain('window.__RQ_STATE__=');
  });
});
