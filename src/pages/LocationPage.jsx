// src/pages/LocationPage.jsx
import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";
import { TEXTS, LOCATION_DETAILS } from "../data/constants.js";
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

  const availabilityNote =
    lang === "en"
      ? "Availability and prices change quickly – please check directly via Booking or the hotel website."
      : lang === "ru"
      ? "Наличие номеров и цены постоянно меняются — проверяйте, пожалуйста, напрямую через Booking или сайт отеля."
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
                "https://www.booking.com/hotel/ge/alpina.de.html"
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
        <Card
          title={t.gallery}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
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
              <Amenity icon={<Wine size={16} />} label="Gemütliche Bar & Lounge im Haus" />
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

        {/* ---------- Hotels direkt in der Nähe ---------- */}
        <Card
          title={
            lang === "en"
              ? "Hotels very close to Alpina"
              : lang === "ru"
              ? "Отели рядом с Alpina"
              : "Hotels direkt in der Nähe"
          }
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {NEAR_HOTELS.map((h) => (
              <AltHotel key={h.name} hotel={h} lang={lang} />
            ))}
          </div>
        </Card>

        {/* ---------- Pensionen direkt in der Nähe ---------- */}
        <Card
          title={
            lang === "en"
              ? "Guesthouses & pensions near Alpina"
              : lang === "ru"
              ? "Гостевые дома рядом с Alpina"
              : "Pensionen direkt in der Nähe"
          }
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {NEAR_PENSIONS.map((h) => (
              <AltHotel key={h.name} hotel={h} lang={lang} />
            ))}
          </div>
        </Card>

        {/* ---------- Weitere Hotels in Gudauri ---------- */}
        <Card
          title={
            TEXTS[lang]?.altHotelsTitle ||
            (lang === "en"
              ? "More hotels in Gudauri"
              : lang === "ru"
              ? "Другие отели в Гудаури"
              : "Weitere Hotels in Gudauri")
          }
          className="hover-react"
          style={{ marginBottom: "1.25rem" }}
        >
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
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

/* ---------- Alternativ-Hotel-Karte (wird für alle 3 Blöcke genutzt) ---------- */
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
      {/* Bild */}
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

/* ---------- Hotels direkt in der Nähe von Alpina ---------- */
const NEAR_HOTELS = [
  {
    name: "Chalet Papa Basili",
    image: "/location/chalet-papa-basili.jpg",
    websiteUrl: "https://www.facebook.com/papabasili/",
    bookingUrl: "https://www.booking.com/hotel/ge/chalet-papa-basili.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Chalet+Papa+Basili",
    distanceDe: "Nur ca. 200 m vom Alpina entfernt",
    distanceEn: "Only about 200 m from Alpina",
    distanceRu: "Всего около 200 м от Alpina",
    textDe:
      "Gemütliches Chalet mit Bergblick. Sehr nah am Alpina – ideal für Gruppen.",
    textEn:
      "Cozy chalet with mountain views. Very close to Alpina – ideal for groups.",
    textRu:
      "Уютное шале с видом на горы. Очень близко к Alpina — идеально для компаний.",
    tags: ["Sehr nah", "Chalet", "Bergblick"],
    distanceRu: "Всего около 200 м от Alpina",
  },
  {
    name: "Monte Hotel Gudauri",
    image: "/location/monte-hotel-gudauri.jpg",
    websiteUrl: "https://montegudauri.com/",
    bookingUrl: "https://www.booking.com/hotel/ge/monte.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Monte+Hotel+Gudauri",
    distanceDe: "Etwa 400 m Fußweg zum Alpina",
    distanceEn: "About 400 m walking distance from Alpina",
    distanceRu: "Около 400 м пешком от Alpina",
    textDe:
      "Ruhiges Hotel mit Sauna & Jacuzzi. Sehr gute Lage, fußläufig zum Alpina.",
    textEn:
      "Quiet hotel with sauna & jacuzzi. Great location within walking distance to Alpina.",
    textRu:
      "Спокойный отель с сауной и джакузи. Отличное расположение, пешком до Alpina.",
    tags: ["Sehr nah", "Sauna", "Jacuzzi"],
  },
  {
    name: "Winter House Gudauri",
    image: "/location/winter-house.jpg",
    websiteUrl: "https://winterhousegudauri.com/",
    bookingUrl:
      "https://www.booking.com/hotel/ge/winter-house-gudauri.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Winter+House+Gudauri",
    distanceDe: "Ca. 250 m oberhalb des Alpina",
    distanceEn: "Around 250 m above Alpina",
    distanceRu: "Примерно 250 м выше Alpina",
    textDe: "Sehr nah, gutes Preis-Leistungs-Verhältnis, familiär geführt.",
    textEn: "Very close, good value, family-run atmosphere.",
    textRu:
      "Очень близко, хорошее соотношение цены и качества, семейная атмосфера.",
    tags: ["Sehr nah", "Familiengeführt"],
  },
  {
    name: "Hotel Tsiga",
    image: "/location/hotel-tsiga.jpg",
    websiteUrl: null,
    bookingUrl: "https://www.booking.com/hotel/ge/tsiga-gudauri.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Hotel+Tsiga+Gudauri",
    distanceDe: "Ca. 350 m zum Alpina",
    distanceEn: "Approx. 350 m to Alpina",
    distanceRu: "Около 350 м до Alpina",
    textDe: "Kleines, ruhiges Hotel – sehr nah am Alpina.",
    textEn: "Small, quiet hotel – very close to Alpina.",
    textRu: "Небольшой тихий отель — очень близко к Alpina.",
    tags: ["Sehr nah", "Klein & ruhig"],
  },
];

