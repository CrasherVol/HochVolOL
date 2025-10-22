// src/pages/FlightsPage.jsx
import React, { useState } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import {
  TEXTS,
  LINKS,
  ANREISE,
  UNTERKUNFT,
  PACKLISTE
} from "../data/constants.js";
import {
  Plane,
  Clock,
  Wallet,
  Navigation,
  Bus,
  Car,
  Smartphone,
  Search,
  PlaneTakeoff,
  CarTaxiFront
} from "lucide-react";

export default function FlightsPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;
  const [departure, setDeparture] = useState("DUS");

  // ✈️ Dynamische Flugsuch-Links (abhängig vom Abflughafen)
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
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
                <strong>{t.altLabel}:</strong>{" "}
                {ANREISE.alternative.join(", ")}
              </li>
              <li>
                <strong>{t.trainLabel}:</strong> {ANREISE.bahnhof}
              </li>
              <li>
                <strong>{t.transferLabel}:</strong>{" "}
                {ANREISE.transferHinweis}
              </li>
            </ul>

            {/* Badges */}
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

            {/* Abflughafen + Flugsuche */}
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

              {/* 🔗 Suchlinks */}
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

          {/* 🚐 Transfers & Wege */}
          <Card title={t.transfersTitle} className="hover-react">
            <div style={{ display: "grid", gap: ".9rem" }}>
              {/* Shuttle */}
              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>
                  {t.shuttle}
                </div>
                <p>
                  <strong>{ANREISE.transfers.shuttle.contactName}</strong>
                  <br />
                  <a
                    className="underline"
                    href={`tel:${ANREISE.transfers.shuttle.phoneRaw}`}
                  >
                    {ANREISE.transfers.shuttle.phone}
                  </a>
                  <br />
                  <span style={{ color: "#64748b" }}>
                    {ANREISE.transfers.shuttle.note}
                  </span>
                </p>
              </div>

              {/* Taxi */}
              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>
                  {t.taxi}
                </div>
                <ul
                  style={{
                    marginLeft: "1rem",
                    listStyle: "disc",
                    display: "grid",
                    gap: ".25rem",
                  }}
                >
                  {ANREISE.transfers.taxis.map((x, i) => (
                    <li key={i}>
                      <strong>{x.name}</strong>:
                      <a className="underline" href={`tel:${x.phone}`}>
                        {" "}
                        {x.phone}
                      </a>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    marginTop: ".6rem",
                    display: "flex",
                    gap: ".5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="https://bolt.eu/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-special"
                  >
                    <CarTaxiFront size={16} /> Bolt
                  </a>
                  <a
                    href="https://yandex.com/taxi/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-special"
                  >
                    <CarTaxiFront size={16} /> Yandex Go
                  </a>
                </div>
              </div>

              {/* Businfos */}
              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>
                  {t.bus}
                </div>
                {ANREISE.transfers.bus.map((b, i) => (
                  <div key={i}>
                    <p>
                      <strong>{b.route}</strong>
                      <br />
                      {t.fromLabel} {b.from}:{" "}
                      {b.stations.map((s, j) => (
                        <span key={j}>
                          <a
                            className="underline"
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {s.label}
                          </a>
                          {j < b.stations.length - 1 ? " · " : ""}
                        </span>
                      ))}
                      <br />
                      {t.arrivalLabel}:{" "}
                      <a
                        className="underline"
                        href={b.to.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {b.to.label}
                      </a>
                      <br />
                      <span style={{ color: "#64748b" }}>{b.note}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 🏨 Unterkunft */}
          <Card title={t.accommodationTitle} className="hover-react">
            {UNTERKUNFT.map((u) => (
              <div key={u.name} style={{ marginBottom: ".9rem" }}>
                <div
                  className="headline"
                  style={{ color: "var(--accent)" }}
                >
                  {u.name}
                </div>
                <div>{u.details}</div>
                <a
                  className="underline"
                  href={u.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.website}
                </a>
              </div>
            ))}
            {t.bookEarlyNote && (
              <p style={{ marginTop: ".5rem", color: "#6b7280" }}>
                {t.bookEarlyNote}
              </p>
            )}
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
              {PACKLISTE.map((item, i) => (
                <li
                  key={i}
                  style={{ breakInside: "avoid", marginBottom: ".35rem" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </Layout>
  );
}
