import nodemailer from "nodemailer";

export const CONTACT_EMAIL_RECIPIENT = "info@physiowerk-bodensee.de" as const;

export type ContactEmailData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildContactEmail(data: ContactEmailData) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const message = escapeHtml(data.message).replaceAll("\n", "<br />");

  return {
    to: CONTACT_EMAIL_RECIPIENT,
    replyTo: data.email,
    subject: `Neue Kontaktanfrage von ${data.name}`,
    text: `Name: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.phone}\n\nNachricht:\n${data.message}`,
    html: `
      <h1>Neue Kontaktanfrage</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Nachricht:</strong><br />${message}</p>
    `,
  };
}

export async function sendContactEmail(data: ContactEmailData) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !from || !Number.isInteger(port)) {
    return { sent: false, reason: "not_configured" } as const;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user, pass },
    });
    const email = buildContactEmail(data);
    await transporter.sendMail({ ...email, from });
    return { sent: true } as const;
  } catch (error) {
    console.error("[Contact] SMTP delivery failed", error);
    return { sent: false, reason: "delivery_failed" } as const;
  }
}
