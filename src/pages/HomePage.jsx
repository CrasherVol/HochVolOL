// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";

import {
  TEXTS,
  IMAGES,
  LINKS,
  ORT,
  PAAR,
  DATUM,
  googleCalUrl,
  getProgramm, // <- nutzt die sprachspezifischen Zeiten/Titel
} from "../data/constants.js";

import {
  CalendarHeart,
  MapPin,
  Info,
  Camera,
  HeartHandshake,
  Utensils,
} from "lucide-react";

export default function HomePage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      {/* ===== HERO ===== */}
      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <div>
            <p
              className="body"
              style={{
                textTransform: "uppercase",
                letterSpacing: ".1em",
                fontSize: ".75rem",
                color: "#475569",
              }}
            >
              {t.heroIntro}
            </p>

            <h1
              className="headline"
              style={{
                fontSize: "clamp(2rem,4vw,3.5rem)",
                fontWeight: 800,
                marginTop: ".25rem",
                color: "var(--accent)",
              }}
            >
              {PAAR.braeutigam} & {PAAR.braut}
            </h1>

            <div
              style={{
                marginTop: ".75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                padding: ".4rem .8rem",
                border: "1px solid #f1d5d5",
                background:
                  "linear-gradient(90deg, rgba(184,92,92,.12), rgba(255,255,255,.6))",
                borderRadius: "9999px",
                boxShadow: "0 2px 10px rgba(184,92,92,.12)",
              }}
            >
              <CalendarHeart className="w-4 h-4" />
              <span
                className="body"
                style={{ fontWeight: 600, letterSpacing: ".02em" }}
              >
                {t.dateLabel}: {DATUM.text}
              </span>
            </div>

            <p
              className="body"
              style={{ marginTop: ".75rem", fontSize: "1.05rem", color: "#334155" }}
            >
              {t.heroThanks}
            </p>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: ".5rem",
              }}
            >
              <Link to="/rsvp" className="btn-primary">
                {t.rsvpBtn}
              </Link>
              <Link to="/fluege" className="btn-secondary">
                {t.planTrip}
              </Link>
              <a
                href={googleCalUrl}
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                {t.addToCal}
              </a>
            </div>

            <div style={{ marginTop: ".75rem", display: "flex", gap: ".5rem" }}>
              <span className="tag">
                <HeartHandshake className="w-3 h-3" />
                {t.hospitality}
              </span>
              <span className="tag">
                <Utensils className="w-3 h-3" />
                {t.wine}
              </span>
            </div>
          </div>

          {/* Right: pulsierendes Logo */}
          <div className="hero-card">
            <div className="logo-wrap">
              <img
                src="/vo-logo.png"
                alt="Volker & Olga – Hochzeitslogo"
                className="logo-img"
              />
              <div className="shine" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIE FEIER ===== */}
      <Section
        title={t.sectionFeier}
        subtitle={t.feierSub}
        icon={<Info className="w-5 h-5" />}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1rem",
          }}
        >
          {/* Ort */}
          <Card title={t.placeTitle}>
            <p style={{ display: "flex", gap: ".5rem", alignItems: "flex-start" }}>
              <MapPin className="w-4 h-4" /> {ORT.name}
              <br />
              {ORT.adresse}
            </p>
            <a
              className="underline"
              style={{ display: "inline-block", marginTop: ".5rem" }}
              href={ORT.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t.mapOpen}
            </a>
          </Card>

          {/* Zeitplan (schickes Layout) */}
          <Card title={t.scheduleShort}>
            <div
              style={{
                display: "grid",
                gap: ".75rem",
                padding: ".25rem 0",
              }}
            >
              {getProgramm(lang)
                .slice(0, 3)
                .map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "4.5rem 1fr",
                      alignItems: "center",
                      background: "linear-gradient(90deg, #fff, #f9fafb)",
                      border: "1px solid #f1f5f9",
                      borderRadius: "10px",
                      padding: ".6rem .9rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      transition: "transform .25s ease, box-shadow .25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.03)";
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "var(--accent)",
                        textAlign: "center",
                      }}
                    >
                      {p.time}
                    </div>
                    <div style={{ fontWeight: 500, color: "#334155" }}>{p.title}</div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Kontakt */}
          <Card title={t.contact}>
            <p style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
              <a className="underline" href="mailto:love@example.com">
                love@example.com
              </a>
            </p>
          </Card>
        </div>
      </Section>

      {/* ===== STIMMUNG (Galerie) ===== */}
      <Section
        title={t.stimmung}
        subtitle={t.stimmungSub}
        icon={<Camera className="w-5 h-5" />}
      >
        <Gallery
          images={[
            IMAGES.vineyard,
            IMAGES.tbilisiAerial,
            IMAGES.sulfurBaths,
            IMAGES.narikala,
            IMAGES.bridgeOfPeace,
            IMAGES.sighnaghi,
          ]}
          captions={[
            t.place.kakhetiVineyards,
            t.place.tbilisi,
            t.place.sulfurBaths,
            t.place.narikala,
            t.place.bridgeOfPeace,
            t.place.sighnaghi,
          ]}
          links={[
            LINKS.maps.telavi,
            LINKS.maps.tbilisiOldTown,
            LINKS.maps.sulfurBaths,
            LINKS.maps.narikala,
            LINKS.maps.bridgeOfPeace,
            LINKS.maps.sighnaghi,
          ]}
        />
      </Section>
    </Layout>
  );
}
