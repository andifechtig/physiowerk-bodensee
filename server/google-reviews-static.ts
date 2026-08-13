import type { GoogleReviewsResult } from "./google-reviews";

/**
 * Statischer Snapshot der Google-Rezensionen für das Physiowerk Bodensee.
 *
 * Hintergrund: Die Live-Abfrage der Google Places API lief zuvor über einen
 * plattforminternen Proxy (BUILT_IN_FORGE_API_URL / BUILT_IN_FORGE_API_KEY),
 * der beim Self-Hosting nicht verfügbar ist. Damit die Rezensionen ohne
 * API-Key und ohne externe Abhängigkeit zuverlässig angezeigt werden, liegen
 * sie hier als statische Daten im Code.
 *
 * Aktualisierung: Snapshot vom 13.08.2026, abgerufen über die Google Places API.
 * Zum Aktualisieren die Werte unten ersetzen (Bewertung, Anzahl, Rezensionen).
 */
export const GOOGLE_REVIEWS_SNAPSHOT_DATE = "2026-08-13";

export const STATIC_GOOGLE_REVIEWS: GoogleReviewsResult = {
  placeName: "Physiowerk Bodensee",
  placeId: "ChIJYW-ZsXQFm0cRQVoX1sckuA8",
  googleMapsUrl: "https://maps.google.com/?cid=1132695746992626241",
  rating: 5,
  ratingCount: 44,
  reviews: [
    {
      authorName: "Pieter Wirth",
      authorUrl: "https://www.google.com/maps/contrib/113431296680409746667/reviews",
      rating: 5,
      text: "War sehr glücklich mit meiner Therapie, hatte nach meiner OP wirklich lange Zeit schmerzen und war bei vielen unterschiedlichen Praxen. Aufgrund einer Empfehlung bin ich dann zu Andy und Laura gekommen und sie waren die ersten die mir sagen konnten woher die Schmerzen wirklich kommen. Nach 3-monatigen Training bin ich nahezu wieder voll funktionsfähig und stehe morgens auf und bin fit.\nDafür vielen lieben Dank euch. Ich werde auch weiterhin die Möglichkeit nutzen mit dem geführten Training.",
      publishedAt: 1785182155000,
      relativeTimeDescription: "vor 2 Wochen",
    },
    {
      authorName: "Melli",
      authorUrl: "https://www.google.com/maps/contrib/115584854939863894569/reviews",
      rating: 5,
      text: "Für mich die besten Physiotherapeuten im Umkreis! Kompetente Betreuung vor Ort, viele Tipps für den Alltag und wahnsinnig viel Freundlichkeit und Empathie. Man fühlt sich fachlich und menschlich einfach rundum gut aufgehoben. Danke dafür.",
      publishedAt: 1783925621000,
      relativeTimeDescription: "vor einem Monat",
    },
    {
      authorName: "Lukas Maurer",
      authorUrl: "https://www.google.com/maps/contrib/114176635401485149457/reviews",
      rating: 5,
      text: "Laura hat mich äußerst kompetent und aufmerksam betreut. Durch ihre gezielte Behandlung und klare Anleitung war ich in kurzer Zeit wieder schmerzfrei und deutlich beweglicher. Absolut empfehlenswert.",
      publishedAt: 1772352256000,
      relativeTimeDescription: "vor 5 Monaten",
    },
    {
      authorName: "Moritz Lämmerhirt",
      authorUrl: "https://www.google.com/maps/contrib/101719674845583423300/reviews",
      rating: 5,
      text: "Ich kann das Physiowerk Bodensee und insbesondere die Therapeutin Laura nur wärmstens empfehlen! Egal ob bei Rückenproblemen oder nach einer OP am Bein – ich habe mich jedes Mal bestens aufgehoben gefühlt. Laura nimmt sich viel Zeit, hört aufmerksam zu und findet immer genau die richtige Behandlung. Schon nach kurzer Zeit habe ich deutliche Verbesserungen gespürt.\n\nDie Atmosphäre in der Praxis ist sehr angenehm und freundlich, man fühlt sich sofort wohl. Termine werden zuverlässig eingehalten und alles ist sehr gut organisiert. Besonders schätze ich die kompetente Beratung und die individuellen Übungen für zu Hause, die wirklich helfen.\n\nFür mich die beste Physiotherapie rund um Meckenbeuren – absolut empfehlenswert!",
      publishedAt: 1771856868000,
      relativeTimeDescription: "vor 5 Monaten",
    },
  ],
  fetchedAt: Date.parse(`${GOOGLE_REVIEWS_SNAPSHOT_DATE}T00:00:00Z`),
};

/** Liefert eine frische Kopie des Snapshots, damit Aufrufer die Daten nicht mutieren. */
export function getStaticGoogleReviews(): GoogleReviewsResult {
  return {
    ...STATIC_GOOGLE_REVIEWS,
    reviews: STATIC_GOOGLE_REVIEWS.reviews.map(review => ({ ...review })),
  };
}
