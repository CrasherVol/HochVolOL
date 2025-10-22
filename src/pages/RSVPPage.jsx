import React from "react";
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

            <RSVPForm lang={lang} />

            <div className="form-footnote">
              <ShieldCheck className="icon" />
              <span>{t.privacyNote}</span>
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
                    ? "If before yes then no and if before no then yes."
                    : lang === "ru"
                    ? "Если до да, то нет, а если до нет, то да."
                    : "Wenn voher ja dann nein und wenn vorher nein dann ja."}
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
                    ? "Please indicate in the form so that we can get cages"
                    : lang === "ru"
                    ? "Пожалуйста, укажите в форме, чтобы мы могли получить клетки."
                    : "bitte im Formular angeben, damit wir Käfige besorgen können."}
                </div>
              </details>

              <details className="faq">
                <summary>
                  {lang === "en"
                    ? "The clock is ticking."
                    : lang === "ru"
                    ? "Часы тикают.?"
                    : "Die Uhr tickt."}
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "One last greeting..."
                    : lang === "ru"
                    ? "Последнее приветствие..."
                    : "Ein letzter Gruß..."}
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
