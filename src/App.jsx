// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FlightsPage from "./pages/FlightsPage.jsx";
import CityPage from "./pages/CityPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import EssenTrinkenFeiernPage from "./pages/EssenTrinkenFeiernPage.jsx";
import RSVPPage from "./pages/RSVPPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import WinterPage from "./pages/WinterPage.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx"; // ⬅️ hinzugefügt

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <>
      <ScrollToTop /> {/* ⬅️ sorgt für automatisches Hochscrollen */}

      <Routes>
        <Route path="/"                        element={<HomePage               lang={lang} setLang={setLang} />} />
        <Route path="/fluege"                  element={<FlightsPage            lang={lang} setLang={setLang} />} />
        <Route path="/ort"                     element={<CityPage               lang={lang} setLang={setLang} />} />
        <Route path="/location"                element={<LocationPage           lang={lang} setLang={setLang} />} />
        <Route path="/essen-trinken-feiern"    element={<EssenTrinkenFeiernPage lang={lang} setLang={setLang} />} />
        <Route path="/rsvp"                    element={<RSVPPage               lang={lang} setLang={setLang} />} />
        <Route path="/admin"                   element={<AdminPage />} />
        <Route path="/winter"                  element={<WinterPage             lang={lang} setLang={setLang} />} />

        <Route path="/galerie" element={<Navigate to="/essen-trinken-feiern" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
