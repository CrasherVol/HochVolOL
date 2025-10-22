// src/pages/HomePage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Card from "../components/Card.jsx";
import { TEXTS, DATUM, LINKS } from "../data/constants.js";
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
          {tt("heroEyebrow", "Proße Party in Tachetien in Georgien !!!")}
        </p>

        <h1 className="home-hero-title">
          {tt("heroTitle", "Wir heiraten!")}
        </h1>

<div className="names-line highlight-names">
  <span className="name">Olga</span>
  <span className="and">&amp;</span>
  <span className="name">Volker</span>
</div>



        <div className="date-pill">
          <CalendarHeart size={18} />
          <span>{DATUM.text}</span>
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
            href={LINKS?.maps?.telavi || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={14} />
            <span>{tt("quickRegion", "Kachetien (Telavi/Sighnaghi)")}</span>
          </a>
          <div className="quick">
            <GlassWater size={14} />
            <span>{tt("quickFood", "Georgische Küche & Wein")}</span>
          </div>
          <div className="quick">
            <Clock size={14} />
            <span>{tt("quickCeremony", "Freie Trauung & Dinner")}</span>
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
              {tt("venueLead", "Trauung & Dinner im")}{" "}
              <strong>
                {tt("venueName", "Chateau Methis Kalaki")}
              </strong>
              .<br />
              {tt(
                "venueTail",
                "Dresscode: elegant, winterfest. Musik & Tanz bis in die Nacht."
              )}
            </p>

            {/* nur ein dezenter Maps-Link, keine weiteren Buttons */}
            <p style={{ marginTop: ".35rem" }}>
              <a
                className="underline"
                href={LINKS?.maps?.chateau || LINKS?.maps?.telavi}
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
              <li>
                <span>14:00</span> {tt("tl14", "Freie Trauung")}
              </li>
              <li>
                <span>15:30</span>{" "}
                {tt("tl1530", "Sektempfang & Weinverkostung")}
              </li>
              <li>
                <span>18:00</span> {tt("tl18", "Dinner")}
              </li>
              <li>
                <span>{tt("tlEveningTime", "abends")}</span>{" "}
                {tt("tlEve", "Musik, Tanz & Überraschungen")}
              </li>
            </ul>
          </Card>

          {/* Kontakt (nur Info, keine CTA-Dopplungen) */}
          <Card
            title={tt("cardContactTitle", "Kontakt")}
            className="hover-react feier-card"
          >
            <p className="feier-text">
              {tt(
                "contactLead",
                "Fragen zu Anreise, Unterkunft oder Allergien?"
              )}
              <br />
              <Mail size={16} style={{ verticalAlign: "-2px" }} />{" "}
              <a className="underline" href="mailto:love@example.com">
                {tt("contactEmailLabel", "love@example.com")}
              </a>
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
