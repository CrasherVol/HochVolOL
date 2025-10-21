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
  const [broken, setBroken] = useState({}); // { index: true }

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

        const imgEl = (
          <img
            src={realSrc}
            alt={captions?.[i] || "Foto"}
            loading="lazy"
            referrerPolicy="no-referrer"   // <- wichtig für manche CDNs (Unsplash)
            onError={() => setBroken((b) => ({ ...b, [i]: true }))}
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              display: "block",
            }}
          />
        );

        return (
          <figure key={i} style={{ margin: 0 }}>
            {links?.[i] ? (
              <a href={links[i]} target="_blank" rel="noreferrer">
                {imgEl}
              </a>
            ) : (
              imgEl
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
    </div>
  );
}
