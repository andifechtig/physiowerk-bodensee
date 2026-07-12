import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyConsent: boolean;
  website: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  privacyConsent: false,
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);

  const submission = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(initialFormState);
      setStartedAt(Date.now());
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    submission.mutate({ ...form, privacyConsent: true, startedAt });
  };

  return (
    <form className="contact-form" aria-label="Kontaktformular" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name="name"
          placeholder="Name"
          autoComplete="name"
          value={form.name}
          onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
          required
          minLength={2}
          maxLength={120}
        />
      </label>
      <label>
        E-Mail
        <input
          name="email"
          type="email"
          placeholder="E-Mail"
          autoComplete="email"
          value={form.email}
          onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
          required
          maxLength={320}
        />
      </label>
      <label>
        Telefon
        <input
          name="phone"
          type="tel"
          placeholder="Telefon"
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+()\-./\s]{5,40}"
          value={form.phone}
          onChange={event => setForm(current => ({ ...current, phone: event.target.value }))}
          required
          maxLength={40}
        />
      </label>
      <label>
        Nachricht
        <textarea
          name="message"
          placeholder="Nachricht"
          rows={6}
          value={form.message}
          onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
          required
          minLength={10}
          maxLength={5000}
        />
      </label>

      <label className="honeypot-field" aria-hidden="true">
        Website
        <input
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={form.website}
          onChange={event => setForm(current => ({ ...current, website: event.target.value }))}
        />
      </label>

      <label className="consent-field">
        <input
          name="privacyConsent"
          type="checkbox"
          checked={form.privacyConsent}
          onChange={event =>
            setForm(current => ({ ...current, privacyConsent: event.target.checked }))
          }
          required
        />
        <span>
          Mit dem Absenden des Formulars erklären Sie sich einverstanden, dass Ihre Angaben (Name,
          E-Mail, Telefonnummer, Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert und verarbeitet
          werden. Die Daten werden nicht an Dritte weitergegeben. Grundlage ist Art. 6 Abs. 1 lit. a
          und b DSGVO. Sie können Ihre Einwilligung jederzeit für die Zukunft widerrufen. Weitere
          Informationen finden Sie in unserer Datenschutzerklärung.
        </span>
      </label>

      {submission.error ? (
        <p className="form-message form-message-error" role="alert">
          {submission.error.message}
        </p>
      ) : null}
      {submitted ? (
        <p className="form-message form-message-success" role="status">
          <CheckCircle2 aria-hidden="true" />
          Vielen Dank. Ihre Nachricht wurde sicher übermittelt.
        </p>
      ) : null}

      <button className="button button-primary" type="submit" disabled={submission.isPending}>
        {submission.isPending ? <Loader2 className="button-spinner" aria-hidden="true" /> : null}
        {submission.isPending ? "Nachricht wird gesendet" : "Nachricht absenden"}
      </button>
    </form>
  );
}
