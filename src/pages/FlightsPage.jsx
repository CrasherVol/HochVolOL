import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import { TEXTS, LINKS, ANREISE, UNTERKUNFT, PACKLISTE } from "../data/constants.js";
import { Plane, Clock, Wallet, Navigation, Bus, Car, Smartphone } from "lucide-react";


export default function FlightsPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section title={t.flightsTitle} subtitle={t.flightsSub} icon={<Plane className="w-5 h-5" />}>
       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
    gap: "1.25rem",
    alignItems: "start",
  }}
>


          {/* Flugplanung */}
          <Card title={t.flightPlanning}>
            <ul style={{ marginLeft: "1rem", listStyle: "disc", display: "grid", gap: ".5rem" }}>
              <li>
                <strong>{t.placeTitle}:</strong> {ANREISE.naechsterFlughafen} (
                <a className="underline" href={LINKS.maps.tbilisiAirport} target="_blank" rel="noreferrer">{t.mapLabel}</a>)
              </li>
              <li><strong>{t.altLabel}:</strong> {ANREISE.alternative.join(", ")}</li>
              <li><strong>{t.trainLabel}:</strong> {ANREISE.bahnhof}</li>
              <li><strong>{t.transferLabel}:</strong> {ANREISE.transferHinweis}</li>
            </ul>
            {/* kompakte Info-Badges für Flugplanung */}
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


            {/* Buchungs-Quicklinks */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: ".75rem" }}>
              {ANREISE.flugSucheLinks.map((l) => (
                <a key={l.name} className="btn-chip" href={l.url} target="_blank" rel="noreferrer">{l.name}</a>
              ))}
            </div>
          </Card>

          {/* Transfers & Wege */}
          <Card title={t.transfersTitle}>
            <div style={{ display: "grid", gap: ".9rem" }}>
              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>{t.shuttle}</div>
                <p>
                  <strong>{ANREISE.transfers.shuttle.contactName}</strong><br />
                  <a className="underline" href={`tel:${ANREISE.transfers.shuttle.phoneRaw || "+9955XXXXXXXX"}`}>
                    {ANREISE.transfers.shuttle.phone}
                  </a><br />
                  <span style={{ color: "#64748b" }}>{ANREISE.transfers.shuttle.note}</span>
                </p>
              </div>

              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>{t.taxi}</div>
                <ul style={{ marginLeft: "1rem", listStyle: "disc", display: "grid", gap: ".25rem" }}>
                  {ANREISE.transfers.taxis.map((x, i) => (
                    <li key={i}><strong>{x.name}</strong>: <a className="underline" href={`tel:${x.phone}`}>{x.phone}</a></li>
                  ))}
                </ul>
                <div style={{ marginTop: ".5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  {LINKS.taxiApps.map(app => (
                    <a key={app.name} href={app.url} target="_blank" rel="noreferrer" className="btn-chip">{app.name}</a>
                  ))}
                </div>
              </div>

              <div>
                <div className="headline" style={{ color: "var(--accent)" }}>{t.bus}</div>
                {ANREISE.transfers.bus.map((b, i) => (
                  <div key={i}>
                    <p>
                      <strong>{b.route}</strong><br />
                      {t.fromLabel} {b.from}:{" "}
                      {b.stations.map((s, j) => (
                        <span key={j}>
                          <a className="underline" href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
                          {j < b.stations.length - 1 ? " · " : ""}
                        </span>
                      ))}<br />
                      {t.arrivalLabel}: <a className="underline" href={b.to.url} target="_blank" rel="noreferrer">{b.to.label}</a><br />
                      <span style={{ color: "#64748b" }}>{b.note}</span>
                    </p>
                  </div>
                ))}
              </div>

{/* kompakte Info-Badges für Tbilisi → Telavi */}
<div className="badges">
  <div className="badge">
    <Clock className="icon" aria-hidden="true" />
    <span>2–3&nbsp;Std.</span>
  </div>
  <div className="badge">
    <Wallet className="icon" aria-hidden="true" />
    <span>~12–15&nbsp;GEL</span>
  </div>
  <div className="badge">
    <Bus className="icon" aria-hidden="true" />
    <span>alle ~40–45&nbsp;Min.</span>
  </div>
  <div className="badge">
    <Smartphone className="icon" aria-hidden="true" />
    <span>Barzahlung</span>
  </div>
</div>

{/* kompakte Info-Badges für Airport-Taxi (TBS → City) */}
<div className="badges muted">
  <div className="badge">
    <Car className="icon" aria-hidden="true" />
    <span>Taxi (Bolt/Yandex)</span>
  </div>
  <div className="badge">
    <Wallet className="icon" aria-hidden="true" />
    <span>~25–35&nbsp;GEL</span>
  </div>
  <div className="badge">
    <Navigation className="icon" aria-hidden="true" />
    <span>~25–35&nbsp;Min.</span>
  </div>
</div>
            </div>
          </Card>

          {/* Unterkunft */}
          <Card title={t.accommodationTitle}>
            {UNTERKUNFT.map((u) => (
              <div key={u.name} style={{ marginBottom: ".9rem" }}>
                <div className="headline" style={{ color: "var(--accent)" }}>{u.name}</div>
                <div>{u.details}</div>
                <a className="underline" href={u.url} target="_blank" rel="noreferrer">{t.website}</a>
              </div>
            ))}
            {t.bookEarlyNote && (
              <p style={{ marginTop: ".5rem", color: "#6b7280" }}>{t.bookEarlyNote}</p>
            )}
          </Card>

          {/* --- NEU: Packliste (Februar) --- */}
          <Card title={t.packlistTitle || "🎒 Packliste (Februar in Georgien)"}>
            <p style={{ color: "#64748b", marginBottom: ".5rem" }}>
              {t.packlistIntro || "Im Februar ist es winterlich (Tbilisi ~5 °C, Telavi ~0–8 °C)."}
            </p>
            <ul
              style={{
                columns: 2,
                columnGap: "1.5rem",
                paddingLeft: "1rem",
                listStyle: '"🍇  "',
              }}
            >
              {PACKLISTE.map((item, i) => (
                <li key={i} style={{ breakInside: "avoid", marginBottom: ".35rem" }}>{item}</li>
              ))}
            </ul>
          </Card>

        </div>
      </Section>
    </Layout>
  );
}
