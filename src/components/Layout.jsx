// src/components/Layout.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  CalendarHeart,
  Plane,
  Globe2,
  Users,
  Home as HomeIcon,
  Building2,
  Snowflake,
  Martini, // 🍸 neues Icon für Essen · Trinken · Feiern
} from "lucide-react";
import { TEXTS, DATUM, PAAR } from "../data/constants";
import { googleCalUrl } from "../data/calendar";
import WeatherWidget from "./WeatherWidget.jsx";

/* --- Kleine Flaggen (inline SVG) --- */
function Flag({ code }) {
  if (code === "de") {
    return (
      <svg className="flag" viewBox="0 0 3 2" aria-label="Deutsch">
        <rect width="3" height="2" fill="#ffce00" />
        <rect width="3" height="1.333" y="0" fill="#dd0000" />
        <rect width="3" height="0.666" y="0" fill="#000" />
      </svg>
    );
  }
  if (code === "en") {
    return (
      <svg className="flag" viewBox="0 0 60 30" aria-label="English (UK)">
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v-15 h-60 v30 h60 v-15 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 60,30 M60,0 0,30"
            clipPath="url(#t)"
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }
  // RU
  return (
    <svg className="flag" viewBox="0 0 3 2" aria-label="Русский">
      <rect width="3" height="2" fill="#d52b1e" />
      <rect width="3" height="1.333" y="0" fill="#0039a6" />
      <rect width="3" height="0.666" y="0" fill="#fff" />
    </svg>
  );
}

/* --- Sprach-Umschalter (Flaggen) --- */
function LangSwitcher({ lang, setLang }) {
  const langs = ["de", "en", "ru"];
  return (
    <div className="lang-wrap">
      {langs.map((code) => (
        <button
          key={code}
          className={`flag-btn ${lang === code ? "active" : ""}`}
          onClick={() => setLang(code)}
          title={code.toUpperCase()}
          aria-pressed={lang === code}
        >
          <Flag code={code} />
        </button>
      ))}
    </div>
  );
}

/* --- Header mit Navigation + Kalender + Flaggen + Wetter rechts --- */
function Header({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Sprachabhängiger Label-Text für die neue Seite
  const eatDrinkPartyLabel =
    (lang === "en" && "Eat · Drink · Party") ||
    (lang === "ru" && "Еда · Напитки · Вечеринка") ||
    "Essen · Trinken · Feiern";

  const nav = [
    { to: "/", label: t.nav.start, icon: <HomeIcon size={16} /> },
    { to: "/fluege", label: t.nav.flights, icon: <Plane size={16} /> },
    { to: "/location", label: t.nav.location, icon: <Building2 size={16} /> },
    { to: "/ort", label: t.nav.region, icon: <Globe2 size={16} /> },
    { to: "/winter", label: t.nav.winter, icon: <Snowflake size={16} /> },

    // ⬇️ Neuer Menüpunkt statt "Galerie"
    { to: "/essen-trinken-feiern", label: eatDrinkPartyLabel, icon: <Martini size={16} /> },

    { to: "/rsvp", label: t.nav.rsvp, icon: <Users size={16} /> },
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Logo / Brand */}
        <Link to="/" className="brand">
          <img src="/vo-logo.png" alt="Volker & Olga Logo" className="brand-logo" />
          <span className="brand-name">Volker&nbsp;&amp;&nbsp;Olga</span>
        </Link>

        {/* Navigation + Utilities rechts */}
        <div className="topbar-right">
          <nav className="topnav" aria-label="Hauptnavigation">
            {nav.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <span className="nav-ico">{icon}</span>
                <span>{label}</span>
                <i className="underline" aria-hidden />
              </NavLink>
            ))}
          </nav>

          <div className="top-utils" style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            <a href={googleCalUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <CalendarHeart size={16} />
              <span>{t.nav.calendar}</span>
            </a>

            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* --- Footer --- */
function Footer() {
  const year = new Date(DATUM.iso).getFullYear();
  return (
    <footer
      className="footer"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "2rem 1rem",
        textAlign: "center",
        color: "#64748b",
      }}
    >
      © {year} Hochzeit {PAAR.braeutigam} & {PAAR.braut} · Chateau Methis Kalaki
    </footer>
  );
}

/* --- Layout-Wrapper --- */
export default function Layout({ children, lang, setLang }) {
  return (
    <div
      className="layout-root"
      style={{
        minHeight: "100vh",
        background: "transparent",
      }}
    >
      <Header lang={lang} setLang={setLang} />
      <main
        className="main"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "1.25rem",
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(6px)",
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
