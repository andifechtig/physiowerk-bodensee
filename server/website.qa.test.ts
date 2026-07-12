import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  BOOKING_CONFIG,
  BRAND_ASSETS,
  CANONICAL_REDIRECTS,
  COACHING_WHATSAPP_URL,
  NAVIGATION,
  SEO,
  SITE_ORIGIN,
} from "../client/src/site-config";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = join(projectRoot, "client");
const sourceRoot = join(clientRoot, "src");
const publicRoot = join(clientRoot, "public");

function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  });
}

describe("website quality contracts", () => {
  it("keeps every internal literal link on a known route", () => {
    const knownPaths = new Set([
      ...Object.values(SEO).map(entry => entry.path),
      ...Object.keys(CANONICAL_REDIRECTS),
      ...Object.values(CANONICAL_REDIRECTS),
      "/404",
      BOOKING_CONFIG.directUrl,
    ]);
    const source = filesBelow(sourceRoot)
      .filter(file => [".ts", ".tsx"].includes(extname(file)))
      .filter(file => !file.endsWith("ComponentShowcase.tsx"))
      .map(file => readFileSync(file, "utf8"))
      .join("\n");
    const hrefs = [...source.matchAll(/href=["'](\/[A-Za-z0-9_/#-]*?)["']/g)].map(match => match[1]);
    const unknown = [...new Set(hrefs.filter(href => !knownPaths.has(href)))];
    expect(unknown).toEqual([]);
  });

  it("keeps SEO metadata and sitemap complete for all nine pages", () => {
    const entries = Object.values(SEO);
    expect(entries).toHaveLength(9);
    expect(new Set(entries.map(entry => entry.title)).size).toBe(entries.length);
    for (const entry of entries) {
      expect(entry.title.length).toBeGreaterThan(15);
      expect(entry.description.length).toBeGreaterThan(30);
      expect(entry.path === "/" || entry.path.endsWith("/")).toBe(true);
    }

    const sitemap = readFileSync(join(publicRoot, "sitemap.xml"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
    expect(urls).toEqual(entries.map(entry => new URL(entry.path, SITE_ORIGIN).toString()));
  });

  it("keeps navigation canonical and redirect coverage complete", () => {
    expect(NAVIGATION.every(entry => entry.href.endsWith("/"))).toBe(true);
    expect(Object.keys(CANONICAL_REDIRECTS)).toHaveLength(8);
    expect(Object.values(CANONICAL_REDIRECTS)).toEqual(Object.values(SEO).slice(1).map(entry => entry.path));
  });

  it("keeps deployable public files small and free of media binaries", () => {
    const files = filesBelow(publicRoot);
    const mediaExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".webm"]);
    expect(files.filter(file => mediaExtensions.has(extname(file).toLowerCase()))).toEqual([]);
    expect(files.filter(file => statSync(file).size > 100_000).map(file => relative(publicRoot, file))).toEqual([]);
    expect(Object.values(BRAND_ASSETS).every(url => url.startsWith("/manus-storage/"))).toBe(true);
  });

  it("keeps non-home routes lazy-loaded", () => {
    const app = readFileSync(join(sourceRoot, "App.tsx"), "utf8");
    const lazyPages = ["Career", "Coaching", "Contact", "Imprint", "Physiotherapy", "Privacy", "Team", "Training"];
    for (const page of lazyPages) {
      expect(app).toContain(`const ${page} = lazy(() => import("./pages/${page}"))`);
    }
  });

  it("keeps UI transitions fast, buttons tactile and reduced-motion safe", () => {
    const css = readFileSync(join(sourceRoot, "index.css"), "utf8");
    const transitionBlocks = [...css.matchAll(/transition:\s*([^;]+);/g)].map(match => match[1]);
    const durations = transitionBlocks.flatMap(block =>
      [...block.matchAll(/(\d+)ms/g)].map(match => Number(match[1])),
    );
    expect(durations.length).toBeGreaterThan(0);
    expect(Math.max(...durations)).toBeLessThanOrEqual(300);
    expect(css).toMatch(/button:active[\s\S]*transform:\s*scale\(0\.97\)/);
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--brand\)/);
  });

  it("keeps THEORG and WhatsApp integration exact and accessible", () => {
    const bookingSection = readFileSync(join(sourceRoot, "components", "PageElements.tsx"), "utf8");
    expect(BOOKING_CONFIG.isPlaceholder).toBe(false);
    expect(BOOKING_CONFIG.directUrl).toBe("/kontakt/#terminbuchung");
    expect(BOOKING_CONFIG.iframeUrl).toContain("proxy.sovd.cloud/otrs");
    expect(bookingSection).toContain('title="THEORG Online-Terminreservierung Physiowerk Bodensee"');
    expect(bookingSection).toContain('height="750"');
    expect(bookingSection).toContain('width="100%"');
    expect(bookingSection).toContain('loading="lazy"');
    expect(COACHING_WHATSAPP_URL).toBe(
      "https://wa.me/4917680148726?text=Hallo%20Andreas%2C%20ich%20bin%20interessiert%20am%20Coaching%20Programm%20%22Schmerzfrei%20Jetzt%22.",
    );
  });
});
