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
  href?: string;
};

export const BLOG_POSTS: BlogPost[] = [];
