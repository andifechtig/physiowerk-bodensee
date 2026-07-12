import { useEffect } from "react";
import { BRAND_ASSETS, CONTACT, SITE_ORIGIN, type SeoConfig } from "@/site-config";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export function Seo({ title, description, path }: SeoConfig) {
  useEffect(() => {
    const canonical = new URL(path, SITE_ORIGIN).toString();
    document.title = title;
    document.documentElement.lang = "de";
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "de_DE" });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: new URL(BRAND_ASSETS.logo, SITE_ORIGIN).toString(),
    });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

    const scriptId = "local-business-schema";
    let schema = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement("script");
      schema.id = scriptId;
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Physiotherapy",
      name: CONTACT.company,
      url: SITE_ORIGIN,
      image: new URL(BRAND_ASSETS.logo, SITE_ORIGIN).toString(),
      telephone: CONTACT.phoneLabel,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        postalCode: "88074",
        addressLocality: "Meckenbeuren",
        addressCountry: "DE",
      },
    });
  }, [description, path, title]);

  return null;
}
