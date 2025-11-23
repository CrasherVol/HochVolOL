// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import Card from "../components/Card.jsx";
import { TEXTS, DATUM, LINKS, getProgramm, googleCalUrl } from "../data/constants.js";
import {
  CalendarHeart,
  MapPin,
  Camera,
  Users,
  Clock,
  GlassWater,
  Mail,
  Sparkles,
  Wine,
  Music4,
} from "lucide-react";

export default function HomePage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;
  const tt = (key, fallback) => (t && t[key] !== undefined ? t[key] : fallback);

  const targetDate = new Date(DATUM.iso);

  const getTimeLeft = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    return { isPast: false, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Zeitplan aus PROGRAMM / getProgramm(lang)
  const timeline = getProgramm(lang);

  // Fester Google-Maps-Link zum Alpina Hotel Gudauri
  const ALPINA_MAP_URL =
    "https://www.google.com/maps/search/?api=1&query=Alpina+Hotel+Gudauri";

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* ---------- HERO (einzige Stelle mit CTA-Buttons) ---------- */}
      <section className="home-hero">
        <div className="hero-logo-wrap">
          <img
            src="/vo-logo.png"
            alt={tt("heroLogoAlt", "Olga & Volker – Hochzeitslogo")}
            className="hero-logo-img pulse"
          />
        </div>

        <p className="eyebrow pill-dark">
          {tt("heroEyebrow", "Party in Gudauri in Georgien !!!")}
        </p>

        <h1 className="home-hero-title">
          {tt("heroTitle", "Wir heiraten!")}
        </h1>

        <div className="names-line highlight-names">
          <span className="name">Olga</span>
          <span className="and">&amp;</span>
          <span className="name">Volker</span>
        </div>

     <a
  href={googleCalUrl}
  target="_blank"
  rel="noreferrer"
  className="date-pill"
  style={{ textDecoration: "none", color: "inherit" }}
>
  <CalendarHeart size={18} />
  <span>{DATUM.textI18N?.[lang] || DATUM.textI18N.de}</span>
</a>

        {/* ---------- COUNTDOWN unter dem Datum ---------- */}
        <div className="countdown-wrap">
          {timeLeft.isPast ? (
            <div className="countdown-finished pill-dark">
              {tt("countdownFinished", "Heute ist es so weit! 🎉")}
            </div>
          ) : (
            <>
              <div className="countdown-label">
                {tt("countdownLabel", "Noch")}
              </div>
              <div className="countdown-boxes">
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.days}</div>
                  <div className="countdown-unit">
                    {tt("countdownDays", "Tage")}
                  </div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.hours}</div>
                  <div className="countdown-unit">
                    {tt("countdownHours", "Stunden")}
                  </div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.minutes}</div>
                  <div className="countdown-unit">
                    {tt("countdownMinutes", "Minuten")}
                  </div>
                </div>
                <div className="countdown-box">
                  <div className="countdown-number">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="countdown-unit">
                    {tt("countdownSeconds", "Sekunden")}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="home-hero-sub pill-dark">
          {tt(
            "heroSub",
            "Willkommen – hier findet ihr alles zu Anreise, Location, Ablauf und am wichtigsten - Die Anmeldung.\nWir freuen uns riesig, wenn möglichst viele von euch mit uns feiern!"
          )}
        </p>

        {/* ✅ 3-Schritte-Buttons – gleicher Stil wie alte CTAs */}
        <div className="home-hero-cta">
          <a href="/rsvp" className="cta-primary">
            <span>{tt("cta1", "1.\u00A0 RSVP ausfüllen")}</span>
          </a>
          <a href="/fluege" className="cta-ghost">
            <span>{tt("cta2", "2.\u00A0 Flug buchen")}</span>
          </a>
          <a href="/location" className="cta-ghost">
            <span>{tt("cta3", "3.\u00A0 Ort merken")}</span>
          </a>
        </div>

        {/* Quick facts */}
        <div className="home-quick">
          <a
            className="quick"
            href={ALPINA_MAP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={14} />
            <span>
              {tt("quickRegion", "Gudauri · Alpina Hotel Gudauri")}
            </span>
          </a>
          <div className="quick">
            <GlassWater size={14} />
            <span>{tt("quickFood", "Georgische Küche & Wein")}</span>
          </div>
          <div className="quick">
            <Clock size={14} />
            <span>{tt("quickCeremony", "Freie Trauung")}</span>
          </div>
        </div>
      </section>

      {/* ---------- DIE FEIER (ohne doppelte CTAs) ---------- */}
      <section className="section-card">
        <div className="feier-head">
          <h2 className="feier-title">
            <Sparkles size={18} /> {tt("sectionCelebration", "Die Feier")}
          </h2>
          <p className="feier-sub">
            {tt(
              "sectionCelebrationSub",
              "Alles Wichtige auf einen Blick – Ort, Zeitplan, Kontakt & Highlights."
            )}
          </p>
        </div>

        <div className="feier-grid">
          {/* Ort & Ablauf */}
          <Card
            title={tt("cardVenueTitle", "Ort & Ablauf")}
            className="hover-react feier-card"
          >
            <p className="feier-text">
              {tt("venueLead", "Trauung im")}{" "}
              <strong>
                {tt("venueName", "Alpina Hotel Gudauri")}
              </strong>
              .
              <br />
              {tt(
                "venueTail",
                "Dresscode: elegant, winterfest. Musik & Tanz bis in die Nacht."
              )}
            </p>

            {/* Maps-Link → direkt Alpina Hotel Gudauri */}
            <p style={{ marginTop: ".35rem" }}>
              <a
                className="underline"
                href={ALPINA_MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={14} style={{ verticalAlign: "-2px" }} />{" "}
                {tt("mapsOpen", "Adresse in Google Maps öffnen")}
              </a>
            </p>

            <div className="feier-highlights">
              <div className="highlight">
                <Wine size={16} /> {tt("hlWine", "Qvevri-Weinverkostung")}
              </div>
              <div className="highlight">
                <Music4 size={16} /> {tt("hlMusic", "Musik & Tanz")}
              </div>
              <div className="highlight">
                <Sparkles size={16} /> {tt("hlWinter", "Winterliche Stimmung")}
              </div>
            </div>
          </Card>

          {/* Zeitplan */}
          <Card
            title={tt("cardTimelineTitle", "Zeitplan")}
            className="hover-react feier-card"
          >
            <ul className="mini-timeline">
              {timeline.map((item, idx) => (
                <li key={idx}>
                  <span>{item.time}</span> {item.title}
                </li>
              ))}
            </ul>
          </Card>

          {/* Kontakt */}
          <Card
            title={tt("cardContactTitle", "Kontakt")}
            className="hover-react feier-card"
          >
            <p className="feier-text">
              {tt(
                "contactLead",
                "Fragen zu Anreise, Unterkunft oder sonstige Fragen. Gerne persönlich oder einfach hier per Email."
              )}
              <br />
              <Mail size={16} style={{ verticalAlign: "-2px" }} />{" "}
              <a className="underline" href="mailto:hochvolol@gmail.com">
                {tt("contactEmailLabel", "hochvolol@gmail.com")}
              </a>
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
