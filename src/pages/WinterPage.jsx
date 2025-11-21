// src/pages/WinterPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";
import WeatherWidget from "../components/WeatherWidget.jsx";
import { TEXTS } from "../data/constants.js";
import ExternalLink from "../components/ExternalLink.jsx";
import PisteStatus from "../components/PisteStatus.jsx";

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
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";

/* ===================== Lokales i18n für diese Seite ===================== */
const W = {
  de: {
    pageTitle: "Winter in Georgien - Unsere Location ist so winterlich, selbst die Pinguine haben gefragt, ob sie mitfeiern dürfen.",
    pageSub: "Pulverschnee, Sonne & Gastfreundschaft im Kaukasus",
    heroTitle: "Winterzauber im Kaukasus",
    heroText:
      "Georgien ist der Geheimtipp für Winterfans: spektakuläre Berge, günstige Preise, viel Sonne und ehrliche Gastfreundschaft. Besonders Gudauri ist ein Paradies für Skifahrer, Snowboarder und Abenteurer.",
    badgeHeight: "Höhe: 2.200–3.279 m",
    badgeSeason: "Saison: Dez–Apr",
    badgeSlopes: "70 km Pisten",
    badgeDrive: "2 h ab Tiflis",
    weatherTitle: "Aktuelles Wetter · Gudauri",
    whyTitle: "Warum Georgien im Winter erleben?",
    whyP1:
      "Georgien verbindet alpine Schneelandschaften mit orientalischer Wärme. Hier triffst du auf Berge voller Abenteuer – und Menschen voller Herz.",
    whyBullets: [
      "🏔️ Unberührte Natur – ohne Massentourismus",
      "🍷 Gemütliche Supra-Abende mit Wein und Musik",
      "🌤️ Über 250 Sonnentage auch im Winter",
      "💰 Preisniveau deutlich unter Alpenregionen",
      "♨️ Heiße Quellen und Thermalbäder in den Bergen",
    ],
    gudauriTitle: "Gudauri – das Herz des georgischen Winters",
    gudauriText:
      "Gudauri ist Georgiens größtes und modernstes Skigebiet – rund 120 km nördlich von Tiflis an der georgischen Heerstraße. Die Pisten liegen auf 2.000–3.200 m Höhe und bieten Sonne, Powder und fantastische Aussicht auf den Kaukasus.",
    gudauriBullets: [
      "🎿 70 km Pisten – davon 55 % rot, 30 % blau, 15 % schwarz",
      "🚠 15 Lifte (darunter Gondeln & 6er-Sessellifte)",
      "🏂 Snowpark, Freeride-Zonen & Heli-Ski",
      "🧑‍🏫 Skischulen & Guides für Anfänger bis Experten",
      "☀️ Südhanglage mit viel Sonne und wenig Wind",
      "💸 Skipässe ab ca. 20–25 € / Tag",
    ],
    slopePdfBtn: "Pistenplan als PDF ansehen",
    actsTitle: "Winteraktivitäten & Erlebnisse",
    actsIntro:
      "In Gudauri und Umgebung erwarten dich viele Möglichkeiten – von entspannt bis abenteuerlich:",
    moreAreasTitle: "Hier könnte dein Name stehen - bezahlte Werbung, melde dich gerne",
    miniAreas: [
     
    ],
    galleryTitle: "Winter-Impressionen",

    snowTitle: "Schnee & Pistenstatus",
    snowIntro:
      "Hier findet ihr allgemeine Infos zu Schnee, Pisten und Sicherheit in Gudauri sowie Links zu aktuellen Berichten.",
    snowHint:
      "Für den tagesaktuellen Stand zu Schneehöhen, geöffneten Liften und Lawinensituation nutzt bitte die verlinkten externen Seiten.",
  },
  en: {
    pageTitle: "Winter in Georgia - Our location is so wintery that even the penguins asked if they could join in the celebrations.",
    pageSub: "Powder, sunshine & hospitality in the Caucasus",
    heroTitle: "Winter magic in the Caucasus",
    heroText:
      "Georgia is a hidden gem for winter lovers: dramatic mountains, fair prices, plenty of sunshine, and genuine hospitality. Gudauri, in particular, is a paradise for skiers, snowboarders, and adventurers.",
    badgeHeight: "Elevation: 2,200–3,279 m",
    badgeSeason: "Season: Dec–Apr",
    badgeSlopes: "70 km of slopes",
    badgeDrive: "2 h from Tbilisi",
    weatherTitle: "Current Weather · Gudauri",
    whyTitle: "Why experience Georgia in winter?",
    whyP1:
      "Georgia blends alpine snowscapes with warm, oriental charm. Mountains full of adventure – and people full of heart.",
    whyBullets: [
      "🏔️ Untouched nature – without mass tourism",
      "🍷 Cozy supra dinners with wine and music",
      "🌤️ 250+ sunny days, even in winter",
      "💰 Prices far below the Alps",
      "♨️ Hot springs & thermal baths in the mountains",
    ],
    gudauriTitle: "Gudauri – the heart of Georgia’s winter",
    gudauriText:
      "Gudauri is Georgia’s largest and most modern ski area – about 120 km north of Tbilisi. Slopes at 2,000–3,200 m deliver sunshine, powder, and sweeping Caucasus views.",
    gudauriBullets: [
      "🎿 70 km of slopes – 55% red, 30% blue, 15% black",
      "🚠 15 lifts (incl. gondolas & 6-seaters)",
      "🏂 Snowpark, freeride zones & heli-ski",
      "🧑‍🏫 Ski schools & guides for all levels",
      "☀️ South-facing slopes with lots of sun and little wind",
      "💸 Day passes from ~€20–25",
    ],
    slopePdfBtn: "View piste map (PDF)",
    actsTitle: "Winter activities & experiences",
    actsIntro:
      "In and around Gudauri you’ll find plenty to do – from relaxed to full-on adventure:",
    moreAreasTitle: "Other ski areas in Georgia",
    miniAreas: [
      {
        title: "Bakuriani",
        text: "Family-friendly, new lifts (kids’ areas).",
        href: "https://www.georgia.travel/bakuriani",
      },
      {
        title: "Mestia – Hatsvali",
        text: "Small & scenic in Svaneti.",
        href: "https://www.georgia.travel/ski",
      },
      {
        title: "Tetnuldi",
        text: "High-alpine terrain with long descents.",
        href: "https://www.georgia.travel/ski",
      },
    ],
    galleryTitle: "Winter impressions",

    snowTitle: "Snow & slope status",
    snowIntro:
      "Here you’ll find general information about snow, slopes and safety in Gudauri plus links to current reports.",
    snowHint:
      "For day-to-day details on snow depth, open lifts and avalanche situation, please use the linked external sites.",
  },
  ru: {
    pageTitle: "Зима в Грузии - Наше место расположения настолько зимнее, что даже пингвины спросили, могут ли они присоединиться к празднованию.",
    pageSub: "Пудра, солнце и гостеприимство Кавказа",
    heroTitle: "Зимняя магия на Кавказе",
    heroText:
      "Грузия — скрытая жемчужина для любителей зимы: величественные горы, доступные цены, много солнца и искреннее гостеприимство. Особенно Гудаури — рай для лыжников, сноубордистов и искателей приключений.",
    badgeHeight: "Высота: 2 200–3 279 м",
    badgeSeason: "Сезон: дек–апр",
    badgeSlopes: "70 км трасс",
    badgeDrive: "2 ч от Тбилиси",
    weatherTitle: "Погода сейчас · Гудаури",
    whyTitle: "Почему стоит поехать в Грузию зимой?",
    whyP1:
      "Грузия соединяет альпийские снежные пейзажи с тёплым восточным колоритом. Горы — полны приключений, люди — полны душевности.",
    whyBullets: [
      "🏔️ Дикая природа без массового туризма",
      "🍷 Уютные «супра»-вечера с вином и музыкой",
      "🌤️ 250+ солнечных дней даже зимой",
      "💰 Цены значительно ниже, чем в Альпах",
      "♨️ Горячие источники и термы в горах",
    ],
    gudauriTitle: "Гудаури — сердце грузинской зимы",
    gudauriText:
      "Гудаури — самый крупный и современный горнолыжный курорт Грузии, примерно в 120 км к северу от Тбилиси. Трассы на высоте 2 000–3 200 м дарят солнце, пухляк и виды на Кавказ.",
    gudauriBullets: [
      "🎿 70 км трасс — 55% красные, 30% синие, 15% чёрные",
      "🚠 15 подъёмников (в т.ч. гондолы и 6-местные кресла)",
      "🏂 Сноупарк, фрирайд-зоны и хели-ски",
      "🧑‍🏫 Школы и инструкторы для всех уровней",
      "☀️ Южные склоны — много солнца и мало ветра",
      "💸 Ски-пасс от ~20–25 € в день",
    ],
    slopePdfBtn: "Схема трасс (PDF)",
    actsTitle: "Зимние активности и впечатления",
    actsIntro:
      "В Гудаури и окрестностях — масса вариантов: от релакса до адреналина:",
    moreAreasTitle: "Другие горнолыжные курорты Грузии",
    miniAreas: [
      {
        title: "Бакуриани",
        text: "Подходит для семей, новые подъёмники (детские зоны).",
        href: "https://www.georgia.travel/bakuriani",
      },
      {
        title: "Местия — Хацвали",
        text: "Небольшой и очень живописный курорт в Сванетии.",
        href: "https://www.georgia.travel/ski",
      },
      {
        title: "Тетнульди",
        text: "Высокогорье с длинными спусками.",
        href: "https://www.georgia.travel/ski",
      },
    ],
    galleryTitle: "Зимние впечатления",

    snowTitle: "Снег и состояние трасс",
    snowIntro:
      "Здесь — общая информация о снеговых условиях, трассах и безопасности в Гудаури, а также ссылки на актуальные отчёты.",
    snowHint:
      "Для ежедневной информации о высоте снега, работе подъёмников и лавинной обстановке используйте указанные внешние сайты.",
  },
};

