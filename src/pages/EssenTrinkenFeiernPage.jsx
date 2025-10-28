// src/pages/EssenTrinkenFeiernPage.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import { TEXTS } from "../data/constants.js";
import {
  Utensils, Martini, Music2, MapPin, Clock, ExternalLink, PartyPopper, Navigation
} from "lucide-react";

/* ---------------------------------------------------
   Leaflet via CDN (keine npm-Installation nötig)
---------------------------------------------------- */
function useLeafletLoader() {
  useEffect(() => {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
    if (!window.L) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      s.crossOrigin = "";
      document.body.appendChild(s);
    }
    if (!document.querySelector('script[src*="leaflet.easyPrint"]')) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.easyPrint/2.1.9/bundle.min.js";
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);
}

/* ---------------------------------------------------
   Stabile Google-Maps-Links
---------------------------------------------------- */
const HOTEL_MONTE = { lat: 42.470085, lng: 44.492783 }; // ggf. exakt ersetzen

const mapsSearchUrl = (lat, lng) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const mapsDirectionsFromHere = (lat, lng, mode = "walking") =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${mode}`;
const mapsDirectionsFromHotel = (destLat, destLng, mode = "walking") =>
  `https://www.google.com/maps/dir/?api=1&origin=${HOTEL_MONTE.lat},${HOTEL_MONTE.lng}&destination=${destLat},${destLng}&travelmode=${mode}`;

/* ---------------------------------------------------
   Kleine UI-Bausteine
---------------------------------------------------- */
function ImgSafe({ src, alt, fallback = "/hero/party-hero.png", ...rest }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? fallback : (src || fallback)}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
      {...rest}
    />
  );
}

function Tag({ children, emoji }) {
  return (
    <span
      className="inline-block text-xs px-2.5 py-1 rounded-full"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.85))",
        border: "1px solid rgba(0,0,0,.06)",
        boxShadow: "0 1px 2px rgba(0,0,0,.06)",
        display: "inline-flex",
        alignItems: "center",
        gap: ".35rem",
      }}
    >
      {emoji && <span>{emoji}</span>}
      <span>{children}</span>
    </span>
  );
}

function VibesRow({ tags }) {
  const em = (t) =>
    /pizza/i.test(t) ? "🍕" :
    /terrasse|view|blick/i.test(t) ? "🌅" :
    /après|apres|apre/i.test(t) ? "🎿" :
    /georg/i.test(t) ? "🇬🇪" :
    /cocktail|bar/i.test(t) ? "🍸" :
    /burger/i.test(t) ? "🍔" :
    /wine|wein/i.test(t) ? "🍷" : "✨";
  return (
    <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: ".6rem" }}>
      {tags?.map((t) => <Tag key={t} emoji={em(t)}>{t}</Tag>)}
    </div>
  );
}

function CTAGroup({ v }) {
  const hasGeo = v.lat && v.lng;
  return (
    <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: ".7rem" }}>
      {hasGeo && (
        <>
          <a href={mapsSearchUrl(v.lat, v.lng)} target="_blank" rel="noreferrer" className="btn-chip">📍 Ort ansehen</a>
          <a href={mapsDirectionsFromHere(v.lat, v.lng)} target="_blank" rel="noreferrer" className="btn-chip">🚶 Route (ab hier)</a>
          <a href={mapsDirectionsFromHotel(v.lat, v.lng)} target="_blank" rel="noreferrer" className="btn-chip">🏨 Route (ab Monte)</a>
        </>
      )}
      {v.menu && <a href={v.menu} target="_blank" rel="noreferrer" className="btn-chip"><Utensils size={16} /> Speisekarte</a>}
      {v.drinks && <a href={v.drinks} target="_blank" rel="noreferrer" className="btn-chip"><Martini size={16} /> Drinks</a>}
      {v.instagram && <a href={v.instagram} target="_blank" rel="noreferrer" className="btn-chip"><ExternalLink size={16} /> Instagram</a>}
    </div>
  );
}

