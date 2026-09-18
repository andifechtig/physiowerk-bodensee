import { lazy, type ComponentType } from "react";
import { seoForPath } from "./seo";

function preloadable(load: () => Promise<{ default: ComponentType }>) {
  let loaded: ComponentType | undefined;
  const Lazy = lazy(load);
  return {
    Component: () => { const Page = loaded ?? Lazy; return <Page />; },
    preload: async () => { loaded = (await load()).default; },
  };
}

export const AppPage = preloadable(() => import("./pages/AppPage"));
export const Career = preloadable(() => import("./pages/Career"));
export const Coaching = preloadable(() => import("./pages/Coaching"));
export const Contact = preloadable(() => import("./pages/Contact"));
export const Courses = preloadable(() => import("./pages/Courses"));
export const Imprint = preloadable(() => import("./pages/Imprint"));
export const Physiotherapy = preloadable(() => import("./pages/Physiotherapy"));
export const Privacy = preloadable(() => import("./pages/Privacy"));
export const Team = preloadable(() => import("./pages/Team"));
export const Training = preloadable(() => import("./pages/Training"));

const routes = {
  "/physiotherapie/": Physiotherapy,
  "/medizinisches-training-und-fitness/": Training,
  "/team-praxis/": Team,
  "/karriere/": Career,
  "/coaching/": Coaching,
  "/app/": AppPage,
  "/kurse/": Courses,
  "/kontakt/": Contact,
  "/impressum/": Imprint,
  "/datenschutzerklaerung/": Privacy,
};

export async function preloadRoute(url: string) {
  const page = seoForPath(url);
  await routes[page.path as keyof typeof routes]?.preload();
}