/* ==== Animierte Icons ==== */
const AnimatedSnowflake = () => (
  <Snowflake
    size={20}
    style={{ color: "#3b82f6", animation: "spin 12s linear infinite" }}
  />
);
const AnimatedSun = () => (
  <CloudSun
    size={22}
    style={{ color: "#f59e0b", animation: "floatY 5s ease-in-out infinite" }}
  />
);

export default function WinterPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de; // global (Nav etc.)
  const w = W[lang] || W.de; // lokale i18n-Texte
  const acts = ACTIVITIES[lang] || ACTIVITIES.de; // 💡 lokalisiert!
  const snowLinks = SNOW_LINKS[lang] || SNOW_LINKS.de;

  // kleine Überschriften + Bulletpoints für Schnee-Box, je nach Sprache
  const snowOverviewTitle =
    lang === "en" ? "Overview" : lang === "ru" ? "Обзор" : "Überblick";

  const snowCurrentTitle =
    lang === "en"
      ? "Current info"
      : lang === "ru"
      ? "Актуальная информация"
      : "Aktuelle Infos";

  const snowBullets =
    lang === "en"
      ? [
          "Altitude approx. 2,000–3,200 m",
          "Season usually from December to April",
          "South-facing slopes: often sunny, but winter road conditions",
        ]
      : lang === "ru"
      ? [
          "Высота примерно 2 000–3 200 м",
          "Сезон обычно с декабря по апрель",
          "Южные склоны: много солнца, но зимние дорожные условия",
        ]
      : [
        "--> schnapp dir die Bretter oder das Board und dann rauf auf den Berg und rein ins Vergnügen",
        "- viel Schnee und schöne Pisten",
        "- immer eine Ski- oder Snowboadfahrt wert",

        ];

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={
          <>
            <AnimatedSnowflake /> {w.pageTitle}
          </>
        }
        subtitle={w.pageSub}
      >
 {/* === HERO-BEREICH (NEU) === */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1.1fr .9fr",
    gap: "1rem",
    alignItems: "stretch",
    marginBottom: "1.5rem",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid #eef2f6",
    borderRadius: "1rem",
    padding: "1.2rem",
  }}
