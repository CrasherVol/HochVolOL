import React, { useState } from "react";
import { TEXTS } from "../data/constants.js";
import { CheckCircle2 } from "lucide-react";

export default function RSVPForm({ lang = "de" }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");       // Inline-Fehlermeldung

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!agree) {
          setError(t.privacy);
          return;
        }
        setError("");
        setStatus("sending");

        const fd = new FormData(e.target);
        const raw = Object.fromEntries(fd.entries());

        const yesWords = [t.yes?.toLowerCase(), "ja", "yes", "да"].filter(Boolean);
        const attend = yesWords.includes(String(raw.teilnahme || "").trim().toLowerCase());

        const payload = {
          attend,
          name: raw.name || "",
          email: raw.email || "",
          people: raw.anzahl || "",
          diet: raw.essen || "",
          message: raw.nachricht || "",
        };

        try {
          const res = await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            // <-- DEBUG: zeige Status & Antworttext
            const text = await res.text();
            console.error("RSVP /api/rsvp failed:", res.status, text);
            setError(
              lang === "en"
                ? `Submit failed (${res.status}).`
                : lang === "ru"
                ? `Отправка не удалась (${res.status}).`
                : `Absenden fehlgeschlagen (${res.status}).`
            );
            setStatus("idle");
            return;
          }

          setStatus("success");
        } catch (err) {
          console.error("RSVP fetch error:", err);
          setError(
            lang === "en"
              ? "Something went wrong. Please try again."
              : lang === "ru"
              ? "Что-то пошло не так. Попробуйте ещё раз."
              : "Etwas ist schiefgelaufen. Bitte versuch’s noch einmal."
          );
          setStatus("idle");
        }
      }}
      className="rsvp-form"
    >
      <h3 className="form-headline">{t.rsvpTitle} – 28.02.2026</h3>

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

      <div className="form-privacy">
        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              if (e.target.checked) setError("");
            }}
          />
          {t.privacy}
        </label>

        {error && (
          <p style={{ color: "#b91c1c", marginTop: ".35rem" }} role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <p>{t.privacyNote}</p>
      </div>

      <div className="form-submit">
        <button type="submit" disabled={status === "sending" || !agree}>
          {status === "sending" ? t.sending : t.send}
        </button>
        <span>
          {t.orEmail} <a href="mailto:love@example.com">love@example.com</a>
        </span>
      </div>

      {status === "success" && (
        <div className="form-success">
          <CheckCircle2 className="icon" /> {t.rsvpSuccess}
        </div>
      )}
    </form>
  );
}
