// src/components/WeatherWidget.jsx
import React, { useEffect, useState } from "react";

/**
 * Zeigt Live-Wetterdaten von Open-Meteo (keine API-Keys nötig).
 * Props:
 *  - lat, lon: Koordinaten (z.B. Gudauri 42.47, 44.48)
 *  - place: Anzeigename (z.B. "Gudauri")
 *  - lang: "de" | "en" | "ru"
 */
export default function WeatherWidget({ lat, lon, place = "Gudauri", lang = "de" }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,wind_speed_10m,snowfall&hourly=snow_depth` +
      `&timezone=auto`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(String(e)));
  }, [lat, lon]);

  // Sprachtexte sicher bauen (ohne Self-Reference)
  const LMAP = {
    de: { now: "Jetzt", temp: "Temperatur", wind: "Wind", snowfall: "Schneefall (akt.)", snowdepth: "Schneehöhe (heute)", unitC: "°C", unitMs: "m/s", loading: "Lade Wetter…", fail: "Wetter konnte nicht geladen werden." },
    en: { now: "Now", temp: "Temperature", wind: "Wind", snowfall: "Snowfall (now)", snowdepth: "Snow depth (today)", unitC: "°C", unitMs: "m/s", loading: "Loading weather…", fail: "Failed to load weather." },
    ru: { now: "Сейчас", temp: "Температура", wind: "Ветер", snowfall: "Снегопад (сейчас)", snowdepth: "Глубина снега (сегодня)", unitC: "°C", unitMs: "м/с", loading: "Загрузка погоды…", fail: "Не удалось загрузить погоду." },
  };
  const t = LMAP[lang] || LMAP.de;

  if (err) {
    return <div className="card" style={{ padding: "1rem" }}>{t.fail}</div>;
  }
  if (!data?.current) {
    return <div className="card" style={{ padding: "1rem" }}>{t.loading}</div>;
  }

  const cur = data.current;
  // einfache Schneehöhe: nimm die erste Stunde von "hourly.snow_depth", falls vorhanden
  const snowDepth = Array.isArray(data.hourly?.snow_depth) ? data.hourly.snow_depth[0] : undefined;

  const round = (v) => (typeof v === "number" ? Math.round(v) : "—");

  return (
    <div className="card hover-react" style={{ padding: "1rem" }}>
      <h3 style={{ marginBottom: ".5rem" }}>{place} — {t.now}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "0.75rem" }}>
        <WeatherStat label={t.temp} value={`${round(cur.temperature_2m)} ${t.unitC}`} />
        {"wind_speed_10m" in cur && <WeatherStat label={t.wind} value={`${round(cur.wind_speed_10m)} ${t.unitMs}`} />}
        {"snowfall" in cur && <WeatherStat label={t.snowfall} value={`${round(cur.snowfall)} mm`} />}
        {typeof snowDepth === "number" && <WeatherStat label={t.snowdepth} value={`${round(snowDepth)} cm`} />}
      </div>
      <p style={{ marginTop: ".5rem", fontSize: ".85rem", color: "#64748b" }}>
        Quelle: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>
      </p>
    </div>
  );
}

function WeatherStat({ label, value }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: "0.75rem",
      padding: "0.75rem"
    }}>
      <div style={{ fontSize: ".8rem", color: "#64748b" }}>{label}</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
