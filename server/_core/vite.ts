import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { pathToFileURL } from "node:url";
import { canonicalRoutes, composeHtml } from "../seo";
import { seoForPath } from "../../client/src/seo";

/** Development dependencies stay out of the production runtime bundle. */
export async function setupVite(app: Express, server: Server) {
  const { createServer: createViteServer } = await import("vite");
  const viteConfigPath = path.resolve(import.meta.dirname, "../..", "vite.config.ts");
  const { default: viteConfig } = await import(viteConfigPath);
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: { middlewareMode: true, hmr: { server }, allowedHosts: true },
    appType: "custom",
  });
  app.use(canonicalRoutes);
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client/index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace('src="/src/main.tsx"', `src="/src/main.tsx?v=${nanoid()}"`);
      template = await vite.transformIndexHtml(req.originalUrl, template);
      template = template.replace("</head>", '<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>');
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, dehydratedState, head } = await render(req.originalUrl);
      res.status(head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, html, head, dehydratedState));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distRoot = process.env.NODE_ENV === "development"
    ? path.resolve(import.meta.dirname, "../..", "dist")
    : import.meta.dirname;
  const distPath = path.join(distRoot, "public");
  const template = fs.readFileSync(path.join(distPath, "index.html"), "utf8");
  const serverEntry = pathToFileURL(path.join(distRoot, "server-ssr/entry-server.js")).href;

  app.use(canonicalRoutes);
  app.use("/assets", express.static(path.join(distPath, "assets"), { index: false, redirect: false, maxAge: "1y", immutable: true }));
  app.use(express.static(distPath, { index: false, redirect: false, maxAge: 0 }));
  app.use("*", async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.status(405).set("Allow", "GET, HEAD").end();
      return;
    }
    // Missing assets/API routes are not HTML pages and must not become soft 404s.
    if (/^\/(?:api|assets|images|brand|manus-storage)\//.test(req.originalUrl.split("?")[0])) {
      res.status(404).type("text").send("Not found");
      return;
    }
    const head = seoForPath(req.originalUrl);
    try {
      const { render } = await import(serverEntry);
      const result = await render(req.originalUrl);
      res.status(head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, result.html, head, result.dehydratedState));
    } catch (error) {
      // Preserve the working SPA and real route status on a transient render error.
      // Alert on this log: a healthy-looking client does not prove SSR succeeded.
      console.error("[SSR] render failed, serving shell:", error);
      res.status(head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, "", head));
    }
  });
}
