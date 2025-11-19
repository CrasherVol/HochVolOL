// src/pages/EssenTrinkenFeiernPage.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";
import {
  Utensils,
  Martini,
  MapPin,
  Clock,
  ExternalLink,
  PartyPopper,
  Navigation,
} from "lucide-react";

/* ---------------------------------------------------
   Alpina Hotel Gudauri – EXAKT & ZENTRAL
---------------------------------------------------- */
const HOTEL_ALPINA = {
  lat: 42.47698318346015,
  lng: 44.47601376134797,
  plusCode: "FFGG+M9X, Gudauri, Georgia",
  url: "https://maps.app.goo.gl/35oPU4W1uw87Vhpi6",
  name: "Alpina Hotel Gudauri",
};

/* ---------------------------------------------------
   Leaflet via CDN (keine npm-Installation nötig)
---------------------------------------------------- */
function useLeafletLoader() {
  useEffect(() => {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity =
        "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }
    if (!window.L) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.integrity =
        "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      s.crossOrigin = "";
      document.body.appendChild(s);
    }
    if (!document.querySelector('script[src*="leaflet.easyPrint"]')) {
      const s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet.easyPrint/2.1.9/bundle.min.js";
      s.defer = true;
      document.body.appendChild(s);
    }
  }, []);
}

