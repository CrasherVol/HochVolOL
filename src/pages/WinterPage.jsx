// src/pages/WinterPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";
import WeatherWidget from "../components/WeatherWidget.jsx";
import { TEXTS } from "../data/constants.js";
import ExternalLink from "../components/ExternalLink.jsx"; //damit externe Links geladen werden können ohne abgefangen zu werden von REACT

import {
  Snowflake,
  Mountain,
  MapPin,
  Info,
  Clock,
  Ticket,
  Camera,
  CloudSun,
  Wind,
  Users,
  Heart,
  ExternalLink as ExternalLinkIcon, // <— Icon bewusst umbenennen!
} from "lucide-react";

/* ==== Animierte Icons ==== */
const AnimatedSnowflake = () => (
  <Snowflake size={20} style={{ color: "#3b82f6", animation: "spin 12s linear infinite" }} />
);
const AnimatedSun = () => (
  <CloudSun size={22} style={{ color: "#f59e0b", animation: "floatY 5s ease-in-out infinite" }} />
);

export default function WinterPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={
          <>
            <AnimatedSnowflake /> Winter in Georgien
          </>
        }
        subtitle="Pulverschnee, Sonne & Gastfreundschaft im Kaukasus"
      >
        {/* === HERO-BEREICH === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr .8fr",
            gap: "1rem",
            alignItems: "stretch",
            marginBottom: "1.5rem",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid #eef2f6",
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <div>
            <h3 style={{ marginTop: 0 }}>Winterzauber im Kaukasus</h3>
            <p style={{ color: "#334155" }}>
              Georgien ist der Geheimtipp für Winterfans: spektakuläre Berge, günstige Preise,
              viel Sonne und ehrliche Gastfreundschaft. Besonders <strong>Gudauri</strong> ist
              ein Paradies für Skifahrer, Snowboarder und Abenteurer.
            </p>
            <div style={{ marginTop: ".8rem", display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              <span className="badge"><Mountain size={14} /> Höhe: 2.200–3.279 m</span>
              <span className="badge"><Snowflake size={14} /> Saison: Dez–Apr</span>
              <span className="badge"><Ticket size={14} /> 70 km Pisten</span>
              <span className="badge"><Clock size={14} /> 2 h ab Tiflis</span>
            </div>
          </div>

          {/* Wetter */}
          <div
            className="hover-react"
            style={{
              alignSelf: "stretch",
              background: "rgba(255,255,255,0.8)",
              border: "1px solid #eef2f6",
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".5rem" }}>
              <AnimatedSun />
              <strong>Aktuelles Wetter · Gudauri</strong>
            </div>
            <WeatherWidget lat={42.4791} lon={44.4778} place="Gudauri" lang={lang} />
          </div>
        </div>

        {/* === GEORGIEN IM WINTER === */}
        <Card title="Warum Georgien im Winter erleben?" className="hover-react">
          <p style={{ color: "#334155" }}>
            Georgien verbindet alpine Schneelandschaften mit orientalischer Wärme. 
            Hier triffst du auf Berge voller Abenteuer – und Menschen voller Herz.
          </p>
          <ul style={{ marginLeft: "1rem", color: "#334155", lineHeight: 1.6 }}>
            <li>🏔️ Unberührte Natur – ohne Massentourismus</li>
            <li>🍷 Gemütliche Supra-Abende mit Wein und Musik</li>
            <li>🌤️ Über 250 Sonnentage auch im Winter</li>
            <li>💰 Preisniveau deutlich unter Alpenregionen</li>
            <li>♨️ Heiße Quellen und Thermalbäder in den Bergen</li>
          </ul>
        </Card>

        {/* === ABSTAND === */}
        <div style={{ height: "1rem" }} />

        {/* === SKIGEBIET GUDAURI === */}
        <Card title="Gudauri – das Herz des georgischen Winters" className="hover-react">
          <p style={{ color: "#334155" }}>
            Gudauri ist Georgiens größtes und modernstes Skigebiet – rund 120 km nördlich von Tiflis
            an der georgischen Heerstraße. Die Pisten liegen auf 2.000–3.200 m Höhe und bieten Sonne,
            Powder und fantastische Aussicht auf den Kaukasus.
          </p>
          <ul style={{ marginLeft: "1rem", color: "#334155", lineHeight: 1.6 }}>
            <li>🎿 <strong>70 km Pisten</strong> – davon 55 % rot, 30 % blau, 15 % schwarz</li>
            <li>🚠 <strong>15 Lifte</strong> (darunter Gondeln & 6er-Sessellifte)</li>
            <li>🏂 Snowpark, Freeride-Zonen & Heli-Ski</li>
            <li>🧑‍🏫 Skischulen & Guides für Anfänger bis Experten</li>
            <li>☀️ Südhanglage mit viel Sonne und wenig Wind</li>
            <li>💸 Skipässe ab ca. 20–25 € / Tag</li>
          </ul>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <a
              href="https://piste-maps.co.uk/Piste-Maps/Georgia/Gudauri-Piste-Ski-Map-2023-24.jpg"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://piste-maps.co.uk/Piste-Maps/Georgia/Gudauri-Piste-Ski-Map-2023-24.jpg"
                alt="Pistenplan Gudauri"
                style={{
                  width: "90%",
                  maxHeight: "320px",
                  borderRadius: "0.75rem",
                  objectFit: "cover",
                }}
              />
            </a>
            <a
              className="btn-chip"
              href="https://piste-maps.co.uk/Piste-Maps/Georgia/Gudauri-Piste-Ski-Map-2023-24.pdf"
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: ".6rem", display: "inline-block" }}
            >
              Pistenplan als PDF ansehen
            </a>
          </div>
        </Card>

        <div style={{ height: "1rem" }} />

        {/* === AKTIVITÄTEN === */}
        <Card title="Winteraktivitäten & Erlebnisse" className="hover-react">
          <p style={{ color: "#334155" }}>
            In Gudauri und Umgebung erwarten dich viele Möglichkeiten – von entspannt bis abenteuerlich:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {activities.map((a) => (
              <Activity key={a.title} {...a} />
            ))}
          </div>
        </Card>

        <div style={{ height: "1rem" }} />

        {/* === WEITERE SKIGEBIETE === */}
        <Card title="Weitere Skigebiete in Georgien" className="hover-react">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: ".75rem",
            }}
          >
            <MiniArea
  title="Bakuriani"
  text="Familienfreundlich, neue Lifte (Kinderbereiche)."
  href="https://www.georgia.travel/bakuriani"
