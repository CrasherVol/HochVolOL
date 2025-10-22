import React, { useState } from "react";
import { TEXTS } from "../data/constants.js";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function RSVPForm({ lang = "de" }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [status, setStatus] = useState("idle");
  const [agree, setAgree] = useState(false);

  const actionUrl = "https://formspree.io/f/xxxxxxxx"; // Deinen echten Link hier eintragen

  return (
    <form
      action={actionUrl}
      method="POST"
      className="rsvp-form"
      onSubmit={(e) => {
        if (!agree) {
          e.preventDefault();
          alert(t.privacy);
          return;
        }
        setStatus("sending");
        setTimeout(() => setStatus("success"), 1200);
      }}
    >
      {/* Überschrift */}
      <h3 className="form-headline">
        {t.rsvpTitle} – 28.02.2026
      </h3>

      {/* Eingaben */}
      <div className="form-grid">
        <label>
          <span>{t.name}*</span>
          <input name="name" required placeholder={t.namePlaceholder} />
        </label>

        <label>
          <span>{t.email}*</span>
          <input name="email" type="email" required placeholder={t.emailPlaceholder} />
        </label>

        <fieldset>
          <span>{t.yesnoQ}*</span>
          <div className="radio-group">
            <label>
              <input type="radio" name="teilnahme" value={t.yes} required /> {t.yes}
            </label>
            <label>
              <input type="radio" name="teilnahme" value={t.no} /> {t.no}
            </label>
          </div>
        </fieldset>

        <label>
          <span>{t.people}*</span>
          <input name="anzahl" type="number" min={1} required defaultValue={1} />
        </label>

        <label>
          <span>{t.diet}</span>
          <input name="essen" placeholder={t.dietPlaceholder} />
        </label>
      </div>

      {/* Datenschutz */}
      <div className="form-privacy">
        <label>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          {t.privacy}
        </label>
        <p>{t.privacyNote}</p>
      </div>

      {/* Submit-Bereich */}
      <div className="form-submit">
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.send}
        </button>
        <span>
          {t.orEmail} <a href="mailto:love@example.com">love@example.com</a>
        </span>
      </div>

      {/* Erfolgsmeldung */}
      {status === "success" && (
        <div className="form-success">
          <CheckCircle2 className="icon" /> {t.rsvpSuccess}
        </div>
      )}

      {status === "error" && (
        <div className="form-error">
          <AlertCircle className="icon" /> {t.errorMessage || "Fehler beim Senden. Bitte später erneut versuchen."}
        </div>
      )}
    </form>
  );
}
