import { makeRequest } from "./_core/map";

export const GOOGLE_REVIEWS_CONFIG = {
  placeId: "ChIJYW-ZsXQFm0cRQVoX1sckuA8",
  expectedName: "Physiowerk Bodensee",
  expectedAddressFragment: "Tettnanger Str. 14",
  language: "de",
  timeoutMs: 8_000,
} as const;

type RawReview = {
  author_name?: string;
  author_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type RawPlaceDetails = {
  result?: {
    place_id?: string;
    name?: string;
    formatted_address?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: RawReview[];
  };
  status?: string;
  error_message?: string;
};

export type GoogleReview = {
  authorName: string;
  authorUrl?: string;
  rating: number;
  text: string;
  publishedAt: number;
  relativeTimeDescription: string;
};

export type GoogleReviewsResult = {
  placeName: string;
  placeId: string;
  googleMapsUrl: string;
  rating: number;
  ratingCount: number;
  reviews: GoogleReview[];
  fetchedAt: number;
};

type MapsRequest = typeof makeRequest;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Google Reviews request timed out")), timeoutMs);
    }),
  ]);
}

export async function fetchGoogleReviews(
  request: MapsRequest = makeRequest,
  now: () => number = Date.now,
): Promise<GoogleReviewsResult> {
  const response = await withTimeout(
    request<RawPlaceDetails>("/maps/api/place/details/json", {
      place_id: GOOGLE_REVIEWS_CONFIG.placeId,
      fields: "place_id,name,formatted_address,rating,user_ratings_total,reviews,url",
      language: GOOGLE_REVIEWS_CONFIG.language,
      reviews_sort: "newest",
    }),
    GOOGLE_REVIEWS_CONFIG.timeoutMs,
  );

  if (response.status !== "OK" || !response.result) {
    throw new Error(response.error_message || `Google Places returned ${response.status ?? "no status"}`);
  }

  const place = response.result;
  if (
    place.place_id !== GOOGLE_REVIEWS_CONFIG.placeId ||
    place.name !== GOOGLE_REVIEWS_CONFIG.expectedName ||
    !place.formatted_address?.includes(GOOGLE_REVIEWS_CONFIG.expectedAddressFragment)
  ) {
    throw new Error("Google Places response did not match the configured Physiowerk profile");
  }

  const reviews = (place.reviews ?? [])
    .filter(
      (review): review is Required<Pick<RawReview, "author_name" | "rating" | "text" | "time">> & RawReview =>
        Boolean(
          review.author_name &&
          review.text?.trim() &&
          typeof review.rating === "number" &&
          Number.isFinite(review.rating) &&
          typeof review.time === "number" &&
          Number.isFinite(review.time),
        ),
    )
    .map(review => ({
      authorName: review.author_name,
      authorUrl: review.author_url,
      rating: Math.min(5, Math.max(1, review.rating)),
      text: review.text.trim(),
      publishedAt: review.time * 1_000,
      relativeTimeDescription: review.relative_time_description ?? "",
    }))
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .slice(0, 5);

  return {
    placeName: place.name,
    placeId: place.place_id,
    googleMapsUrl:
      place.url ?? `https://www.google.com/maps/search/?api=1&query_place_id=${place.place_id}`,
    rating: typeof place.rating === "number" ? place.rating : 0,
    ratingCount: typeof place.user_ratings_total === "number" ? place.user_ratings_total : 0,
    reviews,
    fetchedAt: now(),
  };
}
