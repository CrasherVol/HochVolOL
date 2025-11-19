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

  // Lokalisierte Fallbacks für Überschriften & Einleitungstexte
  const transfersTitle =
    t.transfersTitle ||
    (lang === "en"
      ? "Transfers & routes"
      : lang === "ru"
      ? "Трансферы и дорога"
      : "Transfers & Wege");

  const transfersIntro =
    t.transfersIntro ||
    (lang === "en"
      ? (
          <>
            The journey from <strong>Tbilisi International Airport (TBS)</strong> to{" "}
            <strong>Hotel Alpina (Gudauri)</strong> takes around{" "}
            <strong>2.5–3 hours</strong> via the Georgian Military Highway (Jvari Pass),
            depending on weather. These are the best options:
          </>
        )
      : lang === "ru"
      ? (
          <>
            Дорога от <strong>международного аэропорта Тбилиси (TBS)</strong> до{" "}
            <strong>Hotel Alpina (Гудаури)</strong> занимает примерно{" "}
            <strong>2.5–3 часа</strong> по Военно-Грузинской дороге (перевал Джвари),
            в зависимости от погоды. Основные варианты трансфера:
          </>
        )
      : (
          <>
            Der Weg vom <strong>Tbilisi International Airport (TBS)</strong> zum{" "}
            <strong>Hotel Alpina (Gudauri)</strong> dauert je nach Wetter{" "}
            <strong>ca. 2,5–3 Stunden</strong> über die Georgian Military Highway
            (Jvari-Pass). Hier sind die besten Optionen:
          </>
        ));

  const packTitle =
    t.packlistTitle ||
    (lang === "en"
      ? "🎒 Packing list (February in Georgia)"
      : lang === "ru"
      ? "🎒 Список вещей (февраль в Грузии)"
      : "🎒 Packliste (Februar in Georgien)");

  const packIntro =
    t.packlistIntro ||
    (lang === "en"
      ? "In February it is full winter: Tbilisi around ~5 °C; Gudauri is much colder, often below 0 °C."
      : lang === "ru"
      ? "В феврале — зима: в Тбилиси около ~5 °C, в Гудаури существенно холоднее, часто ниже 0 °C."
      : "Im Februar ist es winterlich: Tbilisi ~5 °C, Gudauri deutlich kälter, oft unter 0 °C.");

  // Badge-Texte
  const badgeTbilisiLabel =
    lang === "en"
      ? "Tbilisi (TBS)"
      : lang === "ru"
      ? "Тбилиси (TBS)"
      : "Tbilisi (TBS)";

  const badgeDidubeLabel =
    lang === "en"
      ? "Didube Bus Station"
      : lang === "ru"
      ? "Автовокзал Дидубе"
      : "Didube Bus Station";

  const badgeTimeLabel =
    lang === "en"
      ? "~2.5–3 h to Gudauri"
      : lang === "ru"
      ? "~2,5–3 ч до Гудаури"
      : "~2,5–3 Std. nach Gudauri";

  // Label für Abflughafen
  const departureLabel =
    lang === "en"
      ? "Select departure airport:"
      : lang === "ru"
      ? "Выберите аэропорт вылета:"
      : "Abflughafen wählen:";

  // Strings für Transfer-Optionen (Fallbacks, falls nicht in TEXTS hinterlegt)
  const taxiTitle =
    t.transferOptions?.taxiTitle ||
    (lang === "en"
      ? "🚕 Taxi / driver"
      : lang === "ru"
      ? "🚕 Такси / водитель"
      : "🚕 Taxi / Fahrer");

  const taxiText =
    t.transferOptions?.taxiText ||
    (lang === "en"
      ? "Comfortable private transfers or local taxis right at the airport, or booked in advance."
      : lang === "ru"
      ? "Комфортные частные трансферы или местное такси прямо в аэропорту, можно также заказать заранее."
      : "Komfortable Privattransfers oder lokale Taxis direkt am Flughafen bzw. vorab buchbar.");

  const taxiPriceNote =
    t.transferOptions?.taxiPrice ||
    (lang === "en"
      ? "One-way usually ~200–350 GEL (≈ 70–120 €), depending on season, time of day and weather."
      : lang === "ru"
      ? "В одну сторону обычно ~200–350 GEL (≈ 70–120 €), в зависимости от сезона, времени суток и погоды."
      : "Preis je Strecke meist ~200–350 GEL (≈ 70–120 €), abhängig von Saison, Uhrzeit und Wetter.");

  const rentTitle =
    t.transferOptions?.rentTitle ||
    (lang === "en"
      ? "🚗 Rental car"
      : lang === "ru"
      ? "🚗 Аренда авто"
      : "🚗 Mietwagen");

  const rentText =
    t.transferOptions?.rentText ||
    (lang === "en"
      ? "Ideal if you want to explore flexibly – rental cars are available directly at the airport:"
      : lang === "ru"
      ? "Идеально для самостоятельных поездок — машины доступны прямо в аэропорту:"
      : "Ideal für flexible Erkundungen – direkt am Flughafen verfügbar:");

  const rentNote =
    t.transferOptions?.rentNote ||
    (lang === "en"
      ? "Recommended: winter tyres / 4×4; driving time approx. 2.5–3 h via E117 / Georgian Military Highway (Jvari Pass)."
      : lang === "ru"
      ? "Рекомендуется: зимняя резина / 4×4; дорога около 2.5–3 ч по трассе E117 / Военно-Грузинской дороге (перевал Джвари)."
      : "Empfohlen: Winterreifen/4×4; Fahrzeit ca. 2,5–3 h via E117 / Georgian Military Highway (Jvari-Pass).");

  const busTitle =
    t.transferOptions?.busTitle ||
    (lang === "en"
      ? "🚌 Public buses (marshrutka)"
      : lang === "ru"
      ? "🚌 Общественные автобусы (маршрутка)"
      : "🚌 Öffentliche Busse (Marshrutka)");

  const busText =
    t.transferOptions?.busText ||
    (lang === "en"
      ? "Depart from Didube Bus Station (Tbilisi) towards Gudauri / Stepantsminda."
      : lang === "ru"
      ? "Отправление от автовокзала Дидубе (Тбилиси) в сторону Гудаури / Степанцминды."
      : "Abfahrt von der Didube Bus Station (Tbilisi) Richtung Gudauri/Stepantsminda.");

  const busMapLabel =
    t.transferOptions?.busMap ||
    (lang === "en"
      ? "Open Didube Bus Station in Google Maps"
      : lang === "ru"
      ? "Открыть автовокзал Дидубе в Google Картах"
      : "Didube Bus Station auf Google Maps öffnen");

  const busInfoLabel =
    t.transferOptions?.busInfo ||
    (lang === "en"
      ? "Info about the bus station"
      : lang === "ru"
      ? "Информация об автовокзале"
      : "Infos zur Bus Station");

  const mapOpenLabel =
    t.mapLabel ||
    (lang === "en"
      ? "Open in Maps"
      : lang === "ru"
      ? "Открыть в картах"
      : "Auf Karte öffnen");

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
                    {mapOpenLabel}
                  </a>
                  )
                </li>

                <li>
                  <strong>{t.trainLabel}:</strong>{" "}
                  {lang === "ru"
                    ? "Tbilisi Central / Didube Bus Station (автовокзал Дидубе)"
                    : "Tbilisi Central / Didube Bus Station"}
                </li>

                <li
                  className="transfer-hint"
                  style={{ listStyle: "none", marginTop: "0.75rem" }}
                >
                  <Plane className="w-4 h-4 text-accent" />
                  <span>
                    {ANREISE.transferHinweisI18N?.[lang] ||
                      ANREISE.transferHinweis}
                  </span>
                </li>
              </ul>

              <div className="badges">
                <div className="badge">
                  <Plane className="icon" />
                  <span>{badgeTbilisiLabel}</span>
                </div>

                <div className="badge">
                  <Bus className="icon" />
                  <span>{badgeDidubeLabel}</span>
                </div>

                <div className="badge">
                  <Clock className="icon" />
                  <span>{badgeTimeLabel}</span>
                </div>
              </div>

              {/* Abflughafen */}
              <div style={{ marginTop: "1rem" }}>
                <label
                  style={{ fontSize: ".9rem", color: "#475569", display: "block" }}
                >
                  {departureLabel}
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
                  <option value="FMO">Münster/Osnabrück (FMO)</option>
                  <option value="CGN">Köln/Bonn (CGN)</option>
                  <option value="BER">Berlin (BER)</option>
                  <option value="FRA">Frankfurt (FRA)</option>
                  <option value="MUC">München (MUC)</option>
                  <option value="SVO">
                    {lang === "ru" ? "Москва (SVO)" : "Moskau (SVO)"}
                  </option>
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

            {/* 🧭 Anreise- & Winter-Tipps (TBS → Gudauri / Hotel Alpina) */}
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
          </div>

          {/* --- RECHTE SEITE: TRANSFERS + PACKLISTE --- */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Card
              title={transfersTitle}
              className="hover-react"
            >
              <p style={{ marginBottom: "1rem", color: "#374151" }}>
                {transfersIntro}
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
                  title={taxiTitle}
                  text={taxiText}
                  note={taxiPriceNote}
                />

                {/* 🚗 Mietwagen */}
                <TransferCard
                  title={rentTitle}
                  text={rentText}
                  note={
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href="https://www.europcar.ge/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Europcar Georgia
                        </a>

                        <a
                          href="https://www.cityrent.ge/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          CityRent
                        </a>

                        <a
                          href="https://www.autoeurope.eu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          AutoEurope
                        </a>
                      </div>

                      <p className="text-gray-700 text-sm">
                        {rentNote}
                      </p>
                    </div>
                  }
                />

                {/* 🚌 Öffentliche Busse (Marshrutka) */}
                <TransferCard
                  title={busTitle}
                  text={busText}
                  note={
                    <div className="flex flex-col gap-3">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Didube+Bus+Station+Tbilisi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {busMapLabel}
                      </a>

                      <a
                        href="https://tbilisilocalguide.com/tbilisi/bus-station-didube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        {busInfoLabel}
                      </a>
                    </div>
                  }
                />
              </div>
            </Card>

            {/* 🎒 Packliste (rechts platziert) */}
            <Card
              title={packTitle}
              className="hover-react"
            >
              <p style={{ color: "#64748b", marginBottom: ".5rem" }}>
                {packIntro}
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
        </div>
      </Section>
    </Layout>
  );
}

