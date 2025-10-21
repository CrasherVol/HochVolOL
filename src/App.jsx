import React from "react";


import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightsPage from "./pages/FlightsPage";
import CityPage from "./pages/CityPage";
import LocationPage from "./pages/LocationPage";
import GalleryPage from "./pages/GalleryPage";
import RSVPPage from "./pages/RSVPPage";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage    lang={lang} setLang={setLang} />} />
        <Route path="/fluege"   element={<FlightsPage lang={lang} setLang={setLang} />} />
        <Route path="/ort"      element={<CityPage    lang={lang} setLang={setLang} />} />
        <Route path="/location" element={<LocationPage lang={lang} setLang={setLang} />} />
        <Route path="/galerie"  element={<GalleryPage lang={lang} setLang={setLang} />} />
        <Route path="/rsvp"     element={<RSVPPage    lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}