function VenueCard({ v }) {
  const isBar = v.kind === "bar";
  const accent = isBar ? "#2563eb" : "#e11d48"; // blau / pink
  return (
    <div
      className="party-card"
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "1px",
        background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,.9) 30%, rgba(255,255,255,.9) 70%, ${accent} 100%)`,
        boxShadow: `0 10px 30px rgba(0,0,0,.08), 0 0 0 0 ${accent}33`,
        transition: "box-shadow .25s ease, transform .2s ease",
      }}
    >
      {/* Sticker-Ecke (innerhalb, überdeckt nix) */}
      <div
        style={{
          position: "absolute", top: 8, right: 8, zIndex: 1,
          background: accent, color: "white",
          borderRadius: "999px", padding: ".35rem .6rem",
          fontSize: ".8rem", boxShadow: "0 6px 16px rgba(0,0,0,.25)"
        }}
      >
        {isBar ? "🍸 Nightlife" : "🍽 Food"}
      </div>

      <div
        style={{
          borderRadius: "15px",
          background: "linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.98))",
          padding: "1rem",
        }}
      >
        <Card title={`${v.number}. ${v.name}`} className="hover-react" style={{ boxShadow: "none", border: "none" }}>
          <div
            style={{
              overflow: "hidden",
              borderRadius: "1rem",
              marginBottom: ".75rem",
              border: "1px solid rgba(255,255,255,.55)",
              background: "linear-gradient(180deg,#f8fafc,#ffffff)",
            }}
          >
            <ImgSafe
              src={v.image || "/hero/party-hero.png"}
              alt={v.name}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <VibesRow tags={v.tags} />

          <p style={{ color: "#374151", marginBottom: ".5rem", lineHeight: 1.55 }}>
            {v.desc}
          </p>

          <div style={{ display: "grid", gap: ".35rem", color: "#334155", fontSize: ".95rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <Clock size={16} />
              <span><strong>Öffnungszeiten:</strong> {v.hours} <em style={{ color: "#64748b" }}>(Winter – variiert)</em></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <MapPin size={16} />
              <span><strong>Entfernung:</strong> {v.distance}</span>
            </div>
          </div>

          <CTAGroup v={v} />
        </Card>
      </div>

      <style>{`
        .party-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 18px 40px rgba(0,0,0,.12),
            0 0 30px ${accent}33,
            0 0 6px ${accent}55 inset;
        }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------
