import { publicProcedure, router } from "../_core/trpc";
import { fetchGoogleReviews } from "../google-reviews";
import { getStaticGoogleReviews } from "../google-reviews-static";

/**
 * Rezensionen werden self-hosted primär aus dem statischen Snapshot geliefert
 * (siehe `server/google-reviews-static.ts`). Nur wenn ein Google-Places-Proxy
 * konfiguriert ist, wird zusätzlich ein Live-Abruf versucht; schlägt dieser
 * fehl, bleibt der Snapshot die Antwort. Dadurch ist die Anzeige ohne API-Key
 * und ohne externe Dienste jederzeit verfügbar.
 */
function isLiveLookupConfigured() {
  return Boolean(process.env.BUILT_IN_FORGE_API_URL && process.env.BUILT_IN_FORGE_API_KEY);
}

export const reviewsRouter = router({
  getGoogleReviews: publicProcedure.query(async () => {
    if (!isLiveLookupConfigured()) {
      return getStaticGoogleReviews();
    }

    try {
      const live = await fetchGoogleReviews();
      if (live.reviews.length === 0) {
        return getStaticGoogleReviews();
      }
      return live;
    } catch (error) {
      console.warn(
        "[GoogleReviews] Live-Abruf fehlgeschlagen, statische Rezensionen werden ausgeliefert",
        error,
      );
      return getStaticGoogleReviews();
    }
  }),
});
