export type BlogCategory = "video" | "wissen" | "praxis";

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  video: "Videos",
  wissen: "Wissen & Bewegung",
  praxis: "Praxis-Updates",
};

/**
 * Neue Inhalte hier ergänzen. Videos können auf eine externe Videoseite verlinken;
 * Bild, längerer Text und Veröffentlichungsdatum sind optional.
 */
export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  summary: string;
  publishedAt?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  href?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gesundheitsvortrag-entzuendungen-verstehen",
    category: "video",
    title: "Gesundheitsvortrag: Entzündungen verstehen",
    summary:
      "Was haben Nährstoffe mit Entzündungen zu tun? Physiotherapeut und Fitnesstrainer Timon Altmann gibt einen Einblick in den Vortrag und fragt, was wissenschaftlich belegt und was individuell ist. Donnerstag, 28. Januar 2027, 19:30 Uhr · Physiowerk Bodensee, Tettnanger Straße 14, Meckenbeuren.",
    publishedAt: "2026-11-26",
    video: "/videos/gesundheitsvortrag-entzuendungen-verstehen.mp4",
    image: "/videos/gesundheitsvortrag-entzuendungen-verstehen-poster.jpg",
    imageAlt: "Titelbild des Gesundheitsvortrags Entzündungen verstehen am 28. Januar 2027",
  },
  {
    slug: "physiowerk-gesundheitscoaching",
    category: "video",
    title: "Physiowerk Gesundheitscoaching",
    summary:
      "Ein Einblick ins Physiowerk Gesundheitscoaching – mit persönlicher Begleitung und Impulsen für den Alltag.",
    video: "/videos/physiowerk-gesundheitscoaching.mp4",
    image: "/videos/physiowerk-gesundheitscoaching-poster.jpg",
    imageAlt: "Vorschaubild zum Physiowerk Gesundheitscoaching",
  },
  {
    slug: "muskelaufbau-mitgliedschaft",
    category: "video",
    title: "Muskelaufbau mit der passenden Mitgliedschaft",
    summary:
      "Entdecke unser Angebot für gezieltes Muskelaufbau-Training und passende Mitgliedschaften im Physiowerk.",
    video: "/videos/physiowerk-muskelaufbau-mitgliedschaft.mp4",
    image: "/videos/physiowerk-muskelaufbau-mitgliedschaft-poster.jpg",
    imageAlt: "Vorschaubild zum Muskelaufbau-Training im Physiowerk",
  },
];
