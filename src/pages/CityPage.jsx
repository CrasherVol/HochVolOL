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
  Mountain, ShieldCheck, Phone, CalendarDays, CreditCard, Camera
} from "lucide-react";

// Icon-Auswahl je FACTS.key
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

    // Zusatzinfos
    visa: <ShieldCheck size={size} />,
    drive: <Globe2 size={size} />,
    emergency: <Phone size={size} />,
    tips: <CreditCard size={size} />,
    sim: <Phone size={size} />,
    best: <CalendarDays size={size} />,
    flight: <Clock size={size} />,
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
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
          }}
        >
          {ORT.mustSees.map((m, i) => {
            const desc =
              typeof m.desc === "string"
                ? m.desc
                : m.desc?.[lang] || m.desc?.de || "Kurzbeschreibung folgt.";

            return (
              <Card key={i} title={m.title}>
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
                    {TEXTS[lang].mapOpen}
                  </a>
                </p>
              </Card>
            );
          })}
        </div>

        {/* Zahlen & Fakten */}
        <Card title={t.factsTitle || "Zahlen & Fakten"} className="card-facts">
          <div className="stats-grid">
            {FACTS.map((f) => (
              <Stat
                key={f.key}
                value={f.value}
                label={f.label?.[lang] || f.label?.de}
                icon={iconFor(f.key)}   // ← wichtig: Icon hier erzeugen
              />
            ))}
          </div>
        </Card>

        {/* Galerie */}
        <Card title={t.impressions || "Impressionen"}>
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
