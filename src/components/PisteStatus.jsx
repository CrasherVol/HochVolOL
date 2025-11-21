// src/components/PisteStatus.jsx
import React from "react";

/**
 * Einfache Pistenstatus-Box:
 *  - props.lang: "de" | "en" | "ru"
 *  - props.links?: { status?: string, webcams?: string, map?: string }
 *  - props.note?: string (kleiner Hinweis unter den Buttons)
 */
export default function PisteStatus({ lang = "de", links = {}, note }) {
  const t = {
    title: { de: "Pisten & Lifte", en: "Slopes & Lifts", ru: "Трассы и подъёмники" },
    status: { de: "Status", en: "Status", ru: "Статус" },
    webcams: { de: "Webcams", en: "Webcams", ru: "Веб-камеры" },
    map: { de: "Pistenplan", en: "Piste map", ru: "Карта трасс" },
    hint: {
      de: "Winterstraßen: Je nach Schneefall/ Wind können Lifte und Straßen kurzfristig schließen.",
      en: "Winter roads: Lifts and roads may close at short notice due to snow/wind.",
      ru: "Зимой трассы/дороги могут закрываться из-за снега/ветра.",
    },
  };

  const L = (k) => t[k]?.[lang] ?? t[k]?.de ?? k;

  const Btn = ({ href, children }) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={btn}
        className="link-special"
      >
        {children}
      </a>
    ) : null;

  return (
    <div style={wrap}>
      <div style={titleRow}>{L("title")}</div>

  <div style={btnRow}>
  <Btn href={links.status}>{L("status")}</Btn>
  <Btn href={links.map}>{L("map")}</Btn>
</div>


      <p style={hint}>{note || L("hint")}</p>
    </div>
  );
}

/* --------- styles --------- */
const wrap = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.65))",
  borderRadius: 16,
  padding: 16,
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  backdropFilter: "blur(8px)",
};

const titleRow = { fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", marginBottom: 8 };

const btnRow = { display: "flex", gap: ".5rem", flexWrap: "wrap" };

const btn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.08)",
  textDecoration: "none",
};

const hint = { fontSize: ".9rem", color: "#64748b", marginTop: 10 };