/>
<MiniArea
  title="Mestia – Hatsvali"
  text="Klein & aussichtsreich in Swanetien."
  href="https://www.georgia.travel/ski"
/>
<MiniArea
  title="Tetnuldi"
  text="Hochalpin mit langen Abfahrten."
  href="https://www.georgia.travel/ski"
/>

          </div>
        </Card>

        {/* === GALERIE === */}
        <Card title="Winter-Impressionen" className="hover-react">
          <Gallery
            images={[
              "https://images.unsplash.com/photo-1610212152844-5cbbbd50456c?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1578301978693-85fa9c032c2f?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0083?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516012376757-2e5b9a8d4d50?q=80&w=1000&auto=format&fit=crop",
            ]}
          />
        </Card>

        {/* === CSS === */}
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        `}</style>
      </Section>
    </Layout>
  );
}

/* === Aktivitätsdaten (stabile Links) === */
const activities = [
  {
    title: "Ski- & Snowboardunterricht",
    img: "/winter/ski_school.jpg", // <— lokal aus /public/winter/
    text: "Private oder Gruppenkurse mit erfahrenen Lehrern. Für Kinder & Erwachsene. Ab 25 €/h.",
    type: "Lernen & Spaß",
    link: "https://www.gudauri.school/en",
  },
  {
    title: "Paragliding",
    img: "/winter/paragliding.jpg",
    text: "Tandemflüge über Gudauri – atemberaubender Blick über die Kaukasusgipfel.",
    type: "Abenteuer",
    link: "https://www.flygudauri.com/",
  },
  {
    title: "Schneemobil-Touren",
    img: "/winter/snowmobile.jpg",
    text: "Geführte Touren über verschneite Hochebenen. Dauer 30–120 min, ab 60 € p. P.",
    type: "Action & Natur",
    link: "https://www.gudaurisnowmobile.com/",
  },
  {
    title: "Freeride & Heli-Ski",
    img: "/winter/heli_ski.jpg",
    text: "Mit dem Helikopter zu unberührten Hängen – erfahrene Guides inklusive.",
    type: "Adrenalin",
    link: "https://heliski.travel/heli-skiing-in-gudauri",
  },
  {
    title: "Spa & Thermalquellen",
    img: "/winter/spa.jpg",
    text: "Wellness & Entspannung nach dem Skitag – Spas & heiße Quellen.",
    type: "Entspannung",
    link: "https://www.georgianholidays.com/en/blog/tbilisi-sulfur-baths",
  },
  {
    title: "Schneeschuhwandern",
    img: "/winter/snowshoe.jpg",
    text: "Geführte Wanderungen durch verschneite Landschaften – perfekt für Genießer.",
    type: "Natur & Ruhe",
    link: "https://www.getyourguide.com/gudauri-l164168/winter-snowshoeing-tc327/",
  },
];





/* === Komponenten === */
function Activity({ img, title, text, type, link }) {
  return (
    <ExternalLink
      href={link}
      className="hover-react"
      style={{
        background: "rgba(255,255,255,0.75)",
        border: "1px solid #eef2f6",
        borderRadius: ".9rem",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: ".6rem .75rem", flex: 1 }}>
        <div style={{ fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
          <span>{title}</span>
        <ExternalLinkIcon size={14} /> {/* Icon, nicht die Link-Komponente */}
        </div>
        <p style={{ color: "#475569", fontSize: ".9rem", marginTop: ".35rem" }}>{text}</p>
        <span
          style={{
            display: "inline-block",
            marginTop: ".4rem",
            padding: ".25rem .5rem",
            borderRadius: "6px",
            background: "rgba(59,130,246,0.1)",
            fontSize: ".8rem",
            color: "#1e3a8a",
          }}
        >
          {type}
        </span>
      </div>
   </ExternalLink>
  );
}

function MiniArea({ title, text, href }) {
  return (
    <ExternalLink
      href={href}
      className="hover-react"
      style={{
        display: "grid",
        gap: ".35rem",
        background: "rgba(255,255,255,0.75)",
        border: "1px solid #eef2f6",
        borderRadius: ".8rem",
        padding: ".65rem .75rem",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: ".45rem" }}>
        <Mountain size={16} />
        <strong>{title}</strong>
        <ExternalLinkIcon size={14} style={{ marginLeft: "auto", opacity: 0.7 }} />
      </div>
      <div style={{ color: "#64748b", fontSize: ".95rem" }}>{text}</div>
    </ExternalLink>
  );
}

