import { createHash } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { createContactSubmission, countRecentContactSubmissions, updateContactDeliveryStatus } from "../db";
import { notifyOwner } from "../_core/notification";
import { publicProcedure, router } from "../_core/trpc";
import { contactSubmissionSchema, isPlausibleSubmissionTime } from "../contact-validation";
import { sendContactEmail } from "../contact-email";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

function getRequestFingerprint(req: { ip?: string; headers: Record<string, unknown> }) {
  const forwarded = req.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(forwarded) ? forwarded[0] : String(forwarded ?? "").split(",")[0];
  const ip = forwardedIp?.trim() || req.ip || "unknown";
  const userAgent = String(req.headers["user-agent"] ?? "unknown");
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
}

export const contactRouter = router({
  submit: publicProcedure.input(contactSubmissionSchema).mutation(async ({ ctx, input }) => {
    if (!isPlausibleSubmissionTime(input.startedAt)) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Die Anfrage konnte nicht verarbeitet werden." });
    }

    const requestFingerprint = getRequestFingerprint(ctx.req);
    const recentCount = await countRecentContactSubmissions(
      requestFingerprint,
      new Date(Date.now() - RATE_LIMIT_WINDOW_MS),
    );

    if (recentCount >= RATE_LIMIT_MAX_SUBMISSIONS) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Bitte warten Sie einige Minuten, bevor Sie das Formular erneut absenden.",
      });
    }

    const submissionId = await createContactSubmission({
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      privacyConsent: input.privacyConsent,
      requestFingerprint,
      deliveryStatus: "pending",
    });

    const [ownerNotified, emailDelivery] = await Promise.all([
      notifyOwner({
      title: "Neue Kontaktanfrage",
      content: "Eine neue Kontaktanfrage wurde sicher gespeichert und wartet auf Bearbeitung.",
      }),
      sendContactEmail({
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
      }),
    ]);

    if (emailDelivery.sent) {
      await updateContactDeliveryStatus(submissionId, "emailed");
    } else if (ownerNotified) {
      await updateContactDeliveryStatus(submissionId, "owner_notified");
    } else {
      await updateContactDeliveryStatus(submissionId, "failed");
    }

    return { success: true } as const;
  }),
});
