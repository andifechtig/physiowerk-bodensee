import { z } from "zod";

const phonePattern = /^[0-9+()\-./\s]{5,40}$/;

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().regex(phonePattern).max(40),
  message: z.string().trim().min(10).max(5000),
  privacyConsent: z.literal(true),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export function isPlausibleSubmissionTime(startedAt: number, now = Date.now()) {
  const elapsed = now - startedAt;
  return elapsed >= 3_000 && elapsed <= 2 * 60 * 60 * 1_000;
}
