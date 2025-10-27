// src/pages/FlightsPage.jsx
import React, { useState } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";

import {
  TEXTS,
  LINKS,
  ANREISE,
  PACKLISTE_I18N,
} from "../data/constants.js";

import {
  Plane,
  Clock,
  Bus,
  PlaneTakeoff,
} from "lucide-react";

export default function FlightsPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [departure, setDeparture] = useState("DUS");

  // ✈️ Dynamische Flugsuch-Links (nur Skyscanner)
  const flightUrls = (code) => ({
    skyscanner: `https://www.skyscanner.de/transport/flights/${code}/tbs/`,
  });

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={t.flightsTitle}
        subtitle={t.flightsSub}
        icon={<Plane className="w-5 h-5" />}
      >
        {/* Haupt-Grid: linke & rechte Spalte */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {/* --- LINKE SEITE --- */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* ✈️ Flugplanung */}
            <Card title={t.flightPlanning} className="hover-react">
              
              <ul
                style={{
                  marginLeft: "1rem",
                  listStyle: "disc",
                  display: "grid",
                  gap: ".5rem",
                }}
              >
                <li>
                  <strong>{t.placeTitle}:</strong> Tbilisi International Airport (TBS) (
                  <a
                    className="underline"
                    href={LINKS.maps.tbilisiAirport}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.mapLabel}
                  </a>
                  )
                </li>
                <li>
                  <strong>{t.altLabel}:</strong> Kutaisi (KUT), Batumi (BUS)
                </li>
                <li>
                  <strong>{t.trainLabel}:</strong> Tbilisi Central / Didube Bus Station
                </li>
                <li className="transfer-hint" style={{ listStyle: "none", marginTop: "0.75rem" }}>
                  <Plane className="w-4 h-4 text-accent" />
               <span>{ANREISE.transferHinweisI18N?.[lang] || ANREISE.transferHinweis}</span>

                </li>
              </ul>

              <div className="badges">
                <div className="badge">
                  <Plane className="icon" />
                  <span>Tbilisi (TBS)</span>
                </div>
                <div className="badge">
                  <Plane className="icon" />
                  <span>Kutaisi (KUT)</span>
                </div>
                <div className="badge">
                  <Bus className="icon" />
                  <span>Didube Bus Station</span>
                </div>
                <div className="badge">
                  <Clock className="icon" />
                  <span>~2.5–3&nbsp;Std. nach Gudauri</span>
                </div>
              </div>

              {/* Abflughafen */}
              <div style={{ marginTop: "1rem" }}>
                <label
                  style={{ fontSize: ".9rem", color: "#475569", display: "block" }}
                >
                  {lang === "de"
                    ? "Abflughafen wählen:"
                    : "Select departure airport:"}
                </label>
                <select
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="input"
                  style={{
                    marginTop: ".25rem",
                    width: "100%",
                    maxWidth: "260px",
                  }}
                >
                  <option value="DUS">Düsseldorf (DUS)</option>
                  <option value="CGN">Köln/Bonn (CGN)</option>
                  <option value="BER">Berlin (BER)</option>
                  <option value="FRA">Frankfurt (FRA)</option>
                  <option value="MUC">München (MUC)</option>
                  <option value="SVO">Moskau (SVO)</option>
                </select>

                {/* Nur Skyscanner-Link */}
                <div
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    flexWrap: "wrap",
                    marginTop: ".5rem",
                  }}
                >
                  <a
                    href={flightUrls(departure).skyscanner}
                    target="_blank"
                    rel="noreferrer"
                    className="link-special"
                  >
                    <PlaneTakeoff size={16} /> Skyscanner
                  </a>
                </div>
              </div>
            </Card>

            {/* 🧭 Anreise- & Winter-Tipps (TBS → Gudauri / Hotel Monta) */}
            <Card
              title={t.travelTipsTitle || "🧭 Anreise- & Winter-Tipps (TBS → Gudauri / Hotel Monta)"}
              className="hover-react"
            >
              <ul style={{ marginLeft: "1rem", listStyle: "disc", display: "grid", gap: ".5rem" }}>
                <li>
                  <strong>Einreise:</strong> Deutsche Staatsbürger:innen visumsfrei (bis zu 1 Jahr). 
                  Reisepass erforderlich (Personalausweis reicht nicht).
                </li>
                <li>
                  <strong>Beste Route:</strong> Tbilisi (TBS) → Gudauri via Georgian Military Highway 
                  über den <em>Jvari-Pass</em>. Fahrzeit <strong>~2.5–3 Std.</strong> (im Winter Puffer einplanen).
                </li>
                <li>
                  <strong>Straßenlage:</strong> Im Winter kann der Pass kurzzeitig schließen / Kettenpflicht. 
                  Prüft am Reisetag Straßenmeldungen & Wetter und plant früh loszufahren.
                </li>
                <li>
                  <strong>Transfers:</strong> Privatfahrer/Taxi (komfortabel), 
                  Minibus ab <em>Didube Bus Station</em> (günstig), 
                  oder vorab Transfer buchen (lokale Fahrerplattformen).
                </li>
                <li>
                  <strong>Ski-Gepäck:</strong> Viele Airlines verlangen Anmeldung/Extra-Tarif für Ski & Stöcke. 
                  Vorab bei eurer Airline checken.
                </li>
                <li>
                  <strong>Höhe & Klima:</strong> Gudauri ~2.200 m; trockene Luft, 
                  im Feb. winterlich. Warme Layer, Mütze/Handschuhe, Sonnenschutz (starke UV) einpacken.
                </li>
                <li>
                  <strong>Bezahlung:</strong> Währung <em>GEL</em>. Kartenzahlung oft möglich; 
                  für Bergorte etwas Bargeld mitnehmen. ATM am Flughafen TBS.
                </li>
                <li>
                  <strong>Mobilfunk/Internet:</strong> Lokale SIM (z.B. Magti/Geocell) am Flughafen; 
                  eSIM-Optionen verfügbar. Unterkunft/Resort haben i.d.R. WLAN.
                </li>
                <li>
                  <strong>Apps vorab:</strong> Maps offline speichern, Übersetzer, 
                  ggf. Ride-Hailing in Tbilisi (für Stadtfahrten).
                </li>
                <li>
                  <strong>Versicherung:</strong> Reise-/Ski-Versicherung inkl. Pistendienst/Heli-Bergung sinnvoll.
                </li>
              </ul>
            </Card>
          </div>

          {/* --- RECHTE SEITE: TRANSFERS + PACKLISTE --- */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Card
              title={t.transfersTitle || "Transfers & Wege"}
              className="hover-react"
            >
              <p style={{ marginBottom: "1rem", color: "#374151" }}>
                {t.transfersIntro || (
                  <>
                    Der Weg vom <strong>Tbilisi International Airport (TBS)</strong> zum{" "}
                    <strong>Hotel Monta (Gudauri)</strong> dauert je nach Wetter{" "}
                    <strong>ca. 2.5–3 Stunden</strong> über die Georgian Military Highway (Jvari-Pass).
                    Hier sind die besten Optionen:
                  </>
                )}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  gap: "1.25rem",
                }}
              >
                {/* 🚕 Taxi / Fahrer */}
                <TransferCard
                  title={t.transferOptions?.taxiTitle || "🚕 Taxi / Fahrer"}
                  text={t.transferOptions?.taxiText || "Komfortable Privattransfers oder lokale Taxis direkt am Flughafen / vorab buchbar."}
                  note={t.transferOptions?.taxiPrice || "Preis je Strecke meist ~200–350 GEL (≈ 70–120 €), abhängig von Saison, Uhrzeit und Wetter."}
                />

                {/* 🚗 Mietwagen */}
                <TransferCard
                  title={t.transferOptions?.rentTitle || "🚗 Mietwagen"}
                  text={t.transferOptions?.rentText || "Ideal für flexible Erkundungen – direkt am Flughafen verfügbar:"}
                  links={[
                    ["Europcar Georgia", "https://www.europcar.ge/"],
                    ["CityRent", "https://www.cityrent.ge/"],
                    ["AutoEurope", "https://www.autoeurope.eu/"],
                  ]}
                  note={t.transferOptions?.rentNote || "Empfohlen: Winterreifen/4×4; Fahrzeit ca. 2.5–3 h via E117/Georgian Military Highway (Jvari-Pass)."}
                />

                {/* 🚌 Öffentliche Busse (Marshrutka) */}
                <TransferCard
                  title={t.transferOptions?.busTitle || "🚌 Öffentliche Busse (Marshrutka)"}
                  text={t.transferOptions?.busText || "Abfahrt von der Didube Bus Station (Tbilisi) Richtung Gudauri/Stepantsminda."}
                  mapUrl="https://maps.app.goo.gl/qbW8j9o1h2eDJyEw7"
                  note={t.transferOptions?.busMap || "Didube Bus Station auf Google Maps öffnen"}
                />
              </div>
            </Card>

            {/* 🎒 Packliste (rechts platziert) */}
            <Card
              title={t.packlistTitle || "🎒 Packliste (Februar in Georgien)"}
              className="hover-react"
            >
              <p style={{ color: "#64748b", marginBottom: ".5rem" }}>
                {t.packlistIntro ||
                  "Im Februar ist es winterlich (Tbilisi ~5 °C; Gudauri deutlich kälter, oft unter 0 °C)."}
              </p>
              <ul
                style={{
                  columns: 2,
                  columnGap: "1.5rem",
                  paddingLeft: "1rem",
                  listStyle: '"🍇 "',
                }}
              >
                {(PACKLISTE_I18N[lang] || PACKLISTE_I18N.de).map((item, i) => (
                  <li key={i} style={{ breakInside: "avoid", marginBottom: ".35rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

/* --- Hilfskomponenten --- */
function TransferCard({ title, text, contact, note, items, links, mapUrl }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.65)",
        borderRadius: "1rem",
        padding: "1rem",
        border: "1px solid rgba(255,255,255,0.3)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ color: "var(--accent)", marginBottom: ".5rem" }}>{title}</h4>
      {text && <p style={{ fontSize: ".9rem", marginBottom: ".5rem" }}>{text}</p>}

      {contact && (
        <p style={{ fontSize: ".9rem" }}>
          📞 <a href={`tel:${contact}`} className="underline">{contact}</a><br />
          {note}
        </p>
      )}

      {items && (
        <ul style={{ fontSize: ".9rem", listStyle: "none", paddingLeft: 0 }}>
          {items.map((x) => (
            <li key={x.name} style={{ marginBottom: ".35rem" }}>
              <strong>{x.name}</strong><br />
              📞 <a href={`tel:${x.phone}`} className="underline">{x.phone}</a>
            </li>
          ))}
        </ul>
      )}

      {links && (
        <ul style={{ fontSize: ".9rem", paddingLeft: "1rem" }}>
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      )}

      {mapUrl && (
        <p style={{ marginTop: ".5rem", fontSize: ".85rem" }}>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="underline">
            Auf Karte öffnen
          </a>
        </p>
      )}

      {note && !contact && (
        <p style={{ fontSize: ".85rem", marginTop: ".5rem" }}>{note}</p>
      )}
    </div>
  );
}
