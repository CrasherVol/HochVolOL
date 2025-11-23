// src/components/WeatherWidget.jsx
import React, { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Wind as WindIcon,
  Sunrise,
  Sunset,
  ThermometerSun,
} from "lucide-react";

/**
 * Live-Wetter mit Open-Meteo (keine API-Keys nötig).
 * Props:
 *  - lat, lon: Koordinaten (z.B. Gudauri 42.47, 44.48)
 *  - place: Anzeigename (z.B. "Gudauri")
 *  - lang: "de" | "en" | "ru"
 */
export default function WeatherWidget({
  lat,
  lon,
  place = "Gudauri",
  lang = "de",
}) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const L = LOCALIZED[lang] || LOCALIZED.de;

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    setErr("");

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,` +
      `precipitation,snowfall,weather_code,is_day,cloud_cover` +
      `&hourly=snow_depth` +
      `&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,sunrise,sunset,weather_code` +
      `&timezone=auto`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((e) => {
        console.error("WeatherWidget error:", e);
        setErr(String(e));
      })
      .finally(() => setLoading(false));
  }, [lat, lon]);

  if (err) {
    return (
      <div
        className="card"
        style={{
          padding: "0.9rem",
          fontSize: ".9rem",
          color: "#b91c1c",
        }}
      >
        {L.fail}
      </div>
    );
  }

  if (loading || !data?.current || !data?.daily) {
    return (
      <div
        className="card"
        style={{ padding: "0.9rem", fontSize: ".9rem", color: "#64748b" }}
      >
        {L.loading}
      </div>
    );
  }

  const cur = data.current;
  const daily = data.daily;

  // Heute = Index 0
  const todayMax = daily.temperature_2m_max?.[0];
  const todayMin = daily.temperature_2m_min?.[0];
  const newSnowToday = daily.snowfall_sum?.[0]; // cm
  const sunriseIso = daily.sunrise?.[0];
  const sunsetIso = daily.sunset?.[0];

  // Schneehöhe aus hourly.snow_depth (erste Stunde)
  const snowDepth =
    Array.isArray(data.hourly?.snow_depth) && data.hourly.snow_depth.length
      ? data.hourly.snow_depth[0]
      : null;

  const condition = mapWeatherCode(cur.weather_code, lang);

  const formatTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const locale =
      lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "de-DE";
    try {
      return d.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const round = (v, digits = 0) =>
    typeof v === "number" ? v.toFixed(digits) : "—";

  // IMMER bläulicher Hintergrund, kein Dark-Mode
  const bgGradient =
    "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(56,189,248,0.25))";
  const textColor = "#0f172a";
  const subTextColor = "#475569";

  // 3-Tage-Vorhersage (Heute + 2 nächste Tage)
  const forecastDays = [];
  if (Array.isArray(daily.time)) {
    for (let i = 0; i < Math.min(3, daily.time.length); i++) {
      forecastDays.push({
        date: daily.time[i],
        max: daily.temperature_2m_max?.[i],
        min: daily.temperature_2m_min?.[i],
        newSnow: daily.snowfall_sum?.[i],
        code: daily.weather_code?.[i],
        isToday: i === 0,
      });
    }
  }

  return (
    <div
      className="card"
      style={{
        padding: "0.9rem",
        borderRadius: "0.9rem",
        background: bgGradient,
        color: textColor,
        maxWidth: "100%",
        overflowX: "auto", // 📱 wichtig für Handy
      }}
    >
      {/* Innerer Block mit Mindestbreite, damit Layout nicht bricht */}
      <div style={{ minWidth: 320 }}>
        {/* Kopfzeile: Ort + Temperatur + Zustand */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: ".5rem",
            alignItems: "center",
            marginBottom: ".5rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".8rem",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                color: subTextColor,
              }}
            >
              {place} · {L.now}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: ".5rem",
                marginTop: ".15rem",
              }}
            >
              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: textColor,
                }}
              >
                {round(cur.temperature_2m, 0)} {L.unitC}
              </span>
              <span
                style={{
                  fontSize: ".9rem",
                  color: subTextColor,
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                }}
              >
                <ThermometerSun size={14} />
                {L.feelsLike}:{" "}
                <strong>
                  {round(cur.apparent_temperature, 0)} {L.unitC}
                </strong>
              </span>
            </div>
          </div>

          <div
            style={{
              justifySelf: "end",
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: ".15rem",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 6px 16px rgba(15,23,42,0.18)",
                color: "#0f172a",
              }}
            >
              {condition.icon}
            </div>
            <div style={{ fontSize: ".85rem", fontWeight: 600 }}>
              {condition.label}
            </div>
            <div style={{ fontSize: ".75rem", color: subTextColor }}>
              {L.clouds}: {round(cur.cloud_cover, 0)} %
            </div>
          </div>
        </div>

        {/* Werte-Grid (Wind, Schnee, Schneehöhe, Tagesverlauf) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: ".5rem",
            marginTop: ".4rem",
          }}
        >
          <Stat
            label={L.wind}
            value={`${round(cur.wind_speed_10m, 1)} ${L.unitMs}`}
            icon={<WindIcon size={15} />}
            sub={
              cur.wind_gusts_10m != null
                ? `${L.gusts}: ${round(cur.wind_gusts_10m, 1)} ${L.unitMs}`
                : null
            }
            subTextColor={subTextColor}
          />

          <Stat
            label={L.snowfallNow}
            value={`${round(cur.snowfall, 1)} cm`}
            icon={<CloudSnow size={15} />}
            sub={
              newSnowToday != null
                ? `${L.newSnowToday}: ${round(newSnowToday, 0)} cm`
                : null
            }
            subTextColor={subTextColor}
          />

          {snowDepth != null && (
            <Stat
              label={L.snowDepth}
              value={`${round(snowDepth, 0)} cm`}
              icon={<CloudSnow size={15} />}
              sub={L.snowDepthHint}
              subTextColor={subTextColor}
            />
          )}

          <Stat
            label={L.today}
            value={`${round(todayMax, 0)} / ${round(todayMin, 0)} ${L.unitC}`}
            icon={<Sunrise size={15} />}
            sub={
              sunriseIso && sunsetIso
                ? `${L.sunrise} ${formatTime(
                    sunriseIso
                  )} · ${L.sunset} ${formatTime(sunsetIso)}`
                : null
            }
            subTextColor={subTextColor}
          />
        </div>

        {/* 3-Tage-Vorhersage */}
        {forecastDays.length > 0 && (
          <div style={{ marginTop: ".75rem" }}>
            <div
              style={{
                fontSize: ".8rem",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                marginBottom: ".35rem",
                color: subTextColor,
              }}
            >
              {L.nextDaysTitle}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))",
                gap: ".4rem",
              }}
            >
              {forecastDays.map((d) => (
                <ForecastDay
                  key={d.date}
                  day={d}
                  lang={lang}
                  subTextColor={subTextColor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quelle */}
        <p
          style={{
            marginTop: ".6rem",
            fontSize: ".8rem",
            color: subTextColor,
          }}
        >
          {L.source}:{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Open-Meteo
          </a>
        </p>
      </div>
    </div>
  );
}

/* ========= Lokalisierung ========= */

const LOCALIZED = {
  de: {
    now: "Jetzt",
    temp: "Temperatur",
    wind: "Wind",
    gusts: "Böen",
    snowfallNow: "Schneefall (akt.)",
    newSnowToday: "Neuschnee heute",
    snowDepth: "Schneehöhe",
    snowDepthHint: "Modellwert – lokal kann abweichen.",
    today: "Heute (Max/Min)",
    sunrise: "Sonnenaufgang",
    sunset: "Sonnenuntergang",
    feelsLike: "gefühlte",
    clouds: "Bewölkung",
    nextDaysTitle: "Nächste Tage",
    todayShort: "Heute",
    unitC: "°C",
    unitMs: "m/s",
    loading: "Lade Wetter…",
    fail: "Wetter konnte nicht geladen werden.",
    source: "Quelle",
    cond: {
      clear: "Sonnig",
      mainlyClear: "Meist klar",
      cloudy: "Bewölkt",
      fog: "Nebel",
      rain: "Regen",
      snow: "Schnee",
      showers: "Schauer",
      thunder: "Gewitter",
      unknown: "Wetter",
    },
  },
  en: {
    now: "Now",
    temp: "Temperature",
    wind: "Wind",
    gusts: "Gusts",
    snowfallNow: "Snowfall (now)",
    newSnowToday: "New snow today",
    snowDepth: "Snow depth",
    snowDepthHint: "Model value – may differ locally.",
    today: "Today (max/min)",
    sunrise: "Sunrise",
    sunset: "Sunset",
    feelsLike: "feels like",
    clouds: "Cloud cover",
    nextDaysTitle: "Next days",
    todayShort: "Today",
    unitC: "°C",
    unitMs: "m/s",
    loading: "Loading weather…",
    fail: "Failed to load weather.",
    source: "Source",
    cond: {
      clear: "Sunny",
      mainlyClear: "Mostly clear",
      cloudy: "Cloudy",
      fog: "Fog",
      rain: "Rain",
      snow: "Snow",
      showers: "Showers",
      thunder: "Thunderstorm",
      unknown: "Weather",
    },
  },
  ru: {
    now: "Сейчас",
    temp: "Температура",
    wind: "Ветер",
    gusts: "Порывы",
    snowfallNow: "Снегопад (сейчас)",
    newSnowToday: "Новый снег сегодня",
    snowDepth: "Глубина снега",
    snowDepthHint: "Модельное значение — локально может отличаться.",
    today: "Сегодня (макс/мин)",
    sunrise: "Восход",
    sunset: "Закат",
    feelsLike: "как ощущается",
    clouds: "Облачность",
    nextDaysTitle: "Ближайшие дни",
    todayShort: "Сегодня",
    unitC: "°C",
    unitMs: "м/с",
    loading: "Загрузка погоды…",
    fail: "Не удалось загрузить погоду.",
    source: "Источник",
    cond: {
      clear: "Ясно",
      mainlyClear: "Преимущественно ясно",
      cloudy: "Облачно",
      fog: "Туман",
      rain: "Дождь",
      snow: "Снег",
      showers: "Ливни",
      thunder: "Гроза",
      unknown: "Погода",
    },
  },
};

/* ========= Hilfs-Komponenten ========= */

function Stat({ label, value, icon, sub, subTextColor }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: "0.75rem",
        padding: "0.65rem 0.7rem",
        border: "1px solid rgba(148,163,184,0.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".35rem",
          marginBottom: ".2rem",
        }}
      >
        {icon}
        <span style={{ fontSize: ".8rem", color: "#0f172a" }}>{label}</span>
      </div>
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#0f172a",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            marginTop: ".15rem",
            fontSize: ".8rem",
            color: subTextColor,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

/**
 * Kleine Karte für einen Vorhersage-Tag (Heute + 2 Folgetage)
 */
function ForecastDay({ day, lang, subTextColor }) {
  const L = LOCALIZED[lang] || LOCALIZED.de;
  const locale =
    lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "de-DE";

  const dateObj = new Date(day.date);
  let label = dateObj.toLocaleDateString(locale, {
    weekday: "short",
  });

  if (day.isToday) {
    label = L.todayShort;
  }

  const cond = mapWeatherCode(day.code, lang);
  const round = (v, digits = 0) =>
    typeof v === "number" ? v.toFixed(digits) : "—";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: ".7rem",
        padding: ".45rem .55rem",
        border: "1px solid rgba(148,163,184,0.35)",
        display: "grid",
        gap: ".2rem",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".35rem",
          fontSize: ".8rem",
          fontWeight: 600,
        }}
      >
        {cond.icon}
        <span>{label}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: ".85rem",
        }}
      >
        <span>
          {round(day.max, 0)} / {round(day.min, 0)} {L.unitC}
        </span>
        {typeof day.newSnow === "number" && (
          <span style={{ fontSize: ".75rem", color: subTextColor }}>
            {round(day.newSnow, 0)} cm
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Mappt den WMO weather_code auf Label + Icon.
 */
function mapWeatherCode(code, lang) {
  const L = LOCALIZED[lang] || LOCALIZED.de;
  const c = typeof code === "number" ? code : -1;

  if (c === 0) {
    return { label: L.cond.clear, icon: <Sun size={18} /> };
  }
  if (c === 1 || c === 2) {
    return { label: L.cond.mainlyClear, icon: <CloudSun size={18} /> };
  }
  if (c === 3) {
    return { label: L.cond.cloudy, icon: <Cloud size={18} /> };
  }
  if (c === 45 || c === 48) {
    return { label: L.cond.fog, icon: <CloudFog size={18} /> };
  }
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) {
    return { label: L.cond.rain, icon: <CloudRain size={18} /> };
  }
  if (c >= 71 && c <= 77) {
    return { label: L.cond.snow, icon: <CloudSnow size={18} /> };
  }
  if (c === 85 || c === 86) {
    return { label: L.cond.showers, icon: <CloudSnow size={18} /> };
  }
  if (c >= 95) {
    return { label: L.cond.thunder, icon: <CloudLightning size={18} /> };
  }

  return { label: L.cond.unknown, icon: <CloudSun size={18} /> };
}
