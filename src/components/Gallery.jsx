// src/components/Gallery.jsx
import React, { useState } from "react";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
      <rect width='100%' height='100%' fill='#f1f5f9'/>
      <text x='50%' y='50%' text-anchor='middle' font-size='18' fill='#64748b' font-family='Inter, sans-serif'>
        Bild konnte nicht geladen werden
      </text>
    </svg>`
  );

export default function Gallery({ images = [], captions = [], links = [] }) {
  // Merkt sich gebrochene Bilder und Ladezustand (für Blur-Übergang)
  const [broken, setBroken] = useState({}); // { index: true }
  const [loaded, setLoaded] = useState({}); // { index: true }

  return (
    <div
      className="gallery"
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      {images.map((src, i) => {
        const realSrc = broken[i] ? FALLBACK : src;

        const Img = (
          <div
            style={{
              position: "relative",
              width: "100%",
              // feste Ratio verhindert Layout-Shift; passe bei Bedarf an
              aspectRatio: "16 / 9",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background:
                loaded[i]
                  ? "#fff"
                  : "linear-gradient(90deg,#f3f4f6 25%,#eceef1 37%,#f3f4f6 63%)",
              backgroundSize: loaded[i] ? "auto" : "400% 100%",
              animation: loaded[i] ? "none" : "gallery-shimmer 1.2s ease-in-out infinite",
            }}
          >
            <img
              src={realSrc}
              alt={captions?.[i] || "Foto"}
              loading="lazy"
              decoding="async"
              fetchPriority={i < 2 ? "high" : "auto"} // erste Bilder bevorzugt
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded((s) => ({ ...s, [i]: true }))}
              onError={() => setBroken((b) => ({ ...b, [i]: true }))}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // sanfter Übergang vom Blur/Skeleton zum Bild
                filter: loaded[i] ? "none" : "blur(8px)",
                transform: loaded[i] ? "scale(1)" : "scale(1.02)",
                transition: "filter .35s ease, transform .35s ease, opacity .2s ease",
                opacity: broken[i] ? 0.9 : 1,
              }}
            />
          </div>
        );

        return (
          <figure key={i} style={{ margin: 0 }}>
            {links?.[i] ? (
              <a href={links[i]} target="_blank" rel="noreferrer">
                {Img}
              </a>
            ) : (
              Img
            )}
            {captions?.[i] && (
              <figcaption
                style={{
                  fontSize: ".85rem",
                  color: "#64748b",
                  marginTop: ".35rem",
                }}
              >
                {captions[i]}
              </figcaption>
            )}
          </figure>
        );
      })}

      {/* kleine Keyframes für den Skeleton-Shimmer */}
      <style>
        {`
          @keyframes gallery-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </div>
  );
}
