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
  Bath,
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
  t?.galleryCaptions?.alpina2 || "Alpina Terasse bei Schnee",
  t?.galleryCaptions?.alpina3 || "Alpina bei Schnee",
  t?.galleryCaptions?.alpina4 || "Alpina Kaminzimmer",
];


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
              href={
                LOCATION_DETAILS.website || "https://hotelalpina.ge/"
              }
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
              <div style={{ marginLeft: "auto", color: "#64748b" }}>{p.place}</div>
            </div>
          ))}
        </Card>

        {/* ---------- Galerie ---------- */}
        <Card title={t.gallery} className="hover-react">
          <Gallery images={LOCATION_DETAILS.galerie} captions={galleryCaptions} />
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
