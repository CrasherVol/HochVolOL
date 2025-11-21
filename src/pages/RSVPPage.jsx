import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import RSVPForm from "../components/RSVPForm.jsx";
import { TEXTS, DATUM } from "../data/constants.js";
import {
  Users,
  CalendarCheck2,
  PartyPopper,
  Mail,
  Info,
  Clock,
  HelpCircle,
  Baby,
  ThermometerSnowflake,
  Hourglass,
} from "lucide-react";

export default function RSVPPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Datum sprachabhängig holen, falls vorhanden
  const datumText =
    (DATUM && DATUM[lang] && DATUM[lang].text) ||
    (DATUM && DATUM.text) ||
    "";

  const [stats, setStats] = useState({ yes: 0, no: 0, total: 0 });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);
  // 💖 Neu: Herzregen
  const [showHearts, setShowHearts] = useState(false);

  const loadStats = async () => {
    try {
      const r = await fetch("/api/rsvp-stats");
      const data = await r.json();
      if (r.ok) setStats(data);
    } catch {
      // Seite funktioniert auch ohne Stats
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const toAttendBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const v = value.trim().toLowerCase();
      if (["yes", "ja", "y", "true", "1"].includes(v)) return true;
      if (["no", "nein", "n", "false", "0"].includes(v)) return false;
    }
    return false;
  };

  const handleSubmitRSVP = async (payload) => {
    setSending(true);
    setOk(null);
    setShowHearts(false); // Herzregen vorher zurücksetzen

    try {
      const attendBool = toAttendBoolean(payload?.attend);
      const email = payload?.email || "";

      const body = {
        ...payload,
        attend: attendBool,
        email,
      };

      const r = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (r.ok) {
        setOk(true);
        await loadStats();

        // 💖 Herzregen starten
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 2500);
      } else {
        setOk(false);
      }
    } catch (err) {
      setOk(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* 💖 Herzregen-Overlay */}
      {showHearts && (
        <div className="rsvp-heart-overlay">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`heart heart-${(i % 5) + 1}`}
            >
              ❤
            </span>
          ))}
        </div>
      )}

      <Section
        title={t.rsvpTitle}
        subtitle={t.rsvpSub}
        icon={<Users className="w-5 h-5" />}
      >
        {/* ===== HELLER, BLAUER HERO ===== */}
        <div
          style={{
            borderRadius: "1.75rem",
            padding: "1.6rem 1.8rem",
            marginBottom: "2.2rem",
            background:
              "linear-gradient(135deg, #eff6ff 0%, #dbeafe 45%, #bfdbfe 100%)",
            boxShadow: "0 18px 40px rgba(15,23,42,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Links: Deadline + Überschrift + Spruch */}
            <div style={{ flex: "1 1 260px", minWidth: 0 }}>
              {/* Pills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "0.9rem",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.9)",
                    fontSize: "0.85rem",
                    color: "#1e293b",
                    border: "1px solid rgba(148,163,184,0.4)",
                  }}
                >
                  <Clock size={16} />
                  <span>{t.rsvpSub}</span>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "999px",
                    background: "rgba(239,246,255,0.9)",
                    fontSize: "0.85rem",
                    color: "#1e293b",
                    border: "1px solid rgba(148,163,184,0.35)",
                  }}
                >
                  <CalendarCheck2 size={16} />
                  <span>{datumText}</span>
                </div>
              </div>

              {/* Überschrift */}
              <h2
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "0.35rem",
                }}
              >
                {lang === "en"
                  ? "Your RSVP for our winter wedding"
                  : lang === "ru"
                  ? "Ваш ответ на нашу зимнюю свадьбу"
                  : "Eure Zusage zu unserer Winterhochzeit"}
              </h2>

              {/* Spruch */}
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#1f2937",
                  maxWidth: "36rem",
                  lineHeight: 1.65,
                  fontWeight: 500,
                  marginBottom: "1.2rem",
                }}
              >
                {lang === "en"
                  ? "If someone gets cold feet, hopefully it's you ;-)"
                  : lang === "ru"
                  ? "Если кому-то становится холодно в ногах, надеюсь, это вы ;-)"
                  : "Wenn einer kalte Füße bekommt, dann hoffentlich ihr ;-)"}
              </p>
            </div>

            {/* Rechts: „Zusammen feiern“ + Mail */}
            <div
              style={{
                flex: "0 0 260px",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  borderRadius: "1.25rem",
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(148,163,184,0.45)",
                  alignItems: "flex-start",
                }}
              >
                <PartyPopper size={20} color="#1d4ed8" />
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: "0.2rem",
                      color: "#0f172a",
                    }}
                  >
                    {lang === "en"
                      ? "Celebrate together"
                      : lang === "ru"
                      ? "Празднуем вместе"
                      : "Zusammen feiern"}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#1f2937",
                    }}
                  >
                    {lang === "en"
                      ? "Just send us a quick note to let us know if you're coming—a few clicks and we'll know exactly how many guests to expect."
                      : lang === "ru"
                      ? "Напишите нам, собираетесь ли вы прийти — несколько кликов, и мы будем знать, сколько гостей мы сможем принять."
                      : "Schreibt uns kurz, ob ihr kommt – ein paar Klicks und wir haben Klarheit, wie viele Gäste wir begrüßen dürfen."}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  padding: "0.7rem 1rem",
                  borderRadius: "1.25rem",
                  background: "rgba(239,246,255,0.95)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  alignItems: "center",
                }}
              >
                <Mail size={18} color="#1d4ed8" />
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#475569",
                      marginBottom: "0.1rem",
                    }}
                  >
                    {t.orEmail}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#1d4ed8",
                    }}
                  >
                    hoch-vol-ol@outlook.de
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== HAUPT-LAYOUT: Formular links, FAQ/Datenschutz rechts ===== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1.4fr)",
            gap: "1.9rem",
          }}
          className="rsvp-main-grid"
        >
          {/* 💌 Formular-Bereich */}
          <Card
            title={
              datumText
                ? `${t.rsvpTitle} – ${datumText}`
                : t.rsvpTitle
            }
            className="hover-react"
          >
            <div className="form-intro">
              <Info className="icon" />
              <p>
                {lang === "en"
                  ? "Please fill out the form below. It only takes a moment and gives us clarity for the planning."
                  : lang === "ru"
                  ? "Пожалуйста, заполните форму ниже. Это займёт всего минуту и даст нам ясность для подготовки."
                  : "Füllt das Formular unten kurz aus – so haben wir Klarheit für die weitere Planung."}
              </p>
            </div>

            <RSVPForm
              lang={lang}
              onSubmitRSVP={handleSubmitRSVP}
              sending={sending}
            />

            {ok === true && (
              <div className="pill-dark" style={{ marginTop: ".75rem" }}>
                {t.rsvpSuccess}
              </div>
            )}
            {ok === false && (
              <div
                className="pill-dark"
                style={{
                  marginTop: ".75rem",
                  background: "#fee2e2",
                  color: "#7f1d1d",
                }}
              >
                {lang === "en"
                  ? "Oops, something went wrong. Please try again."
                  : lang === "ru"
                  ? "Упс, что-то пошло не так. Попробуйте ещё раз."
                  : "Uups, da ging etwas schief. Bitte nochmal versuchen."}
              </div>
            )}
          </Card>

          {/* 📘 Seitenbereich (FAQ & Datenschutz) */}
          <div
            className="rsvp-side"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.3rem",
            }}
          >
            <Card
              title={lang === "en" ? "FAQ" : lang === "ru" ? "FAQ" : "FAQ"}
              className="hover-react"
            >
              {/* FAQ 1 – RSVP ändern */}
              <details className="faq" open>
                <summary>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}
                  >
                    <HelpCircle size={16} />
                    <span>
                      {lang === "en"
                        ? "Can I change my RSVP later? ❓"
                        : lang === "ru"
                        ? "Можно ли изменить ответ позже? ❓"
                        : "Kann ich meine Antwort später ändern? ❓"}
                    </span>
                  </span>
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "If it was no before, then yes. If it was yes before, then no! 😉"
                    : lang === "ru"
                    ? "Если раньше нет, то да. Если раньше да, то нет! 😉"
                    : "Wenn vorher nein, dann ja. Wenn vorher ja, dann nein! 😉"}
                </div>
              </details>

              {/* FAQ 2 – Kinder */}
              <details className="faq">
                <summary>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}
                  >
                    <Baby size={16} />
                    <span>
                      {lang === "en"
                        ? "Can we bring our children? 👶"
                        : lang === "ru"
                        ? "Можно ли прийти с детьми? 👶"
                        : "Können wir Kinder mitbringen? 👶"}
                    </span>
                  </span>
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "If yes, please let us know so we can get enough cages."
                    : lang === "ru"
                    ? "Если да, пожалуйста, сообщите нам об этом, чтобы мы могли подготовить достаточное количество клеток.!"
                    : "Wenn ja, bitte Bescheid geben, damit wir genügend Käfige besorgen können."}
                </div>
              </details>

              {/* FAQ 3 – Mütze & Handschuhe */}
              <details className="faq">
                <summary>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}
                  >
                    <ThermometerSnowflake size={16} />
                    <span>
                      {lang === "en"
                        ? "Do I need a hat and gloves? 🧣🧤"
                        : lang === "ru"
                        ? "Нужны ли шапка и перчатки? 🧣🧤"
                        : "Brauche ich eine Mütze und Handschuhe? 🧣🧤"}
                    </span>
                  </span>
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "Are you going into the ice bath? Then maybe not 🧊 – otherwise a hat and gloves are definitely a good idea."
                    : lang === "ru"
                    ? "Планируешь запрыгнуть в ледяную купель? Тогда, может быть, нет 🧊 — во всех остальных случаях шапка и перчатки очень пригодятся."
                    : "Gehst du in die Eistonne? Dann vielleicht nein 🧊 – ansonsten wären Mütze und Handschuhe auf jeden Fall vorteilhaft."}
                </div>
              </details>

              {/* FAQ 4 – Bis wann antworten */}
              <details className="faq">
                <summary>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                    }}
                  >
                    <Hourglass size={16} />
                    <span>
                      {lang === "en"
                        ? "By when should we reply? ⏰"
                        : lang === "ru"
                        ? "До какого срока нужно ответить? ⏰"
                        : "Bis wann sollen wir Bescheid geben? ⏰"}
                    </span>
                  </span>
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "Preferably by the above date, so that we can plan ahead and look forward to seeing you."
                    : lang === "ru"
                    ? "Желательно до указанной выше даты, чтобы мы могли точно спланировать мероприятие и с нетерпением ждать вашего приезда."
                    : "Am besten bis zu dem oben genannten Datum, damit wir Planungssicherheit haben und die Vorfreude auf euch."}
                </div>
              </details>
            </Card>

            <Card title={t.privacyTitle} className="hover-react">
              <p className="privacy">{t.privacyBody}</p>
            </Card>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