/* ---------- Pensionen / Guesthouses sehr nah am Alpina ---------- */
const NEAR_PENSIONS = [
  {
    name: "Snow House Gudauri",
    image: "/location/snow-house.jpg",
    websiteUrl: null,
    bookingUrl: "https://www.booking.com/hotel/ge/snow-house-gudauri.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Snow+House+Gudauri",
    distanceDe: "Nur ca. 250–300 m vom Alpina",
    distanceEn: "Only 250–300 m from Alpina",
    distanceRu: "Всего 250–300 м от Alpina",
    textDe:
      "Sehr nah, günstige Zimmer, oft mit Frühstück. Ideal für Gruppen.",
    textEn:
      "Very close, affordable rooms, often with breakfast. Ideal for groups.",
    textRu:
      "Очень близко, недорогие номера, часто с завтраком. Отлично подходит для компаний.",
    tags: ["Frühstück", "Günstig", "Sehr nah"],
  },
  {
    name: "Tsar Bani Spa & Hotel",
    image: "/location/tsar-bani.jpg",
    websiteUrl: "https://tsarbani.ge/",
    bookingUrl: "https://www.booking.com/hotel/ge/tsar-bani-spa.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Tsar+Bani+Gudauri",
    distanceDe: "Ca. 450 m bis zum Alpina",
    distanceEn: "Approx. 450 m to Alpina",
    distanceRu: "Около 450 м до Alpina",
    textDe:
      "Beliebt aufgrund Spa & Bädern. Sehr nahe Lage – viele Zimmer mit Frühstück.",
    textEn:
      "Popular due to spa & baths. Very close location – many rooms include breakfast.",
    textRu:
      "Популярно благодаря спа и баням. Очень близко — много номеров с завтраком.",
    tags: ["Spa", "Frühstück", "Sehr nah"],
  },
  {
    name: "Gudauri Loft Hotel",
    image: "/location/gudauri-loft.jpg",
    websiteUrl: "https://loftgudauri.ge/",
    bookingUrl: "https://www.booking.com/hotel/ge/gudauri-loft.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Loft+Hotel",
    distanceDe: "Rund 650 m vom Alpina",
    distanceEn: "Around 650 m from Alpina",
    distanceRu: "Около 650 м от Alpina",
    textDe:
      "Beliebtes Hotel mit Frühstück, Sauna & Rooftop. In Gehweite, aber etwas weiter.",
    textEn:
      "Popular hotel with breakfast, sauna & rooftop. Walkable but slightly farther.",
    textRu:
      "Популярный отель с завтраком, сауной и крышей. Можно дойти пешком, но чуть дальше.",
    tags: ["Frühstück", "Sauna"],
  },
  {
    name: "Loft 2 Aparthotel",
    image: "/location/loft2.jpg",
    websiteUrl: null,
    bookingUrl:
      "https://www.booking.com/hotel/ge/gudauri-loft-2.en-gb.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Loft+2",
    distanceDe: "Ca. 500–600 m vom Alpina",
    distanceEn: "Approx. 500–600 m from Alpina",
    distanceRu: "Около 500–600 м от Alpina",
    textDe:
      "Studios & Apartments – manche mit Frühstück buchbar.",
    textEn:
      "Studios & apartments – some offer breakfast options.",
    textRu:
      "Студии и апартаменты — завтрак возможен в некоторых вариантах.",
    tags: ["Apartments", "Optional Frühstück"],
  },
  {
    name: "Quadrumi Mountain House",
    image: "/location/quadrumi.jpg",
    websiteUrl: "https://quadrumi.com/",
    bookingUrl:
      "https://www.booking.com/hotel/ge/quadrumi-mountain-house.en-gb.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Quadrumi",
    distanceDe: "Etwa 900 m (Bungalows, sehr beliebt)",
    distanceEn: "Approx. 900 m (wooden bungalows)",
    distanceRu: "Около 900 м (бунгало)",
    textDe:
      "Holz-Bungalows mit sehr schöner Aussicht. Frühstück verfügbar.",
    textEn:
      "Wooden bungalows with beautiful views. Breakfast available.",
    textRu:
      "Деревянные бунгало с красивым видом. Завтрак доступен.",
    tags: ["Bungalows", "Frühstück"],
  },
];