// 🧭 Anreise- & Winter-Tipps – i18n + Icon-Mapping
const TRAVEL_TIPS = {
  de: {
    title: "🧭 Anreise- & Winter-Tipps (TBS → Gudauri / Hotel Alpina)",
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
    title: "🧭 Arrival & Winter Tips (TBS → Gudauri / Hotel Alpina)",
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
    title: "🧭 Советы по дороге и зимнему отдыху (TBS → Гудаури / Hotel Alpina)",
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

/* --- Hilfskomponente für Transfer-Kachel --- */
function TransferCard({ title, text, contact, note, items, links, mapUrl, mapLabel }) {
  const finalMapLabel =
    mapLabel ||
    (typeof window !== "undefined" && window.__FLIGHTS_MAP_LABEL__) ||
    "Open in Maps";

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
          📞{" "}
          <a href={`tel:${contact}`} className="underline">
            {contact}
          </a>
          <br />
          {note}
        </p>
      )}

      {items && (
        <ul style={{ fontSize: ".9rem", listStyle: "none", paddingLeft: 0 }}>
          {items.map((x) => (
            <li key={x.name} style={{ marginBottom: ".35rem" }}>
              <strong>{x.name}</strong>
              <br />
              📞{" "}
              <a href={`tel:${x.phone}`} className="underline">
                {x.phone}
              </a>
            </li>
          ))}
        </ul>
      )}

      {links && (
        <ul style={{ fontSize: ".9rem", paddingLeft: "1rem" }}>
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {mapUrl && (
        <p style={{ marginTop: ".5rem", fontSize: ".85rem" }}>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="underline">
            {finalMapLabel}
          </a>
        </p>
      )}

      {note && !contact && (
        <p style={{ fontSize: ".85rem", marginTop: ".5rem" }}>{note}</p>
      )}
    </div>
  );
}
