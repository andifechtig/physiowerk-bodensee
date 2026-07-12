import { describe, expect, it } from "vitest";
import { contactSubmissionSchema, isPlausibleSubmissionTime } from "./contact-validation";

const validInput = {
  name: "Max Mustermann",
  email: "max@example.de",
  phone: "+49 (0) 7542 123456",
  message: "Ich möchte einen Termin vereinbaren.",
  privacyConsent: true as const,
  website: "",
  startedAt: Date.now() - 5_000,
};

describe("contactSubmissionSchema", () => {
  it("accepts a complete valid contact request", () => {
    expect(contactSubmissionSchema.parse(validInput)).toMatchObject(validInput);
  });

  it("rejects a filled honeypot", () => {
    const result = contactSubmissionSchema.safeParse({ ...validInput, website: "spam.example" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone characters", () => {
    const result = contactSubmissionSchema.safeParse({ ...validInput, phone: "call-me-now" });
    expect(result.success).toBe(false);
  });

  it("requires explicit privacy consent", () => {
    const result = contactSubmissionSchema.safeParse({ ...validInput, privacyConsent: false });
    expect(result.success).toBe(false);
  });
});

describe("isPlausibleSubmissionTime", () => {
  const now = 1_000_000;

  it("accepts a submission after at least three seconds", () => {
    expect(isPlausibleSubmissionTime(now - 3_000, now)).toBe(true);
  });

  it("rejects an unrealistically fast submission", () => {
    expect(isPlausibleSubmissionTime(now - 500, now)).toBe(false);
  });

  it("rejects stale form sessions older than two hours", () => {
    expect(isPlausibleSubmissionTime(now - 2 * 60 * 60 * 1_000 - 1, now)).toBe(false);
  });
});
