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

        // Hauptbeschreibung Alpina je Sprache
  const mainDescDe =
    "Modernes Hotel im Skigebiet Gudauri – mit Sonnenterrasse, Restaurant, Bar und weitem Bergblick über den Kaukasus. Direkter Zugang zu den Skipisten (ski-in / ski-out).";

  const mainDescEn =
    "Modern hotel in the Gudauri ski area – with sun terrace, restaurant, bar and wide mountain views across the Caucasus. Direct access to the slopes (ski-in / ski-out).";

  const mainDescRu =
    "Современный отель на горнолыжном курорте Гудаури — с солнечной террасой, рестораном, баром и панорамными видами на Кавказ. Прямой выход на склоны (ski-in / ski-out).";

  const mainDesc =
    lang === "en"
      ? mainDescEn
      : lang === "ru"
      ? mainDescRu
      : LOCATION_DETAILS.kurzbeschreibung || mainDescDe;

  // Stichpunkte/Hinweise je Sprache
  const hintsByLang = {
    de: [
      "Ski-in / Ski-out – direkter Pistenzugang.",
      "Frühstücksbuffet täglich im Restaurant verfügbar.",
      "Kostenlose Parkplätze direkt am Hotel.",
    ],
    en: [
      "Ski-in / ski-out – direct access to the slopes.",
      "Breakfast buffet available every morning in the restaurant.",
      "Free parking directly at the hotel.",
    ],
    ru: [
      "Ski-in / ski-out — прямой выход на трассы.",
      "Завтрак-шведский стол подаётся каждый день в ресторане.",
      "Бесплатная парковка прямо у отеля.",
    ],
  };

  const hints =
    hintsByLang[lang] ||
    LOCATION_DETAILS.hinweise ||
    hintsByLang.de;

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
              {lang === "en" ? "Booking.com" : lang === "ru" ? "Бронирование" : "Booking"}
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

          {/* Kurzbeschreibung (i18n) */}
          <p style={{ marginBottom: ".75rem" }}>{mainDesc}</p>

          {/* Hinweise (i18n) */}
          {Array.isArray(hints) && hints.length > 0 && (
            <ul
              style={{
                marginLeft: "1rem",
                listStyle: "disc",
                marginBottom: "0.75rem",
              }}
            >
              {hints.map((h, i) => (
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
                label={
                  lang === "en"
                    ? "Comfortable rooms, many with balcony & mountain views"
                    : lang === "ru"
                    ? "Комфортные номера, многие с балконом и видом на горы"
                    : "Komfortable Zimmer, viele mit Balkon & Bergblick"
                }
              />
              <Amenity
                icon={<Wifi size={16} />}
                label={
                  lang === "en"
                    ? "Free Wi-Fi throughout the hotel"
                    : lang === "ru"
                    ? "Бесплатный Wi-Fi по всему отелю"
                    : "Kostenfreies WLAN im ganzen Hotel"
                }
              />
              <Amenity
                icon={<ParkingCircle size={16} />}
                label={
                  lang === "en"
                    ? "Free parking directly at the hotel"
                    : lang === "ru"
                    ? "Бесплатная парковка прямо у отеля"
                    : "Kostenlose Parkplätze direkt am Hotel"
                }
              />
              <Amenity
                icon={<Utensils size={16} />}
                label={
                  lang === "en"
                    ? "Restaurant with Georgian & European cuisine"
                    : lang === "ru"
                    ? "Ресторан с грузинской и европейской кухней"
                    : "Restaurant mit georgischer & europäischer Küche"
                }
              />
              <Amenity
                icon={<Wine size={16} />}
                label={
                  lang === "en"
                    ? "Cozy bar & lounge in-house"
                    : lang === "ru"
                    ? "Уютный бар и лаунж в отеле"
                    : "Gemütliche Bar & Lounge im Haus"
                }
              />
              <Amenity
                icon={<Sun size={16} />}
                label={
                  lang === "en"
                    ? "Sun terrace with panorama over Gudauri"
                    : lang === "ru"
                    ? "Солнечная терраса с панорамой Гудаури"
                    : "Sonnenterrasse mit Panorama über Gudauri"
                }
              />
              <Amenity
                icon={<Snowflake size={16} />}
                label={
                  lang === "en"
                    ? "Direct access to the slopes (ski-in/ski-out)"
                    : lang === "ru"
                    ? "Прямой выход на трассы (ski-in/ski-out)"
                    : "Direkter Zugang zu den Skipisten (ski-in/ski-out)"
                }
              />
            </div>
          </Card>

          {/* Zimmer */}
          <Card
            title={
              lang === "en" ? "Rooms" : lang === "ru" ? "Номера" : "Zimmer"
            }
            className="hover-react"
          >
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>
                {lang === "en"
                  ? "Double / Twin & family rooms – some with balcony & mountain view"
                  : lang === "ru"
                  ? "Двухместные / семейные номера — частично с балконом и видом на горы"
                  : "Double / Twin & Familienzimmer – teilweise mit Balkon & Bergblick"}
              </li>
              <li>
                {lang === "en"
                  ? "High-quality bedding, TV & good soundproofing"
                  : lang === "ru"
                  ? "Качественное постельное бельё, TV и хорошая шумоизоляция"
                  : "Hochwertige Bettwäsche, TV & gute Schallisolierung"}
              </li>
              <li>
                {lang === "en"
                  ? "Private bathroom with toiletries & hairdryer"
                  : lang === "ru"
                  ? "Собственная ванная комната с косметическими средствами и феном"
                  : "Eigenes Bad mit Pflegeprodukten & Föhn"}
              </li>
              <li>
                {lang === "en"
                  ? "Heating · kettle/coffee setup (depending on room type)"
                  : lang === "ru"
                  ? "Отопление · чайник/кофе-сет (в зависимости от типа номера)"
                  : "Heizung · Wasserkocher/Kaffee-Setup (je nach Zimmer)"}
              </li>
            </ul>
          </Card>

          {/* Aktivitäten & Freizeit */}
          <Card
            title={
              lang === "en"
                ? "Activities & leisure"
                : lang === "ru"
                ? "Активности и отдых"
                : "Aktivitäten & Freizeit"
            }
            className="hover-react"
          >
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>
                {lang === "en"
                  ? "Ski-in/ski-out & short ways to the lifts"
                  : lang === "ru"
                  ? "Ski-in/ski-out и короткая дорога до подъёмников"
                  : "Ski-in/Ski-out & kurze Wege zu den Liften"}
              </li>
              <li>
                {lang === "en"
                  ? "Skiing and snowboarding directly from the hotel"
                  : lang === "ru"
                  ? "Катание на лыжах и сноуборде прямо от отеля"
                  : "Ski- und Snowboardfahren direkt ab Unterkunft"}
              </li>
              <li>
                {lang === "en"
                  ? "Cozy lounge areas for the evening"
                  : lang === "ru"
                  ? "Уютные лаунж-зоны для вечера"
                  : "Gemütliche Lounge-Bereiche für den Abend"}
              </li>
            </ul>
          </Card>

          {/* Restaurant & Terrasse */}
          <Card
            title={
              lang === "en"
                ? "Restaurant & terrace"
                : lang === "ru"
                ? "Ресторан и терраса"
                : "Restaurant & Terrasse"
            }
            className="hover-react"
          >
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>
                {lang === "en"
                  ? "Georgian & international cuisine in the in-house restaurant"
                  : lang === "ru"
                  ? "Грузинская и международная кухня в ресторанe отеля"
                  : "Georgische & internationale Küche im hauseigenen Restaurant"}
              </li>
              <li>
                {lang === "en"
                  ? "Bar/lounge for the evening"
                  : lang === "ru"
                  ? "Бар/лаунж для вечера"
                  : "Bar/Lounge für den Abend"}
              </li>
              <li>
                {lang === "en"
                  ? "Breakfast buffet available"
                  : lang === "ru"
                  ? "Доступен завтрак-шведский стол"
                  : "Frühstücksbuffet verfügbar"}
              </li>
              <li>
                {lang === "en"
                  ? "Sun terrace with unobstructed mountain views"
                  : lang === "ru"
                  ? "Солнечная терраса с открытым видом на горы"
                  : "Sonnenterrasse mit freiem Blick auf die Berge"}
              </li>
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

  const routeLabel =
    lang === "en"
      ? "Open route from Alpina in Google Maps"
      : lang === "ru"
      ? "Открыть маршрут от Alpina в Google Картах"
      : "Route vom Alpina auf Google Maps öffnen";

  const websiteLabel =
    lang === "en" ? "Website" : lang === "ru" ? "Веб-сайт" : "Website";

  const bookingLabel =
    lang === "en" ? "Booking" : lang === "ru" ? "Бронирование" : "Booking";

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
              {routeLabel}
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
              {websiteLabel}
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
              {bookingLabel}
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
    websiteUrl: "https://www.chaletpapabasili.com/",
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
    websiteUrl: "https://www.winterhouse.ge/home/en",
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
    websiteUrl: "https://www.tsiga.ge/",
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
  name: "Four Seasons – New Gudauri",
  image: "/location/four-seasons-new-gudauri.jpg",
  websiteUrl: "https://www.gudauriski.ge/fourseasons",
  bookingUrl: "https://www.booking.com/Share-qRbQlt",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=New+Gudauri+Four+Seasons",
  tags: ["Modern", "Top Bewertungen", "Komfort"],

  textDe:
    "Modernes und sehr beliebtes Hotel im Herzen von New Gudauri. Komfortable Zimmer, schöne Aussicht und ideale Lage für Aktivitäten.",
  textEn:
    "Modern and very popular hotel in the heart of New Gudauri. Comfortable rooms, great views and an ideal location for activities.",
  textRu:
    "Современный и очень популярный отель в центре Нью Гудаури. Комфортабельные номера, красивый вид и отличное расположение для отдыха.",

  distanceDe: "Ca. 1–2 km vom Alpina (etwa 3–5 Minuten Fahrt)",
  distanceEn: "Approx. 1–2 km from Alpina (about 3–5 min by car)",
  distanceRu: "Около 1–2 км от Alpina (примерно 3–5 минут на машине)",
},
{
    name: "Tsar Bani Spa & Hotel",
    image: "/location/tsar-bani.jpg",
    websiteUrl: "http://www.tsarbani.com/",
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
    websiteUrl: "https://gudauriloft.ge/",
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
    bookingUrl: "https://www.booking.com/Share-65ajzb5",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Alpina+Hotel+Gudauri&destination=Gudauri+Loft+2",
    distanceDe: "Ca. 500–600 m vom Alpina",
    distanceEn: "Approx. 500–600 m from Alpina",
    distanceRu: "Около 500–600 м от Alpina",
    textDe: "Studios & Apartments – manche mit Frühstück buchbar.",
    textEn: "Studios & apartments – some offer breakfast options.",
    textRu:
      "Студии и апартаменты — завтрак возможен в некоторых вариантах.",
    tags: ["Apartments", "Optional Frühstück"],
  },
  {
    name: "Quadrumi Mountain House",
    image: "/location/quadrumi.jpg",
    websiteUrl: "https://quadrum-gudauri.com/",
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
    distanceDe: "Ca. 2–3 km vom Alpina (etwa 5–7 Min Fahrt)",
    distanceEn: "Approx. 2–3 km from Alpina (about 5–7 min by car)",
    distanceRu: "Около 2–3 км от Alpina (примерно 5–7 минут на машине)",
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
    distanceDe: "Ca. 3–4 km vom Alpina (etwa 5–10 Min Fahrt)",
    distanceEn: "Approx. 3–4 km from Alpina (about 5–10 min by car)",
    distanceRu: "Около 3–4 км от Alpina (примерно 5–10 минут на машине)",
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
    distanceDe: "Ca. 3–4 km vom Alpina (etwa 5–10 Min Fahrt)",
    distanceEn: "Approx. 3–4 km from Alpina (about 5–10 min by car)",
    distanceRu: "Около 3–4 км от Alpina (примерно 5–10 минут на машине)",
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
    distanceDe: "Ca. 3–4 km vom Alpina (etwa 5–10 Min Fahrt)",
    distanceEn: "Approx. 3–4 km from Alpina (about 5–10 min by car)",
    distanceRu: "Около 3–4 км от Alpina (примерно 5–10 минут на машине)",
  },
];
