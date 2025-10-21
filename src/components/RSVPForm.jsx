import React, { useState } from "react";
import { TEXTS } from "../data/constants.js";

export default function RSVPForm({ lang = "de" }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [status, setStatus] = useState("idle");
  const [agree, setAgree] = useState(false);

  // TODO: Trage hier deinen echten Formspree-Link ein
  const actionUrl = "https://formspree.io/f/xxxxxxxx";

  return (
    <form
      action={actionUrl}
      method="POST"
      className="card"
      onSubmit={(e) => {
        if (!agree) {
          e.preventDefault();
          alert(t.privacy);
          return;
        }
        setStatus("sending");
        // Optisches Feedback – bei Formspree übernimmt danach die Seite
        setTimeout(() => setStatus("success"), 1200);
      }}
    >
      <h3
        className="headline"
        style={{ fontSize: "1.125rem", marginBottom: ".5rem", color: "var(--accent)" }}
      >
        {t.rsvpTitle} – 28.02.2026
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: ".75rem",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          <span style={{ fontSize: ".875rem", color: "#64748b" }}>{t.name}*</span>
          <input name="name" required className="input" placeholder={t.namePlaceholder} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          <span style={{ fontSize: ".875rem", color: "#64748b" }}>{t.email}*</span>
          <input name="email" type="email" required className="input" placeholder={t.emailPlaceholder} />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: ".75rem",
          marginTop: ".75rem",
        }}
      >
        <fieldset style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          <span style={{ fontSize: ".875rem", color: "#64748b" }}>{t.yesnoQ}*</span>
          <label style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <input type="radio" name="teilnahme" value={t.yes} required /> {t.yes}
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
            <input type="radio" name="teilnahme" value={t.no} /> {t.no}
          </label>
        </fieldset>

        <label style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          <span style={{ fontSize: ".875rem", color: "#64748b" }}>{t.people}*</span>
          <input name="anzahl" type="number" min={1} required className="input" defaultValue={1} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          <span style={{ fontSize: ".875rem", color: "#64748b" }}>{t.diet}</span>
          <input name="essen" className="input" placeholder={t.dietPlaceholder} />
        </label>
      </div>

      <div style={{ marginTop: ".75rem" }}>
        <label
          style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".875rem" }}
        >
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />{" "}
          {t.privacy}
        </label>
        <p style={{ fontSize: ".75rem", color: "#64748b", marginTop: ".25rem" }}>{t.privacyNote}</p>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.send}
        </button>
        <span style={{ fontSize: ".875rem", color: "#64748b" }}>
          {t.orEmail} <a className="underline" href="mailto:love@example.com">love@example.com</a>
        </span>
      </div>

      {status === "success" && (
        <div
          style={{
            marginTop: ".75rem",
            padding: ".5rem .75rem",
            borderRadius: ".75rem",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#15803d",
          }}
        >
          {t.rsvpSuccess}
        </div>
      )}
    </form>
  );
}
