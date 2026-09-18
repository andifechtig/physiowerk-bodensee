import type { RequestHandler } from "express";
import superjson from "superjson";
import { buildSeoHead, safeJson, seoForPath, type PageSeo } from "../client/src/seo";

export function redirectForUrl(url: string): string | undefined {
  const index = url.indexOf("?");
  const pathname = index < 0 ? url : url.slice(0, index);
  const query = index < 0 ? "" : url.slice(index);
  if (pathname === "/index.html") return "/" + query;
  const page = seoForPath(pathname);
  // Only known routes redirect; never use user-controlled hosts as targets.
  if (!page.notFound && pathname !== page.path) return page.path + query;
}

export const canonicalRoutes: RequestHandler = (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  const target = redirectForUrl(req.originalUrl);
  if (target) return res.redirect(301, target);
  next();
};

export function composeHtml(template: string, html: string, head: PageSeo, state?: unknown) {
  const stateScript = state === undefined ? "" : `<script>window.__RQ_STATE__=${safeJson(superjson.serialize(state))}</script>`;
  return template
    .replace("</body>", () => `${stateScript}</body>`)
    .replace("<!--app-head-->", () => buildSeoHead(head))
    .replace("<!--app-html-->", () => html);
}
