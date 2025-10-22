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
              href={LOCATION_DETAILS.website || "https://www.facebook.com/profile.php?id=100089988360226"}
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
              href={LINKS?.maps?.methisKalaki}
              target="_blank"
              rel="noreferrer"
            >
              {t.mapOpen}
            </a>
          </div>

          {/* Kurzbeschreibung */}
          <p style={{ marginBottom: ".75rem" }}>
            {LOCATION_DETAILS.kurzbeschreibung ||
              "Boutique-Weingut mit eleganten Zimmern, Restaurant, Terrasse mit Blick auf die Weinberge und gemütlichen Innenbereichen für Winterabende."}
          </p>

          {/* Hinweise (dein vorhandenes Feld weiter nutzen) */}
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
              <Amenity icon={<BedDouble size={16} />} label="Elegante Zimmer & Suiten" />
              <Amenity icon={<Wifi size={16} />} label="WLAN" />
              <Amenity icon={<ParkingCircle size={16} />} label="Parken am Haus" />
              <Amenity icon={<Wine size={16} />} label="Weingut · Qvevri-Verkostung" />
              <Amenity icon={<Utensils size={16} />} label="Restaurant" />
              <Amenity icon={<Bath size={16} />} label="Sauna/Spa-Bereich (je nach Saison)" />
              <Amenity icon={<Sun size={16} />} label="Sonnen-Terrasse" />
              <Amenity icon={<Snowflake size={16} />} label="Gemütliche Innenbereiche im Winter" />
              <Amenity icon={<Trees size={16} />} label="Weinberge & Natur" />
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
              <li>Sauna oder Dampfbad (saisonal/auf Anfrage)</li>
              <li>Ruheraum – perfekt für den Winter</li>
              <li>Massagen nach Verfügbarkeit</li>
            </ul>
          </Card>

          {/* Restaurant & Terrasse */}
          <Card title="Restaurant & Terrasse" className="hover-react">
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              <li>Georgische Küche, lokale Produkte</li>
              <li>Qvevri-Weine aus eigener Herstellung</li>
              <li>Überdachte Terrasse mit Weitblick</li>
              <li>Gemütliche Weinstube für den Abend</li>
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
            captions={[
              t.place.kakhetiVineyards,
              t.place.alaverdi,
              t.place.sighnaghi,
              t.place.telavi,
            ]}
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
