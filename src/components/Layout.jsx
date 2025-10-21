// src/components/Layout.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  CalendarHeart,
  Plane,
  Globe2,
  Camera,
  Users,
  Home as HomeIcon,
  Building2,
} from "lucide-react";
import { TEXTS, DATUM, PAAR } from "../data/constants";
import { googleCalUrl } from "../data/calendar";

/* --- Kleine Flaggen-Icons (inline SVG) --- */
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

/* --- Header mit Navigation + Kalender + Flaggen rechts --- */
function Header({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  const nav = [
    { to: "/",         label: t.nav.start,    icon: <HomeIcon size={16} /> },
    { to: "/fluege",   label: t.nav.flights,  icon: <Plane size={16} /> },
    { to: "/ort",      label: t.nav.region,   icon: <Globe2 size={16} /> },
    { to: "/location", label: t.nav.location, icon: <Building2 size={16} /> },
    { to: "/galerie",  label: t.nav.gallery,  icon: <Camera size={16} /> },
    { to: "/rsvp",     label: t.nav.rsvp,     icon: <Users size={16} /> },
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

          <div className="top-utils">
            <a href={googleCalUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <CalendarHeart size={16} />
              <span>{t.nav.calendar}</span>
            </a>
            <LangSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
      </div>

      {/* Inline Styles (du kannst alles in global.css verschieben) */}
      <style>{`
        :root { --accent:#7b2e2e; --accent-2:#b85c5c; }

        .topbar {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,.85);
          border-bottom: 1px solid #f1f5f9;
          box-shadow: 0 4px 18px rgba(184,92,92,.08);
        }
        .topbar-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0.55rem 1rem;
          display: flex; align-items: center; justify-content: space-between; gap: .75rem;
        }

        /* Brand */
        .brand { display: flex; align-items: center; gap: .6rem; text-decoration: none; }
        .brand-logo {
          width: 44px; height: 44px; object-fit: contain; border-radius: 10px;
          box-shadow: 0 0 18px rgba(184,92,92,.25);
        }
        .brand-name {
          font-family: "Playfair Display", serif;
          font-weight: 800; color: var(--accent); font-size: 1.15rem;
        }

        .topbar-right { display: flex; align-items: center; gap: .75rem; flex: 1; justify-content: flex-end; }

        /* Nav */
        .topnav {
          display: flex; align-items: center; gap: .25rem;
          overflow-x: auto; padding: .15rem; scrollbar-width: none;
        }
        .topnav::-webkit-scrollbar { display: none; }

        .nav-link {
          position: relative;
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .45rem .75rem; border-radius: 9999px;
          font-size: .92rem; text-decoration: none;
          color: #334155; border: 1px solid transparent;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
          background: rgba(255,255,255,.7);
        }
        .nav-link .nav-ico { display: inline-grid; place-items: center; }

        .nav-link:hover {
          background: #fff;
          border-color: #f1f5f9;
          color: var(--accent);
        }

        .nav-link .underline {
          position: absolute; left: 12px; right: 12px; bottom: 6px;
          height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transform: scaleX(0); transform-origin: center;
          transition: transform .25s ease;
        }
        .nav-link:hover .underline { transform: scaleX(1); }
        .nav-link.active {
          background: #fff; border-color: #f1f5f9; color: var(--accent);
        }
        .nav-link.active .underline { transform: scaleX(1); }

        /* Utilities rechts */
        .top-utils { display: flex; align-items: center; gap: .5rem; }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .45rem .7rem; border-radius: .75rem;
          border: 1px solid #f1f5f9; background:#fff; color:#334155;
          text-decoration: none; transition: all .2s ease;
        }
        .btn-ghost:hover { color: var(--accent); border-color: #eaeef3; }

        /* Flags */
        .lang-wrap { display:flex; gap:.35rem; }
        .flag { width: 26px; height: 18px; border-radius: 4px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
        .flag-btn { padding: 6px; border-radius: .6rem; border:1px solid #e5e7eb; background:#fff; display:flex; align-items:center; cursor:pointer; }
        .flag-btn.active { outline: 2px solid var(--accent); }

        @media (max-width: 640px) {
          .brand-name { display: none; }
        }
      `}</style>
    </header>
  );
}

/* --- Footer --- */
function Footer() {
  const year = new Date(DATUM.iso).getFullYear();
  return (
    <footer className="footer" style={{ maxWidth:1100, margin:"0 auto", padding:"2rem 1rem", textAlign:"center", color:"#64748b" }}>
      © {year} Hochzeit {PAAR.braeutigam} & {PAAR.braut} · Chateau Methis Kalaki
    </footer>
  );
}

/* --- Layout-Wrapper --- */
export default function Layout({ children, lang, setLang }) {
  return (
    <div className="layout-root" style={{ minHeight: "100vh", background: "#fff", color: "#111827" }}>
      <Header lang={lang} setLang={setLang} />
      <main className="main" style={{ maxWidth: 1100, margin: "0 auto", padding: "1.25rem" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
