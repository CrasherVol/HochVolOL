// src/pages/FlightsPage.jsx
import React, { useState } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";

import {
  TEXTS,
  LINKS,
  ANREISE,
  IMAGES,
  PACKLISTE_I18N, // ⬅️ neu
} from "../data/constants.js";


import {
  Plane,
  Clock,
  Bus,
  Search,
  PlaneTakeoff,
  Wifi,
  Coffee,
  Wine,
  Utensils,
  Sun,
  BedDouble,
  CarFront,
  Waves,
} from "lucide-react";

export default function FlightsPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [departure, setDeparture] = useState("DUS");

  // ✈️ Dynamische Flugsuch-Links
  const flightUrls = (code) => ({
    skyscanner: `https://www.skyscanner.de/transport/flights/${code}/tbs/`,
    google: `https://www.google.com/flights?hl=de#flt=${code}.TBS.2025-02-27*return.TBS.${code}.2025-03-02`,
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
                  <strong>{t.placeTitle}:</strong> {ANREISE.naechsterFlughafen} (
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
                  <strong>{t.altLabel}:</strong> {ANREISE.alternative.join(", ")}
                </li>
                <li>
                  <strong>{t.trainLabel}:</strong> {ANREISE.bahnhof}
                </li>
             <li className="transfer-hint" style={{ listStyle: "none", marginTop: "0.75rem" }}>
  <Plane className="w-4 h-4 text-accent" />
  <span>{ANREISE.transferHinweis?.[lang] || ANREISE.transferHinweis.de}</span>
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
                  <span>Bahn: Tbilisi Central</span>
                </div>
                <div className="badge">
                  <Clock className="icon" />
                  <span>~90&nbsp;Min. Transfer</span>
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
                </select>

                {/* Links */}
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
                  <a
                    href={flightUrls(departure).google}
                    target="_blank"
                    rel="noreferrer"
                    className="link-special"
                  >
                    <Search size={16} /> Google Flights
                  </a>
                </div>
              </div>
            </Card>

            {/* 🏨 Unterkunft */}
            <Card title={t.accommodationTitle} className="hover-react">
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  marginBottom: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <img
                  src={
                    IMAGES?.hotelHeroLocal ||
                    IMAGES?.hotelOfficial1 ||
                    "/vo-logo.png"
                  }
                  alt="Chateau Mephis Kalaki – Hotel, Terrasse & Weinberge"
                  style={{ width: "100%", height: "auto", display: "block" }}
                  loading="lazy"
                />
              </div>

              <p style={{ color: "#374151", marginBottom: ".75rem" }}>
                {t.accommodationIntro ||
                  "Boutique-Weingut mit eleganten Zimmern, Restaurant, Terrasse und Blick auf die Weinberge."}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                  gap: ".75rem",
                  marginBottom: "1rem",
                }}
              >
                <Feature icon={<BedDouble size={18} />} label={t.hotelFeatures?.rooms || "Komfortable Zimmer"} />
                <Feature icon={<Wine size={18} />} label={t.hotelFeatures?.winery || "Weingut & Verkostung"} />
                <Feature icon={<Utensils size={18} />} label={t.hotelFeatures?.restaurant || "Restaurant & Terrasse"} />
                <Feature icon={<Waves size={18} />} label={t.hotelFeatures?.pool || "Außenpool (Sommer)"} />
                <Feature icon={<Wifi size={18} />} label={t.hotelFeatures?.wifi || "WLAN inklusive"} />
                <Feature icon={<CarFront size={18} />} label={t.hotelFeatures?.parking || "Parkplätze am Haus"} />
                <Feature icon={<Coffee size={18} />} label={t.hotelFeatures?.breakfast || "Frühstück & Bar"} />
                <Feature icon={<Sun size={18} />} label={t.hotelFeatures?.view || "Weitblick über Kachetien"} />
              </div>

              <a
                href={
                  (LINKS?.booking && LINKS.booking.methis) ||
                  "https://www.booking.com/hotel/ge/chateau-mephis-kalaki.html"
                }
                target="_blank"
                rel="noreferrer"
                className="btn-chip"
              >
                {t.bookingCta || "→ Auf Booking.com ansehen"}
              </a>
            </Card>

            {/* 🎒 Packliste */}
            <Card
              title={t.packlistTitle || "🎒 Packliste (Februar in Georgien)"}
              className="hover-react"
            >
              <p style={{ color: "#64748b", marginBottom: ".5rem" }}>
                {t.packlistIntro ||
                  "Im Februar ist es winterlich (Tbilisi ~5 °C, Telavi ~0–8 °C)."}
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

          {/* --- RECHTE SEITE: TRANSFERS --- */}
          <Card
            title={t.transfersTitle || "Transfers & Wege"}
            className="hover-react"
          >
            <p style={{ marginBottom: "1rem", color: "#374151" }}>
              {t.transfersIntro || (
                <>
                  Der Weg vom <strong>Tbilisi International Airport (TBS)</strong> zum{" "}
                  <strong>Chateau Methis Kalaki</strong> in{" "}
                  <em>Upper Chocheti, Kachetien</em> dauert etwa{" "}
                  <strong>90 Minuten</strong>. Hier sind die besten Optionen:
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
              <TransferCard
                title={t.transferOptions?.shuttleTitle || "🚐 Shuttle-Service"}
                text={t.transferOptions?.shuttleText || "Sammeltransfer am Hochzeitstag – bitte vorher anmelden."}
                contact="+995 598 11 22 33"
                note={t.transferOptions?.shuttleNote || "Shuttle-Koordination (WhatsApp verfügbar)"}
              />

              <TransferCard
                title={t.transferOptions?.taxiTitle || "🚕 Taxi / Fahrer"}
                text={t.transferOptions?.taxiText || "Komfortable Privattransfers oder lokale Taxis direkt am Flughafen."}
                items={[
                  { name: "GoTrip Georgia", phone: "+995 574 10 10 10" },
                  { name: "Georgian Bus (Tbilisi → Telavi)", phone: "+995 322 05 20 52" },
                  { name: "Telavi Taxi Service", phone: "+995 593 44 11 88" },
                ]}
                note={t.transferOptions?.taxiPrice || "Preis ca. 120–150 GEL (≈ 40–50 €) pro Strecke."}
              />

              <TransferCard
                title={t.transferOptions?.rentTitle || "🚗 Mietwagen"}
                text={t.transferOptions?.rentText || "Ideal für flexible Erkundungen – direkt am Flughafen verfügbar:"}
                links={[
                  ["Europcar Georgia", "https://www.europcar.ge/"],
                  ["CityRent", "https://www.cityrent.ge/"],
                  ["AutoEurope", "https://www.autoeurope.eu/"],
                ]}
                note={t.transferOptions?.rentNote || "Fahrzeit: ca. 1 h 30 min über Kakheti Hwy (S5)."}
              />

              <TransferCard
                title={t.transferOptions?.busTitle || "🚌 Öffentliche Busse"}
                text={t.transferOptions?.busText || "Abfahrt von Ortachala oder Samgori Bus Station in Tbilisi."}
                mapUrl="https://goo.gl/maps/Wf6Vr4n5jRKmTwcF6"
                note={t.transferOptions?.busMap || "Busstation auf Google Maps öffnen"}
              />
            </div>
          </Card>
        </div>
      </Section>
    </Layout>
  );
}

/* --- Hilfskomponenten --- */
function Feature({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", color: "#374151" }}>
      {icon}
      <span style={{ fontSize: ".9rem" }}>{label}</span>
    </div>
  );
}

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
