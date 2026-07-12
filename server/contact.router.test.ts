import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  countRecentContactSubmissions: vi.fn(),
  createContactSubmission: vi.fn(),
  updateContactDeliveryStatus: vi.fn(),
}));

const notificationMocks = vi.hoisted(() => ({ notifyOwner: vi.fn() }));
const emailMocks = vi.hoisted(() => ({ sendContactEmail: vi.fn() }));

vi.mock("./db", () => dbMocks);
vi.mock("./_core/notification", () => notificationMocks);
vi.mock("./contact-email", async importOriginal => {
  const original = await importOriginal<typeof import("./contact-email")>();
  return { ...original, sendContactEmail: emailMocks.sendContactEmail };
});

import { appRouter } from "./routers";

function createContext(): TrpcContext {
  return {
    user: null,
    req: {
      ip: "127.0.0.1",
      protocol: "https",
      headers: { "user-agent": "vitest" },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const validSubmission = {
  name: "Erika Musterfrau",
  email: "erika@example.de",
  phone: "+49 123 456",
  message: "Bitte um einen Rückruf zur Terminvereinbarung.",
  privacyConsent: true as const,
  website: "",
  startedAt: Date.now() - 5_000,
};

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMocks.countRecentContactSubmissions.mockResolvedValue(0);
    dbMocks.createContactSubmission.mockResolvedValue(42);
    dbMocks.updateContactDeliveryStatus.mockResolvedValue(undefined);
    notificationMocks.notifyOwner.mockResolvedValue(true);
    emailMocks.sendContactEmail.mockResolvedValue({ sent: false, reason: "not_configured" });
  });

  it("persists valid requests without active SMTP and returns success", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.contact.submit(validSubmission)).resolves.toEqual({ success: true });
    expect(dbMocks.createContactSubmission).toHaveBeenCalledOnce();
    expect(dbMocks.updateContactDeliveryStatus).toHaveBeenCalledWith(42, "owner_notified");
  });

  it("blocks the fourth request within the rate-limit window", async () => {
    dbMocks.countRecentContactSubmissions.mockResolvedValue(3);
    const caller = appRouter.createCaller(createContext());

    await expect(caller.contact.submit(validSubmission)).rejects.toMatchObject({
      code: "TOO_MANY_REQUESTS",
    });
    expect(dbMocks.createContactSubmission).not.toHaveBeenCalled();
  });
});
