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
  ShieldCheck,
  Mail,
  Info,
  Clock,
  Sparkles,
} from "lucide-react";

export default function RSVPPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // --- Neu: Zähler-States & Request-Status ---
  const [stats, setStats] = useState({ yes: 0, no: 0, total: 0 });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);

  // --- Neu: Stats laden ---
  const loadStats = async () => {
    try {
      const r = await fetch("/api/rsvp-stats");
      const data = await r.json();
      if (r.ok) setStats(data);
    } catch {
      // still silent – Seite funktioniert auch ohne Stats
    }
  };
  useEffect(() => {
    loadStats();
  }, []);

  // --- Neu: Handler, den wir an dein Formular übergeben ---
  // Erwartet ein Objekt wie: { attend: true/false, name, email, people, diet, message, ... }
  const handleSubmitRSVP = async (payload) => {
    setSending(true);
    setOk(null);
    try {
      // Mindestens 'attend' (boolean) sollte drin sein:
      const body = {
        attend: Boolean(payload?.attend),
        email: payload?.email || "",
        // Optional: wir schicken alles mit – die API kann das speichern (siehe Anweisung unten)
        ...payload,
      };

      const r = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (r.ok) {
        setOk(true);
        await loadStats(); // Zähler aktualisieren
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
      {/* 🎀 Hero-Kopf mit Akzent-Pills */}
      <Section
        title={t.rsvpTitle}
        subtitle={t.rsvpSub}
        icon={<Users className="w-5 h-5" />}
      >
        {/* ===== HERO INFO ===== */}
        <div className="rsvp-hero">
          <div className="rsvp-pills">
            <div className="pill highlight">
              <Clock className="icon" aria-hidden="true" />
              <span>{t.rsvpSub}</span>
            </div>
            <div className="pill soft">
              <CalendarCheck2 className="icon" aria-hidden="true" />
              <span>{DATUM.text}</span>
            </div>
          </div>

          <div className="benefits">
            <div className="benefit">
              <PartyPopper className="icon" />
              <div>
                <strong>
                  {lang === "en"
                    ? "Celebrate together"
                    : lang === "ru"
                    ? "Празднуем вместе"
                    : "Zusammen feiern"}
                </strong>
                <div className="sub">
                  {lang === "en"
                    ? "Your RSVP helps us plan seats, food & shuttles"
                    : lang === "ru"
                    ? "Ваш ответ помогает нам рассчитать места, еду и шаттлы"
                    : "Mit eurer Zusage planen wir Plätze, Essen & Shuttles"}
                </div>
              </div>
            </div>
            <div className="benefit">
              <ShieldCheck className="icon" />
              <div>
                <strong>{t.privacyTitle}</strong>
                <div className="sub">{t.privacyNote}</div>
              </div>
            </div>
            <div className="benefit">
              <Mail className="icon" />
              <div>
                <strong>{t.orEmail}</strong>
                <div className="sub">love@example.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== HAUPT-LAYOUT ===== */}
        <div className="rsvp-grid">
          {/* 💌 Formular-Bereich */}
          <Card title={t.rsvpTitle + " – " + DATUM.text} className="hover-react">
            <div className="form-intro">
              <Info className="icon" />
              <p>
                {lang === "en"
                  ? "Please fill out the form below. It only takes a minute and makes planning much easier."
                  : lang === "ru"
                  ? "Пожалуйста, заполните форму ниже. Это займет минуту и очень упростит нам подготовку."
                  : "Füllt das kurze Formular aus – dauert nur eine Minute und hilft uns bei der Planung."}
              </p>
            </div>

            {/* WICHTIG: Wir geben dem Formular den Submit-Handler mit */}
            <RSVPForm lang={lang} onSubmitRSVP={handleSubmitRSVP} sending={sending} />

            {/* Status / Feedback */}
            {ok === true && (
              <div className="pill-dark" style={{ marginTop: ".65rem" }}>
                {t.rsvpSuccess}
              </div>
            )}
            {ok === false && (
              <div
                className="pill-dark"
                style={{
                  marginTop: ".65rem",
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

            <div className="form-footnote">
              <ShieldCheck className="icon" />
              <span>{t.privacyNote}</span>
            </div>

            {/* --- Neu: Mini-Stats direkt unter dem Formular --- */}
            <div className="stats-compact-grid" style={{ marginTop: "1rem" }}>
              <div className="stat-mini">
                <div className="value">{stats.yes}</div>
                <div className="label">{t.yes || "Ja"}</div>
              </div>
              <div className="stat-mini">
                <div className="value">{stats.no}</div>
                <div className="label">{t.no || "Nein"}</div>
              </div>
              <div className="stat-mini">
                <div className="value">{stats.total}</div>
                <div className="label">
                  {lang === "en" ? "Total" : lang === "ru" ? "Итого" : "Gesamt"}
                </div>
              </div>
            </div>
          </Card>

          {/* 📘 Seitenbereich (FAQ & Datenschutz) */}
          <div className="rsvp-side">
            <Card title={lang === "en" ? "FAQ" : lang === "ru" ? "FAQ" : "FAQ"} className="hover-react">
              <details className="faq" open>
                <summary>
                  {lang === "en"
                    ? "Can I change my RSVP later?"
                    : lang === "ru"
                    ? "Можно ли изменить ответ позже?"
                    : "Kann ich meine Antwort später ändern?"}
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "Yes. Send the form again with your updated choice — we adjust the counters automatically."
                    : lang === "ru"
                    ? "Да. Отправьте форму ещё раз с новым выбором — счётчики обновятся автоматически."
                    : "Ja. Schickt das Formular einfach erneut mit eurer geänderten Auswahl — die Zähler passen sich automatisch an."}
                </div>
              </details>

              <details className="faq">
                <summary>
                  {lang === "en"
                    ? "Can we bring our children?"
                    : lang === "ru"
                    ? "Можно ли прийти с детьми?"
                    : "Können wir Kinder mitbringen?"}
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "Yes. Please indicate it in the form so we can plan seats and dinner."
                    : lang === "ru"
                    ? "Да. Пожалуйста, укажите это в форме, чтобы мы смогли спланировать места и ужин."
                    : "Ja. Bitte im Formular angeben, damit wir Plätze und Dinner planen können."}
                </div>
              </details>

              <details className="faq">
                <summary>
                  {lang === "en"
                    ? "The clock is ticking."
                    : lang === "ru"
                    ? "Часы тикают."
                    : "Die Uhr tickt."}
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "A small reminder: please reply by the date shown above."
                    : lang === "ru"
                    ? "Небольшое напоминание: пожалуйста, ответьте до даты, указанной выше."
                    : "Kleine Erinnerung: Bitte gebt bis zum oben genannten Datum Bescheid."}
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
