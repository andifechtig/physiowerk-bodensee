import { describe, expect, it } from "vitest";
import type { makeRequest } from "./_core/map";
import { fetchGoogleReviews, GOOGLE_REVIEWS_CONFIG } from "./google-reviews";

function createRequest(response: unknown) {
  return (async () => response) as typeof makeRequest;
}

describe("fetchGoogleReviews", () => {
  it("validates the configured place and returns newest live reviews first", async () => {
    const result = await fetchGoogleReviews(
      createRequest({
        status: "OK",
        result: {
          place_id: GOOGLE_REVIEWS_CONFIG.placeId,
          name: GOOGLE_REVIEWS_CONFIG.expectedName,
          formatted_address: "Tettnanger Str. 14, 88074 Meckenbeuren, Deutschland",
          rating: 5,
          user_ratings_total: 43,
          url: "https://maps.google.com/example",
          reviews: [
            {
              author_name: "Ältere Person",
              author_url: "https://www.google.com/maps/contrib/1",
              rating: 4,
              relative_time_description: "vor einem Jahr",
              text: "Ältere Live-Rezension",
              time: 1_700_000_000,
            },
            {
              author_name: "Neuere Person",
              author_url: "https://www.google.com/maps/contrib/2",
              rating: 5,
              relative_time_description: "vor einem Monat",
              text: "Neuere Live-Rezension",
              time: 1_800_000_000,
            },
          ],
        },
      }),
      () => 1_900_000_000_000,
    );

    expect(result.placeName).toBe("Physiowerk Bodensee");
    expect(result.rating).toBe(5);
    expect(result.ratingCount).toBe(43);
    expect(result.fetchedAt).toBe(1_900_000_000_000);
    expect(result.reviews.map(review => review.authorName)).toEqual([
      "Neuere Person",
      "Ältere Person",
    ]);
    expect(result.reviews[0]).toMatchObject({
      rating: 5,
      text: "Neuere Live-Rezension",
      publishedAt: 1_800_000_000_000,
    });
  });

  it("filters reviews without live text and never invents replacement content", async () => {
    const result = await fetchGoogleReviews(
      createRequest({
        status: "OK",
        result: {
          place_id: GOOGLE_REVIEWS_CONFIG.placeId,
          name: GOOGLE_REVIEWS_CONFIG.expectedName,
          formatted_address: "Tettnanger Str. 14, 88074 Meckenbeuren, Deutschland",
          rating: 5,
          user_ratings_total: 43,
          reviews: [{ author_name: "Ohne Text", rating: 5, text: "", time: 1_800_000_000 }],
        },
      }),
    );

    expect(result.reviews).toEqual([]);
  });

  it("rejects a response that does not match the configured Physiowerk profile", async () => {
    await expect(
      fetchGoogleReviews(
        createRequest({
          status: "OK",
          result: {
            place_id: "wrong-place-id",
            name: "Andere Praxis",
            formatted_address: "Andere Straße 1",
            reviews: [],
          },
        }),
      ),
    ).rejects.toThrow("did not match");
  });

  it("rejects unsuccessful Google Places responses", async () => {
    await expect(
      fetchGoogleReviews(createRequest({ status: "REQUEST_DENIED", error_message: "Denied" })),
    ).rejects.toThrow("Denied");
  });
});
