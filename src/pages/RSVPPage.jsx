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
} from "lucide-react";

export default function RSVPPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* Hero-Kopf mit Deadline-Pill und Mini-Benefits */}
      <Section
        title={t.rsvpTitle}
        subtitle={t.rsvpSub}
        icon={<Users className="w-5 h-5" />}
      >
        {/* Deadline + Eventdatum */}
        <div className="rsvp-hero">
          <div className="rsvp-pills">
            <div className="pill">
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
                <strong>{lang === "en" ? "Celebrate together" : lang === "ru" ? "Празднуем вместе" : "Zusammen feiern"}</strong>
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

        {/* Zweispaltiges Layout: links Formular, rechts Infos/FAQ/Datenschutz */}
        <div className="rsvp-grid">
          <Card title={t.rsvpTitle + " – " + DATUM.text}>
            {/* Kleines Onboarding-Intro */}
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

            {/* Dein vorhandenes Formular (unverändert) */}
            <RSVPForm lang={lang} />

            {/* Vertrauenshinweis im Formular-Card-Footer */}
            <div className="form-footnote">
              <ShieldCheck className="icon" />
              <span>{t.privacyNote}</span>
            </div>
          </Card>

          <div className="rsvp-side">
            {/* Mini-FAQ als Details/Accordion – null JS, nur HTML */}
            <Card title={lang === "en" ? "FAQ" : lang === "ru" ? "FAQ" : "FAQ"}>
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
                    ? "Yes, just send us an email and we’ll update it."
                    : lang === "ru"
                    ? "Да, просто напишите нам по email — мы обновим данные."
                    : "Ja, schreibt uns einfach per E-Mail – wir passen es an."}
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
                    ? "please let us know in the form so we can get cages"
                    : lang === "ru"
                    ? "Пожалуйста, укажите это в форме, чтобы мы могли получить клетки"
                    : "bitte im Formular angeben, damit wir Käfige besorgen können"}
                </div>
              </details>

              <details className="faq">
                <summary>
                  {lang === "en"
                    ? "The time is running..."
                    : lang === "ru"
                    ? "Время идет..."
                    : "Dee Uhr tickt..."}
                </summary>
                <div className="faq-body">
                  {lang === "en"
                    ? "One last greeting"
                    : lang === "ru"
                    ? "Последнее приветствие"
                    : "Ein letzter Gruß"}
                </div>
              </details>
            </Card>

            {/* Datenschutz separat – wirkt seriöser und erhöht Vertrauen */}
            <Card title={t.privacyTitle}>
              <p className="privacy">{t.privacyBody}</p>
            </Card>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
