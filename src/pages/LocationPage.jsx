import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import Gallery from "../components/Gallery.jsx";
import { TEXTS, LOCATION_DETAILS, PROGRAMM, LINKS } from "../data/constants.js";
import { Building2, MapPin } from "lucide-react";
import { getProgramm } from "../data/constants.js";

export default function LocationPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={t.locationTitle}
        subtitle={t.locationSub}
        icon={<Building2 className="w-5 h-5" />}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "1rem",
          }}
        >
          <Card title={LOCATION_DETAILS.name}>
            <p>
              <MapPin
                className="w-4 h-4"
                style={{ display: "inline", marginRight: ".25rem" }}
              />
              {LOCATION_DETAILS.adresse}
            </p>
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              {LOCATION_DETAILS.hinweise.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <a
              className="underline"
              href={LINKS.maps.methisKalaki}
              target="_blank"
              rel="noreferrer"
            >
              {t.mapOpen}
            </a>
          </Card>

          <Card title={t.dayFlow}>
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
        </div>

        <Card title={t.gallery}>
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
