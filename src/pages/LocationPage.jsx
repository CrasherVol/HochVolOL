// src/pages/LocationPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";
import { TEXTS, LOCATION_DETAILS, LINKS } from "../data/constants.js";
import { getProgramm } from "../data/constants.js";
import {
  Building2,
  MapPin,
  BedDouble,
  Utensils,
  Wine,
  Wifi,
  ParkingCircle,
  Sun,
  Snowflake,
} from "lucide-react";

export default function LocationPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Bild oben in der Unterkunftskarte:
  // nimmt das 1. Galerie-Bild, sonst das lokale Fallback aus /public
  const heroImage =
    (Array.isArray(LOCATION_DETAILS?.galerie) && LOCATION_DETAILS.galerie[0]) ||
    "/Hotel-Alpina-Gudauri.jpg";

  // Galerie-Captions (Fallbacks, falls keine Übersetzungen existieren)
  const galleryCaptions = [
    t?.galleryCaptions?.alpina1 || "Alpina Hotel Georgia",
    t?.galleryCaptions?.alpina2 || "Alpina Terrasse bei Schnee",
    t?.galleryCaptions?.alpina3 || "Alpina bei Schnee",
    t?.galleryCaptions?.alpina4 || "Alpina Kaminzimmer",
  ];

  // kleiner Helper-Text pro Sprache für Alternativ-Hotels
  const altIntro =
    lang === "en"
      ? "If Alpina is fully booked or you prefer a different style, these hotels in Gudauri are also popular – with good access to the slopes."
      : lang === "ru"
      ? "Если в Alpina нет мест или вы хотите другой вариант размещения, эти отели в Гудаури также популярны и удобно расположены к склонам."
      : "Falls das Alpina ausgebucht ist oder ihr etwas anderes sucht: Hier ein paar weitere empfehlenswerte Hotels in Gudauri – mit gutem Zugang zu den Pisten.";

  const availabilityNote =
    lang === "en"
      ? "Availability and prices change quickly – please check directly via Booking or the hotel website."
      : lang === "ru"
      ? "Наличие номеров и цены постоянно меняются — проверяйте их, пожалуйста, напрямую через Booking или на сайте отеля."
      : "Verfügbarkeit und Preise ändern sich schnell – bitte direkt über Booking oder die Hotel-Webseite prüfen.";

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={t.locationTitle}
        subtitle={t.locationSub}
        icon={<Building2 className="w-5 h-5" />}
      >
        {/* ---------- HERO HOTEL: Name, Adresse, Buttons ---------- */}
        <Card
          title={LOCATION_DETAILS.name}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
          {/* Bild oben in der Karte */}
          {heroImage && (
            <img
              src={heroImage}
              alt={LOCATION_DETAILS?.name || "Alpina Hotel Georgia"}
              style={{
                width: "80%",
                height: "auto",
                borderRadius: ".75rem",
                marginBottom: ".75rem",
                display: "block",
              }}
            />
          )}

          {/* Adresse */}
          <p style={{ marginBottom: ".5rem" }}>
            <MapPin
              className="w-4 h-4"
              style={{
                display: "inline",
                marginRight: ".25rem",
                verticalAlign: "-2px",
              }}
            />
            {LOCATION_DETAILS.adresse}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: ".6rem",
              flexWrap: "wrap",
              marginBottom: ".75rem",
            }}
          >
            <a
              className="cta-primary"
              href={LOCATION_DETAILS.website || "https://hotelalpina.ge/"}
              target="_blank"
              rel="noreferrer"
            >
              {t.website || "Website"}
            </a>
            <a
              className="cta-ghost"
              href={
                LOCATION_DETAILS.bookingUrl ||
                (LINKS?.booking?.alpina ??
                  "https://www.booking.com/hotel/ge/alpina.de.html")
              }
              target="_blank"
              rel="noreferrer"
            >
              Booking
            </a>
            <a
              className="cta-ghost"
              href={
                LOCATION_DETAILS.mapsUrl ||
                "https://www.google.com/maps/search/?api=1&query=Alpina+Hotel+Gudauri"
              }
              target="_blank"
              rel="noreferrer"
            >
              {t.mapOpen}
            </a>
          </div>

          {/* Kurzbeschreibung */}
          <p style={{ marginBottom: ".75rem" }}>
            {LOCATION_DETAILS.kurzbeschreibung ||
              "Modernes Hotel im Skigebiet Gudauri – mit Sonnenterrasse, Restaurant, Bar und weitem Bergblick über den Kaukasus. Direkter Zugang zu den Skipisten (ski-in / ski-out)."}
          </p>

          {/* Hinweise */}
          {Array.isArray(LOCATION_DETAILS.hinweise) &&
            LOCATION_DETAILS.hinweise.length > 0 && (
              <ul
                style={{
                  marginLeft: "1rem",
                  listStyle: "disc",
                  marginBottom: "0.75rem",
                }}
              >
                {LOCATION_DETAILS.hinweise.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
        </Card>

        {/* ---------- GALERIE direkt unter Alpina-Karte ---------- */}
        <Card title={t.gallery} className="hover-react" style={{ marginBottom: "1.25rem" }}>
          <Gallery images={LOCATION_DETAILS.galerie} captions={galleryCaptions} />
        </Card>

        {/* ---------- GRID: Ausstattung / Zimmer / Aktivitäten & Essen ---------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          {/* Ausstattung */}
          <Card title={t.tipsTitle || "Ausstattung"} className="hover-react">
            <div className="amenities" style={{ display: "grid", gap: ".5rem" }}>
              <Amenity
                icon={<BedDouble size={16} />}
                label="Komfortable Zimmer, viele mit Balkon & Bergblick"
              />
              <Amenity
                icon={<Wifi size={16} />}
                label="Kostenfreies WLAN im ganzen Hotel"
              />
              <Amenity
                icon={<ParkingCircle size={16} />}
                label="Kostenlose Parkplätze direkt am Hotel"
              />
              <Amenity
                icon={<Utensils size={16} />}
                label="Restaurant mit georgischer & europäischer Küche"
              />
              <Amenity
                icon={<Wine size={16} />}
                label="Gemütliche Bar & Lounge im Haus"
              />
              <Amenity
                icon={<Sun size={16} />}
                label="Sonnenterrasse mit Panorama über Gudauri"
              />
              <Amenity
                icon={<Snowflake size={16} />}
                label="Direkter Zugang zu den Skipisten (ski-in/ski-out)"
              />
            </div>
          </Card>

          {/* Zimmer */}
          <Card title="Zimmer" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>
                Double / Twin & Familienzimmer – teilweise mit Balkon & Bergblick
              </li>
              <li>Hochwertige Bettwäsche, TV & gute Schallisolierung</li>
              <li>Eigenes Bad mit Pflegeprodukten & Föhn</li>
              <li>Heizung · Wasserkocher/Kaffee-Setup (je nach Zimmer)</li>
            </ul>
          </Card>

          {/* Aktivitäten & Freizeit */}
          <Card title="Aktivitäten & Freizeit" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>Ski-in/Ski-out & kurze Wege zu den Liften</li>
              <li>Ski- und Snowboardfahren direkt ab Unterkunft</li>
              <li>Gemütliche Lounge-Bereiche für den Abend</li>
            </ul>
          </Card>

          {/* Restaurant & Terrasse */}
          <Card title="Restaurant & Terrasse" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>
                Georgische & internationale Küche im hauseigenen Restaurant
              </li>
              <li>Bar/Lounge für den Abend</li>
              <li>Frühstücksbuffet verfügbar</li>
              <li>Sonnenterrasse mit freiem Blick auf die Berge</li>
            </ul>
          </Card>
        </div>

        {/* ---------- Weitere Hotels in Gudauri ---------- */}
        <Card
          title={t.altHotelsTitle || "Weitere Hotels in Gudauri"}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
          <p style={{ marginBottom: ".75rem", color: "#475569" }}>{altIntro}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {ALT_HOTELS.map((h) => (
              <AltHotel key={h.name} hotel={h} lang={lang} />
            ))}
          </div>

          <p
            style={{
              marginTop: ".75rem",
              fontSize: ".85rem",
              color: "#64748b",
            }}
          >
            {availabilityNote}
          </p>
        </Card>

        {/* ---------- Tagesablauf ---------- */}
        <Card
          title={t.dayFlow}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
          {getProgramm(lang).map((p, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: "1px solid #eee",
                background: "rgba(255,255,255,.7)",
                padding: ".75rem",
                borderRadius: ".75rem",
                marginBottom: ".5rem",
              }}
            >
              <div
                style={{
                  width: "5rem",
                  textAlign: "center",
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                {p.time}
              </div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ marginLeft: "auto", color: "#64748b" }}>
                {p.place}
              </div>
            </div>
          ))}
        </Card>
      </Section>
    </Layout>
  );
}