>
  {/* Linker Infobereich */}
  <div>
    <h3 style={{ marginTop: 0 }}>{w.heroTitle}</h3>

    {/* Neuer ausführlicher Wintertext */}
    <p style={{ color: "#334155", lineHeight: 1.6 }}>
      {lang === "en"
        ? "Georgia is a true hidden gem for winter lovers: impressive Caucasus peaks, powder well into spring, plenty of sunshine and genuine hospitality. Gudauri offers modern lifts, wide open slopes, cozy bars and lots of adventure – from paragliding to heli-skiing. Thanks to its south-facing exposure, the weather is often clear, bright and pleasantly mild."
        : lang === "ru"
        ? "Грузия — настоящий зимний секрет: величественные вершины Кавказа, пухляк до весны, много солнца и искреннее гостеприимство. Гудаури предлагает современные подъёмники, широкие трассы, уютные бары и массу активностей — от параплана до хели-ски. Южная экспозиция обеспечивает частую ясную и мягкую погоду."
        : "Georgien ist ein echter Geheimtipp für Winterfans: mächtige Kaukasusgipfel, Powder bis in den Frühling, viele Sonnentage und herzliche Gastfreundschaft. Gudauri bietet moderne Lifte, breite Pisten, gemütliche Bars und jede Menge Abenteuer – von Paragliding bis Heli-Ski. Durch die Südlage ist das Wetter oft klar und angenehm."}
    </p>

    {/* BADGES */}
    <div
      style={{
        marginTop: ".8rem",
        display: "flex",
        flexWrap: "wrap",
        gap: ".5rem",
      }}
    >
      {/* Bestehende Badges */}
      <span className="badge">
        <Mountain size={14} /> {w.badgeHeight}
      </span>
      <span className="badge">
        <Snowflake size={14} /> {w.badgeSeason}
      </span>
      <span className="badge">
        <Ticket size={14} /> {w.badgeSlopes}
      </span>
      <span className="badge">
        <Clock size={14} /> {w.badgeDrive}
      </span>

      {/* NEUE BADGES */}
      <span className="badge">
        <CloudSun size={14} />{" "}
        {lang === "en"
          ? "250+ sunny days"
          : lang === "ru"
          ? "250+ солнечных дней"
          : "250+ Sonnentage"}
      </span>

      <span className="badge">
        <Wind size={14} />{" "}
        {lang === "en"
          ? "Often calm weather"
          : lang === "ru"
          ? "Часто тихая погода"
          : "Meist wenig Wind"}
      </span>


    </div>
  </div>

  {/* Wetterbox */}
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        marginBottom: ".5rem",
      }}
    >
      <AnimatedSun />
      <strong>{w.weatherTitle}</strong>
    </div>
    <WeatherWidget
      lat={42.4791}
      lon={44.4778}
      place="Gudauri"
      lang={lang}
    />
  </div>
