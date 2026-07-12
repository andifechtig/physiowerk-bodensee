import { afterEach, describe, expect, it } from "vitest";
import { buildContactEmail, CONTACT_EMAIL_RECIPIENT, sendContactEmail } from "./contact-email";

describe("contact email", () => {
  afterEach(() => {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_FROM;
  });

  it("uses only the fixed practice recipient and sender reply-to", () => {
    const email = buildContactEmail({
      name: "Erika Musterfrau",
      email: "erika@example.de",
      phone: "+49 123 456",
      message: "Bitte um Rückruf.",
    });

    expect(CONTACT_EMAIL_RECIPIENT).toBe("info@physiowerk-bodensee.de");
    expect(email.to).toBe("info@physiowerk-bodensee.de");
    expect(email.replyTo).toBe("erika@example.de");
  });

  it("escapes user-provided HTML", () => {
    const email = buildContactEmail({
      name: "<script>alert(1)</script>",
      email: "safe@example.de",
      phone: "+49 123 456",
      message: "<b>Test</b>",
    });

    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<b>Test</b>");
    expect(email.html).toContain("&lt;script&gt;");
  });

  it("stays inactive without SMTP credentials", async () => {
    await expect(
      sendContactEmail({
        name: "Erika Musterfrau",
        email: "erika@example.de",
        phone: "+49 123 456",
        message: "Bitte um Rückruf.",
      }),
    ).resolves.toEqual({ sent: false, reason: "not_configured" });
  });
});