/* ---------- Weitere Hotels in Gudauri ---------- */
const ALT_HOTELS = [
  {
    name: "Gudauri Lodge",
    image: "/location/gudauri-lodge.jpg",
    websiteUrl: "https://gudaurilodge.com/",
    bookingUrl:
      "https://www.booking.com/hotel/ge/gudauri-lodge.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Lodge",
    tags: ["Ski-in/Ski-out", "Spa & Pool", "Panorama"],
    textDe:
      "Modernes Ski-in/Ski-out-Hotel mit Spa-Bereich, Innenpool und Sonnenterrasse.",
    textEn:
      "Modern ski-in/ski-out hotel with spa, indoor pool and sun terrace.",
    textRu:
      "Современный ski-in/ski-out отель со спа, крытым бассейном и террасой.",
    distanceDe: "Wenige Fahrminuten vom Alpina",
    distanceEn: "A short drive from Alpina",
    distanceRu: "Несколько минут на машине от Alpina",
  },
  {
    name: "Gudauri Inn",
    image: "/location/gudauri-inn.jpg",
    websiteUrl: "https://www.inngudauri.com/",
    bookingUrl: "https://gudauriinn.org/booking/",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Inn",
    tags: ["Preis-Leistung", "Restaurant", "Bergblick"],
    textDe:
      "Beliebtes Hotel mit Restaurant & Terrasse. Sehr gute Option preislich.",
    textEn:
      "Popular hotel with restaurant & terrace. Strong value option.",
    textRu:
      "Популярный отель с рестораном и террасой. Хороший бюджетный вариант.",
    distanceDe: "5–10 Minuten vom Alpina",
    distanceEn: "5–10 minutes from Alpina",
    distanceRu: "5–10 минут от Alpina",
  },
  {
    name: "Carpe Diem Gudauri",
    image: "/location/carpe-diem-gudauri.jpg",
    websiteUrl: "https://carpediem.ge/",
    bookingUrl:
      "https://www.booking.com/hotel/ge/carpe-diem-gudauri.de.html",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Carpe+Diem+Gudauri",
    tags: ["Nahe Lift", "Terrasse", "Sauna"],
    textDe:
      "Stylishes Hotel nahe des Lifts mit Restaurant & Sauna.",
    textEn:
      "Stylish hotel near the lift with restaurant & sauna.",
    textRu:
      "Стильный отель рядом с подъёмником, ресторан и сауна.",
    distanceDe: "5–10 Minuten vom Alpina",
    distanceEn: "5–10 minutes from Alpina",
    distanceRu: "5–10 минут от Alpina",
  },
  {
    name: "Marco Polo Gudauri",
    image: "/location/marco-polo-gudauri.jpg",
    websiteUrl: "https://marcopolo.ge/",
    bookingUrl: "https://marcopolo.ge/booking/",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Marco+Polo+Hotel+Gudauri",
    tags: ["Klassiker", "Pool", "Spa"],
    textDe:
      "Klassisches Ski-Resort-Hotel direkt an der Piste.",
    textEn:
      "Classic ski resort hotel right by the slopes.",
    textRu:
      "Классический горнолыжный отель у трассы.",
    distanceDe: "5–10 Minuten vom Alpina",
    distanceEn: "5–10 minutes from Alpina",
    distanceRu: "5–10 минут от Alpina",
  },
];
