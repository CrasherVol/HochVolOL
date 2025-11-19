// src/pages/CityPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Stat from "../components/Stat.jsx";
import Gallery from "../components/Gallery.jsx";

import { TEXTS, FACTS, ORT, IMAGES } from "../data/constants.js";

import GELConversionBox from "../components/GELConversionBox.jsx";

import {
  Globe2,
  Users,
  MapPin,
  Clock,
  Wallet,
  Plug,
  Mountain,
  ShieldCheck,
  Phone,
  CalendarDays,
  CreditCard,
  Plane,
} from "lucide-react";

const iconFor = (key) => {
  const size = 18;
  const map = {
    population: <Users size={size} />,
    area: <MapPin size={size} />,
    capital: <MapPin size={size} />,
    timezone: <Clock size={size} />,
    currency: <Wallet size={size} />,
    language: <Globe2 size={size} />,
    dial: <Phone size={size} />,
    power: <Plug size={size} />,
    peak: <Mountain size={size} />,
    unesco: <ShieldCheck size={size} />,
    weatherFeb: <CalendarDays size={size} />,
    visa: <ShieldCheck size={size} />,
    drive: <Globe2 size={size} />,
    emergency: <Phone size={size} />,
    tips: <CreditCard size={size} />,
    sim: <Phone size={size} />,
    best: <CalendarDays size={size} />,
    flight: <Plane size={size} />,
    pay: <Wallet size={size} />,
  };
  return map[key] || <Globe2 size={size} />;
};

