import { useState } from "react";
import { ArrowUpRight, BookOpen, MessageSquareText, Play, Sparkles } from "lucide-react";
import { ArrowLink, Eyebrow, SectionHeading } from "@/components/PageElements";
import { Seo } from "@/components/Seo";
import { BLOG_CATEGORY_LABELS, BLOG_POSTS, type BlogCategory } from "@/blog-content";
import { SEO, SOCIAL_LINKS } from "@/site-config";

const categories: { key: BlogCategory; title: string; description: string; icon: typeof Play }[] = [
  {
    key: "video",
    title: "Videos & Übungen",
    description: "Anschauliche Videos und Bewegungsideen für den Alltag.",
    icon: Play,
  },
  {
    key: "wissen",
    title: "Wissen & Bewegung",
    description: "Verständliche Impulse rund um Beweglichkeit, Training und Gesundheit.",
    icon: BookOpen,
  },
  {
    key: "praxis",
    title: "Neuigkeiten aus der Praxis",
    description: "Einblicke ins Physiowerk Bodensee und aktuelle Informationen aus unserem Team.",
    icon: MessageSquareText,
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "alle">("alle");
  const visiblePosts =
    activeCategory === "alle"
      ? BLOG_POSTS
      : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <>
      <Seo {...SEO.blog} />

      <section className="page-hero blog-page-hero">
        <div className="site-shell page-hero-grid">
          <div className="page-hero-media">
            <div className="blog-hero-art" role="img" aria-label="Videos, Wissen und Neuigkeiten aus dem Physiowerk Bodensee">
              <p className="blog-hero-art-kicker">Physiowerk Bodensee · Blog</p>
              <p className="blog-hero-art-title">Bewegung verstehen.<br />Neues entdecken.</p>
              <div className="blog-hero-art-list" aria-hidden="true">
                <span><Play /> Videos & Übungen</span>
                <span><BookOpen /> Wissen & Bewegung</span>
                <span><MessageSquareText /> Einblicke aus der Praxis</span>
              </div>
              <Sparkles className="blog-hero-sparkle" aria-hidden="true" />
            </div>
          </div>
          <div className="page-hero-copy">
            <Eyebrow light>Blog · Physiowerk Bodensee</Eyebrow>
            <h1>Wissen, Bewegung und Einblicke.</h1>
            <p>
              Hier findest Du künftig Videos, praktische Informationen rund um Bewegung und Gesundheit
              sowie Neuigkeiten aus unserer Praxis – verständlich und nah am Alltag.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section blog-topics-section">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Das erwartet Dich"
            title="Interessantes für Deinen Alltag."
            intro="Wir sammeln hier hilfreiche Impulse und Einblicke aus verschiedenen Bereichen – zum Anschauen, Nachlesen und Wiederkommen."
          />
          <div className="blog-topic-grid">
            {categories.map(({ key, title, description, icon: Icon }) => (
              <article className="blog-topic-card" key={key}>
                <span className="blog-topic-icon"><Icon aria-hidden="true" /></span>
                <p className="blog-topic-label">{BLOG_CATEGORY_LABELS[key]}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-soft blog-feed-section" aria-labelledby="blog-feed-title">
        <div className="site-shell">
          <div className="blog-feed-heading">
            <div>
              <Eyebrow>Wissen & Neuigkeiten</Eyebrow>
              <h2 id="blog-feed-title">Aktuelle Beiträge</h2>
            </div>
            {BLOG_POSTS.length > 0 ? (
              <div className="blog-filters" role="group" aria-label="Beiträge nach Thema filtern">
                <button
                  type="button"
                  aria-pressed={activeCategory === "alle"}
                  onClick={() => setActiveCategory("alle")}
                >
                  Alle
                </button>
                {Object.entries(BLOG_CATEGORY_LABELS).map(([key, label]) => (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={activeCategory === key}
                    onClick={() => setActiveCategory(key as BlogCategory)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {BLOG_POSTS.length === 0 ? (
            <div className="blog-empty-state">
              <span className="blog-empty-icon"><Sparkles aria-hidden="true" /></span>
              <div>
                <p className="blog-empty-eyebrow">In Vorbereitung</p>
                <h3>Die ersten Beiträge kommen bald.</h3>
                <p>
                  Wir bereiten gerade die ersten Inhalte vor. Schau bald wieder vorbei – oder folge uns
                  auf Instagram für aktuelle Einblicke aus dem Physiowerk.
                </p>
                <ArrowLink href={SOCIAL_LINKS[0].href}>Zum Physiowerk auf Instagram</ArrowLink>
              </div>
            </div>
          ) : (
            <div className="blog-post-grid">
              {visiblePosts.map(post => {
                const category = categories.find(item => item.key === post.category);
                const Icon = category?.icon ?? BookOpen;
                return (
                  <article className="blog-post-card" key={post.slug}>
                    {post.image ? (
                      <img className="blog-post-image" src={post.image} alt={post.imageAlt ?? ""} loading="lazy" />
                    ) : (
                      <div className="blog-post-art" aria-hidden="true"><Icon /></div>
                    )}
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span>{BLOG_CATEGORY_LABELS[post.category]}</span>
                        {post.publishedAt ? <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> : null}
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>
                      {post.body ? <p className="blog-post-body">{post.body}</p> : null}
                      {post.href ? (
                        <a className="blog-post-link" href={post.href} target="_blank" rel="noreferrer">
                          {post.category === "video" ? "Video ansehen" : "Mehr erfahren"}
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
              {visiblePosts.length === 0 ? (
                <p className="blog-no-results" role="status">Zu diesem Thema gibt es momentan keine Beiträge.</p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