/* ---------------------------------------------------
   Maps-Links + Distanz-Helfer
---------------------------------------------------- */
const mapsSearchUrl = (lat, lng) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const mapsDirectionsFromHere = (lat, lng, mode = "walking") =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${mode}`;

// Gehminuten (Luftlinie × Wegfaktor)
const minutesWalking = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distKm = R * c;
  return Math.max(1, Math.round(((distKm * 1000) / 70) * 1.35)); // 70 m/min ≈ 4,2 km/h
};

/* ---------------------------------------------------
   Kleine UI-Bausteine
---------------------------------------------------- */
function ImgSafe({ src, alt, fallback = "/hero/party-hero.png", ...rest }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? fallback : src || fallback}
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
        background:
          "linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.85))",
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
    /pizza/i.test(t)
      ? "🍕"
      : /terrasse|view|blick|terrace/i.test(t)
      ? "🌅"
      : /après|apres|apre/i.test(t)
      ? "🎿"
      : /georg/i.test(t)
      ? "🇬🇪"
      : /cocktail|bar/i.test(t)
      ? "🍸"
      : /burger/i.test(t)
      ? "🍔"
      : /wine|wein|вин/i.test(t)
      ? "🍷"
      : "✨";

  return (
    <div
      style={{
        display: "flex",
        gap: ".5rem",
        flexWrap: "wrap",
        marginBottom: ".6rem",
      }}
    >
      {tags?.map((t) => (
        <Tag key={t} emoji={em(t)}>
          {t}
        </Tag>
      ))}
    </div>
  );
}

function CTAGroup({ v, lang }) {
  const hasGeo = typeof v.lat === "number" && typeof v.lng === "number";

  const txtViewPlace =
    lang === "de"
      ? "📍 Ort ansehen"
      : lang === "ru"
      ? "📍 Посмотреть место"
      : "📍 View place";
  const txtRouteHere =
    lang === "de"
      ? "🚶 Route ab aktuellem Standort"
      : lang === "ru"
      ? "🚶 Маршрут от текущего местоположения"
      : "🚶 Route from current location";
  const txtWebsite =
    lang === "de" ? "Website" : lang === "ru" ? "Сайт" : "Website";
  const txtMenu =
    lang === "de"
      ? "Speisekarte"
      : lang === "ru"
      ? "Меню"
      : "Menu";
  const txtDrinks =
    lang === "de"
      ? "Drinks"
      : lang === "ru"
      ? "Напитки"
      : "Drinks";
  const txtInstagram =
    lang === "de"
      ? "Instagram"
      : lang === "ru"
      ? "Instagram"
      : "Instagram";

  return (
    <div
      style={{
        display: "flex",
        gap: ".5rem",
        flexWrap: "wrap",
        marginTop: ".7rem",
      }}
    >
      {hasGeo && (
        <>
          <a
            href={mapsSearchUrl(v.lat, v.lng)}
            target="_blank"
            rel="noreferrer"
            className="btn-chip"
          >
            {txtViewPlace}
          </a>
          <a
            href={mapsDirectionsFromHere(v.lat, v.lng)}
            target="_blank"
            rel="noreferrer"
            className="btn-chip"
          >
            {txtRouteHere}
          </a>
        </>
      )}

      {v.website && (
        <a
          href={v.website}
          target="_blank"
          rel="noreferrer"
          className="btn-chip"
        >
          <ExternalLink size={16} /> {txtWebsite}
        </a>
      )}

      {v.menu && (
        <a
          href={v.menu}
          target="_blank"
          rel="noreferrer"
          className="btn-chip"
        >
          <Utensils size={16} /> {txtMenu}
        </a>
      )}

      {v.drinks && (
        <a
          href={v.drinks}
          target="_blank"
          rel="noreferrer"
          className="btn-chip"
        >
          <Martini size={16} /> {txtDrinks}
        </a>
      )}

      {v.instagram && (
        <a
          href={v.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn-chip"
        >
          <ExternalLink size={16} /> {txtInstagram}
        </a>
      )}
    </div>
  );
}

function VenueCard({ v, lang }) {
  const isBar = v.kind === "bar";
  const accent = isBar ? "#2563eb" : "#e11d48"; // blau / pink

  const categoryLabel = isBar
    ? lang === "de"
      ? "🍸 Nightlife"
      : lang === "ru"
      ? "🍸 Ночная жизнь"
      : "🍸 Nightlife"
    : lang === "de"
    ? "🍽 Food"
    : lang === "ru"
    ? "🍽 Еда"
    : "🍽 Food";

  const openHoursLabel =
    lang === "de"
      ? "Öffnungszeiten:"
      : lang === "ru"
      ? "Часы работы:"
      : "Opening hours:";
  const winterNote =
    lang === "de"
      ? "(Winter – variiert)"
      : lang === "ru"
      ? "(зимой время может меняться)"
      : "(winter – may vary)";
  const distanceLabel =
    lang === "de"
      ? "Entfernung:"
      : lang === "ru"
      ? "Расстояние:"
      : "Distance:";

  const desc = v.desc?.[lang] || v.desc?.de || v.desc;
  const tags = v.tags?.[lang] || v.tags?.de || v.tags;

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
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Kategorie-Sticker */}
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          background: accent,
          color: "white",
          borderRadius: "999px",
          padding: ".35rem .6rem",
          fontSize: ".8rem",
          boxShadow: "0 6px 16px rgba(0,0,0,.25)",
        }}
      >
        {categoryLabel}
      </div>

      {/* Inhalt */}
      <div
        style={{
          borderRadius: "15px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.98))",
          padding: "1rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          title={`${v.number}. ${v.name}`}
          className="hover-react"
          style={{
            boxShadow: "none",
            border: "none",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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

          <VibesRow tags={tags} />

          <p
            style={{
              color: "#374151",
              marginBottom: ".5rem",
              lineHeight: 1.55,
            }}
          >
            {desc}
          </p>

          <div
            style={{
              display: "grid",
              gap: ".35rem",
              color: "#334155",
              fontSize: ".95rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <Clock size={16} />
              <span>
                <strong>{openHoursLabel}</strong>{" "}
                {v.hours}{" "}
                <em style={{ color: "#64748b" }}>{winterNote}</em>
              </span>
            </div>
            {v.distance && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <MapPin size={16} />
                <span>
                  <strong>{distanceLabel}</strong> {v.distance}
                </span>
              </div>
            )}
          </div>

          <div style={{ marginTop: "auto" }}>
            <CTAGroup v={v} lang={lang} />
          </div>
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
   Georgische Köstlichkeiten – Daten (3 Sprachen)
---------------------------------------------------- */

const DISH_LABELS = {
  de: {
    what: "Was ist das?",
    ingredients: "Typische Zutaten:",
    why: "Warum berühmt?",
  },
  en: {
    what: "What is it?",
    ingredients: "Typical ingredients:",
    why: "Why is it famous?",
  },
  ru: {
    what: "Что это?",
    ingredients: "Типичные ингредиенты:",
    why: "Почему это известно?",
  },
};

const GEORGIAN_DISHES = [
  {
    key: "khinkali",
    ge: "ხინკალი",
    image: "/food/khinkali.webp",
    de: {
      name: "Khinkali (ხინკალი)",
      what:
        "Große, saftige Teigtaschen mit gedrehtem „Knoten“ oben – so etwas wie die georgische Antwort auf Dumplings.",
      ingredients:
        "Weizenteig; Füllung meist aus Rinder- und/oder Schweinehack, manchmal Lamm; viel Pfeffer, Kräuter, Zwiebeln, Brühe.",
      why:
        "Nationalgericht in den Bergen. Man hält Khinkali am Teigstiel, beißt vorsichtig hinein und trinkt zuerst den heißen Fleischsaft – danach isst man den Rest, der Stiel bleibt auf dem Teller.",
    },
    en: {
      name: "Khinkali (ხინკალი)",
      what:
        "Big, juicy dumplings with a twisted top – Georgia’s iconic mountain dumpling.",
      ingredients:
        "Wheat dough; filling usually beef and/or pork mince, sometimes lamb; lots of pepper, herbs, onions and broth.",
      why:
        "A true mountain classic. You hold khinkali by the dough “handle”, bite carefully, sip the hot broth first, then eat the rest. The top knot is traditionally left on the plate.",
    },
    ru: {
      name: "Хинкали (ხინკალი)",
      what:
        "Большие сочные пельмени с закрученным хвостиком сверху — главное горное блюдо Грузии.",
      ingredients:
        "Пшеничное тесто; начинка обычно из говядины и/или свинины, иногда баранина; много перца, зелени, лука и бульона.",
      why:
        "Культовое блюдо в горах. Хинкали держат за «хвостик», сначала аккуратно отпивают горячий сок, а потом съедают остальное. Хвостики часто оставляют на тарелке.",
    },
  },
  {
    key: "khachapuri_imeruli",
    ge: "იმერული ხაჭაპური",
    image: "/food/khachapuri-imeruli.jpg",
    de: {
      name: "Imeruli Khachapuri (იმერული ხაჭაპური)",
      what:
        "Flaches, rundes Käsebrot – außen leicht knusprig, innen voller geschmolzenem Käse.",
      ingredients:
        "Hefeteig oder Joghurtteig; Sulguni- oder Imeretiner Käse (salzig, schmelzend), etwas Butter, Ei je nach Rezept.",
      why:
        "Das wohl bekannteste georgische Käsebrot – überall im Land zu finden. Perfekt zum Teilen, als Snack oder zu Suppe & Salat.",
    },
    en: {
      name: "Imeruli Khachapuri (იმერული ხაჭაპური)",
      what:
        "Flat, round cheese bread – slightly crispy outside, full of melted cheese inside.",
      ingredients:
        "Yeast or yogurt dough; sulguni or Imeretian cheese (salty, melting), a bit of butter, sometimes egg.",
      why:
        "Probably Georgia’s most common cheese bread – found in bakeries all over the country. Great for sharing or as a quick snack.",
    },
    ru: {
      name: "Имерули хачапури (იმერული ხაჭაპური)",
      what:
        "Плоский круглый лепёшко-хлеб с сыром — слегка хрустящий снаружи и очень сырный внутри.",
      ingredients:
        "Дрожжевое или йогуртовое тесто; сыр сулугуни или имеретинский сыр (солёный, хорошо плавится), немного масла, иногда яйцо.",
      why:
        "Самый распространённый вид хачапури — встречается почти везде. Идеален для компании, перекуса или к супу и салату.",
    },
  },
  {
    key: "khachapuri_adjaruli",
    ge: "აჭარული ხაჭაპური",
    image: "/food/khachapuri-adjaruli.webp",
    de: {
      name: "Adjaruli Khachapuri (აჭარული ხაჭაპური)",
      what:
        "Boot-förmiges Käsebrot aus Adscharien, in der Mitte mit geschmolzenem Käse, rohem Ei und Butter.",
      ingredients:
        "Hefeteig, viel Sulguni-Käse; beim Servieren wird ein rohes Eigelb und ein Stück Butter in die Mitte gegeben.",
      why:
        "Spektakuläres „Instagram-Brot“. Man rührt Ei und Butter in den heißen Käse ein und zupft den Randteig hinein – sehr sättigend und perfekt nach einem Skitag.",
    },
    en: {
      name: "Adjaruli Khachapuri (აჭარული ხაჭაპური)",
      what:
        "Boat-shaped cheese bread from Adjara – filled with melted cheese, a raw egg yolk and butter on top.",
      ingredients:
        "Yeast dough, lots of sulguni cheese; served with a raw egg yolk and a knob of butter in the centre.",
      why:
        "Probably the most photogenic khachapuri. You mix the egg and butter into the hot cheese and dip the crust into it – perfect comfort food after skiing.",
    },
    ru: {
      name: "Ачарули хачапури (აჭარული ხაჭაპური)",
      what:
        "Хачапури в форме лодочки из Аджарии — внутри расплавленный сыр, сверху сырое яйцо и кусочек масла.",
      ingredients:
        "Дрожжевое тесто, много сыра сулугуни; при подаче в центр кладут желток и масло.",
      why:
        "Очень эффектное и сытное блюдо. Яйцо и масло размешивают в горячем сыре и макают в него бортики теста — идеально после катания.",
    },
  },
  {
    key: "lobio",
    ge: "ლობიო",
    image: "/food/lobio.jpg",
    de: {
      name: "Lobio (ლობიო)",
      what:
        "Würziger Bohneneintopf oder -püree – je nach Region etwas unterschiedlich.",
      ingredients:
        "Rote Bohnen, Zwiebeln, Knoblauch, Koriander (frisch & gemahlen), Walnüsse, manchmal Chili, Essig.",
      why:
        "Ein Klassiker der Alltagsküche und oft vegetarisch/vegan. Wird gern mit Mchadi (Maisbrot) und eingelegtem Gemüse serviert.",
    },
    en: {
      name: "Lobio (ლობიო)",
      what:
        "Spiced kidney bean stew or mash – texture and seasoning vary by region.",
      ingredients:
        "Red beans, onions, garlic, coriander (fresh & ground), walnuts, sometimes chili and a bit of vinegar.",
      why:
        "Everyday comfort food and often vegetarian/vegan. Commonly served with mchadi (cornbread) and pickled vegetables.",
    },
    ru: {
      name: "Лобио (ლობიო)",
      what:
        "Пряное блюдо из красной фасоли — от густого рагу до пюре, в зависимости от региона.",
      ingredients:
        "Красная фасоль, лук, чеснок, кориандр (зёрна и зелень), грецкие орехи, иногда перец чили и немного уксуса.",
      why:
        "Классика домашней кухни, часто без мяса. Часто подают с мчади (кукурузный хлеб) и маринованными овощами.",
    },
  },
  {
    key: "badrijani",
    ge: "ბადრიჯანი ნიგვზით",
    image: "/food/badrijani.jpg",
    de: {
      name: "Badrijani Nigvzit (ბადრიჯანი ნიგვზით)",
      what:
        "Gerollte Auberginenstreifen mit Walnusscreme – ein typisches kaltes Vorspeisen-Gericht.",
      ingredients:
        "Gebratene oder gegrillte Auberginenscheiben; Füllung aus Walnüssen, Knoblauch, Koriander, Essig, Gewürzen; oft mit Granatapfelkernen garniert.",
      why:
        "Auf fast jeder Supra (georgische Tafel) zu finden. Kombination aus rauchiger Aubergine, Nüssen und Granatapfel ist sehr typisch für die georgische Küche.",
    },
    en: {
      name: "Badrijani Nigvzit (ბადრიჯანი ნიგვზით)",
      what:
        "Rolled eggplant slices filled with walnut paste – a classic cold starter.",
      ingredients:
        "Fried or grilled eggplant slices; walnut filling with garlic, coriander, vinegar and spices; often topped with pomegranate seeds.",
      why:
        "Staple on any Georgian feast table (supra). Combines smoky eggplant, nuts and fruitiness – very typical Georgian flavour profile.",
    },
    ru: {
      name: "Бадриджани ниво́зит (ბადრიჯანი ნიგვზით)",
      what:
        "Рулетики из баклажанов с ореховой пастой — классическая холодная закуска.",
      ingredients:
        "Жареные или запечённые ломтики баклажана; начинка из грецких орехов, чеснока, кориандра, специй и уксуса; сверху часто гранат.",
      why:
        "Почти обязательное блюдо на праздничном столе (супра). Очень характерное сочетание — копчёный баклажан, орехи и гранат.",
    },
  },
  {
    key: "pkhali",
    ge: "ფხალი",
    image: "/food/pkhali.jpg",
    de: {
      name: "Pkhali (ფხალი)",
      what:
        "Gemüse-Walnuss-Pasten – oft in kleinen Bällchen oder Häufchen angerichtet.",
      ingredients:
        "Fein gehacktes oder püriertes Gemüse (z.B. Spinat, Rote Bete, Bohnen) gemischt mit Walnüssen, Knoblauch, Koriander, Essig und Gewürzen.",
      why:
        "Sehr farbenfrohe Vorspeise, ideal für Vegetarier:innen. Man probiert meist mehrere Sorten gleichzeitig.",
    },
    en: {
      name: "Pkhali (ფხალი)",
      what:
        "Vegetable and walnut spreads – usually served as colourful little mounds or balls.",
      ingredients:
        "Finely chopped or puréed vegetables (e.g. spinach, beetroot, beans) mixed with walnuts, garlic, coriander, vinegar and spices.",
      why:
        "Colourful starter plate and great for vegetarians. Often served as a trio or mix of several flavours.",
    },
    ru: {
      name: "Пхали (ფხალი)",
      what:
        "Пасты из овощей и грецких орехов — обычно маленькие шарики разных цветов.",
      ingredients:
        "Мелко рубленые или пюрированные овощи (шпинат, свёкла, фасоль и др.) с грецкими орехами, чесноком, кориандром, уксусом и специями.",
      why:
        "Яркая закуска и находка для вегетарианцев. Часто подают несколько видов сразу на одной тарелке.",
    },
  },
  {
    key: "mtsvadi",
    ge: "მსხვადი",
    image: "/food/mtsvadi.jpg",
    de: {
      name: "Mtsvadi – georgischer Schaschlik (მსხვადი)",
      what:
        "Gegrillte Fleischspieße über Holzkohle – ähnlich wie Schaschlik, aber nach georgischer Art mariniert.",
      ingredients:
        "Schweine-, Rind- oder Lammfleisch; Marinade oft mit Zwiebeln, Essig oder Wein, etwas Öl, Kräutern und Pfeffer.",
      why:
        "Outdoor-Klassiker – passt perfekt zu Brot, frischen Kräutern und georgischem Wein. Häufig bei Ausflügen und Familienfeiern.",
    },
    en: {
      name: "Mtsvadi – Georgian shashlik (მსხვადი)",
      what:
        "Skewers of meat grilled over charcoal – similar to shashlik but with Georgian-style seasoning.",
      ingredients:
        "Pork, beef or lamb; marinated with onions, vinegar or wine, a bit of oil, herbs and pepper.",
      why:
        "Barbecue classic, usually eaten with bread, fresh herbs and Georgian wine. Very common at picnics and family gatherings.",
    },
    ru: {
      name: "Мцвади — грузинский шашлык (მსხვადი)",
      what:
        "Шашлык из мяса на мангале — близко к привычному шашлыку, но со своим грузинским вкусом.",
      ingredients:
        "Свинина, говядина или баранина; маринад с луком, вином или уксусом, маслом, зеленью и перцем.",
      why:
        "Классика пикников и застолий. Подают с хлебом, зеленью и, конечно, грузинским вином.",
    },
  },
  {
    key: "kharcho",
    ge: "ხარჩო",
    image: "/food/kharcho.jpg",
    de: {
      name: "Kharcho (ხარჩო)",
      what:
        "Kräftige Suppe/Eintopf mit Fleisch, Reis und einer leicht säuerlich-scharfen Sauce.",
      ingredients:
        "Rindfleisch (klassisch), Reis, Tomaten oder Tkemali (Sauce aus sauren Pflaumen), Knoblauch, Koriander, Gewürzmischungen (z.B. Chmeli-Suneli).",
      why:
        "Warme, sehr aromatische Wintersuppe – perfekt nach einem Tag im Schnee. Jede Region und jede Familie hat ihr eigenes Rezept.",
    },
    en: {
      name: "Kharcho (ხარჩო)",
      what:
        "Rich, slightly sour and spicy soup or stew with meat and rice.",
      ingredients:
        "Traditionally beef, rice, tomatoes or tkemali (sour plum sauce), garlic, coriander and Georgian spice blends (e.g. khmeli-suneli).",
      why:
        "Comforting winter soup, ideal after a day on the slopes. Every region and family has its own version.",
    },
    ru: {
      name: "Харчо (ხარჩო)",
      what:
        "Насыщенный суп/рагу с мясом и рисом, с лёгкой кислинкой и остротой.",
      ingredients:
        "Обычно говядина, рис, помидоры или ткемали (соус из кислых слив), чеснок, кориандр, хмели-сунели.",
      why:
        "Согревающее зимнее блюдо — особенно вкусно после холода. У каждого региона и семьи свой рецепт.",
    },
  },
  {
    key: "churchkhela",
    ge: "ჩურჩხელა",
    image: "/food/churchkhela.jpg",
    de: {
      name: "Churchkhela (ჩურჩხელა)",
      what:
        "Süße „Energie-Sticks“ aus Nüssen, die in eingekochtem Traubensaft getrocknet werden – sehen aus wie bunte Kerzen.",
      ingredients:
        "Walnüsse oder Haselnüsse auf einer Schnur; mehrfach in eine dicke Masse aus Traubensaft und Mehl/Treber getaucht, dann getrocknet.",
      why:
        "Typischer georgischer Snack und beliebtes Mitbringsel. Sehr energiereich – perfekt für lange Tage in den Bergen.",
    },
    en: {
      name: "Churchkhela (ჩურჩხელა)",
      what:
        "Sweet „energy sticks“ of nuts coated in thickened grape juice – look a bit like colourful candles.",
      ingredients:
        "Walnuts or hazelnuts on a string; dipped several times into a thick mass made from grape juice and flour, then dried.",
      why:
        "Iconic Georgian street snack and souvenir. Packed with calories – great for hiking or ski days.",
    },
    ru: {
      name: "Чурчхела (ჩურჩხელა)",
      what:
        "Сладкие «палочки энергии» из орехов в загустевшем виноградном соке — похожи на яркие свечки.",
      ingredients:
        "Грецкие орехи или фундук на нитке; несколько раз окунают в густую массу из виноградного сока и муки, потом сушат.",
      why:
        "Классический грузинский десерт и сувенир. Очень калорийно — отлично подходит для походов и катания.",
    },
  },
];

/* ---------------------------------------------------
   Farbiges Top-Kästchen (Banner)
---------------------------------------------------- */
function TopBanner({ onToFood, onToBars, onToMap, onToDishes, lang }) {
  const title =
    lang === "de"
      ? "❄️ Energie tanken, anstoßen & feiern – von der Hütte bis zur Bar, alles nur ein paar Schritte im Schnee entfernt!"
      : lang === "ru"
      ? "❄️ Набраться сил, чокнуться бокалами и праздновать — от хижины до бара всего несколько шагов по снегу!"
      : "❄️ Recharge, raise a glass & celebrate – from hut to bar, everything just a few snowy steps away!";

  const btnFood =
    lang === "de"
      ? "Restaurants"
      : lang === "ru"
      ? "Рестораны"
      : "Restaurants";
  const btnBars =
    lang === "de"
      ? "Bars & Clubs"
      : lang === "ru"
      ? "Бары и клубы"
      : "Bars & clubs";
  const btnMap =
    lang === "de"
      ? "Karte"
      : lang === "ru"
      ? "Карта"
      : "Map";
  const btnDishes =
    lang === "de"
      ? "Georgische Köstlichkeiten"
      : lang === "ru"
      ? "Грузинские деликатесы"
      : "Georgian specialties";

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
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
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
              color: "#0f172a",
              letterSpacing: ".2px",
            }}
          >
            {title}
          </h3>
        </div>

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
            onClick={onToDishes}
            className="btn-chip"
            style={{
              background: "rgba(255,255,255,.95)",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <Utensils size={16} /> {btnDishes}
          </button>
          <button
            onClick={onToFood}
            className="btn-chip"
            style={{
              background: "rgba(255,255,255,.95)",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,.1)",
            }}
          >
            <Utensils size={16} /> {btnFood}
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
            <Martini size={16} /> {btnBars}
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
            <Navigation size={16} /> {btnMap}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- OSM-Karte (unten) ---------------- */
function MapGudauri({
  venues,
  lang,
  center = [HOTEL_ALPINA.lat, HOTEL_ALPINA.lng],
  zoom = 15,
}) {
  useLeafletLoader();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [filter, setFilter] = useState("all");

  const emojiForTags = (tags = []) => {
    const em = (t) =>
      /pizza/i.test(t)
        ? "🍕"
        : /burger/i.test(t)
        ? "🍔"
        : /wein|wine|вин/i.test(t)
        ? "🍷"
        : /cocktail|bar/i.test(t)
        ? "🍸"
        : /georg/i.test(t)
        ? "🇬🇪"
        : /terrasse|view|blick|terrace/i.test(t)
        ? "🌅"
        : /après|apres|apre/i.test(t)
        ? "🎿"
        : /café|cafe|coffee/i.test(t)
        ? "☕"
        : "✨";
    return Array.from(new Set(tags.map(em))).slice(0, 5).join(" ");
  };

  const renderMarkers = useCallback(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!L || !map) return;

    if (map._gudauriMarkers)
      map._gudauriMarkers.forEach((m) => map.removeLayer(m));
    map._gudauriMarkers = [];

    const txtYouAreHere =
      lang === "de"
        ? "Du bist hier ✅"
        : lang === "ru"
        ? "Вы здесь ✅"
        : "You are here ✅";
    const txtHotelLink =
      lang === "de"
        ? "Hotel auf Google Maps"
        : lang === "ru"
        ? "Отель в Google Maps"
        : "Hotel on Google Maps";
    const kindRestaurant =
      lang === "de"
        ? "Restaurant · Café"
        : lang === "ru"
        ? "Ресторан · кафе"
        : "Restaurant · café";
    const kindBar =
      lang === "de"
        ? "Bar · Nightlife · Après-Ski"
        : lang === "ru"
        ? "Бар · ночная жизнь · апре-ски"
        : "Bar · nightlife · après-ski";
    const txtDistance =
      lang === "de"
        ? "Entfernung"
        : lang === "ru"
        ? "Расстояние"
        : "Distance";
    const txtMinutesWalk =
      lang === "de"
        ? "Min zu Fuß"
        : lang === "ru"
        ? "мин пешком"
        : "min walk";
    const txtOpenHours =
      lang === "de"
        ? "Öffnungszeiten"
        : lang === "ru"
        ? "Часы работы"
        : "Opening hours";
    const txtViewPlace =
      lang === "de"
        ? "📍 Ort ansehen"
        : lang === "ru"
        ? "📍 Посмотреть место"
        : "📍 View place";
    const txtRouteHere =
      lang === "de"
        ? "🧭 Route ab aktuellem Standort"
        : lang === "ru"
        ? "🧭 Маршрут от текущего местоположения"
        : "🧭 Route from current location";

    // 🏨 Alpina-Marker
    const hotelIcon = L.divIcon({
      html: `<div style="width:48px;height:48px;border-radius:9999px;background:#10b981;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;border:2px solid #fff;box-shadow:0 0 12px rgba(16,185,129,0.6)">🏨</div>`,
      iconSize: [48, 48],
      className: "hotel-pin",
    });
    const hotelMarker = L.marker([HOTEL_ALPINA.lat, HOTEL_ALPINA.lng], {
      icon: hotelIcon,
    }).addTo(map);
    hotelMarker.bindPopup(
      `<div style="min-width:200px;text-align:center;">
         <strong>🏨 ${HOTEL_ALPINA.name}</strong><br/>
         <span style="color:#10b981;font-weight:600;">${txtYouAreHere}</span><br/>
         <a href="${HOTEL_ALPINA.url}" target="_blank" rel="noreferrer">${txtHotelLink}</a>
       </div>`
    );
    map._gudauriMarkers.push(hotelMarker);

    // 🍽/🍸 Marker
    const iconFor = (v) => {
      const isBar = v.kind === "bar";
      const bg = isBar ? "#2563eb" : "#e11d48";
      const emoji = isBar ? "🍸" : "🍽";
      const html = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;transform:translateY(-4px)">
          <div style="width:36px;height:36px;border-radius:9999px;background:${bg};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.28)">${v.number}</div>
          <div style="font-size:14px;line-height:14px;">${emoji}</div>
        </div>`;
      return L.divIcon({
        className: "pin-numbered",
        html,
        iconSize: [36, 42],
        iconAnchor: [18, 18],
        popupAnchor: [0, -16],
      });
    };

    const visible = venues.filter((v) =>
      filter === "all" ? true : v.kind === filter
    );
    const withCoords = visible.filter(
      (v) => typeof v.lat === "number" && typeof v.lng === "number"
    );

    const group = [];
    withCoords.forEach((v) => {
      const m = L.marker([v.lat, v.lng], { icon: iconFor(v) }).addTo(map);
      const mins = minutesWalking(
        HOTEL_ALPINA.lat,
        HOTEL_ALPINA.lng,
        v.lat,
        v.lng
      );
      const kindLabel = v.kind === "bar" ? kindBar : kindRestaurant;
      const tags = v.tags?.[lang] || v.tags?.de || v.tags || [];
      const vibeEmojis = emojiForTags(tags);
      const routeFromHere = mapsDirectionsFromHere(v.lat, v.lng);

      const popup = `
        <div style="min-width:240px">
          <strong>${v.number}. ${v.name}</strong><br/>
          <small>${kindLabel}</small><br/>
          <div style="margin:.25rem 0 .35rem;font-size:1rem">${vibeEmojis}</div>
          <small>${txtDistance}: ~${mins} ${txtMinutesWalk}</small><br/>
          <small>${txtOpenHours}: ${v.hours}</small><br/>
          <a href="https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}" target="_blank" rel="noreferrer">${txtViewPlace}</a> · 
          <a href="${routeFromHere}" target="_blank" rel="noreferrer">${txtRouteHere}</a>
        </div>`;
      m.bindPopup(popup);
      group.push(m);
      map._gudauriMarkers.push(m);
    });

    if (group.length) {
      const g = window.L.featureGroup(group);
      map.fitBounds(g.getBounds().pad(0.25));
    } else {
      map.setView([HOTEL_ALPINA.lat, HOTEL_ALPINA.lng], zoom);
    }
  }, [venues, filter, lang, zoom]);

  // Karte initialisieren
  useEffect(() => {
    const i = setInterval(() => {
      if (!window.L || !containerRef.current) return;
      if (!mapRef.current) {
        const L = window.L;
        const map = L.map(containerRef.current, {
          scrollWheelZoom: false,
        }).setView(center, zoom);
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        renderMarkers();
      }
    }, 100);
    return () => clearInterval(i);
  }, [center, zoom, renderMarkers]);

  useEffect(() => {
    renderMarkers();
  }, [renderMarkers]);

  const filterLabels = {
    all:
      lang === "de"
        ? "🎉 Alle"
        : lang === "ru"
        ? "🎉 Все"
        : "🎉 All",
    restaurant:
      lang === "de"
        ? "🍽 Restaurants"
        : lang === "ru"
        ? "🍽 Рестораны"
        : "🍽 Restaurants",
    bar:
      lang === "de"
        ? "🍸 Bars"
        : lang === "ru"
        ? "🍸 Бары"
        : "🍸 Bars",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Filter-Buttons */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 1000,
          display: "flex",
          gap: "0.4rem",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "999px",
          padding: "0.35rem 0.6rem",
          boxShadow: "0 2px 8px rgba(0,0,0,.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        {[
          { id: "all", label: filterLabels.all },
          { id: "restaurant", label: filterLabels.restaurant },
          { id: "bar", label: filterLabels.bar },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setFilter(b.id)}
            style={{
              background: filter === b.id ? "#2563eb" : "transparent",
              color: filter === b.id ? "#fff" : "#111827",
              border: "none",
              borderRadius: "999px",
              fontSize: ".85rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.35rem 0.75rem",
              transition: "all .2s ease",
            }}
            aria-pressed={filter === b.id}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Karte */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "560px",
          borderRadius: "0.95rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.55)",
          boxShadow: "0 6px 22px rgba(0,0,0,.08)",
          zIndex: 0,
        }}
      />
    </div>
  );
}
function DishCard({ dish, lang, labels }) {
  const L = dish[lang] || dish.de;
  const imgSrc = dish.image || "/food/georgian-default.jpg";

  const nameLabel =
    lang === "de"
      ? `Georgischer Name: ${dish.ge}`
      : lang === "ru"
      ? `Грузинское название: ${dish.ge}`
      : `Georgian name: ${dish.ge}`;

  return (
    <div
      style={{
        borderRadius: "1.1rem",
        padding: "1px",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)",
        boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
        height: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          borderRadius: "1rem",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.98))",
          padding: ".7rem .8rem .85rem",
          display: "flex",
          flexDirection: "column",
          gap: ".35rem",
          width: "100%",
        }}
      >
        {/* Bild oben */}
        <div
          style={{
            overflow: "hidden",
            borderRadius: ".8rem",
            marginBottom: ".4rem",
            border: "1px solid rgba(255,255,255,0.7)",
            background: "linear-gradient(180deg,#eff6ff,#e0f2fe)",
            flexShrink: 0,
          }}
        >
          <ImgSafe
            src={imgSrc}
            fallback="/food/georgian-default.jpg"
            alt={L.name}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Titel */}
        <div
          style={{
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          {L.name}
        </div>

        {/* Georgischer Name */}
        <div
          style={{
            fontSize: ".8rem",
            color: "#6b7280",
          }}
        >
          {nameLabel}
        </div>

        {/* Textliste – füllt den Rest, damit unten kein blauer Balken bleibt */}
        <ul
          style={{
            listStyle: "disc",
            marginLeft: "1rem",
            fontSize: ".85rem",
            color: "#374151",
            display: "grid",
            gap: ".15rem",
            marginTop: ".2rem",
          }}
        >
          <li>
            <strong>{labels.what} </strong>
            {L.what}
          </li>
          <li>
            <strong>{labels.ingredients} </strong>
            {L.ingredients}
          </li>
          <li>
            <strong>{labels.why} </strong>
            {L.why}
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Seite: Essen · Trinken · Feiern ---------------- */
export default function EssenTrinkenFeiernPage({ lang, setLang }) {
  const sectionTitle =
    lang === "de"
      ? "🍽 Essen · Trinken · Feiern"
      : lang === "ru"
      ? "🍽 Еда · Напитки · Вечеринки"
      : "🍽 Eating · Drinking · Party";
  const sectionSubtitle =
    lang === "de"
      ? "Gudauri zu Fuß erleben – essen, anstoßen, feiern & wieder von vorn."
      : lang === "ru"
      ? "Гудаури пешком — поесть, выпить, потанцевать и начать всё снова."
      : "Experience Gudauri on foot – eat, toast, party & start all over again.";

  const h2Dishes =
    lang === "de"
      ? "🍲 Georgische Köstlichkeiten & Klassiker"
      : lang === "ru"
      ? "🍲 Грузинские деликатесы и классика"
      : "🍲 Georgian specialties & classics";

  const h2Restaurants =
    lang === "de"
      ? "🍽 Restaurants & Cafés"
      : lang === "ru"
      ? "🍽 Рестораны и кафе"
      : "🍽 Restaurants & cafés";
  const h2Bars =
    lang === "de"
      ? "🍸 Bars & Clubs · Après-Ski"
      : lang === "ru"
      ? "🍸 Бары и клубы · апре-ски"
      : "🍸 Bars & clubs · après-ski";
  const h2Map =
    lang === "de"
      ? "🗺 Karte & Wegweiser"
      : lang === "ru"
      ? "🗺 Карта и ориентиры"
      : "🗺 Map & guide";

  const mapCardTitle =
    lang === "de"
      ? "Map · Restaurants & Nightlife (fußläufig ab aktuellem Standort)"
      : lang === "ru"
      ? "Карта · Рестораны и ночная жизнь (в пешей доступности от текущего местоположения)"
      : "Map · Restaurants & nightlife (walkable from current location)";

  /* ---------- Restaurants (3-sprachig) ---------- */
  const restaurants = [
    {
      number: 1,
      kind: "restaurant",
      name: "Drunk Cherry (Mtvrali Alubali)",
      website: "https://drunkcherrygudauri.com/",
      tags: {
        de: ["Georgisch", "Pizza", "Terrasse", "Après-Ski"],
        en: ["Georgian cuisine", "Pizza", "Terrace", "Après-ski"],
        ru: ["Грузинская кухня", "Пицца", "Терраса", "Апре-ски"],
      },
      desc: {
        de: "Legendärer Treff mit Aussicht. Georgische Klassiker, Burger & Pizza, große Terrasse.",
        en: "Legendary meeting spot with a view. Georgian classics, burgers & pizza, large terrace.",
        ru: "Легендарное место с видом. Грузинская классика, бургеры и пицца, большая терраса.",
      },
      hours: "09:00–01:00",
      image: "/places/drunk-cherry.jpg",
      lat: 42.46996,
      lng: 44.49085,
      menu: "https://drunkcherrygudauri.com/menu/",
      instagram: "https://www.instagram.com/drunkcherrygudauri/",
    },
    {
      number: 2,
      kind: "restaurant",
      name: "AfterSkis",
      website:
        "https://www.tripadvisor.com/Restaurant_Review-g1588192-d13564025-Reviews-AfterSkis-Gudauri_Mtskheta_Mtianeti_Region.html",
      tags: {
        de: ["Georgisch", "Rustikal", "Dinner"],
        en: ["Georgian cuisine", "Rustic", "Dinner"],
        ru: ["Грузинская кухня", "Уютно", "Ужин"],
      },
      desc: {
        de: "Gemütlich & authentisch – georgische Hausküche.",
        en: "Cozy & authentic – Georgian home-style cooking.",
        ru: "Уютное и аутентичное место с домашней грузинской кухней.",
      },
      hours: "09:00–23:00",
      image: "/places/afterskis.webp",
      lat: 42.4619129,
      lng: 44.4822779,
      instagram: "https://www.instagram.com/afterskis.gudauri/",
    },
    {
      number: 3,
      kind: "restaurant",
      name: "Cafe Vitamin (am Soliko-Lift)",
      website: "https://www.skigeorgia.ge/cafe-vitamin-gudauri/",
      tags: {
        de: ["Tagescafé", "Pistenblick"],
        en: ["Day café", "Slope view"],
        ru: ["Днём кафе", "Вид на склон"],
      },
      desc: {
        de: "Khachapuri, Suppen & heiße Getränke direkt am Hang.",
        en: "Khachapuri, soups & hot drinks right by the slope.",
        ru: "Хачапури, супы и горячие напитки прямо у склона.",
      },
      hours: "10:00–17:00",
      image: "/places/cafe-vitamin.webp",
      lat: 42.49013,
      lng: 44.49931,
      instagram: "https://www.instagram.com/cafevitamin_gudauri/",
    },
    {
      number: 4,
      kind: "restaurant",
      name: 'Marco Polo Restaurant „Soliko“',
      website: "https://marcopolo.ge/",
      tags: {
        de: ["Hotelrestaurant", "Klassisch"],
        en: ["Hotel restaurant", "Classic"],
        ru: ["Ресторан при отеле", "Классика"],
      },
      desc: {
        de: "Gehobenes Dinner im Marco Polo Hotel.",
        en: "Upscale dinner at the Marco Polo Hotel.",
        ru: "Изящный ужин в отеле Marco Polo.",
      },
      hours: "18:00–23:00",
      image: "/places/marco-polo-soliko.webp",
      lat: 42.4719,
      lng: 44.4925,
    },
    {
      number: 5,
      kind: "restaurant",
      name: "Restaurant Dariali",
      website:
        "https://restaurantguru.com/Dariali-Restaurant-and-Hotel-Gudauri",
      tags: {
        de: ["Georgisch", "Hausküche"],
        en: ["Georgian cuisine", "Home-style"],
        ru: ["Грузинская кухня", "Домашняя"],
      },
      desc: {
        de: "Herzhafte georgische Klassiker – gemütlich und bodenständig.",
        en: "Hearty Georgian classics – cozy and down-to-earth.",
        ru: "Сытная грузинская классика — уютно и по-домашнему.",
      },
      hours: "Saisonal",
      image: "/places/dariali.webp",
      lat: 42.47467423135394,
      lng: 44.48065192061241,
      instagram: "https://www.instagram.com/dariali_restaurant/",
    },
    {
      number: 6,
      kind: "restaurant",
      name: "Quadrum Restaurant Gudauri",
      website: "https://quadrum-gudauri.com/",
      tags: {
        de: ["Hotelrestaurant", "Aussicht"],
        en: ["Hotel restaurant", "View"],
        ru: ["Ресторан при отеле", "Вид"],
      },
      desc: {
        de: "Panorama & solide Küche.",
        en: "Panoramic views & solid cuisine.",
        ru: "Панорамные виды и достойная кухня.",
      },
      hours: "Saisonal",
      image: "/places/quadrum.webp",
      lat: 42.47643934653898,
      lng: 44.477572469025,
      instagram: "https://www.instagram.com/quadrumgudauri/",
    },
    {
      number: 7,
      kind: "restaurant",
      name: "Restaurant Gudauri",
      website: "https://restaurantguru.com/Restaurant-Gudauri-Gudauri",
      tags: {
        de: ["Georgisch", "Grill"],
        en: ["Georgian cuisine", "Grill"],
        ru: ["Грузинская кухня", "Гриль"],
      },
      desc: {
        de: "Beliebter Spot unweit vom Alpina – deftige Speisen & Snacks.",
        en: "Popular spot not far from Alpina – hearty dishes & snacks.",
        ru: "Популярное место недалеко от Alpina — сытные блюда и закуски.",
      },
      hours: "Saisonal",
      image: "/places/restaurant-gudauri.webp",
      lat: 42.47563215280207,
      lng: 44.48044167739858,
      instagram: "https://www.instagram.com/restaurantgudauri/",
    },
    {
      number: 8,
      kind: "restaurant",
      name: "Montis",
      website: "https://carpediem.ge/restaurant/",
      tags: {
        de: ["Burger", "Pizza", "Casual"],
        en: ["Burgers", "Pizza", "Casual"],
        ru: ["Бургеры", "Пицца", "Неформально"],
      },
      desc: {
        de: "Locker & unkompliziert – Burgers, Pizza, schnelle Küche.",
        en: "Relaxed & easy-going – burgers, pizza, quick bites.",
        ru: "Непринуждённая атмосфера — бургеры, пицца, быстрые блюда.",
      },
      hours: "Saisonal",
      image: "/places/montis.webp",
      instagram: "https://www.instagram.com/montis_gudauri/",
    },
    {
      number: 9,
      kind: "restaurant",
      name: "Platforma BomBora",
      website: "https://hostbetter.com/recommend/restaurant-platforma/",
      tags: {
        de: ["Après-Ski", "Panorama"],
        en: ["Après-ski", "Panorama"],
        ru: ["Апре-ски", "Панорама"],
      },
      desc: {
        de: "Auf/nahe der Piste – Stimmung & Snacks mit Blick.",
        en: "On/near the slope – vibes & snacks with a view.",
        ru: "На/возле склона — атмосфера и закуски с видом.",
      },
      hours: "Saisonal",
      image: "/places/platforma-bombora.webp",
      lat: 42.47284868817391,
      lng: 44.487056320612254,
      instagram: "https://www.instagram.com/platforma_bombora/",
    },
  ];

  /* ---------- Bars (3-sprachig) ---------- */
  const bars = [
    {
      number: 101,
      kind: "bar",
      name: "Gudauri Travel Bar (Block 1)",
      website:
        "https://gudauri.travel/en/sovety-otdyhu-prozhivaniyu-gudauri/gudauri-travel-bar.html",
      tags: {
        de: ["Cocktails", "DJ", "Après-Ski"],
        en: ["Cocktails", "DJ", "Après-ski"],
        ru: ["Коктейли", "DJ", "Апре-ски"],
      },
      desc: {
        de: "Kultige Cocktailbar in New Gudauri Block 1 – Drinks, guter Sound, Ski-Movies.",
        en: "Iconic cocktail bar in New Gudauri Block 1 – drinks, great sound, ski movies.",
        ru: "Культовый коктейль-бар в New Gudauri Block 1 — напитки, музыка и ски-фильмы.",
      },
      hours: "09:00–02:00",
      image: "/places/gudauri-travel-bar.webp",
      lat: 42.470085,
      lng: 44.492783,
      instagram: "https://www.instagram.com/gudauribar/",
    },
    {
      number: 102,
      kind: "bar",
      name: "Black Dog Bar",
      website:
        "https://www.tripadvisor.com/Attraction_Review-g1588192-d15755133-Reviews-Black_Dog_Bar_Gudauri-Gudauri_Mtskheta_Mtianeti_Region.html",
      tags: {
        de: ["Craft Beer", "Snacks", "DJ/Live"],
        en: ["Craft beer", "Snacks", "DJ/live"],
        ru: ["Крафтовое пиво", "Закуски", "DJ/живой звук"],
      },
      desc: {
        de: "Kleine Bar nahe Gondel – Craft-Beer-Auswahl, Snacks & gelegentlich DJs.",
        en: "Small bar near the gondola – craft beers, snacks & occasional DJs.",
        ru: "Небольшой бар возле гондолы — крафтовое пиво, закуски и иногда DJ.",
      },
      hours: "14:00–01:00",
      image: "/places/black-dog-bar.webp",
      lat: 42.4698897,
      lng: 44.4917754,
      instagram: "https://www.instagram.com/blackdogbars_georgia/",
    },
    {
      number: 103,
      kind: "bar",
      name: "Grizzly Bar (Loft 1)",
      website: "https://wanderlog.com/place/13293980-grizzly-bar",
      tags: {
        de: ["DJ", "Shots", "Party"],
        en: ["DJ", "Shots", "Party"],
        ru: ["DJ", "Шоты", "Вечеринка"],
      },
      desc: {
        de: "Après-Ski pur: Shots, DJs, Tanzfläche. Direkt im Loft-Komplex.",
        en: "Pure après-ski: shots, DJs, dance floor. Located in the Loft complex.",
        ru: "Чистый апре-ски: шоты, DJ и танцпол. Прямо в комплексе Loft.",
      },
      hours: "09:00–23:00",
      image: "/places/grizzly-bar.webp",
      lat: 42.470085,
      lng: 44.492783,
      instagram: "https://www.instagram.com/grizzly_bar_gudauri/",
    },
    {
      number: 104,
      kind: "bar",
      name: "Posta Bar (Posta Hotel)",
      website: "https://postahotel.ge/",
      tags: {
        de: ["Cocktails", "Lounge", "Modern"],
        en: ["Cocktails", "Lounge", "Modern"],
        ru: ["Коктейли", "Лаундж", "Современно"],
      },
      desc: {
        de: "Stylishe Bar im Posta Hotel – internationale Crowd, Cocktails & Design.",
        en: "Stylish bar in the Posta Hotel – international crowd, cocktails & design.",
        ru: "Стильный бар в отеле Posta — интернациональная публика, коктейли и современный дизайн.",
      },
      hours: "17:00–01:00",
      image: "/places/posta-bar.webp",
      lat: 42.47039,
      lng: 44.49312,
      instagram: "https://www.instagram.com/postabar_gudauri/",
    },
    {
      number: 105,
      kind: "bar",
      name: "Papa Basil’s (Chalet Papa Basili)",
      website: "https://www.chaletpapabasili.com/",
      tags: {
        de: ["Wein & Chacha", "Lounge"],
        en: ["Wine & chacha", "Lounge"],
        ru: ["Вино и чача", "Лаундж"],
      },
      desc: {
        de: "Kleine Weinbar mit lokalem Wein & Häppchen.",
        en: "Small wine bar with local wines & snacks.",
        ru: "Небольшой винный бар с местными винами и закусками.",
      },
      hours: "16:00–00:00",
      image: "/places/papa-basil.webp",
      lat: 42.4763221,
      lng: 44.4781296,
      instagram: "https://www.instagram.com/papabasil_gudauri/",
    },
    {
      number: 106,
      kind: "bar",
      name: "Ice Bar",
      website: "https://www.skigeorgia.ge/new-ice-bar-gudauri/",
      tags: {
        de: ["Eisbar", "Piste", "Tagsüber"],
        en: ["Ice bar", "On the slope", "Daytime"],
        ru: ["Ледяной бар", "На склоне", "Днём"],
      },
      desc: {
        de: "Kalte Drinks in der Eisbar – direkt am Schnee, perfekter Fotospot.",
        en: "Cold drinks in an ice bar – right on the snow, perfect photo spot.",
        ru: "Холодные напитки в ледяном баре — прямо на снегу, отличное место для фото.",
      },
      hours: "Saisonal (tagsüber)",
      image: "/places/ice-bar.webp",
      lat: 42.47058845993117,
      lng: 44.491912823747924,
      instagram: "https://www.instagram.com/icebargudauri/",
    },
    {
      number: 107,
      kind: "bar",
      name: "Montis Green Door Bar",
      website:
        "https://www.tripadvisor.com/Attraction_Review-g1588192-d14908948-Reviews-Montis_Green_Door_Bar-Gudauri_Mtskheta_Mtianeti_Region.html",
      tags: {
        de: ["Cocktails", "Casual"],
        en: ["Cocktails", "Casual"],
        ru: ["Коктейли", "Неформально"],
      },
      desc: {
        de: "Unkomplizierte Bar – Treffpunkt für einen lockeren Abend.",
        en: "Relaxed bar – easy-going spot for the evening.",
        ru: "Непринуждённый бар — место для спокойного вечера.",
      },
      hours: "Saisonal",
      image: "/places/green-door-bar.webp",
      lat: 42.4703283071694,
      lng: 44.49222570712015,
      instagram: "https://www.instagram.com/montis_greendoorbar/",
    },
    {
      number: 108,
      kind: "bar",
      name: "MONT NOIR BAR GUDAURI",
      website:
        "https://www.tripadvisor.com/Attraction_Review-g1588192-d25147341-Reviews-Mont_Noir_Bar-Gudauri_Mtskheta_Mtianeti_Region.html",
      tags: {
        de: ["Cocktails", "DJ/Live"],
        en: ["Cocktails", "DJ/live"],
        ru: ["Коктейли", "DJ/живой звук"],
      },
      desc: {
        de: "Stylish, dunkel & laut – Cocktails und gelegentlich DJs.",
        en: "Stylish, dark & loud – cocktails and occasional DJs.",
        ru: "Стильно, темно и громко — коктейли и периодически DJ.",
      },
      hours: "Saisonal",
      image: "/places/mont-noir.webp",
      lat: 42.46438897853548,
      lng: 44.481090710823786,
      instagram: "https://www.instagram.com/montnoirbar/",
    },
    {
      number: 109,
      kind: "bar",
      name: "Skideal (Après-Ski Spot)",
      website:
        "https://newgudauri.com/en/skideal-ski-and-snowboard-rental-in-gudauri/",
      tags: {
        de: ["Après-Ski", "Terrasse", "Snacks"],
        en: ["Après-ski", "Terrace", "Snacks"],
        ru: ["Апре-ски", "Терраса", "Закуски"],
      },
      desc: {
        de: "Shop & Treff am Hang – Terrasse, schnelle Drinks/Snacks.",
        en: "Shop & meeting point on the slope – terrace, quick drinks/snacks.",
        ru: "Магазин и точка встречи у склона — терраса, быстрые напитки и закуски.",
      },
      hours: "Saisonal (tagsüber)",
      image: "/places/skideal.webp",
      lat: 42.47458992472735,
      lng: 44.48025476479208,
      instagram: "https://www.instagram.com/skideal_gudauri/",
    },
    {
      number: 110,
      kind: "bar",
      name: "Snow Time Bar",
      website: "https://snowtimebar.ge/",
      tags: {
        de: ["Cocktails", "Shisha", "Après-Ski"],
        en: ["Cocktails", "Shisha", "Après-ski"],
        ru: ["Коктейли", "Кальян", "Апре-ски"],
      },
      desc: {
        de: "Bar in Gudauri mit Shisha, Drinks, DJ, gratis Transfer von New Gudauri. Spiel- und Atmosphäre inklusive.",
        en: "Bar in Gudauri with shisha, drinks, DJ and a free transfer from New Gudauri. Games and atmosphere included.",
        ru: "Бар в Гудаури с кальяном, напитками, DJ и бесплатным трансфером из New Gudauri. Игры и отличная атмосфера.",
      },
      hours: "15:00–23:30",
      image: "/places/snow-time-bar.webp",
      lat: 42.47,
      lng: 44.492,
      instagram: "https://www.instagram.com/snowtime.bar/",
    },
  ];

  const allVenues = [...restaurants, ...bars];

  // Anchors
  const dishesRef = useRef(null);
  const foodRef = useRef(null);
  const barsRef = useRef(null);
  const mapRef = useRef(null);
  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const dishLabels = DISH_LABELS[lang] || DISH_LABELS.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon={<PartyPopper className="w-5 h-5" />}
      >
        {/* 🔵 Farbiges Top-Kästchen */}
        <TopBanner
          onToFood={() => scrollTo(foodRef)}
          onToBars={() => scrollTo(barsRef)}
          onToMap={() => scrollTo(mapRef)}
          onToDishes={() => scrollTo(dishesRef)}
          lang={lang}
        />

           {/* --- GEORGISCHE KÖSTLICHKEITEN --- */}
        <h2
          ref={dishesRef}
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            color: "#1d4ed8",
            textShadow: "0 0 8px rgba(59,130,246,0.5)",
            letterSpacing: "0.5px",
          }}
        >
          {h2Dishes}
        </h2>

        <Card className="hover-react">
          <div
            style={{
              fontSize: ".9rem",
              color: "#4b5563",
              marginBottom: "0.75rem",
            }}
          >
            {lang === "de"
              ? "Hier findest du die wichtigsten georgischen Klassiker, die du in Gudauri & Tiflis unbedingt probieren solltest."
              : lang === "ru"
              ? "Здесь собраны главные грузинские блюда, которые стоит попробовать в Гудаури и Тбилиси."
              : "Here are the most important Georgian classics you should definitely try in Gudauri and Tbilisi."}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "1rem",
            }}
          >
            {GEORGIAN_DISHES.map((dish) => (
              <DishCard
                key={dish.key}
                dish={dish}
                lang={lang}
                labels={dishLabels}
              />
            ))}
          </div>
        </Card>

        {/* --- RESTAURANTS --- */}
        <h2
          ref={foodRef}
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            marginTop: "1.75rem",
            color: "#0ea5e9",
            textShadow: "0 0 8px rgba(56,189,248,0.6)",
            letterSpacing: "0.5px",
          }}
        >
          {h2Restaurants}
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
          {restaurants.map((v) => (
            <VenueCard key={v.number} v={v} lang={lang} />
          ))}
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
          {h2Bars}
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
          {bars.map((v) => (
            <VenueCard key={v.number} v={v} lang={lang} />
          ))}
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
          {h2Map}
        </h2>

        <Card title={mapCardTitle} className="hover-react">
          <MapGudauri venues={allVenues} lang={lang} />
        </Card>

      </Section>
    </Layout>
  );
}