// Winterliche Ausflugsziele mit mehr Infos + 3 Sprachen
const winterTrips = [
  {
    key: "kazbegi",
    name: {
      de: "Kazbegi & Gergeti-Dreifaltigkeitskirche",
      en: "Kazbegi & Gergeti Trinity Church",
      ru: "Казбеги и церковь Гергети",
    },
    desc: {
      de: `
Spektakuläres Hochtal am Fuß des Kasbek (5.047 m).

• Berühmte Kirche auf einem Hügel über Stepantsminda – im Winter oft tief verschneit  
• Aussicht auf die Nordseite des Großen Kaukasus  
• Von Gudauri aus als Tagesausflug mit Taxi/Fahrer gut machbar  
• Unterwegs viele Fotostopps an der Heerstraße möglich`,
      en: `
Spectacular high valley at the foot of Mt. Kazbek (5,047 m).

• Iconic church on a hill above Stepantsminda – often beautifully snow-covered in winter  
• Panoramic views of the Greater Caucasus  
• Easy to visit on a day trip from Gudauri by taxi/driver  
• Many photo stops along the Georgian Military Highway`,
      ru: `
Впечатляющая высокогорная долина у подножия Казбека (5 047 м).

• Знаменитая церковь на холме над Степанцминдой — зимой часто в снегу  
• Панорамные виды на Большой Кавказ  
• Удобная однодневная поездка из Гудаури на такси/с водителем  
• По дороге много красивых точек для фото`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Gergeti+Trinity+Church+Stepantsminda",
  },
  {
    key: "gudauri-panorama",
    name: {
      de: "Gudauri Panorama – Russia–Georgia Friendship Monument",
      en: "Gudauri Panorama – Russia–Georgia Friendship Monument",
      ru: "Панорама Гудаури – монумент дружбы Грузии и России",
    },
    desc: {
      de: `
Rundes Aussichtsbauwerk direkt an der Heerstraße oberhalb Gudauris.

• Spektakuläre 180°-Blicke ins Tal und auf die umliegenden Berge  
• Innen bunte Mosaik-Wand mit historischen Szenen  
• Im Winter meist komplett von Schnee und Eis umgeben – sehr fotogen  
• Gut mit Taxi oder auf Ausflügen zu erreichen`,
      en: `
Circular viewing platform directly on the Georgian Military Highway above Gudauri.

• 180° views over the valley and surrounding peaks  
• Colourful mosaic wall with historic scenes inside  
• In winter often surrounded by snow and ice – very photogenic  
• Easy to reach by taxi or as part of a day trip`,
      ru: `
Круглая смотровая площадка на Военно-Грузинской дороге над Гудаури.

• Панорамный вид на долину и горы (почти 180°)  
• Внутри цветная мозаика с историческими сценами  
• Зимой всё вокруг в снегу и льду — отличное место для фото  
• Легко добраться на такси или в составе экскурсии`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Russia-Georgia+Friendship+Monument+Gudauri",
  },
  {
    key: "mtskheta",
    name: {
      de: "Mtskheta & Svetitskhoveli-Kathedrale (UNESCO)",
      en: "Mtskheta & Svetitskhoveli Cathedral (UNESCO)",
      ru: "Мцхета и кафедральный собор Светицховели (ЮНЕСКО)",
    },
    desc: {
      de: `
Ehemalige Hauptstadt und einer der heiligsten Orte Georgiens.

• Historische Altstadt am Zusammenfluss von Kura und Aragvi  
• Imposante Kathedrale Svetitskhoveli mit jahrhundertealter Geschichte  
• Viele kleine Cafés, Souvenirshops und Kirchen auf engem Raum  
• Lässt sich gut mit einem Besuch des Klosters Jvari verbinden`,
      en: `
Former capital and one of Georgia’s most sacred places.

• Historic old town at the confluence of the Mtkvari and Aragvi rivers  
• Impressive Svetitskhoveli Cathedral with centuries of history  
• Many small cafés, souvenir shops and churches within walking distance  
• Combines perfectly with a visit to Jvari Monastery above the town`,
      ru: `
Бывшая столица и один из главных духовных центров Грузии.

• Исторический центр у слияния рек Кура и Арагви  
• Величественный кафедральный собор Светицховели с вековой историей  
• Множество маленьких кафе, лавочек и храмов в пешей доступности  
• Идеально сочетать с поездкой в монастырь Джвари над городом`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Svetitskhoveli+Cathedral+Mtskheta",
  },
  {
    key: "jvari",
    name: {
      de: "Kloster Jvari über Mtskheta (UNESCO)",
      en: "Jvari Monastery above Mtskheta (UNESCO)",
      ru: "Монастырь Джвари над Мцхетой (ЮНЕСКО)",
    },
    desc: {
      de: `
Kleines Kloster auf einem Hügel mit ikonischer Aussicht.

• Blick auf die Zusammenführung von Aragvi und Kura  
• Ein wichtiger Ort der frühen christlichen Geschichte Georgiens  
• Im Winter oft windig, aber mit klarer Sicht auf Berge und Flüsse  
• Kurze Fahrt von Mtskheta – oft in denselben Ausflug integriert`,
      en: `
Small monastery on a hilltop with an iconic view.

• Overlooks the confluence of the Aragvi and Mtkvari rivers  
• Important site of early Christian history in Georgia  
• Often windy in winter but with very clear views  
• Short drive from Mtskheta – usually part of the same day trip`,
      ru: `
Небольшой монастырь на вершине холма с культовым видом.

• Панорама на слияние рек Арагви и Куры  
• Важное место ранней христианской истории Грузии  
• Зимой бывает ветрено, но вид обычно очень ясный  
• Находится рядом с Мцхетой — часто посещают в один день`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Jvari+Monastery+Mtskheta",
  },
  {
    key: "gori",
    name: {
      de: "Gori & Stalin-Museum",
      en: "Gori & Stalin Museum",
      ru: "Гори и музей Сталина",
    },
    desc: {
      de: `
Stalins Geburtsstadt – für Geschichtsinteressierte spannend, teilweise ambivalent.

• Museum mit Exponaten aus Stalins Leben, inklusive privatem Waggon  
• Kleines Geburtshaus auf dem Gelände  
• Möglichkeit, sowjetische Geschichte aus georgischer Perspektive zu sehen  
• Stadt selbst mit Festung und klassischer sowjetischer Architektur`,
      en: `
Birthplace of Stalin – interesting for history fans, with a rather ambivalent perspective.

• Museum with exhibits from Stalin’s life, including his personal rail carriage  
• Small birth house preserved on the museum grounds  
• Offers a view of Soviet history from a Georgian perspective  
• Town also has a fortress and classic Soviet-era architecture`,
      ru: `
Родной город Иосифа Сталина — любопытное место для тех, кто интересуется историей.

• Музей с экспонатами из жизни Сталина, включая личный вагон  
• Небольшой дом, где он родился, сохранился на территории музея  
• Возможность взглянуть на советскую историю с грузинской стороны  
• В городе есть крепость и типичная советская архитектура`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Stalin+Museum+Gori+Georgia",
  },
  {
    key: "uplistsikhe",
    name: {
      de: "Höhlenstadt Uplistsikhe",
      en: "Uplistsikhe Cave Town",
      ru: "Пещерный город Уплисцихе",
    },
    desc: {
      de: `
Antike Felsenstadt mit Tunneln, Höhlen und alten Kultstätten.

• Ehemaliges Handels- und Kultzentrum in den Felsen geschlagen  
• Wohnhöhlen, alte Weinpressen und ein kleiner Tempelbereich  
• Im Winter wirkt die Landschaft besonders dramatisch und ruhig  
• Gut mit einem Besuch in Gori kombinierbar`,
      en: `
Ancient rock-hewn town with tunnels, caves and old cult sites.

• Once a major trading and religious centre carved into the rock  
• Cave dwellings, old wine presses and a small temple area  
• Winter landscape feels dramatic and very quiet  
• Easy to combine with a visit to Gori`,
      ru: `
Древний пещерный город с туннелями, гротами и культовыми сооружениями.

• В прошлом важный торговый и религиозный центр, вырубленный в скалах  
• Жилые пещеры, старые винные давильни и небольшой храмовый комплекс  
• Зимой вокруг особенно атмосферно и почти без людей  
• Удобно совместить с посещением Гори`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Uplistsikhe+Cave+Town",
  },
  {
    key: "ananuri",
    name: {
      de: "Ananuri-Festung & Jinvali-Stausee",
      en: "Ananuri Fortress & Jinvali Reservoir",
      ru: "Крепость Ананури и Жинвальское водохранилище",
    },
    desc: {
      de: `
Mittelalterliche Festungsanlage direkt am türkisfarbenen Stausee.

• Kirchen, Mauern und Türme mit Blick über das Wasser  
• Beliebter Fotostopp auf dem Weg nach Gudauri oder Kazbegi  
• Im Winter oft Kombination aus Schnee, Wasser und Nebel – sehr stimmungsvoll  
• Kurzer Spaziergang durch die Anlage möglich`,
      en: `
Medieval fortress complex right next to the turquoise reservoir.

• Churches, walls and towers overlooking the water  
• Popular photo stop on the way to Gudauri or Kazbegi  
• In winter a mix of snow, water and fog creates a very moody atmosphere  
• Short walk through the complex is possible`,
      ru: `
Средневековый крепостной комплекс у бирюзового водохранилища.

• Церкви, стены и башни с видом на воду  
• Популярная остановка по дороге в Гудаури или Казбеги  
• Зимой снег, вода и туман создают особое настроение  
• Можно прогуляться по территории крепости`,
    },
    link:
      "https://www.google.com/maps/search/?api=1&query=Ananuri+Fortress+Georgia",
  },
];

export default function CityPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Untertitel für Section – mehrsprachig aus ORT
  const subtitle =
    ORT.stadtKurzinfoI18N?.[lang] ||
    ORT.stadtKurzinfoI18N?.de ||
    ORT.stadtKurzinfo;

  const mapsCtaLabel =
    lang === "de"
      ? "Route auf Google Maps öffnen"
      : lang === "ru"
      ? "Открыть маршрут в Google Maps"
      : "Open route in Google Maps";

  const galleryCaptions = [
    lang === "de"
      ? "Gergeti-Dreifaltigkeitskirche bei Kazbegi"
      : lang === "ru"
      ? "Церковь Гергети возле Казбеги"
      : "Gergeti Trinity Church near Kazbegi",
    lang === "de"
      ? "Gudauri Panorama – Russia–Georgia Friendship Monument"
      : lang === "ru"
      ? "Панорама Гудаури – монумент дружбы"
      : "Gudauri Panorama – Russia–Georgia Friendship Monument",
    lang === "de"
      ? "Altstadt von Mtskheta"
      : lang === "ru"
      ? "Старый город Мцхеты"
      : "Old town of Mtskheta",
    lang === "de"
      ? "Kloster Jvari über Mtskheta"
      : lang === "ru"
      ? "Монастырь Джвари над Мцхетой"
      : "Jvari Monastery above Mtskheta",
    lang === "de"
      ? "Festung & Stadt Gori"
      : lang === "ru"
      ? "Крепость и город Гори"
      : "Gori & fortress",
    lang === "de"
      ? "Höhlenstadt Uplistsikhe"
      : lang === "ru"
      ? "Пещерный город Уплисцихе"
      : "Cave town Uplistsikhe",
  ];

  return (
    <div className="city-no-hover">
      <Layout lang={lang} setLang={setLang}>
        <Section
          title={t.regionTitle}
          subtitle={subtitle}
          icon={<Globe2 className="w-5 h-5" />}
        >
          {/* Sehenswürdigkeiten (oben, aus ORT.mustSees) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "1.25rem",
              marginBottom: "1.25rem",
            }}
          >
            {ORT.mustSees.map((m, i) => {
              const desc =
                typeof m.desc === "string"
                  ? m.desc
                  : m.desc?.[lang] || m.desc?.de || "Kurzbeschreibung folgt.";

              return (
                <Card
                  key={i}
                  title={m.title}
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(226,232,240,0.9))",
                  }}
                >
                  <p
                    style={{
                      marginBottom: ".5rem",
                      color: "#1f2937",
                      whiteSpace: "pre-line",
                    }}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                  {m.url && (
                    <p>
                      <a
                        className="underline"
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textDecoration: "underline",
                          color: "#1d4ed8",
                        }}
                      >
                        {t.mapOpen}
                      </a>
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Zahlen & Fakten */}
          <Card
            title={t.factsTitle || "Georgien in Zahlen & Fakten"}
            style={{
              marginBottom: "1.25rem",
              background: "rgba(255,255,255,0.85)",
              color: "#1f2937",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="stats-compact-grid">
              {FACTS.map((f, i) => (
                <div
                  key={f.key}
                  className="stat-mini"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  <div className="icon">{iconFor(f.key)}</div>
                  <div className="info">
                    <div className="value">{f.value}</div>
                    <div className="label">
                      {f.label?.[lang] || f.label?.de}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Umrechnung GEL → EUR / RUB */}
          <GELConversionBox lang={lang} />

          {/* Winterliche Ausflugsziele rund um Gudauri & Tiflis */}
          <Card
            title={
              lang === "de"
                ? "Winterliche Ausflugsziele rund um Gudauri & Tiflis"
                : lang === "ru"
                ? "Зимние экскурсии вокруг Гудаури и Тбилиси"
                : "Winter day trips around Gudauri & Tbilisi"
            }
            style={{ marginBottom: "1.25rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "1.25rem",
              }}
            >
              {winterTrips.map((x) => {
                const name = x.name[lang] || x.name.de;
                const desc = x.desc[lang] || x.desc.de;
                return (
                  <div
                    key={x.key}
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(191,219,254,0.9))",
                      borderRadius: "1rem",
                      padding: "1rem",
                      border: "1px solid rgba(148,163,184,0.35)",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
                      transition: "none",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#1d4ed8",
                        marginBottom: ".35rem",
                      }}
                    >
                      {name}
                    </div>
                    <p
                      style={{
                        color: "#0f172a",
                        fontSize: ".9rem",
                        marginBottom: ".5rem",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {desc}
                    </p>
                    <a
                      href={x.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".35rem",
                        padding: ".35rem .75rem",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(135deg, #1d4ed8, #38bdf8)",
                        color: "white",
                        fontSize: ".8rem",
                        textDecoration: "none",
                      }}
                    >
                      {mapsCtaLabel}
                    </a>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Galerie – Impressionen der Ausflugsziele */}
          <Card
            title={t.impressions || "Impressionen"}
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Gallery
              images={[
                "/city/gergeti.jpg",
                "/city/gudauri-panorama.jpg",
                "/city/mtskheta.jpg",
                "/city/jvari.jpg",
                "/city/gori.jpg",
                "/city/uplistsikhe.jpg",
              ]}
              captions={galleryCaptions}
            />
          </Card>
        </Section>
      </Layout>
    </div>
  );
}