</div>


        {/* === GEORGIEN IM WINTER === */}
        <Card title={w.whyTitle} className="hover-react">
          <p style={{ color: "#334155" }}>{w.whyP1}</p>
          <ul
            style={{ marginLeft: "1rem", color: "#334155", lineHeight: 1.6 }}
          >
            {w.whyBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Card>

        {/* === ABSTAND === */}
        <div style={{ height: "1rem" }} />

        {/* === SKIGEBIET GUDAURI === */}
        <Card title={w.gudauriTitle} className="hover-react">
          <p style={{ color: "#334155" }}>{w.gudauriText}</p>
          <ul
            style={{ marginLeft: "1rem", color: "#334155", lineHeight: 1.6 }}
          >
            {w.gudauriBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
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
              {w.slopePdfBtn}
            </a>
          </div>
        </Card>

        {/* kleiner Abstand */}
        <div style={{ height: "1rem" }} />

        {/* === SCHNEE & PISTENSTATUS (eigene Sektion + Video) === */}
        <Card title={w.snowTitle} className="hover-react">
          <p style={{ color: "#334155" }}>{w.snowIntro}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0.75rem",
              marginTop: ".75rem",
            }}
          >
            {/* Box: Überblick */}
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "0.9rem",
                border: "1px solid #e2e8f0",
                padding: ".75rem .9rem",
                display: "grid",
                gap: ".4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                }}
              >
                <Snowflake size={16} />
                <strong>{snowOverviewTitle}</strong>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  color: "#475569",
                  fontSize: ".9rem",
                  lineHeight: 1.5,
                }}
              >
                {snowBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            {/* Box: Links zu Status & Prognose */}
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "0.9rem",
                border: "1px solid #e2e8f0",
                padding: ".75rem .9rem",
                display: "grid",
                gap: ".5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                }}
              >
                <Wind size={16} />
                <strong>{snowCurrentTitle}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".4rem",
                }}
              >
                <a
                  href={snowLinks.report}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <ExternalLinkIcon size={14} />
                  <span>
                    {lang === "en"
                      ? "Snow report & slope status"
                      : lang === "ru"
                      ? "Снег и состояние трасс"
                      : "Schneebericht & Pistenstatus"}
                  </span>
                </a>
                <a
                  href={snowLinks.forecast}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <CloudSun size={14} />
                  <span>
                    {lang === "en"
                      ? "Weather & snow forecast"
                      : lang === "ru"
                      ? "Погода и прогноз снега"
                      : "Wetter & Schneevorhersage"}
                  </span>
                </a>
                <a
                  href={snowLinks.lifts}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <MapPin size={14} />
                  <span>
                    {lang === "en"
                      ? "Lift overview Gudauri"
                      : lang === "ru"
                      ? "Схема подъёмников Гудаури"
                      : "Liftübersicht Gudauri"}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: ".85rem",
              color: "#64748b",
              marginTop: ".75rem",
              display: "flex",
              alignItems: "flex-start",
              gap: ".35rem",
            }}
          >
            <Info size={14} style={{ marginTop: "2px", flexShrink: 0 }} />
            <span>{w.snowHint}</span>
          </p>

        </Card>

        {/* kleiner Abstand */}
        <div style={{ height: "1rem" }} />

        {/* === PISTENSTATUS / LIFTE (deine Komponente) === */}
        <PisteStatus
          lang={lang}
          links={{
            status:
              "https://www.skiresort.de/skigebiet/gudauri/schneebericht/", // Pistenstatus
            webcams: "https://www.gudauri.info/en/webcam/", // Webcams
            map: "https://piste-maps.co.uk/Piste-Maps/Georgia/Gudauri-Piste-Ski-Map-2023-24.pdf", // Pistenplan
          }}
        />

        <div style={{ height: "1rem" }} />

        {/* === AKTIVITÄTEN === */}
        <Card title={w.actsTitle} className="hover-react">
          <p style={{ color: "#334155" }}>{w.actsIntro}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {acts.map((a) => (
              <Activity key={a.title} {...a} />
            ))}
          </div>
        </Card>

        <div style={{ height: "1rem" }} />

        {/* === WEITERE SKIGEBIETE === */}
        <Card title={w.moreAreasTitle} className="hover-react">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: ".75rem",
            }}
          >
            {w.miniAreas.map((m) => (
              <MiniArea
                key={m.title}
                title={m.title}
                text={m.text}
                href={m.href}
              />
            ))}
          </div>
        </Card>

        {/* === GALERIE === */}
        <Card title={w.galleryTitle} className="hover-react">
          <Gallery
            images={[
              "/winter/georgia-1.jpg",
              "/winter/georgia-2.jpg",
              "/winter/georgia-3.jpg",
              "/winter/georgia-4.jpg",
              "/winter/georgia-5.jpg",
              "/winter/georgia-6.jpg",
              "/winter/georgia-7.jpg",
              "/winter/georgia-8.jpg",
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

/* === Aktivitätsdaten (lokalisiert) === */
const ACTIVITIES = {
  de: [
    {
      title: "Ski- & Snowboardunterricht",
      img: "/winter/ski_school.jpg",
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
      link: "https://www.skyatlantida.com/winter-wonderland/",
    },
    {
      title: "Freeride & Heli-Ski",
      img: "/winter/heli_ski.jpg",
      text: "Mit dem Helikopter zu unberührten Hängen – erfahrene Guides inklusive.",
      type: "Adrenalin",
      link: "https://www.heliski.travel",
    },
    {
      title: "Spa & Thermalquellen",
      img: "/winter/spa.jpg",
      text: "Wellness & Entspannung nach dem Skitag – Spas & heiße Quellen.",
      type: "Entspannung",
      link: "https://www.tripadvisor.de/Attractions-g1588192-Activities-c40-Gudauri_Mtskheta_Mtianeti_Region.htmludauri/m/en/blog/tbilisi-sulfur-baths",
    },
    {
      title: "Schneeschuhwandern",
      img: "/winter/snowshoe.jpg",
      text: "Geführte Wanderungen durch verschneite Landschaften – perfekt für Genießer.",
      type: "Natur & Ruhe",
      link: "https://www.getyourguide.com/gudauri-l164168/winter-snowshoeing-tc327/",
    },
  ],
  en: [
    {
      title: "Ski & Snowboard Lessons",
      img: "/winter/ski_school.jpg",
      text: "Private or group lessons with experienced instructors. For kids & adults. From €25/h.",
      type: "Learn & Fun",
      link: "https://www.gudauri.school/en",
    },
    {
      title: "Paragliding",
      img: "/winter/paragliding.jpg",
      text: "Tandem flights over Gudauri – breathtaking views across the Caucasus peaks.",
      type: "Adventure",
      link: "https://www.flygudauri.com/",
    },
    {
      title: "Snowmobile Tours",
      img: "/winter/snowmobile.jpg",
      text: "Guided rides across snowy plateaus. 30–120 min, from ~€60 pp.",
      type: "Action & Nature",
      link: "https://www.skyatlantida.com/winter-wonderland/",
    },
    {
      title: "Freeride & Heli-Ski",
      img: "/winter/heli_ski.jpg",
      text: "Helicopter drops to untouched slopes – with certified guides.",
      type: "Adrenaline",
      link: "https://www.heliski.travel",
    },
    {
      title: "Spa & Hot Springs",
      img: "/winter/spa.jpg",
      text: "Recover after a ski day – wellness spas and natural hot springs.",
      type: "Relax",
      link: "https://www.tripadvisor.de/Attractions-g1588192-Activities-c40-Gudauri_Mtskheta_Mtianeti_Region.htmludauri/m/en/blog/tbilisi-sulfur-baths",
    },
    {
      title: "Snowshoeing",
      img: "/winter/snowshoe.jpg",
      text: "Guided hikes through quiet winter landscapes – perfect for slow travel.",
      type: "Nature & Calm",
      link: "https://www.getyourguide.com/gudauri-l164168/winter-snowshoeing-tc327/",
    },
  ],
  ru: [
    {
      title: "Уроки лыж и сноуборда",
      img: "/winter/ski_school.jpg",
      text: "Индивидуальные и групповые занятия с опытными инструкторами. Для детей и взрослых. От 25 €/ч.",
      type: "Обучение и веселье",
      link: "https://www.gudauri.school/en",
    },
    {
      title: "Парапланеризм",
      img: "/winter/paragliding.jpg",
      text: "Тандем-полёты над Гудаури — захватывающие виды на Кавказские вершины.",
      type: "Приключение",
      link: "https://www.flygudauri.com/",
    },
    {
      title: "Сафари на снегоходах",
      img: "/winter/snowmobile.jpg",
      text: "Экскурсии по снежным плато с гидом. 30–120 мин, от ~60 € с человека.",
      type: "Экшн и природа",
      link: "https://www.skyatlantida.com/winter-wonderland/",
    },
    {
      title: "Фрирайд и хели-ски",
      img: "/winter/heli_ski.jpg",
      text: "Высадки вертолётом на целинные склоны — с профессиональными гидами.",
      type: "Адреналин",
      link: "https://www.heliski.travel",
    },
    {
      title: "Спа и горячие источники",
      img: "/winter/spa.jpg",
      text: "Восстановление после катания — спа-комплексы и природные термы.",
      type: "Релакс",
      link: "https://www.tripadvisor.de/Attractions-g1588192-Activities-c40-Gudauri_Mtskheta_Mtianeti_Region.htmludauri/m/en/blog/tbilisi-sulfur-baths",
    },
    {
      title: "Сноушуинг",
      img: "/winter/snowshoe.jpg",
      text: "Прогулки на снегоступах с гидом — для ценителей спокойствия.",
      type: "Природа и тишина",
      link: "https://www.getyourguide.com/gudauri-l164168/winter-snowshoeing-tc327/",
    },
  ],
};

/* === Links für Schnee/Pistenstatus === */
const SNOW_LINKS = {
  de: {
    report: "https://www.skiresort.de/skigebiet/gudauri/schneebericht/",
    forecast:
      "https://www.meteoblue.com/de/wetter/woche/gudauri_georgien_614410",
    lifts: "https://www.gudauri.info/en/lifts/",
  },
  en: {
    report: "https://www.skiresort.info/ski-resort/gudauri/snow-report/",
    forecast:
      "https://www.meteoblue.com/en/weather/week/gudauri_georgia_614410",
    lifts: "https://www.gudauri.info/en/lifts/",
  },
  ru: {
    report:
      "https://www.skiresort.info/%D0%BA%D1%83%D1%80%D0%BE%D1%80%D1%82/gudauri/snow-report/",
    forecast:
      "https://www.meteoblue.com/ru/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0/week/gudauri_%D0%93%D1%80%D1%83%D0%B7%D0%B8%D1%8F_614410",
    lifts: "https://www.gudauri.info/en/lifts/",
  },
};

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
        <div
          style={{
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{title}</span>
          <ExternalLinkIcon size={14} />
        </div>
        <p
          style={{
            color: "#475569",
            fontSize: ".9rem",
            marginTop: ".35rem",
          }}
        >
          {text}
        </p>
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
        <ExternalLinkIcon
          size={14}
          style={{ marginLeft: "auto", opacity: 0.7 }}
        />
      </div>
      <div style={{ color: "#64748b", fontSize: ".95rem" }}>{text}</div>
    </ExternalLink>
  );
}
