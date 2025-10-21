import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Gallery from "../components/Gallery.jsx";
import { TEXTS, IMAGES, LINKS } from "../data/constants.js";
import { Camera } from "lucide-react";

export default function GalleryPage({ lang, setLang }) {
  const t = TEXTS[lang] || TEXTS.de;

  // Kernmotive (Unsplash)
  const coreImages = [
    IMAGES.tbilisiAerial,
    IMAGES.sulfurBaths,
    IMAGES.narikala,
    IMAGES.bridgeOfPeace,
    IMAGES.sighnaghi,
    IMAGES.alaverdi,
    IMAGES.telavi,
    IMAGES.vineyard,
  ];
  const coreCaptions = [
    t.place.tbilisi || "Tiflis Altstadt",
    t.place.sulfurBaths || "Schwefelbäder Abanotubani",
    t.place.narikala || "Narikala Festung",
    t.place.bridgeOfPeace || "Bridge of Peace",
    t.place.sighnaghi || "Sighnaghi",
    t.place.alaverdi || "Kloster Alaverdi",
    t.place.telavi || "Telavi",
    t.place.kakhetiVineyards || "Kachetien Weinberge",
  ];
  const coreLinks = [
    LINKS.maps.tbilisiOldTown,
    LINKS.maps.sulfurBaths,
    LINKS.maps.narikala,
    LINKS.maps.bridgeOfPeace,
    LINKS.maps.sighnaghi,
    LINKS.maps.alaverdi,
    LINKS.maps.telavi,
    LINKS.maps.kakhetiVines,
  ];

  // Hotelbilder (liegen in public/gallery)
  const hotelImages = [
    "/gallery/telavi-inn-1.webp",
    "/gallery/telavi-inn-2.webp",
    "/gallery/telavi-inn-3.webp",
  ];
  const hotelCaptions = [
    "Zimmerbeispiel – Telavi Inn Hotel",
    "Frühstücksbuffet – Telavi Inn Hotel",
    "Poolbereich bei Nacht – Telavi Inn Hotel",
  ];
  const hotelLinks = [undefined, undefined, undefined];

  const images = [...coreImages, ...hotelImages];
  const captions = [...coreCaptions, ...hotelCaptions];
  const links = [...coreLinks, ...hotelLinks];

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={t.nav.gallery}
        subtitle={t.stimmungSub}
        icon={<Camera className="w-5 h-5" />}
      >
        <Gallery images={images} captions={captions} links={links} />
      </Section>
    </Layout>
  );
}
