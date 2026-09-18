import { useEffect } from "react";
import { buildSeoHead, type PageSeo } from "@/seo";

/** SSR owns the first response; this component keeps client navigation in sync. */
export function Seo({ title, description, path, notFound }: PageSeo) {
  useEffect(() => {
    const template = document.createElement("template");
    template.innerHTML = buildSeoHead({ title, description, path, notFound });
    document.head.querySelectorAll("[data-seo]").forEach(element => element.remove());
    document.head.appendChild(template.content);
    document.documentElement.lang = "de";
  }, [title, description, path, notFound]);
  return null;
}
