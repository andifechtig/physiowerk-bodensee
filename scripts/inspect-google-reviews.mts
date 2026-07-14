import {
  makeRequest,
  type PlaceDetailsResult,
  type PlacesSearchResult,
} from "../server/_core/map";

const query = "Physiowerk Bodensee, Tettnanger Straße 14, 88074 Meckenbeuren";

const search = await makeRequest<PlacesSearchResult>("/maps/api/place/textsearch/json", {
  query,
  language: "de",
});

const place = search.results?.find(result => result.name === "Physiowerk Bodensee") ?? search.results?.[0];
if (!place) throw new Error(`No place found; status=${search.status}`);

const details = await makeRequest<PlaceDetailsResult>("/maps/api/place/details/json", {
  place_id: place.place_id,
  fields: "place_id,name,formatted_address,rating,user_ratings_total,reviews,url",
  language: "de",
  reviews_sort: "newest",
});

console.log(
  JSON.stringify(
    {
      searchStatus: search.status,
      detailsStatus: details.status,
      placeId: place.place_id,
      name: details.result?.name,
      address: details.result?.formatted_address,
      rating: details.result?.rating,
      ratingCount: details.result?.user_ratings_total,
      reviewCount: details.result?.reviews?.length ?? 0,
      reviewFields: Object.keys(details.result?.reviews?.[0] ?? {}),
    },
    null,
    2,
  ),
);
