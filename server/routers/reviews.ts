import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { fetchGoogleReviews } from "../google-reviews";

export const reviewsRouter = router({
  getGoogleReviews: publicProcedure.query(async () => {
    try {
      return await fetchGoogleReviews();
    } catch (error) {
      console.error("[GoogleReviews] Live request failed", error);
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message: "Google-Rezensionen sind vorübergehend nicht verfügbar.",
      });
    }
  }),
});
