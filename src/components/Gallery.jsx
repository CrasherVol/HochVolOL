// src/components/Gallery.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
  const [broken, setBroken] = useState({});
  const [loaded, setLoaded] = useState({});
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const hasImages = Array.isArray(images) && images.length > 0;

  const openLightbox = (index) => {
    if (!hasImages) return;
    if (links && links[index]) return; // externe Links nicht in der Lightbox öffnen
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return current + 1 < images.length ? current + 1 : 0;
    });
  };

  const showPrev = () => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return current - 1 >= 0 ? current - 1 : images.length - 1;
    });
  };

  // ESC / Pfeiltasten + Scroll sperren, solange Lightbox offen ist
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    document.addEventListener("keydown", onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [lightboxIndex, images.length]);

  // ---------- Grid-Galerie ----------
  const grid = (
    <div
      className="gallery"
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      {images.map((src, index) => {
        const realSrc = broken[index] ? FALLBACK : src;

        const imageContent = (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: loaded[index]
                ? "#fff"
                : "linear-gradient(90deg,#f3f4f6 25%,#eceef1 37%,#f3f4f6 63%)",
              backgroundSize: loaded[index] ? "auto" : "400% 100%",
              animation: loaded[index]
                ? "none"
                : "gallery-shimmer 1.2s ease-in-out infinite",
              transform: "translateY(0)",
              transition: "transform 180ms ease-out, box-shadow 180ms ease-out",
              boxShadow: loaded[index]
                ? "0 8px 20px rgba(15,23,42,0.10)"
                : "none",
            }}
          >
            <img
              src={realSrc}
              alt={captions?.[index] || "Foto"}
              loading="lazy"
              decoding="async"
              fetchPriority={index < 2 ? "high" : "auto"}
              referrerPolicy="no-referrer"
              onLoad={() =>
                setLoaded((prev) => ({ ...prev, [index]: true }))
              }
              onError={() =>
                setBroken((prev) => ({ ...prev, [index]: true }))
              }
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: loaded[index] ? "none" : "blur(8px)",
                transform: loaded[index] ? "scale(1)" : "scale(1.02)",
                transition:
                  "filter .35s ease, transform .35s ease, opacity .2s ease",
                opacity: broken[index] ? 0.9 : 1,
              }}
            />

            {/* Overlay-Text */}
            {!links?.[index] && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0.15))",
                  opacity: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: ".8rem",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  padding: "0 1rem",
                  transition: "opacity 150ms ease-out",
                  pointerEvents: "none",
                }}
                className="gallery-overlay"
              >
                Bild vergrößern
              </div>
            )}
          </div>
        );

        const wrapper = links?.[index] ? (
          <a href={links[index]} target="_blank" rel="noreferrer">
            {imageContent}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => openLightbox(index)}
            style={{
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {imageContent}
          </button>
        );

        return (
          <figure key={index} style={{ margin: 0 }}>
            {wrapper}
            {captions?.[index] && (
              <figcaption
                style={{
                  fontSize: ".85rem",
                  color: "#64748b",
                  marginTop: ".35rem",
                  textAlign: "center",
                }}
              >
                {captions[index]}
              </figcaption>
            )}
          </figure>
        );
      })}

      {/* Shimmer + Hover per Inline-Style ergänzt */}
      <style>
        {`
          @keyframes gallery-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .gallery button > div:hover,
          .gallery a > div:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 32px rgba(15,23,42,0.22);
          }
          .gallery button > div:hover .gallery-overlay,
          .gallery a > div:hover .gallery-overlay {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );

  // ---------- Lightbox per Portal direkt in <body> ----------
  const lightbox =
    lightboxIndex !== null && hasImages
      ? createPortal(
          <div
            onClick={closeLightbox} // Klick auf dunklen Bereich schließt
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
              backdropFilter: "blur(6px)",
              padding: "3rem 1rem",
              boxSizing: "border-box",
              cursor: "zoom-out",
            }}
          >
            {/* Inhalt – Klick hier NICHT schließen */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "min(1200px, 100%)",
                maxHeight: "calc(100vh - 6rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                cursor: "default",
              }}
            >
              <img
                src={broken[lightboxIndex] ? FALLBACK : images[lightboxIndex]}
                alt={captions?.[lightboxIndex] || ""}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  borderRadius: "1.1rem",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
                  objectFit: "contain",
                }}
              />

              {captions?.[lightboxIndex] && (
                <div
                  style={{
                    color: "rgba(241,245,249,0.95)",
                    fontSize: ".95rem",
                    textAlign: "center",
                    maxWidth: "80%",
                  }}
                >
                  {captions[lightboxIndex]}
                </div>
              )}

              {/* Prev */}
              <button
                type="button"
                onClick={showPrev}
                aria-label="Vorheriges Bild"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-3.2rem",
                  transform: "translateY(-50%)",
                  width: "2.8rem",
                  height: "2.8rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "rgba(15,23,42,0.95)",
                  color: "#fff",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
                }}
              >
                {"‹"}
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Nächstes Bild"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-3.2rem",
                  transform: "translateY(-50%)",
                  width: "2.8rem",
                  height: "2.8rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "rgba(15,23,42,0.95)",
                  color: "#fff",
                  fontSize: "1.6rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
                }}
              >
                {"›"}
              </button>

              {/* X oben rechts AM Bild */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Schließen"
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "2.3rem",
                  height: "2.3rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "rgba(15,23,42,0.95)",
                  color: "#f9fafb",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {grid}
      {lightbox}
    </>
  );
}
