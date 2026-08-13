import { ExternalLink, RefreshCw, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

const GOOGLE_MAPS_FALLBACK_URL =
  "https://www.google.com/maps/search/?api=1&query_place_id=ChIJYW-ZsXQFm0cRQVoX1sckuA8";

function formatReviewDate(timestamp: number) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(new Date(timestamp));
}

function Stars({ rating, label }: { rating: number; label: string }) {
  const roundedRating = Math.round(rating);
  return (
    <div className="google-review-stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={index < roundedRating ? "filled" : ""}
        />
      ))}
    </div>
  );
}

export function GoogleReviewsWidget() {
  const query = trpc.reviews.getGoogleReviews.useQuery(undefined, {
    retry: 1,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  const googleMapsUrl = query.data?.googleMapsUrl ?? GOOGLE_MAPS_FALLBACK_URL;

  return (
    <section className="google-reviews-section" aria-labelledby="google-reviews-heading">
      <div className="site-shell">
        <div className="google-reviews-heading">
          <div>
            <p className="eyebrow">Google-Rezensionen</p>
            <h2 id="google-reviews-heading">Erfahrungen mit dem Physiowerk Bodensee</h2>
            <p>
              Ausgewählte Bewertungen unserer Patientinnen und Patienten aus dem Google-Business-Profil
              des Physiowerk Bodensee.
            </p>
          </div>

          {query.data ? (
            <div className="google-rating-summary">
              <strong>{query.data.rating.toLocaleString("de-DE", { maximumFractionDigits: 1 })}</strong>
              <div>
                <Stars
                  rating={query.data.rating}
                  label={`${query.data.rating} von 5 Sternen bei Google`}
                />
                <span>{query.data.ratingCount.toLocaleString("de-DE")} Google-Bewertungen</span>
              </div>
            </div>
          ) : null}
        </div>

        {query.isPending ? (
          <div className="google-reviews-loading" role="status" aria-live="polite">
            <RefreshCw aria-hidden="true" />
            <span>Google-Rezensionen werden geladen.</span>
          </div>
        ) : null}

        {query.isError ? (
          <div className="google-reviews-state" role="status">
            <p>Google-Rezensionen können derzeit nicht geladen werden.</p>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
              Rezensionen direkt auf Google Maps ansehen
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        ) : null}

        {query.data && query.data.reviews.length === 0 ? (
          <div className="google-reviews-state" role="status">
            <p>Google hat derzeit keine Rezensionstexte für die Anzeige bereitgestellt.</p>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
              Google-Business-Profil öffnen
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        ) : null}

        {query.data && query.data.reviews.length > 0 ? (
          <div className="google-reviews-grid">
            {query.data.reviews.map(review => (
              <article className="google-review-card" key={`${review.authorName}-${review.publishedAt}`}>
                <Stars rating={review.rating} label={`${review.rating} von 5 Sternen`} />
                <blockquote>{review.text}</blockquote>
                <footer>
                  <div>
                    {review.authorUrl ? (
                      <a href={review.authorUrl} target="_blank" rel="noreferrer">
                        {review.authorName}
                      </a>
                    ) : (
                      <strong>{review.authorName}</strong>
                    )}
                    <time dateTime={new Date(review.publishedAt).toISOString()}>
                      {formatReviewDate(review.publishedAt)}
                    </time>
                  </div>
                  <span className="google-maps-attribution" translate="no">Google Maps</span>
                </footer>
              </article>
            ))}
          </div>
        ) : null}

        {query.data ? (
          <div className="google-reviews-footer">
            <span>
              Stand der Bewertungen: {new Date(query.data.fetchedAt).toLocaleDateString("de-DE", {
                dateStyle: "long",
              })}
            </span>
            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
              Alle Google-Rezensionen ansehen
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