/* ---------------------------------------------------
   Farbiges Top-Kästchen (Banner) – FIX: kein Überdecken,
   hohe Lesbarkeit mit "Glass"-Headline
---------------------------------------------------- */
function TopBanner({ onToFood, onToBars, onToMap }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "18px",
        padding: "1.25rem 1.25rem 1.5rem",
        border: "1px solid rgba(255,255,255,.6)",
        background:
          "linear-gradient(135deg, rgba(14,165,233,.20), rgba(236,72,153,.20))," +
          "url('/hero/party-hero.png') center/cover no-repeat",
        boxShadow: "0 12px 40px rgba(0,0,0,.16)",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      {/* Deko-Overlay: jetzt OHNE Klick-Blockade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,.18), transparent 45%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(236,72,153,.18), transparent 55%), " +
            "linear-gradient(0deg, rgba(0,0,0,.18), rgba(0,0,0,.18))",
        }}
      />

      {/* Inhalt oben drauf */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Headline in „Glass“-Kachel für Top-Lesbarkeit */}
        <div
          style={{
            display: "inline-block",
            padding: ".75rem 1rem",
            borderRadius: "14px",
            background: "rgba(255,255,255,.88)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            boxShadow: "0 6px 18px rgba(0,0,0,.10)",
            border: "1px solid rgba(0,0,0,.06)",
            maxWidth: "100%",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.35rem",
              lineHeight: 1.45,
              fontWeight: 800,
              color: "#0f172a", // sehr dunkel = top lesbar
              letterSpacing: ".2px",
            }}
          >
            ❄️ Energie tanken, anstoßen & feiern –
            <br />
            von der Hütte bis zur Bar, alles nur ein paar Schritte im Schnee entfernt!
          </h3>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: ".75rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onToFood}
            className="btn-chip"
            style={{
              background: "rgba(255,255,255,.95)",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <Utensils size={16} /> Restaurants
          </button>
          <button
            onClick={onToBars}
            className="btn-chip"
            style={{
              background: "rgba(255,255,255,.95)",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <Martini size={16} /> Bars & Clubs
          </button>
          <button
            onClick={onToMap}
            className="btn-chip"
            style={{
              background: "rgba(255,255,255,.95)",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <Navigation size={16} /> Karte
          </button>
        </div>
      </div>
    </div>
  );
}




/* ---------------- OSM-Karte (unten) ---------------- */
function MapGudauri({ venues, center=[HOTEL_MONTE.lat, HOTEL_MONTE.lng], zoom=15 }) {
  useLeafletLoader();
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const renderMarkers = useCallback(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map) return;

    if (map._gudauriMarkers) map._gudauriMarkers.forEach(m => map.removeLayer(m));
    map._gudauriMarkers = [];

    const iconFor = (v) => {
      const isBar = v.kind === "bar";
      const bg  = isBar ? "#2563eb" : "#e11d48";
      const emo = isBar ? "🍷" : "🍽";
      const html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;transform:translateY(-4px)">
          <div style="width:36px;height:36px;border-radius:9999px;background:${bg};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.28)">${v.number}</div>
          <div style="font-size:14px;line-height:14px;">${emo}</div>
        </div>`;
      return L.divIcon({ className: "pin-numbered", html, iconSize: [36,42], iconAnchor: [18,18], popupAnchor: [0,-16] });
    };

    const group = [];
    venues.filter(v => v.lat && v.lng).forEach(v => {
      const m = window.L.marker([v.lat, v.lng], { icon: iconFor(v) }).addTo(map);
      const kindLabel = v.kind === "bar" ? "Bar · Nightlife · Après-Ski" : "Restaurant · Café";
      const popup = `
        <div style="min-width:240px">
          <strong>${v.number}. ${v.name}</strong><br/>
          <small>${kindLabel}</small><br/>
          <small>Öffnungszeiten: ${v.hours} (Winter)</small><br/>
          <a href="${mapsSearchUrl(v.lat, v.lng)}" target="_blank" rel="noreferrer">Ort ansehen</a> ·
          <a href="${mapsDirectionsFromHere(v.lat, v.lng)}" target="_blank" rel="noreferrer">Route (ab hier)</a> ·
          <a href="${mapsDirectionsFromHotel(v.lat, v.lng)}" target="_blank" rel="noreferrer">Route (ab Monte)</a>
        </div>`;
      m.bindPopup(popup);
      map._gudauriMarkers.push(m);
      group.push(m);
    });

    if (group.length) {
      const g = window.L.featureGroup(group);
      map.fitBounds(g.getBounds().pad(0.22));
    }
  }, [venues]);

  useEffect(() => {
    const i = setInterval(() => {
      if (!window.L || !containerRef.current) return;

      if (!mapRef.current) {
        const L = window.L;
        const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(center, zoom);
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        renderMarkers();
      }

      if (mapRef.current && window.L && window.L.easyPrint && !mapRef.current._printAdded) {
        window.L.easyPrint({
          title: "Karte speichern",
          position: "topleft",
          exportOnly: true,
          sizeModes: ["A4Portrait", "A4Landscape"],
          filename: "gudauri-food-drinks-map",
        }).addTo(mapRef.current);
        mapRef.current._printAdded = true;
      }
    }, 80);
    return () => clearInterval(i);
  }, [center, zoom, renderMarkers]);

  useEffect(() => { renderMarkers(); }, [renderMarkers]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "560px",
        borderRadius: "0.95rem",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.55)",
        boxShadow: "0 6px 22px rgba(0,0,0,.06)",
      }}
    />
  );
}

/* ---------------- Seite: Restaurants → Bars → Karte ---------------- */
export default function EssenTrinkenFeiernPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  const restaurants = [
    { number: 1, kind: "restaurant", name: "Drunk Cherry (Mtvrali Alubali)", tags: ["Georgisch","Pizza","Terrasse","Après-Ski"], desc: "Legendärer Treff mit Aussicht. Georgische Klassiker, Burger & Pizza, große Terrasse.", hours: "09:00–01:00", distance: "~12–15 Min zu Fuß vom Monte", image: "/places/drunk-cherry.webp", lat: 42.46996, lng: 44.49085, menu: "https://drunkcherrygudauri.com/menu/" },
    { number: 2, kind: "restaurant", name: "AfterSkis", tags: ["Georgisch","Rustikal","Dinner"], desc: "Gemütlich & authentisch – Georgische Hausküche mit Chacha, ideal zum Abendessen.", hours: "09:00–23:00", distance: "~10–15 Min zu Fuß", image: "/places/afterskis.webp", lat: 42.4619129, lng: 44.4822779 },
    { number: 3, kind: "restaurant", name: "Cafe Vitamin (am Soliko-Lift)", tags: ["Tagescafé","Pistenblick"], desc: "Khachapuri, Suppen & heiße Getränke direkt am Hang.", hours: "10:00–17:00", distance: "~15–20 Min zu Fuß", image: "/places/cafe-vitamin.webp", lat: 42.49013, lng: 44.49931 },
    { number: 4, kind: "restaurant", name: "Marco Polo Restaurant „Soliko“", tags: ["Hotelrestaurant","Klassisch"], desc: "Gehobenes Dinner im Marco Polo Hotel mit georgisch-europäischer Küche & Bar.", hours: "18:00–23:00", distance: "~12–18 Min zu Fuß", image: "/places/marco-polo-soliko.webp", lat: 42.4719, lng: 44.4925 },
  ];
  const bars = [
    { number: 101, kind: "bar", name: "Gudauri Travel Bar (Block 1)", tags: ["Cocktails","DJ","Après-Ski"], desc: "Kultige Cocktailbar in New Gudauri Block 1 – Drinks, guter Sound, Ski-Movies.", hours: "09:00–02:00", distance: "~10–15 Min zu Fuß", image: "/places/gudauri-travel-bar.webp", lat: 42.470085, lng: 44.492783, instagram: "https://www.instagram.com/gudauribar/" },
    { number: 102, kind: "bar", name: "Black Dog Bar", tags: ["Craft Beer","Snacks","DJ/Live"], desc: "Kleine Bar nahe Gondel – Craft-Beer-Auswahl, Snacks & gelegentlich DJs.", hours: "14:00–01:00", distance: "~10–12 Min zu Fuß", image: "/places/black-dog-bar.webp", lat: 42.4698897, lng: 44.4917754, instagram: "https://www.instagram.com/blackdogbars_georgia/" },
    { number: 103, kind: "bar", name: "Grizzly Bar (Loft 1)", tags: ["DJ","Shots","Party"], desc: "Après-Ski pur: Shots, DJs, Tanzfläche. Direkt im Loft-Komplex.", hours: "09:00–23:00", distance: "~8–10 Min zu Fuß", image: "/places/grizzly-bar.webp", lat: 42.470085, lng: 44.492783, instagram: "https://www.instagram.com/grizzly_bar_gudauri/" },
    { number: 104, kind: "bar", name: "Posta Bar (Posta Hotel)", tags: ["Cocktails","Lounge","Modern"], desc: "Stylishe Bar im Posta Hotel – internationale Crowd, Cocktails & Design.", hours: "17:00–01:00", distance: "~10–12 Min zu Fuß", image: "/places/posta-bar.webp", lat: 42.47039, lng: 44.49312, instagram: "https://www.instagram.com/postabar_gudauri/" },
    { number: 105, kind: "bar", name: "Papa Basil’s (Chalet Papa Basili)", tags: ["Wein & Chacha","Lounge"], desc: "Kleine Weinbar mit lokalem Wein & Häppchen.", hours: "16:00–00:00", distance: "~5–10 Min zu Fuß", image: "/places/papa-basil.webp", lat: 42.4763221, lng: 44.4781296 },
    { number: 106, kind: "bar", name: "Tram Station Bar (bei der Gondel)", tags: ["Panorama","Cocktails"], desc: "An der Gondel – Aussicht, Drinks & lockere Stimmung.", hours: "11:00–19:00", distance: "~15 Min zu Fuß", image: "/places/tram-station.webp", lat: 42.4695, lng: 44.4945 },
  ];
  const allVenues = useMemo(() => [...restaurants, ...bars], []);

  // Anchors
  const foodRef = useRef(null);
  const barsRef = useRef(null);
  const mapRef  = useRef(null);
  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title="🍽 Essen · Trinken · Feiern"
        subtitle="Gudauri zu Fuß erleben – essen, anstoßen, feiern & wieder von vorn."
        icon={<PartyPopper className="w-5 h-5" />}
      >
        {/* 🔵 Farbiges Top-Kästchen */}
        <TopBanner
          onToFood={() => scrollTo(foodRef)}
          onToBars={() => scrollTo(barsRef)}
          onToMap={() => scrollTo(mapRef)}
        />

        {/* --- RESTAURANTS --- */}
        <h2
          ref={foodRef}
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            color: "#0ea5e9",
            textShadow: "0 0 8px rgba(56,189,248,0.6)",
            letterSpacing: "0.5px",
          }}
        >
          🍽 Restaurants & Cafés
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.25rem",
            alignItems: "start",
            marginBottom: "2rem",
            marginTop: ".35rem",
          }}
        >
          {restaurants.map((v) => <VenueCard key={v.number} v={v} />)}
        </div>

        {/* --- BARS --- */}
        <h2
          ref={barsRef}
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            margin: "1.25rem 0 0.75rem",
            color: "#f43f5e",
            textShadow: "0 0 8px rgba(244,63,94,0.6)",
            letterSpacing: "0.5px",
          }}
        >
          🍸 Bars & Clubs · Après-Ski
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "1.25rem",
            alignItems: "start",
            marginBottom: "2rem",
            marginTop: ".35rem",
          }}
        >
          {bars.map((v) => <VenueCard key={v.number} v={v} />)}
        </div>

        {/* --- KARTE UNTEN --- */}
        <h2
          ref={mapRef}
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            margin: "1.5rem 0 0.75rem",
            color: "#22c55e",
            textShadow: "0 0 8px rgba(34,197,94,0.5)",
            letterSpacing: "0.5px",
          }}
        >
          🗺 Karte & Wegweiser
        </h2>

        <Card title="Map · Restaurants & Nightlife (fußläufig ab Monte)" className="hover-react">
          <MapGudauri venues={allVenues} />
        </Card>
      </Section>
    </Layout>
  );
}
