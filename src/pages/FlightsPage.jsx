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
  BadgeCheck,
  MapPin,
  AlertTriangle,
  Car,
  Package,
  ThermometerSun,
  CreditCard,
  Wifi,
  Smartphone,
  ShieldCheck,
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

    {/* ALTERNATIVE FLUGHÄFEN → ENTFERNT */}
    
    <li>
      <strong>{t.trainLabel}:</strong> Tbilisi Central / Didube Bus Station
    </li>

    <li
      className="transfer-hint"
      style={{ listStyle: "none", marginTop: "0.75rem" }}
    >
      <Plane className="w-4 h-4 text-accent" />
      <span>{ANREISE.transferHinweisI18N?.[lang] || ANREISE.transferHinweis}</span>
    </li>
  </ul>

  <div className="badges">
    <div className="badge">
      <Plane className="icon" />
      <span>Tbilisi (TBS)</span>
    </div>

    {/* BADGE „Kutaisi (KUT)“ → ENTFERNT */}

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
              title={TRAVEL_TIPS[lang]?.title}
              className="hover-react"
            >
              <ul
                style={{
                  marginLeft: "1rem",
                  listStyle: "none",
                  padding: 0,
                  display: "grid",
                  gap: ".6rem",
                  color: "#334155",
                }}
              >
                {TRAVEL_TIPS[lang]?.items.map((item) => {
                  const Icon = TRAVEL_TIP_ICONS[item.icon];
                  return (
                    <li key={item.key} style={{ display: "grid", gap: ".15rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".4rem",
                        }}
                      >
                        {Icon && <Icon size={16} style={{ flexShrink: 0 }} />}
                        <strong>{item.label}</strong>
                      </div>
                      <div
                        style={{
                          marginLeft: "1.8rem",
                          fontSize: ".95rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.text}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div> {/* ⬅️ diese schließende div hat vorher gefehlt (linke Spalte) */}

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

// 🧭 Anreise- & Winter-Tipps – i18n + Icon-Mapping
const TRAVEL_TIPS = {
  de: {
    title: "🧭 Anreise- & Winter-Tipps (TBS → Gudauri / Hotel Monta)",
    items: [
      {
        key: "entry",
        icon: "badge",
        label: "Einreise:",
        text: "Deutsche Staatsbürger:innen visumsfrei (bis zu 1 Jahr). Reisepass erforderlich (Personalausweis reicht nicht).",
      },
      {
        key: "route",
        icon: "map",
        label: "Beste Route:",
        text: "Tbilisi (TBS) → Gudauri via Georgian Military Highway über den Jvari-Pass. Fahrzeit ~2.5–3 Std. (im Winter Puffer einplanen).",
      },
      {
        key: "roads",
        icon: "alert",
        label: "Straßenlage:",
        text: "Im Winter kann der Pass kurzzeitig schließen / Kettenpflicht. Prüft am Reisetag Straßenmeldungen & Wetter und plant früh loszufahren.",
      },
      {
        key: "transfer",
        icon: "car",
        label: "Transfers:",
        text: "Privatfahrer/Taxi (komfortabel), Minibus ab Didube Bus Station (günstig), oder vorab Transfer buchen (lokale Fahrerplattformen).",
      },
      {
        key: "luggage",
        icon: "package",
        label: "Ski-Gepäck:",
        text: "Viele Airlines verlangen Anmeldung/Extra-Tarif für Ski & Stöcke. Vorab bei eurer Airline checken.",
      },
      {
        key: "climate",
        icon: "thermo",
        label: "Höhe & Klima:",
        text: "Gudauri ~2.200 m; trockene Luft, im Feb. winterlich. Warme Layer, Mütze/Handschuhe, Sonnenschutz (starke UV) einpacken.",
      },
      {
        key: "payment",
        icon: "card",
        label: "Bezahlung:",
        text: "Währung GEL. Kartenzahlung oft möglich; für Bergorte etwas Bargeld mitnehmen. ATM am Flughafen TBS.",
      },
      {
        key: "mobile",
        icon: "wifi",
        label: "Mobilfunk/Internet:",
        text: "Lokale SIM (z.B. Magti/Geocell) am Flughafen; eSIM-Optionen verfügbar. Unterkunft/Resort haben i.d.R. WLAN.",
      },
      {
        key: "apps",
        icon: "phone",
        label: "Apps vorab:",
        text: "Maps offline speichern, Übersetzer, ggf. Ride-Hailing in Tbilisi (für Stadtfahrten).",
      },
      {
        key: "insurance",
        icon: "shield",
        label: "Versicherung:",
        text: "Reise-/Ski-Versicherung inkl. Pistendienst/Heli-Bergung sinnvoll.",
      },
    ],
  },

  en: {
    title: "🧭 Arrival & Winter Tips (TBS → Gudauri / Hotel Monta)",
    items: [
      {
        key: "entry",
        icon: "badge",
        label: "Entry:",
        text: "German citizens can stay visa-free (up to 1 year). Passport required (ID card is not sufficient).",
      },
      {
        key: "route",
        icon: "map",
        label: "Best route:",
        text: "Tbilisi (TBS) → Gudauri via the Georgian Military Highway over Jvari Pass. Driving time ~2.5–3 hours (allow extra time in winter).",
      },
      {
        key: "roads",
        icon: "alert",
        label: "Road conditions:",
        text: "In winter the pass may close temporarily and chains may be mandatory. On your travel day, check road reports & weather and start early.",
      },
      {
        key: "transfer",
        icon: "car",
        label: "Transfers:",
        text: "Private driver/taxi (comfortable), minibus from Didube Bus Station (budget option), or pre-booked transfer via local driver platforms.",
      },
      {
        key: "luggage",
        icon: "package",
        label: "Ski luggage:",
        text: "Many airlines require advance registration / extra fee for skis & poles. Check with your airline beforehand.",
      },
      {
        key: "climate",
        icon: "thermo",
        label: "Altitude & climate:",
        text: "Gudauri is at ~2,200 m; dry air, full winter conditions in February. Pack warm layers, hat/gloves and sunscreen (strong UV).",
      },
      {
        key: "payment",
        icon: "card",
        label: "Payment:",
        text: "Currency is GEL. Cards are widely accepted; bring some cash for mountain areas. ATMs are available at TBS airport.",
      },
      {
        key: "mobile",
        icon: "wifi",
        label: "Mobile & internet:",
        text: "Local SIM (e.g. Magti/Geocell) at the airport; eSIM options available. Most accommodations/resorts offer Wi-Fi.",
      },
      {
        key: "apps",
        icon: "phone",
        label: "Useful apps:",
        text: "Save maps offline, a translator app, and ride-hailing for Tbilisi city rides.",
      },
      {
        key: "insurance",
        icon: "shield",
        label: "Insurance:",
        text: "Travel/ski insurance including slope rescue and helicopter evacuation is recommended.",
      },
    ],
  },

  ru: {
    title: "🧭 Советы по дороге и зимнему отдыху (TBS → Гудаури / Hotel Monta)",
    items: [
      {
        key: "entry",
        icon: "badge",
        label: "Въезд:",
        text: "Граждане Германии могут находиться в Грузии без визы (до 1 года). Обязателен загранпаспорт (ID-карта недействительна).",
      },
      {
        key: "route",
        icon: "map",
        label: "Лучший маршрут:",
        text: "Тбилиси (TBS) → Гудаури по Военно-Грузинской дороге через перевал Джвари. Время в пути ~2.5–3 часа (зимой закладывайте запас).",
      },
      {
        key: "roads",
        icon: "alert",
        label: "Дорожные условия:",
        text: "Зимой перевал могут временно закрывать, возможны требования к цепям. В день поездки проверяйте погоду и дорожные сообщения, выезжайте пораньше.",
      },
      {
        key: "transfer",
        icon: "car",
        label: "Трансферы:",
        text: "Частный водитель/такси (комфортно), маршрутка от автовокзала Дидубе (дешево), либо заранее заказанный трансфер через местные сервисы.",
      },
      {
        key: "luggage",
        icon: "package",
        label: "Лыжное снаряжение:",
        text: "Многие авиакомпании требуют регистрации/доплаты за лыжи и палки. Уточните условия у вашей авиакомпании заранее.",
      },
      {
        key: "climate",
        icon: "thermo",
        label: "Высота и климат:",
        text: "Гудаури ~2 200 м; сухой воздух, в феврале настоящая зима. Возьмите тёплые слои, шапку/перчатки и солнцезащиту (сильное УФ-излучение).",
      },
      {
        key: "payment",
        icon: "card",
        label: "Оплата:",
        text: "Валюта — GEL. Карты принимают часто, но в горах стоит иметь немного наличных. Банкомат есть в аэропорту TBS.",
      },
      {
        key: "mobile",
        icon: "wifi",
        label: "Связь и интернет:",
        text: "Местная SIM (Magti/Geocell) в аэропорту; доступны eSIM. В большинстве отелей и на курорте есть Wi-Fi.",
      },
      {
        key: "apps",
        icon: "phone",
        label: "Приложения заранее:",
        text: "Сохраните карты офлайн, установите переводчик и, при необходимости, приложение такси в Тбилиси.",
      },
      {
        key: "insurance",
        icon: "shield",
        label: "Страховка:",
        text: "Рекомендуется туристическая/горнолыжная страховка, включающая помощь на склоне и вертолётную эвакуацию.",
      },
    ],
  },
};

// Mapping von icon-"Schlüssel" → tatsächliche Lucide-Komponente
const TRAVEL_TIP_ICONS = {
  badge: BadgeCheck,
  map: MapPin,
  alert: AlertTriangle,
  car: Car,
  package: Package,
  thermo: ThermometerSun,
  card: CreditCard,
  wifi: Wifi,
  phone: Smartphone,
  shield: ShieldCheck,
};


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
