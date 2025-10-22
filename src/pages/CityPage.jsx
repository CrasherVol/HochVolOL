// src/pages/CityPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Stat from "../components/Stat.jsx";
import Gallery from "../components/Gallery.jsx";

import { TEXTS, FACTS, ORT, IMAGES, LINKS } from "../data/constants.js";

import {
  Globe2, Users, MapPin, Clock, Wallet, Plug,
  Mountain, ShieldCheck, Phone, CalendarDays,
  CreditCard, Plane
} from "lucide-react";

const iconFor = (key) => {
  const size = 18;
  const map = {
    population: <Users size={size} />,
    area: <MapPin size={size} />,
    capital: <MapPin size={size} />,
    timezone: <Clock size={size} />,
    currency: <Wallet size={size} />,
    language: <Globe2 size={size} />,
    dial: <Phone size={size} />,
    power: <Plug size={size} />,
    peak: <Mountain size={size} />,
    unesco: <ShieldCheck size={size} />,
    weatherFeb: <CalendarDays size={size} />,
    visa: <ShieldCheck size={size} />,
    drive: <Globe2 size={size} />,
    emergency: <Phone size={size} />,
    tips: <CreditCard size={size} />,
    sim: <Phone size={size} />,
    best: <CalendarDays size={size} />,
    flight: <Plane size={size} />,
    pay: <Wallet size={size} />,
  };
  return map[key] || <Globe2 size={size} />;
};

export default function CityPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={t.regionTitle}
        subtitle={ORT.stadtKurzinfo}
        icon={<Globe2 className="w-5 h-5" />}
      >
        {/* Sehenswürdigkeiten */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "1.25rem",
            marginBottom: "1.25rem", // Abstand nach dem Grid
          }}
        >
          {ORT.mustSees.map((m, i) => {
            const desc =
              typeof m.desc === "string"
                ? m.desc
                : m.desc?.[lang] || m.desc?.de || "Kurzbeschreibung folgt.";

            return (
              <Card key={i} title={m.title} className="hover-react">
                <p
                  style={{
                    marginBottom: ".5rem",
                    color: "#1f2937",
                    whiteSpace: "pre-line",
                  }}
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
                <p>
                  <a
                    className="underline"
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.mapOpen}
                  </a>
                </p>
              </Card>
            );
          })}
        </div>

        {/* Zahlen & Fakten */}
        <Card
          title={t.factsTitle || "Georgien in Zahlen & Fakten"}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }} // Abstand unter der Card
        >
          <div className="stats-compact-grid">
            {FACTS.map((f, i) => (
              <div
                key={f.key}
                className="stat-mini"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="icon">{iconFor(f.key)}</div>
                <div className="info">
                  <div className="value">{f.value}</div>
                  <div className="label">{f.label?.[lang] || f.label?.de}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ✨ Weitere Ausflugsziele */}
        <Card
          title={lang === "de" ? "Weitere Ausflugsziele" : "More destinations"}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }} // Abstand unter der Card
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "1.25rem", // Abstand zwischen Kacheln
            }}
          >
            {[
              {
                name: "Akhalkalaki & Vardzia",
                desc:
                  "Eindrucksvolle Felsenstadt im Süden Georgiens – spektakuläre Höhlenklöster, ca. 2,5 Std. Fahrt von Telavi.",
                link: "https://goo.gl/maps/h98t4vG2ZwzAXQFK9",
              },
              {
                name: "David Gareja Kloster",
                desc:
                  "Mystisches Wüstenkloster an der Aserbaidschan-Grenze – beeindruckende Felsmalereien.",
                link: "https://goo.gl/maps/kcG2gY4tKGMY1R1x7",
              },
              {
                name: "Kazbegi (Stepantsminda)",
                desc:
                  "Beliebtes Ziel im Großen Kaukasus mit Blick auf den Berg Kasbek.",
                link: "https://goo.gl/maps/ZKQXKzqkB8iYpYF87",
              },
              {
                name: "Kvareli & Ilia-See",
                desc:
                  "Romantischer See mit Weinmuseum und Spa-Hotels – ideal für einen Tagesausflug aus Telavi.",
                link: "https://goo.gl/maps/pczH3BtN6DJL24W47",
              },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "1rem",
                  padding: "1rem",
                  border: "1px solid rgba(255,255,255,0.4)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                  transition: "all .3s ease",
                }}
                className="hover-react"
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--accent)",
                    marginBottom: ".35rem",
                  }}
                >
                  {x.name}
                </div>
                <p style={{ color: "#374151", fontSize: ".9rem", marginBottom: ".35rem" }}>
                  {x.desc}
                </p>
                <a
                  href={x.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-chip"
                >
                  Auf Karte öffnen
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* Galerie */}
        <Card title={t.impressions || "Impressionen"} className="hover-react">
          <Gallery
            images={[
              IMAGES.sighnaghi,
              IMAGES.tbilisiAerial,
              IMAGES.vineyard,
              IMAGES.alaverdi,
              IMAGES.telavi,
            ]}
            captions={[
              t.place?.sighnaghi || "Sighnaghi",
              t.place?.tbilisi || "Tiflis",
              t.place?.kakhetiVineyards || "Weinberge",
              t.place?.alaverdi || "Alaverdi",
              t.place?.telavi || "Telavi",
            ]}
            links={[
              LINKS.maps.sighnaghi,
              LINKS.maps.tbilisiOldTown,
              LINKS.maps.kakhetiVines || LINKS.maps.telavi,
              LINKS.maps.alaverdi,
              LINKS.maps.telavi,
            ]}
          />
        </Card>
      </Section>
    </Layout>
  );
}
