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
  Trees,
} from "lucide-react";

export default function LocationPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Bild oben in der Unterkunftskarte:
  // nimmt das 1. Galerie-Bild, sonst das lokale Fallback aus /public
  const heroImage =
    (Array.isArray(LOCATION_DETAILS?.galerie) && LOCATION_DETAILS.galerie[0]) ||
    "/Hotel-Monte-Gudauri.jpg";

  // Galerie-Captions passend zu Gudauri/Monte (mit Fallbacks, falls keine Übersetzungen existieren)
  const galleryCaptions = [
    t?.galleryCaptions?.monte1 || "Hotel Monte Gudauri",
    t?.galleryCaptions?.monte2 || "Blick über Gudauri",
    t?.galleryCaptions?.monte3 || "Shino-Skilift & Pisten",
    t?.galleryCaptions?.monte4 || "Kaukasus-Panorama",
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
              alt={LOCATION_DETAILS?.name || "Hotel Monte Gudauri"}
              style={{
                width: "100%",
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
              style={{ display: "inline", marginRight: ".25rem", verticalAlign: "-2px" }}
            />
            {LOCATION_DETAILS.adresse}
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
            <a
              className="cta-primary"
              href={
                LOCATION_DETAILS.website ||
                "https://www.facebook.com/profile.php?id=100089988360226"
              }
              target="_blank"
              rel="noreferrer"
            >
              {t.website || "Website"}
            </a>
            <a
              className="cta-ghost"
              href={LOCATION_DETAILS.bookingUrl || (LINKS?.booking?.methis ?? "#")}
              target="_blank"
              rel="noreferrer"
            >
              Booking
            </a>
            <a
              className="cta-ghost"
              href={LOCATION_DETAILS.mapsUrl || "https://www.google.com/maps/search/?api=1&query=Monte+Hotel+Gudauri"}
              target="_blank"
              rel="noreferrer"
            >
              {t.mapOpen}
            </a>
          </div>

          {/* Kurzbeschreibung */}
          <p style={{ marginBottom: ".75rem" }}>
            {LOCATION_DETAILS.kurzbeschreibung ||
              "Gemütliches Hotel im Skigebiet Gudauri – mit Restaurant, Bar, Sauna, Jacuzzi und weitem Bergblick über den Kaukasus."}
          </p>

          {/* Hinweise (bestehendes Feld weiter nutzen) */}
          {Array.isArray(LOCATION_DETAILS.hinweise) && LOCATION_DETAILS.hinweise.length > 0 && (
            <ul style={{ marginLeft: "1rem", listStyle: "disc", marginBottom: "0.75rem" }}>
              {LOCATION_DETAILS.hinweise.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </Card>

        {/* ---------- GRID: Ausstattung / Zimmer / Spa / Essen & Terrasse ---------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            marginBottom: "1.25rem", // << Abstand NACH obenem Grid
          }}
        >
          {/* Ausstattung */}
          <Card title={t.tipsTitle || "Ausstattung"} className="hover-react">
            <div className="amenities" style={{ display: "grid", gap: ".5rem" }}>
              <Amenity icon={<BedDouble size={16} />} label="Komfortable Zimmer (teils mit Balkon/Ausblick)" />
              <Amenity icon={<Wifi size={16} />} label="WLAN inklusive" />
              <Amenity icon={<ParkingCircle size={16} />} label="Kostenlose Parkplätze" />
              <Amenity icon={<Utensils size={16} />} label="Restaurant & Bar im Haus" />
              <Amenity icon={<Bath size={16} />} label="Sauna & Jacuzzi (inklusive)" />
              <Amenity icon={<Sun size={16} />} label="Shuttle zum Shino-Skilift" />
              <Amenity icon={<Snowflake size={16} />} label="Ski-Lagerung / Wintersportlage" />
            </div>
          </Card>

          {/* Zimmer */}
          <Card title="Zimmer" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>Double / Twin · teilweise mit Balkon & Blick</li>
              <li>Hochwertige Bettwäsche, gute Schallisolierung</li>
              <li>Eigenes Bad, Pflegeprodukte, Föhn</li>
              <li>Heizung · Wasserkocher · Minibar (je nach Zimmer)</li>
            </ul>
          </Card>

          {/* Spa & Wellness */}
          <Card title="Spa & Wellness" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>Sauna & Jacuzzi (für Gäste inklusive)</li>
              <li>Ruheraum – perfekt für Wintertage</li>
              <li>Massagen nach Verfügbarkeit</li>
            </ul>
          </Card>

          {/* Restaurant & Terrasse */}
          <Card title="Restaurant & Terrasse" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>Georgische & internationale Küche</li>
              <li>Bar/Lounge für den Abend</li>
              <li>Frühstücksbuffet verfügbar</li>
              <li>Überdachte Terrasse mit Bergblick</li>
            </ul>
          </Card>
        </div>

        {/* ---------- Tagesablauf ---------- */}
        <Card
          title={t.dayFlow}
          className="hover-react"
          style={{ marginBottom: "1.25rem" }} // << Abstand unterhalb
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
              <div style={{ width: "5rem", textAlign: "center", fontFeatureSettings: '"tnum" 1' }}>
                {p.time}
              </div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ marginLeft: "auto", color: "#64748b" }}>{p.place}</div>
            </div>
          ))}
        </Card>

        {/* ---------- Galerie ---------- */}
        <Card title={t.gallery} className="hover-react">
          <Gallery
            images={LOCATION_DETAILS.galerie}
            captions={galleryCaptions}
          />
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