/* ---------- Kleine Hilfskomponente für Icon+Text ---------- */
function Amenity({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
      <span style={{ display: "inline-flex", alignItems: "center" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

/* ---------- Alternativ-Hotel-Karte ---------- */
function AltHotel({ hotel, lang }) {
  const text =
    lang === "en"
      ? hotel.textEn
      : lang === "ru"
      ? hotel.textRu
      : hotel.textDe;

  const dist =
    lang === "en"
      ? hotel.distanceEn
      : lang === "ru"
      ? hotel.distanceRu
      : hotel.distanceDe;

  return (
    <div
      className="hover-react"
      style={{
        background: "rgba(255,255,255,0.75)",
        borderRadius: ".9rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Bild – Pfade in /public anlegen oder externe URL nutzen */}
      <div
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          backgroundImage: `url(${hotel.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: ".7rem .8rem", display: "grid", gap: ".35rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".4rem",
          }}
        >
          <BedDouble size={16} />
          <strong>{hotel.name}</strong>
        </div>
        <div style={{ fontSize: ".9rem", color: "#475569" }}>{text}</div>
        {hotel.tags && hotel.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".25rem",
              marginTop: ".25rem",
            }}
          >
            {hotel.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: ".75rem",
                  padding: ".15rem .4rem",
                  borderRadius: "999px",
                  background: "rgba(59,130,246,0.08)",
                  color: "#1d4ed8",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Entfernung + Google-Route */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".15rem",
            marginTop: ".25rem",
            fontSize: ".85rem",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", gap: ".35rem", alignItems: "center" }}>
            <MapPin size={14} />
            <span>{dist}</span>
          </div>
          {hotel.mapsUrl && (
            <a
              href={hotel.mapsUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: "1.4rem",
                textDecoration: "underline",
                fontSize: ".8rem",
              }}
            >
              Route vom Alpina auf Google Maps öffnen
            </a>
          )}
        </div>

        {/* Buttons: Website + Booking */}
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            marginTop: ".5rem",
            flexWrap: "wrap",
          }}
        >
          {hotel.websiteUrl && (
            <a
              href={hotel.websiteUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: "1 1 120px",
                textAlign: "center",
                padding: ".4rem .7rem",
                borderRadius: ".7rem",
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.85), rgba(59,130,246,0.9))",
                color: "white",
                fontSize: ".9rem",
                textDecoration: "none",
              }}
            >
              Website
            </a>
          )}
          {hotel.bookingUrl && (
            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: "1 1 120px",
                textAlign: "center",
                padding: ".4rem .7rem",
                borderRadius: ".7rem",
                border: "1px solid rgba(148,163,184,0.6)",
                background: "rgba(248,250,252,0.9)",
                color: "#0f172a",
                fontSize: ".9rem",
                textDecoration: "none",
              }}
            >
              Booking
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Daten: Alternativ-Hotels in Gudauri ---------- */
/* Bildpfade (image) kannst du in /public anlegen, z.B. /location/gudauri-lodge.jpg */
const ALT_HOTELS = [
  {
    name: "Gudauri Lodge",
    image: "/location/gudauri-lodge.jpg",
    websiteUrl: "https://gudaurilodge.com/",
    bookingUrl: "https://www.booking.com/hotel/ge/gudauri-lodge.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Lodge+Gudauri",
    tags: ["Ski-in/Ski-out", "Spa & Pool", "Panorama"],
    textDe:
      "Modernes Ski-in/Ski-out-Hotel mit großem Spa-Bereich, Innenpool, Hot Tub und Sonnenterrasse. Perfekt, wenn ihr Wellness nach dem Skitag wollt.",
    textEn:
      "Modern ski-in/ski-out hotel with a large spa area, indoor pool, hot tub and sun terrace. Great if you want wellness after a day on the slopes.",
    textRu:
      "Современный ski-in/ski-out отель с большим спа-зоной, крытым бассейном, джакузи и солнечной террасой. Отличный вариант для отдыха после катания.",
    distanceDe: "Zu Fuß ca. 5–10 Minuten vom Alpina, direkt an der Piste.",
    distanceEn: "About 5–10 minutes walk from Alpina, right next to the slope.",
    distanceRu:
      "Около 5–10 минут пешком от Alpina, прямо у склона.",
  },
  {
    name: "Gudauri Inn",
    image: "/location/gudauri-inn.jpg",
    websiteUrl: "https://www.inngudauri.com/",
    bookingUrl: "https://gudauriinn.org/booking/",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Inn+Gudauri",
    tags: ["Gutes Preis-Leistungs-Verhältnis", "Restaurant", "Bergblick"],
    textDe:
      "Beliebtes Hotel mit Restaurant, Terrasse und schönem Blick ins Tal. Gut geeignet für Paare und kleine Gruppen, die Wert auf Komfort und Preis-Leistung legen.",
    textEn:
      "Popular hotel with restaurant, terrace and nice valley views. Good option for couples and small groups looking for comfort and good value.",
    textRu:
      "Популярный отель с рестораном, террасой и красивым видом на долину. Подходит для пар и небольших компаний, ценящих комфорт и разумную цену.",
    distanceDe:
      "Im unteren Teil von Gudauri; je nach Straße ca. 5–10 Fahrminuten vom Alpina.",
    distanceEn:
      "In the lower part of Gudauri; about 5–10 minutes by car from Alpina, depending on road conditions.",
    distanceRu:
      "В нижней части Гудаури; примерно 5–10 минут на машине от Alpina (в зависимости от дороги).",
  },
  {
    name: "Monte Hotel",
    image: "/location/monte-hotel-gudauri.jpg",
    websiteUrl: "https://montegudauri.com/",
    bookingUrl: "https://www.booking.com/hotel/ge/monte.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Monte+Hotel+Gudauri",
    tags: ["Sauna & Jacuzzi", "Ruhiger", "Shuttle"],
    textDe:
      "Gemütliches Hotel mit Sauna und Jacuzzi (oft im Preis inklusive). Ruhige Lage etwas oberhalb von Gudauri, meist mit Shuttle-Service zu den Liften.",
    textEn:
      "Cozy hotel with sauna and jacuzzi (often included). Quiet location slightly above Gudauri, usually with shuttle service to the lifts.",
    textRu:
      "Уютный отель с сауной и джакузи (часто включены в стоимость). Спокойное расположение чуть выше Гудаури, обычно есть трансфер к подъёмникам.",
    distanceDe:
      "Oberhalb von Gudauri, ca. 5 Minuten Fahrt oder 10–15 Minuten zu Fuß vom Alpina.",
    distanceEn:
      "Located above Gudauri, about 5 minutes by car or 10–15 minutes walk from Alpina.",
    distanceRu:
      "Над Гудаури, примерно 5 минут на машине или 10–15 минут пешком от Alpina.",
  },
  {
    name: "Hotel Carpe Diem Gudauri",
    image: "/location/carpe-diem-gudauri.jpg",
    websiteUrl: "https://carpediem.ge/",
    bookingUrl: "https://www.booking.com/hotel/ge/carpe-diem-gudauri.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Hotel+Carpe+Diem+Gudauri",
    tags: ["Nahe Lift", "Terrasse", "Sauna"],
    textDe:
      "Stylishes Hotel nahe des zentralen Skilifts mit Restaurant, Terrasse, Sauna und eigenem Skiverleih. Gute Wahl für alle, die nah am Geschehen sein wollen.",
    textEn:
      "Stylish hotel close to the central ski lift with restaurant, terrace, sauna and its own ski rental. A good choice if you want to stay close to the action.",
    textRu:
      "Стильный отель рядом с центральным подъёмником, с рестораном, террасой, сауной и собственным прокатом лыж. Хороший вариант, если хотите быть в центре событий.",
    distanceDe:
      "Zentral in Gudauri, etwa 5–10 Fahrminuten vom Alpina (je nach Straße).",
    distanceEn:
      "Central Gudauri, about 5–10 minutes by car from Alpina, depending on the road.",
    distanceRu:
      "В центре Гудаури, примерно 5–10 минут на машине от Alpina (в зависимости от дороги).",
  },
  {
    name: "Marco Polo Hotel Gudauri",
    image: "/location/marco-polo-gudauri.jpg",
    websiteUrl: "https://marcopolo.ge/",
    bookingUrl: "https://marcopolo.ge/booking/",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Marco+Polo+Hotel+Gudauri",
    tags: ["Ski-in/Ski-out", "Klassiker", "Spa & Pool"],
    textDe:
      "Traditionsreiches Hotel direkt an der Piste mit Pool, Spa, Bowling und großem Freizeitangebot. Ideal, wenn ihr ein klassisches Ski-Resort-Gefühl mögt.",
    textEn:
      "Classic ski-in/ski-out hotel right by the slope with pool, spa, bowling and plenty of activities. Ideal if you like a traditional ski resort vibe.",
    textRu:
      "Знаменитый ski-in/ski-out отель прямо у склона с бассейном, спа, боулингом и множеством развлечений. Отличен для любителей классических горнолыжных курортов.",
    distanceDe:
      "Im Zentrum von Gudauri, ca. 5–10 Minuten Fahrt vom Alpina.",
    distanceEn:
      "In central Gudauri, about 5–10 minutes by car from Alpina.",
    distanceRu:
      "В центральной части Гудаури, примерно 5–10 минут на машине от Alpina.",
  },
];
