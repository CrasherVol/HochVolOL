// src/components/RSVPForm.jsx
import React, { useState } from "react";
import { TEXTS } from "../data/constants.js";
import { MessageCircle } from "lucide-react";

const FORM_TEXT = {
  de: {
    nameLabel: "Name*",
    namePlaceholder: "Vor- und Nachname",
    emailLabel: "E-Mail*",
    emailPlaceholder: "name@mail.de",
    attendLabel: "Nehmt ihr teil?*",
    attendYes: "Ja",
    attendNo: "Nein",
    peopleLabel: "Anzahl Personen*",
    kidsLabel: "Kinder",
    kidsPlaceholder: "nein, nur Party am besten ;-)",
    extraGuestsLabel: "Weitere Personen (Namen)",
    extraGuestPlaceholderPrefix: "Person", // "Person 2"
    messageLabel: "Nachricht (optional)",
    messageHint:
      "Hier ist Platz für Wünsche, Reiseinfos oder alles, was ihr uns sagen möchtet.",
    consentLabel:
      "Ich stimme der Verarbeitung meiner Angaben zur Organisation der Hochzeit zu.",
    consentHint: "Nur für die Planung – danach löschen wir die Daten.",
    submitLabel: "Antwort absenden",
    submittingLabel: "Wird gesendet…",
    altMailPrefix: "oder an",
    altMailSuffix: "",
    coldFeetText: "❄️ Achtung - Du begehst einen Fehler 😄",
  },
  en: {
    nameLabel: "Name*",
    namePlaceholder: "First and last name",
    emailLabel: "E-mail*",
    emailPlaceholder: "name@mail.com",
    attendLabel: "Will you join us?*",
    attendYes: "Yes",
    attendNo: "No",
    peopleLabel: "Number of people*",
    kidsLabel: "Children",
    kidsPlaceholder: "no, adults only is best ;-)",
    extraGuestsLabel: "Additional guests (names)",
    extraGuestPlaceholderPrefix: "Guest", // "Guest 2"
    messageLabel: "Message (optional)",
    messageHint:
      "Here you can share wishes, travel info or anything you’d like us to know.",
    consentLabel:
      "I agree that my details may be used to organize the wedding.",
    consentHint: "For planning only – we will delete the data afterwards.",
    submitLabel: "Send RSVP",
    submittingLabel: "Sending…",
    altMailPrefix: "or write to",
    altMailSuffix: "directly via e-mail",
    coldFeetText: "❄️ Attention - You are making a mistake 😄",
  },
  ru: {
    nameLabel: "Имя*",
    namePlaceholder: "Имя и фамилия",
    emailLabel: "E-mail*",
    emailPlaceholder: "name@mail.ru",
    attendLabel: "Вы приедете?*",
    attendYes: "Да",
    attendNo: "Нет",
    peopleLabel: "Количество человек*",
    kidsLabel: "Дети",
    kidsPlaceholder: "нет, лучше только на вечеринку ;-)",
    extraGuestsLabel: "Дополнительные гости (имена)",
    extraGuestPlaceholderPrefix: "Гость", // "Гость 2"
    messageLabel: "Сообщение (необязательно)",
    messageHint:
      "Здесь можно написать пожелания, информацию о поездке или что-то ещё, что вы хотите нам сообщить.",
    consentLabel:
      "Я согласен(на) на обработку моих данных для организации свадьбы.",
    consentHint: "Только для планирования — затем мы удалим данные.",
    submitLabel: "Отправить ответ",
    submittingLabel: "Отправка…",
    altMailPrefix: "или написать на",
    altMailSuffix: "напрямую по электронной почте",
    coldFeetText: "❄️ Внимание — ты совершаешь ошибку 😄",
  },
};

export default function RSVPForm({ lang, onSubmitRSVP, sending }) {
  const tGlobal = TEXTS[lang] || TEXTS.de; // falls du das noch woanders brauchst
  const t = FORM_TEXT[lang] || FORM_TEXT.de;

  const [attend, setAttend] = useState("yes");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState(1);
  const [extraGuestNames, setExtraGuestNames] = useState([]);
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // ❄️ Neu: kleines Popup bei "Nein" (kalte Füße)
  const [showColdFeet, setShowColdFeet] = useState(false);

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
          <label>{t.nameLabel}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            style={rightShift}
          />
        </div>

        <div className="field">
          <label>{t.emailLabel}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            style={rightShift}
          />
        </div>
      </div>

      {/* 2. Reihe */}
      <div className="field-grid">
        <div className="field" style={{ position: "relative" }}>
          <label>{t.attendLabel}</label>
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
                onChange={() => {
                  setAttend("yes");
                  setShowColdFeet(false); // Popup weg bei "Ja"
                }}
              />{" "}
              {t.attendYes}
            </label>
            <label>
              <input
                type="radio"
                name="attend"
                value="no"
                checked={attend === "no"}
                onChange={() => {
                  setAttend("no");
                  // ❄️ Popup kurz anzeigen
                  setShowColdFeet(true);
                  setTimeout(() => setShowColdFeet(false), 3500);
                }}
              />{" "}
              {t.attendNo}
            </label>
          </div>

          {/* ❄️ Kalte-Füße-Popup direkt am Feld */}
          {showColdFeet && attend === "no" && (
            <div
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "0.2rem",
                background: "rgba(15,23,42,0.92)",
                color: "white",
                padding: "0.35rem 0.75rem",
                borderRadius: "999px",
                fontSize: "1,2rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                boxShadow: "0 8px 18px rgba(15,23,42,0.5)",
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <span>{t.coldFeetText}</span>
            </div>
          )}
        </div>

        <div className="field">
          <label>{t.peopleLabel}</label>
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
          <label>{t.extraGuestsLabel}</label>
          <div className="extra-guests-grid">
            {extraGuestNames.map((_, idx) => (
              <input
                key={idx}
                type="text"
                value={extraGuestNames[idx] || ""}
                onChange={(e) =>
                  handleExtraGuestNameChange(idx, e.target.value)
                }
                placeholder={`${t.extraGuestPlaceholderPrefix} ${idx + 2}`}
                className="extra-guest-input"
                style={rightShift}
              />
            ))}
          </div>
        </div>
      )}

      {/* Kinder */}
      <div className="field">
        <label>{t.kidsLabel}</label>
        <input
          type="text"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          placeholder={t.kidsPlaceholder}
          style={rightShift}
        />
      </div>

      {/* Nachricht */}
      <div className="field">
        <label>{t.messageLabel}</label>

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
            <span>{t.messageHint}</span>
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
          {t.consentLabel}
        </label>
        <div className="hint" style={{ marginLeft: "0.75rem" }}>
          {t.consentHint}
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
        {sending ? t.submittingLabel : t.submitLabel}
      </button>

      <span className="alt-mail" style={{ marginLeft: "0.75rem" }}>
        {t.altMailPrefix}{" "}
        <a href="mailto:hochvolol@gmail.com">hochvolol@gmail.com</a>{" "}
        {t.altMailSuffix}
      </span>
    </form>
  );
}
