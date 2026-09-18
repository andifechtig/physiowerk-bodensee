import { BRAND_ASSETS, CONTACT, SEO, SITE_ORIGIN, SOCIAL_LINKS, type SeoConfig } from "./site-config";

export type PageSeo = SeoConfig & { notFound?: boolean };
export const NOT_FOUND_SEO: PageSeo = {
  title: "Seite nicht gefunden | Physiowerk Bodensee",
  description: "Diese Seite wurde nicht gefunden. Hier geht es zurück zu Physiotherapie, Training und Kontakt im Physiowerk Bodensee in Meckenbeuren.",
  path: "/404",
  notFound: true,
};

export function seoForPath(url: string): PageSeo {
  let pathname = url.split(/[?#]/, 1)[0];
  try { pathname = decodeURI(pathname); } catch { /* malformed paths remain unknown */ }
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "").toLowerCase() + "/";
  return Object.values(SEO).find(page => page.path === normalized) ?? NOT_FOUND_SEO;
}

export const SOCIAL_IMAGE = "/images/tTQDcPvqnXwIiMoX.webp";

export function seoMeta(page: PageSeo) {
  const canonical = new URL(page.path, SITE_ORIGIN).href;
  const image = new URL(SOCIAL_IMAGE, SITE_ORIGIN).href;
  return [
    { name: "description", content: page.description },
    { name: "robots", content: page.notFound ? "noindex, follow" : "index, follow, max-image-preview:large" },
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: CONTACT.name },
    { property: "og:locale", content: "de_DE" },
    ...(!page.notFound ? [{ property: "og:url", content: canonical }] : []),
    { property: "og:image", content: image },
    { property: "og:image:alt", content: "Physiotherapeutische Betreuung im Physiowerk Bodensee" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: page.title },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: image },
  ];
}

export function structuredData(page: PageSeo) {
  const url = new URL(page.path, SITE_ORIGIN).href;
  const practiceId = SITE_ORIGIN + "/#praxis";
  const websiteId = SITE_ORIGIN + "/#website";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": practiceId,
        name: CONTACT.name,
        legalName: CONTACT.company,
        medicalSpecialty: "https://schema.org/Physiotherapy",
        url: SITE_ORIGIN + "/",
        logo: new URL(BRAND_ASSETS.logo, SITE_ORIGIN).href,
        image: new URL(SOCIAL_IMAGE, SITE_ORIGIN).href,
        telephone: CONTACT.phoneHref.replace("tel:", ""),
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.street,
          postalCode: "88074",
          addressLocality: "Meckenbeuren",
          addressCountry: "DE",
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "12:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "13:00", closes: "19:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "13:00" },
        ],
        sameAs: SOCIAL_LINKS.map(link => link.href.split("?")[0]),
      },
      { "@type": "WebSite", "@id": websiteId, url: SITE_ORIGIN + "/", name: CONTACT.name, inLanguage: "de-DE", publisher: { "@id": practiceId } },
      { "@type": "WebPage", "@id": url + "#webpage", url, name: page.title, description: page.description, inLanguage: "de-DE", isPartOf: { "@id": websiteId }, about: { "@id": practiceId } },
    ],
  };
}

export const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
export const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

export function buildSeoHead(page: PageSeo): string {
  const tags = [`<title data-seo>${escapeHtml(page.title)}</title>`];
  for (const attributes of seoMeta(page)) {
    tags.push(`<meta data-seo ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(" ")} />`);
  }
  if (!page.notFound) {
    tags.push(`<link data-seo rel="canonical" href="${escapeHtml(new URL(page.path, SITE_ORIGIN).href)}" />`);
    tags.push(`<script data-seo id="local-business-schema" type="application/ld+json">${safeJson(structuredData(page))}</script>`);
  }
  return tags.join("\n");
}
