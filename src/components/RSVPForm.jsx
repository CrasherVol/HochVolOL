// src/components/RSVPForm.jsx
import React, { useState } from "react";
import { TEXTS } from "../data/constants.js";
import { MessageCircle } from "lucide-react";

export default function RSVPForm({ lang, onSubmitRSVP, sending }) {
  const t = TEXTS[lang] || TEXTS.de;

  const [attend, setAttend] = useState("yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState(1);
  const [extraGuestNames, setExtraGuestNames] = useState([]);
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const handlePeopleChange = (e) => {
    const value = Number(e.target.value) || 1;
    const safe = Math.max(1, Math.min(10, value));
    setPeople(safe);

    setExtraGuestNames((prev) => {
      const desired = safe - 1;
      const copy = [...prev];
      copy.length = desired;
      for (let i = 0; i < desired; i++) {
        if (copy[i] == null) copy[i] = "";
      }
      return copy;
    });
  };

  const handleExtraGuestNameChange = (idx, val) => {
    setExtraGuestNames((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;

    const payload = {
      attend,
      name: name.trim(),
      email: email.trim(),
      people,
      diet: diet.trim(),
      message: message.trim(),
      extraGuests: extraGuestNames.map((n) => n.trim()).filter(Boolean),
    };

    if (onSubmitRSVP) onSubmitRSVP(payload);
  };

  // 🔵 Einheitlicher rechter Abstand für alle Inputs
  const rightShift = { marginLeft: "0.75rem" };

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      {/* 1. Reihe */}
      <div className="field-grid">
        <div className="field">
          <label>Name*</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname"
            style={rightShift}
          />
        </div>

        <div className="field">
          <label>E-Mail*</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.de"
            style={rightShift}
          />
        </div>
      </div>

      {/* 2. Reihe */}
      <div className="field-grid">
        <div className="field">
          <label>Nehmt ihr teil?*</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0.35rem",
              marginLeft: "0.75rem",
              gap: "0.35rem",
            }}
          >
            <label>
              <input
                type="radio"
                name="attend"
                value="yes"
                checked={attend === "yes"}
                onChange={() => setAttend("yes")}
              />{" "}
              Ja
            </label>
            <label>
              <input
                type="radio"
                name="attend"
                value="no"
                checked={attend === "no"}
                onChange={() => setAttend("no")}
              />{" "}
              Nein
            </label>
          </div>
        </div>

        <div className="field">
          <label>Anzahl Personen*</label>
          <input
            type="number"
            min={1}
            max={10}
            value={people}
            onChange={handlePeopleChange}
            style={rightShift}
          />
        </div>
      </div>

      {/* Extra Personen */}
      {people > 1 && (
        <div className="field">
          <label>Weitere Personen (Namen)</label>
          <div className="extra-guests-grid">
            {extraGuestNames.map((_, idx) => (
              <input
                key={idx}
                type="text"
                value={extraGuestNames[idx] || ""}
                onChange={(e) =>
                  handleExtraGuestNameChange(idx, e.target.value)
                }
                placeholder={`Person ${idx + 2}`}
                className="extra-guest-input"
                style={rightShift}
              />
            ))}
          </div>
        </div>
      )}

      {/* Kinder */}
      <div className="field">
        <label>Kinder</label>
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          placeholder="nein, nur Party am besten ;-)"
          style={rightShift}
        />
      </div>

      {/* Nachricht */}
      <div className="field">
        <label>Nachricht (optional)</label>

        <div
          style={{
            borderRadius: "1.25rem",
            padding: "0.75rem 0.9rem 0.9rem",
            background:
              "linear-gradient(135deg, #eff6ff 0%, #dbeafe 60%, #e0f2fe 100%)",
            border: "1px solid rgba(148,163,184,0.5)",
            marginLeft: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.4rem",
              fontSize: "0.85rem",
              color: "#1f2937",
            }}
          >
            <MessageCircle size={16} />
            <span>
              Hier ist Platz für Wünsche, Reiseinfos oder alles, was ihr uns
              sagen möchtet.
            </span>
          </div>

          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "0.9rem",
              border: "1px solid rgba(148,163,184,0.6)",
              padding: "0.55rem 0.7rem",
              resize: "vertical",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
          />
        </div>
      </div>

      {/* Einwilligung */}
      <div className="field checkbox-field">
        <label className="checkbox-label" style={{ marginLeft: "0.75rem" }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />{" "}
          Ich stimme der Verarbeitung meiner Angaben zur Organisation der
          Hochzeit zu.
        </label>
        <div className="hint" style={{ marginLeft: "0.75rem" }}>
          Nur für die Planung – danach löschen wir die Daten.
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={sending || !consent}
        style={{
          marginTop: "1.2rem",
          marginLeft: "0.75rem",
          borderRadius: "999px",
          padding: "0.75rem 1.9rem",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #dbeafe 60%, #e0f2fe 100%)",
          border: "1px solid rgba(148,163,184,0.6)",
          color: "#0f172a",
          fontWeight: 600,
          fontSize: "0.95rem",
          boxShadow: "0 8px 18px rgba(148,163,184,0.45)",
          opacity: sending || !consent ? 0.6 : 1,
          cursor: sending || !consent ? "not-allowed" : "pointer",
        }}
      >
        {sending ? "Wird gesendet…" : "Antwort absenden"}
      </button>

      <span className="alt-mail" style={{ marginLeft: "0.75rem" }}>
        oder an <a href="mailto:hoch-vol-ol@outlook.de">hoch-vol-ol@outlook.de</a>
      </span>
    </form>
  );
}
