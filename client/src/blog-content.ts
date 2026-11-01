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
