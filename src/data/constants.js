// src/data/constants.js

// ======================================================
// Grunddaten
// ======================================================
export const PAAR = { braut: "Olga", braeutigam: "Volker" };
export const DATUM = {
  text: "Samstag, 28. Februar 2026",
  iso: "2026-02-28T14:00:00+04:00",
};

// ======================================================
// Medien / Bilder (alle extern via Unsplash Source API)
// ======================================================
export const IMAGES = {
  // Hero / Header – Gudauri
  heroBg: "/Hotel-Monte-Gudauri.jpg",    //Hotel-Monte-Gudauri
  heroCouple: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",

  // Gudauri / Kaukasus
  gudauriSlope: "https://picsum.photos/id/1015/1200/800",   // Skipiste/Ersatz
  gudauriView:  "https://picsum.photos/id/1021/1200/800",   // Bergblick/Ersatz
  crossPass:    "https://picsum.photos/id/1043/1200/800",   // Passstraße/Ersatz
  kazbegi:      "https://picsum.photos/id/1039/1200/800",   // Berggipfel/Ersatz

  // Tbilisi (für Region-Seite etc.)
  tbilisiAerial: "https://picsum.photos/id/1041/1200/800",
  sulfurBaths:   "https://picsum.photos/id/1050/1200/800",
  narikala:      "https://picsum.photos/id/1025/1200/800",
  bridgeOfPeace: "https://picsum.photos/id/1005/1200/800",

  // (optional) frühere Kakheti-Platzhalter
  sighnaghi: "https://picsum.photos/id/1042/1200/800",
  alaverdi:  "https://picsum.photos/id/1068/1200/800",
  telavi:    "https://picsum.photos/id/1067/1200/800",
  vineyard:  "https://picsum.photos/id/1080/1200/800",

  // --- Winter/Gudauri ---
winter: {
  hero: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1600&q=80", // Schneepanorama
  gudauriPiste: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1600&q=80",
  paragliding: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  gergetiWinter: "https://images.unsplash.com/photo-1601643157091-ce8a1c9b8c38?auto=format&fit=crop&w=1600&q=80",
  militaryRoad: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80",
  monteExterior: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/416686240.jpg?k=7d4c3a8e2e4c4b0a8c4d4d8f2f84d6b1a4b7c7d5a0a9e9c0b0&auto=format&fit=crop&w=1600&q=80",
  sunsetRidge: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
  apres: "https://images.unsplash.com/photo-1543352634-8730a9b4e8c9?auto=format&fit=crop&w=1600&q=80",
},

};


// ======================================================
// Links (Maps, Buchung, Flüge, …)
// ======================================================
export const LINKS = {
  maps: {
    tbilisiAirport:
      "https://www.google.com/maps/search/?api=1&query=Tbilisi%20International%20Airport",
    gudauri: "https://www.google.com/maps/search/?api=1&query=Gudauri",
    monteGudauri:
      "https://www.google.com/maps/search/?api=1&query=Monte%20Hotel%20Gudauri",
    didubeStation:
      "https://www.google.com/maps/search/?api=1&query=Didube%20Bus%20Station%20Tbilisi",
    crossPass:
      "https://www.google.com/maps/search/?api=1&query=Jvari%20Pass%20(Cross%20Pass)",
  },
  flights: [
    { name: "Skyscanner", url: "https://www.skyscanner.de/" },
    { name: "Google Flights", url: "https://www.google.com/travel/flights" },
  ],
  taxiApps: [
    { name: "Bolt", url: "https://bolt.eu" },
    { name: "Yandex Go", url: "https://taxi.yandex.com" },
  ],
  booking: {
    // Beibehaltener Key "methis", damit bestehender Code nicht bricht:
    methis: "https://www.booking.com/hotel/ge/monte.de.html?aid=304142&label=gen173nr-10EgZzZWFyY2goggI46AdIM1gEaDuIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Apzl_McGwAIB0gIkZDA5MDdjNzUtZTA5OS00ZGI0LWIwOTEtOTJiZmMyM2JjOTli2AIB4AIB&sid=e2ba0613dd6dba067c7f9e8c4aedfb36&dest_id=1289540&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1761555110&srpvid=79a13e4ea47c00f4&type=total&ucfs=1&",
},
  phone: {},

kazbegi: "https://www.google.com/maps/search/?api=1&query=Gergeti%20Trinity%20Church",
};

// ======================================================
// Fakten (für Region-Seite)
// ======================================================
export const FACTS = [
  { key: "population", icon: "👥", value: "≈ 3,7 Mio.", label: { de: "Einwohner", en: "Population", ru: "Население" } },
  { key: "area", icon: "🗺️", value: "≈ 69.700 km²", label: { de: "Fläche", en: "Area", ru: "Площадь" } },
  { key: "capital", icon: "🏛️", value: "Tiflis (Tbilisi)", label: { de: "Hauptstadt", en: "Capital", ru: "Столица" } },
  { key: "timezone", icon: "🕒", value: "UTC+4", label: { de: "Zeitzone", en: "Time zone", ru: "Часовой пояс" } },
  { key: "currency", icon: "💶", value: "GEL (Lari)", label: { de: "Währung", en: "Currency", ru: "Валюта" } },
  { key: "language", icon: "🗣️", value: "Georgisch", label: { de: "Amtssprache", en: "Official language", ru: "Офиц. язык" } },
  { key: "dial", icon: "☎️", value: "+995", label: { de: "Vorwahl", en: "Dial code", ru: "Тел. код" } },
  { key: "power", icon: "🔌", value: "220 V · Typ C/F", label: { de: "Strom", en: "Power", ru: "Электросеть" } },
  { key: "peak", icon: "⛰️", value: "Schchara 5.193 m", label: { de: "Höchster Gipfel", en: "Highest peak", ru: "Высшая точка" } },
  { key: "unesco", icon: "🏺", value: "Qvevri-Weintradition", label: { de: "UNESCO", en: "UNESCO", ru: "ЮНЕСКО" } },
  { key: "weatherFeb", icon: "🌡️", value: "Tiflis ≈ 5 / −1 °C", label: { de: "Ø Feb (Tag/Nacht)", en: "Avg Feb (day/night)", ru: "Сред. февр. (д/н)" } },
  { key: "visa", icon: "🛂", value: "Oft visumfrei; prüfen", label: { de: "Einreise/Visum", en: "Entry/Visa", ru: "Виза" } },
  { key: "drive", icon: "🚗", value: "Rechtsverkehr", label: { de: "Verkehr", en: "Driving", ru: "Движение" } },
  { key: "emergency", icon: "🚑", value: "112", label: { de: "Notruf", en: "Emergency", ru: "Экстренный" } },
  { key: "tips", icon: "💁", value: "≈ 10 % üblich", label: { de: "Trinkgeld", en: "Tipping", ru: "Чаевые" } },
  { key: "sim", icon: "📶", value: "Prepaid ~5–15 GEL", label: { de: "SIM (Magti/Beeline)", en: "SIM (Magti/Beeline)", ru: "SIM (Magti/Beeline)" } },
  { key: "best", icon: "📅", value: "Mai–Jun • Sep–Okt", label: { de: "Beste Reisezeit", en: "Best months", ru: "Лучшее время" } },
  { key: "flight", icon: "✈️", value: "DE–TBS ≈ 4–5 h (direkt)", label: { de: "Flugdauer", en: "Flight time", ru: "Перелёт" } },
  { key: "pay", icon: "💳", value: "Karte meist ok; Bargeld praktisch", label: { de: "Zahlen", en: "Payments", ru: "Оплата" } },
];

// ======================================================
// Ort / Venue (Gudauri / Monte)
// ======================================================
export const ORT = {
  name: "Monte Gudauri, Georgien",
  adresse: "Monte Hotel, Gudauri, Georgische Heerstraße (E117)",
  googleMapsUrl: LINKS.maps.monteGudauri,
  stadtKurzinfo:
    "Gudauri liegt hoch im Großen Kaukasus – Skiort mit weiten Bergblicken, frischer Luft und gemütlichen Hotels.",
  mustSees: [
    {
      title: "Gudauri Panorama",
      url: LINKS.maps.gudauri,
      desc: {
        de: "Weitblick über die Bergkämme – besonders schön zum Sonnenuntergang.",
        en: "Wide views across the mountain ridges – stunning at sunset.",
        ru: "Панорама горных хребтов — особенно красиво на закате.",
      },
    },
    {
      title: "Jvari / Cross Pass",
      url: LINKS.maps.crossPass,
      desc: {
        de: "Spektakuläre Passstraße entlang der Georgischen Heerstraße.",
        en: "Spectacular mountain pass along the Georgian Military Highway.",
        ru: "Зрелищный перевал на Военно-Грузинской дороге.",
      },
    },
    {
      title: "Kazbegi / Stepantsminda",
      url: LINKS.maps.gudauri,
      desc: {
        de: "Tagesausflug zur Gergeti-Kirche mit Blick auf den Kasbek (≈45–60 Min.).",
        en: "Day trip to Gergeti Trinity Church with views of Mount Kazbek (≈45–60 min).",
        ru: "Поездка к церкви Гергети с видом на Казбек (≈45–60 мин).",
      },
    },
  ],
};

// ======================================================
// Unterkunft / Hotel Monte Gudauri
// ======================================================
export const LOCATION_DETAILS = {
  name: "Hotel Monte Gudauri",
  adresse: "Upper Gudauri, Near Post, Gudauri 4702, Georgia",
  website: "https://www.montegudauri.com/",
  bookingUrl: "https://www.booking.com/hotel/ge/monte.html",
  kurzbeschreibung:
    "Gemütliches Hotel im Skigebiet Gudauri – mit Restaurant, Bar, Sauna, Jacuzzi und weitem Bergblick über den Kaukasus.",
  hinweise: [
    "Kostenloser Shuttle zum Shino-Skilift laut Hotel.",
    "Frühstücksbuffet täglich im Restaurant verfügbar.",
    "Sauna & Jacuzzi stehen Gästen kostenfrei zur Verfügung.",
  ],
  galerie: [
    "/Hotel-Monte-Gudauri.jpg", // dein neues Hauptbild (aus public/)
    "https://www.montegudauri.com/wp-content/uploads/2023/01/monte-view.jpg",
    "https://www.montegudauri.com/wp-content/uploads/2023/01/ski-slopes-gudauri.jpg",
    "https://www.montegudauri.com/wp-content/uploads/2023/01/mount-kazbegi.jpg",
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Monte+Hotel+Gudauri+Upper+Gudauri+Near+Post",
};


// ======================================================
// Anreise / Transfers
// ======================================================
export const ANREISE = {
  naechsterFlughafen: "Tbilisi International Airport (TBS)",
  alternative: ["Kutaisi (KUT)"],
  bahnhof: "Tbilisi Didube (Bus/Marshrutka-Knoten)",

  // String für bestehenden Code:
  transferHinweis:
    "Vom Flughafen Tiflis ca. 2–2,5 Std. bis Gudauri (je nach Verkehr & Wetter) über die Georgische Heerstraße (E117). Sammeltransfers je nach Ankünften.",

  // Zusätzlich (falls du später sprachspezifisch rendern willst):
  transferHinweisI18N: {
    de: "Vom Flughafen Tiflis ca. 2–2,5 Std. bis Gudauri (je nach Verkehr & Wetter) über die Georgische Heerstraße (E117).",
    en: "From Tbilisi Airport it's about 2–2.5 h to Gudauri via the Georgian Military Highway (E117), depending on traffic & weather.",
    ru: "От аэропорта Тбилиси ~2–2,5 ч до Гудаури по Военно-Грузинской дороге (E117), в зависимости от погоды и трафика.",
  },

  flugSucheLinks: LINKS.flights,

  tipps: [
    "TBS → Innenstadt per Bolt/Yandex: ca. 25–35 GEL – vermeidet teure Airport-Taxis.",
    "Winter: Straße nach Gudauri kann bei starkem Schneefall kurzfristig gesperrt sein – plant Puffer ein.",
    "SIM vor Ort: Magti/Silknet – Touristen-SIM ab ~10–30 GEL; Ausweis mitnehmen.",
  ],

  transfers: {
    shuttle: {
      contactName: "Shuttle-Koordination (Platzhalter)",
      phone: "+995 5XX XXX XXX",
      note: "Sammeltransfer am Hochzeitstag – Uhrzeiten & Treffpunkte folgen per E-Mail.",
    },
    taxis: [
      { name: "Lokaler Fahrer 1 (Platzhalter)", phone: "+995 5XX XXX XXX" },
      { name: "Lokaler Fahrer 2 (Platzhalter)", phone: "+995 5XX XXX XXX" },
    ],
    bus: [
      {
        route: "Tbilisi → Gudauri (Marshrutka/Bus)",
        from: "Didube Bus Station",
        stations: [{ label: "Didube Bus Station", url: LINKS.maps.didubeStation }],
        to: { label: "Gudauri", url: LINKS.maps.gudauri },
        note: "Tagsüber regelmäßig; Fahrzeit 2–3 Std., Preis ~20–30 GEL (bar).",
      },
    ],
  },

  kutaisiHinweis:
    "KUT → Tbilisi per Shuttle/Bus ~4–4,5 Std.; weiter nach Gudauri wie oben.",
};

// ======================================================
// Unterkunft-Empfehlungen (Flüge/Anreise)
// ======================================================
export const UNTERKUNFT = [
  {
    name: "Monte Gudauri",
    details:
      "Zimmer direkt an der Feier-Location – kurzer Weg, Restaurant & Bar, Bergblick.",
    url: LINKS.booking.methis,
  },
  {
    name: "Alternative in Gudauri",
    details:
      "Weitere Hotels & Apartments im Ort – z. B. Upper Gudauri (nahe Pisten).",
    url: "https://www.booking.com/city/ge/gudauri.de.html",
  },
];

// ======================================================
// Mehrsprachige Packliste (Februar)
// ======================================================
export const PACKLISTE_I18N = {
  de: [
    "Warmer Mantel/Daunenjacke",
    "Fleece oder dicker Pullover",
    "Thermo-Unterwäsche (für Ausflüge)",
    "Bequeme Winter- oder Wanderschuhe",
    "Schal, Mütze, Handschuhe",
    "Outfit für die Hochzeit (Abendkleidung)",
    "Schicke, bequeme Schuhe (drinnen)",
    "Reiseadapter Typ C/F (wie in DE)",
    "Persönliche Medikamente",
    "Powerbank & Ladegeräte",
    "Reisepass + etwas Bargeld (GEL)",
    "Sonnenbrille (helle Wintersonne)",
    "Google Translate offline (GE/EN)",
    "Badesachen (Spa/Hotelpool)",
    "Kamera/Handy + genug Speicher",
  ],
  en: [
    "Warm coat/down jacket",
    "Fleece or thick sweater",
    "Thermal underwear (for outings)",
    "Comfortable winter/hiking shoes",
    "Scarf, hat, gloves",
    "Outfit for the wedding (evening wear)",
    "Smart, comfy shoes (indoor)",
    "Travel adapter Type C/F (same as DE)",
    "Personal medication",
    "Power bank & chargers",
    "Passport + some cash (GEL)",
    "Sunglasses (bright winter sun)",
    "Google Translate offline (GE/EN)",
    "Swimwear (spa/hotel pool)",
    "Camera/phone + enough storage",
  ],
  ru: [
    "Тёплое пальто/пуховик",
    "Флис или тёплый свитер",
    "Термобельё (для прогулок/поездок)",
    "Удобная зимняя/треккинговая обувь",
    "Шарф, шапка, перчатки",
    "Наряд для свадьбы (вечерняя одежда)",
    "Элегантная удобная обувь (для помещения)",
    "Переходник Type C/F (как в Германии)",
    "Личные лекарства",
    "Паурбанк и зарядные устройства",
    "Паспорт + немного наличных (GEL)",
    "Солнцезащитные очки (яркое зимнее солнце)",
    "Оффлайн Google Translate (GE/EN)",
    "Купальные вещи (спа/бассейн отеля)",
    "Камера/телефон + достаточно памяти",
  ],
};

// ======================================================
// I18n Texte (DE/EN/RU)
// ======================================================
export const TEXTS = {
  // ---------- Deutsch ----------
  de: {
    nav: {
      start: "Start",
      flights: "Flüge/Anreise",
      region: "Infos zur Region",
      location: "Location",
       winter: "Winter in Georgien",   // 👈 NEU
      rsvp: "RSVP",
      calendar: "Kalender",
     gallery: "Essen · Trinken · Feiern",
    },
    heroIntro: "Wir heiraten in Gudauri, Georgien",
    heroThanks: "Wir freuen uns riesig, wenn möglichst viele von euch mit uns feiern!",
    dateLabel: "Hochzeitsdatum",
    sectionFeier: "Die Feier",
    feierSub: "Wichtige Eckdaten",
    stimmung: "Stimmung aus Georgien",
    stimmungSub: "Berge, Altstädte & Ausblicke – unsere Inspiration",

    flightsTitle: "Flüge & Anreise",
    flightsSub: "Ziel: Tbilisi (TBS) – Hochzeit am 28.02.2026",
    transfersTitle: "Transfers & Wege",
    regionTitle: "Region & Ausflüge",
    locationTitle: "Die Location",
    locationSub: "Monte Gudauri – Berge, Panorama & Feier",

    rsvpTitle: "Zusagen & Absagen (RSVP)",
    rsvpSub: "Bitte gebt uns bis 24. November 2025 Bescheid",
    contact: "Kontakt",
    addToCal: "Zum Kalender",
    planTrip: "Anreise planen",
    rsvpBtn: "Jetzt zusagen / absagen",
    hospitality: "Georgische Gastfreundschaft",
    wine: "Wein & Supra",
    mapOpen: "In Google Maps öffnen",

    placeTitle: "Ort",
    scheduleShort: "Zeitplan kurz",
    flightPlanning: "Flugplanung",
    tipsTitle: "Tipps & Hinweise",
    accommodationTitle: "Unterkunft (Auswahl)",
    website: "Website",
    mapLabel: "Karte",
    shuttle: "Shuttle",
    taxi: "Taxi",
    bus: "Bus / Marshrutka",
    fromLabel: "Ab",
    arrivalLabel: "Ankunft",
    altLabel: "Alternative",
    trainLabel: "Bahn",
    transferLabel: "Transfer",
    dayFlow: "Ablauf am Tag",
    gallery: "Galerie",
    impressions: "Impressionen",

    // Formular
    send: "Antwort absenden",
    sending: "Sende…",
    yesnoQ: "Nehmt ihr teil?",
    yes: "Ja",
    no: "Nein",
    people: "Anzahl Personen",
    diet: "Kinder",
    name: "Name",
    email: "E-Mail",
    namePlaceholder: "Vor- und Nachname",
    emailPlaceholder: "name@mail.de",
    dietPlaceholder: "nein, nur Party am besten ;-)",
    orEmail: "oder an",
    privacy: "Ich stimme der Verarbeitung meiner Angaben zur Organisation der Hochzeit zu.",
    privacyNote: "Nur für die Planung – danach löschen wir die Daten.",
    privacyTitle: "Datenschutz",
    privacyBody:
      "Wir behandeln eure Angaben vertraulich und nutzen sie ausschließlich zur Planung. Nach dem Event werden die Daten gelöscht.",
    rsvpSuccess: "Danke! Eure Antwort wurde übermittelt. 💌",

    factsTitle: "Georgien in Zahlen & Fakten",
    packlistTitle: "🎒 Packliste (Februar in Georgien)",
    packlistIntro:
      "Im Februar ist es winterlich (Tbilisi ~5 °C). In höheren Lagen teils Schnee – diese Liste hilft beim Packen:",
    bookEarlyNote:
      "🔔 Bitte frühzeitig buchen – rund um den Hochzeitstermin sind Unterkünfte gefragt.",

    place: {
      kakhetiVineyards: "Kaukasus",
      tbilisi: "Tiflis Altstadt",
      sulfurBaths: "Schwefelbäder Abanotubani",
      narikala: "Narikala Festung",
      bridgeOfPeace: "Bridge of Peace",
      sighnaghi: "Sighnaghi",
      alaverdi: "Alaverdi",
      telavi: "Telavi",
    },

    // Startseite – Karten / Texte
    sectionCelebration: "Die Feier",
    sectionCelebrationSub: "Alles Wichtige auf einen Blick – Ort, Zeitplan, Kontakt & Highlights.",
    cardVenueTitle: "Ort & Ablauf",
    venueLead: "Trauung & Dinner im",
    venueName: "Monte Gudauri",
    venueTail: "Dresscode: elegant, winterfest. Musik & Tanz bis in die Nacht.",
    mapsOpen: "Adresse in Google Maps öffnen",
    hlWine: "Gemütliche Bar & Lounge",
    hlMusic: "Musik & Tanz",
    hlWinter: "Winterliche Bergstimmung",

    cardTimelineTitle: "Zeitplan",
    tl14: "Freie Trauung",
    tl1530: "Sektempfang",
    tl18: "Dinner",
    tlEveningTime: "abends",
    tlEve: "Musik, Tanz & Überraschungen",

    cardContactTitle: "Kontakt",
    contactLead: "Fragen zu Anreise, Unterkunft oder Allergien?",
    contactEmailLabel: "love@example.com",

    accommodationIntro:
      "Monte Gudauri ist ein gemütliches Hotel im Skigebiet – mit Restaurant, Bar und weitem Bergblick.",
    bookingCta: "→ Auf Booking.com ansehen",
    hotelFeatures: {
      rooms: "Komfortable Zimmer",
      winery: "Lounge & Bar",
      restaurant: "Restaurant & Terrasse",
      pool: "Wellness/Pool (je nach Hotel)",
      wifi: "WLAN inklusive",
      parking: "Parkplätze am Haus",
      breakfast: "Frühstück & Bar",
      view: "Panorama über den Kaukasus",
    },
    openMap: "Auf Karte öffnen",

    transfersIntro:
      "Die Fahrt vom Tbilisi International Airport (TBS) nach Gudauri/Monte dauert ca. 2–2,5 Std. (je nach Verkehr & Wetter) über die Georgische Heerstraße (E117). Hier sind die besten Optionen:",
    transferOptions: {
      shuttleTitle: "🚐 Shuttle-Service",
      shuttleText: "Sammeltransfer am Hochzeitstag – bitte vorher anmelden.",
      shuttleNote: "Shuttle-Koordination (WhatsApp verfügbar)",
      taxiTitle: "🚕 Taxi / Fahrer",
      taxiText: "Komfortable Privattransfers oder lokale Taxis direkt am Flughafen.",
      taxiPrice: "Preis ca. 200–300 GEL pro Strecke (je nach Saison/Wetter).",
      rentTitle: "🚗 Mietwagen",
      rentText:
        "Ideal, wenn ihr flexibel reisen möchtet. Mietwagen sind direkt am Flughafen Tbilisi verfügbar.",
      rentNote:
        "Fahrzeit: ca. 2–2,5 h über die E117 – im Winter ggf. Schneekettenpflicht.",
      busTitle: "🚌 Öffentliche Busse",
      busText:
        "Abfahrt von Didube Bus Station in Tbilisi. Fahrzeit 2–3 Stunden, Preis ~20–30 GEL (bar).",
      busMap: "Busstation auf Google Maps öffnen",
    },
  },

  // ---------- English ----------
  en: {
    nav: {
      start: "Home",
      flights: "Flights & Arrival",
      region: "About the Region",
      location: "Venue",
        winter: "Winter in Georgia",  // 👈 NEW
      rsvp: "RSVP",
      calendar: "Calendar",
      gallery: "Eating · Drinking · Celebrating",
    },
    heroIntro: "We’re getting married in Gudauri, Georgia",
    heroThanks: "We’d be so happy if many of you could join us to celebrate!",
    dateLabel: "Wedding Date",
    sectionFeier: "The Celebration",
    feierSub: "Key Details",
    stimmung: "Impressions of Georgia",
    stimmungSub: "Mountains, old towns & breathtaking views – our inspiration",

    flightsTitle: "Flights & Arrival",
    flightsSub: "Destination: Tbilisi (TBS) – Wedding on 28 Feb 2026",
    transfersTitle: "Transfers & Directions",
    regionTitle: "Region & Highlights",
    locationTitle: "The Location",
    locationSub: "Monte Gudauri – mountain views & celebration",

    rsvpTitle: "RSVP – Confirm or Decline",
    rsvpSub: "Please reply by November 24, 2025",
    contact: "Contact",
    addToCal: "Add to Calendar",
    planTrip: "Plan Your Trip",
    rsvpBtn: "RSVP Now",
    hospitality: "Georgian Hospitality",
    wine: "Wine & Supra",
    mapOpen: "Open in Google Maps",

    placeTitle: "Venue",
    scheduleShort: "Schedule (short)",
    flightPlanning: "Flight Planning",
    tipsTitle: "Tips & Notes",
    accommodationTitle: "Accommodation (Selection)",
    website: "Website",
    mapLabel: "Map",
    shuttle: "Shuttle",
    taxi: "Taxi",
    bus: "Bus / Marshrutka",
    fromLabel: "From",
    arrivalLabel: "Arrival",
    altLabel: "Alternative",
    trainLabel: "Train Station",
    transferLabel: "Transfer",
    dayFlow: "Day Schedule",
    gallery: "Gallery",
    impressions: "Impressions",

    // Form
    send: "Send Response",
    sending: "Sending…",
    yesnoQ: "Will you attend?",
    yes: "Yes",
    no: "No",
    people: "Number of Guests",
    diet: "children",
    name: "Name",
    email: "Email",
    namePlaceholder: "First and last name",
    emailPlaceholder: "name@mail.com",
    dietPlaceholder: "no, only party is best ;-)",
    orEmail: "or via email to",
    privacy: "I agree that my data may be used for wedding organization purposes.",
    privacyNote: "For planning only – all data will be deleted afterwards.",
    privacyTitle: "Privacy Policy",
    privacyBody:
      "We treat your data confidentially and use it solely for organizing the wedding. After the event, all information will be deleted.",
    rsvpSuccess: "Thank you! Your response has been received. 💌",

    factsTitle: "Georgia in Numbers",
    packlistTitle: "🎒 Packing List (February in Georgia)",
    packlistIntro:
      "February is wintry (Tbilisi ~5 °C). Mountain areas may have snow — here’s a handy list:",
    bookEarlyNote:
      "🔔 Please book early — accommodation tends to fill up around the wedding date.",

    place: {
      kakhetiVineyards: "Caucasus",
      tbilisi: "Tbilisi Old Town",
      sulfurBaths: "Abanotubani Sulfur Baths",
      narikala: "Narikala Fortress",
      bridgeOfPeace: "Bridge of Peace",
      sighnaghi: "Sighnaghi",
      alaverdi: "Alaverdi",
      telavi: "Telavi",
    },

    sectionCelebration: "The Celebration",
    sectionCelebrationSub:
      "All the essentials—location, timeline, contact & highlights.",
    cardVenueTitle: "Venue & Plan",
    venueLead: "Ceremony & dinner at",
    venueName: "Monte Gudauri",
    venueTail: "Dress code: elegant, winter-ready. Music & dancing into the night.",
    mapsOpen: "Open address in Google Maps",
    hlWine: "Cozy bar & lounge",
    hlMusic: "Music & dancing",
    hlWinter: "Cozy winter vibes",

    cardTimelineTitle: "Timeline",
    tl14: "Ceremony",
    tl1530: "Reception",
    tl18: "Dinner",
    tlEveningTime: "evening",
    tlEve: "Music, dancing & surprises",

    cardContactTitle: "Contact",
    contactLead: "Questions about travel, accommodation or allergies?",
    contactEmailLabel: "love@example.com",

    accommodationIntro:
      "Monte Gudauri is a cozy mountain hotel with a restaurant, bar and sweeping views.",
    bookingCta: "→ View on Booking.com",
    hotelFeatures: {
      rooms: "Comfortable rooms",
      winery: "Lounge & bar",
      restaurant: "Restaurant & terrace",
      pool: "Wellness/pool (if available)",
      wifi: "Free Wi-Fi",
      parking: "On-site parking",
      breakfast: "Breakfast & bar",
      view: "Wide mountain views",
    },
    openMap: "Open on map",

    transfersIntro:
      "The trip from Tbilisi International Airport (TBS) to Gudauri/Monte takes about 2–2.5 h (traffic & weather) via the Georgian Military Highway (E117). Here are the best options:",
    transferOptions: {
      shuttleTitle: "🚐 Shuttle Service",
      shuttleText: "Group transfer on the wedding day — please register in advance.",
      shuttleNote: "Shuttle coordination (WhatsApp available)",
      taxiTitle: "🚕 Taxi / Private Driver",
      taxiText: "Comfortable private transfers or local taxis available at the airport.",
      taxiPrice: "Approx. 200–300 GEL per trip (season/weather).",
      rentTitle: "🚗 Car Rental",
      rentText:
        "Perfect if you prefer flexibility. Rental cars available directly at Tbilisi Airport.",
      rentNote:
        "Travel time: about 2–2.5 h via E117 — in winter chains may be required.",
      busTitle: "🚌 Public Buses",
      busText:
        "Depart from Didube Bus Station in Tbilisi. Travel time 2–3 hours, fare ~20–30 GEL (cash).",
      busMap: "Open bus station on Google Maps",
    },
  },

  // ---------- Russisch ----------
  ru: {
    nav: {
      start: "Главная",
      flights: "Рейсы и прибытие",
      region: "О регионе",
      location: "Локация",
       winter: "Зима в Грузии",  // 👈 НОВОЕ
      rsvp: "RSVP",
      calendar: "Еда · Напитки · Праздники",
      gallery: "Галерея",
    },
    heroIntro: "Мы женимся в Гудаури, Грузия",
    heroThanks: "Мы будем счастливы, если вы сможете отпраздновать с нами этот день!",
    dateLabel: "Дата свадьбы",
    sectionFeier: "Празднование",
    feierSub: "Основная информация",
    stimmung: "Атмосфера Грузии",
    stimmungSub: "Горы, старые города и виды — наше вдохновение",

    flightsTitle: "Рейсы и прибытие",
    flightsSub: "Пункт назначения: Тбилиси (TBS) — свадьба 28.02.2026",
    transfersTitle: "Трансферы и маршруты",
    regionTitle: "О регионе и достопримечательности",
    locationTitle: "Место проведения",
    locationSub: "Monte Gudauri — горные виды и праздник",

    rsvpTitle: "Подтверждение участия (RSVP)",
    rsvpSub: "Пожалуйста, дайте нам знать до 24 ноября 2025 года.",
    contact: "Контакт",
    addToCal: "Добавить в календарь",
    planTrip: "Спланировать поездку",
    rsvpBtn: "Подтвердить или отказаться",
    hospitality: "Грузинское гостеприимство",
    wine: "Вино и Супра",
    mapOpen: "Открыть в Google Картах",

    placeTitle: "Место",
    scheduleShort: "Краткое расписание",
    flightPlanning: "Планирование рейсов",
    tipsTitle: "Советы и информация",
    accommodationTitle: "Проживание (рекомендации)",
    website: "Веб-сайт",
    mapLabel: "Карта",
    shuttle: "Шаттл",
    taxi: "Такси",
    bus: "Автобус / маршрутка",
    fromLabel: "Откуда",
    arrivalLabel: "Прибытие",
    altLabel: "Альтернатива",
    trainLabel: "Ж/д вокзал",
    transferLabel: "Трансфер",
    dayFlow: "Ход дня",
    gallery: "Галерея",
    impressions: "Впечатления",

    // Формы
    send: "Отправить ответ",
    sending: "Отправка…",
    yesnoQ: "Вы участвуете?",
    yes: "Да",
    no: "Нет",
    people: "Количество человек",
    diet: "Дети",
    name: "Имя",
    email: "Эл. почта",
    namePlaceholder: "Имя и фамилия",
    emailPlaceholder: "name@mail.ru",
    dietPlaceholder: "нет, только вечеринка лучше всего ;-)",
    orEmail: "или по адресу",
    privacy: "Я согласен(а) на обработку данных для организации свадьбы.",
    privacyNote: "Только для планирования — после мероприятия данные будут удалены.",
    privacyTitle: "Конфиденциальность",
    privacyBody:
      "Мы обращаемся с вашими данными конфиденциально и используем их только для планирования свадьбы. После мероприятия данные будут удалены.",
    rsvpSuccess: "Спасибо! Ваш ответ отправлен 💌",

    factsTitle: "Грузия в цифрах",
    packlistTitle: "🎒 Список вещей (февраль в Грузии)",
    packlistIntro:
      "В феврале зима (Тбилиси ~5 °C). В горах возможен снег — этот список поможет собрать вещи:",
    bookEarlyNote:
      "🔔 Пожалуйста, бронируйте заранее — в даты свадьбы жильё быстро разбирают.",

    place: {
      kakhetiVineyards: "Кавказ",
      tbilisi: "Старый город Тбилиси",
      sulfurBaths: "Серные бани Абанотубани",
      narikala: "Крепость Нарикала",
      bridgeOfPeace: "Мост Мира",
      sighnaghi: "Сигнахи",
      alaverdi: "Алаверди",
      telavi: "Телави",
    },

    sectionCelebration: "Праздник",
    sectionCelebrationSub: "Всё важное: место, расписание, контакты и главное.",
    cardVenueTitle: "Место и программа",
    venueLead: "Церемония и ужин в",
    venueName: "Monte Gudauri",
    venueTail: "Дресс-код: элегантно и тепло. Музыка и танцы до ночи.",
    mapsOpen: "Открыть адрес в Google Maps",
    hlWine: "Уютный бар и лаунж",
    hlMusic: "Музыка и танцы",
    hlWinter: "Зимняя атмосфера в горах",

    cardTimelineTitle: "Расписание",
    tl14: "Церемония",
    tl1530: "Фуршет",
    tl18: "Ужин",
    tlEveningTime: "вечером",
    tlEve: "Музыка, танцы и сюрпризы",

    cardContactTitle: "Контакты",
    contactLead: "Вопросы по дороге, проживанию или аллергиям?",
    contactEmailLabel: "love@example.com",

    accommodationIntro:
      "Monte Gudauri — уютный горный отель с рестораном, баром и панорамными видами.",
    bookingCta: "→ Открыть на Booking.com",
    hotelFeatures: {
      rooms: "Уютные номера",
      winery: "Лаунж и бар",
      restaurant: "Ресторан и терраса",
      pool: "Велнес/бассейн (если доступен)",
      wifi: "Бесплатный Wi-Fi",
      parking: "Парковка на территории",
      breakfast: "Завтрак и бар",
      view: "Панорамы Кавказа",
    },
    openMap: "Открыть на карте",

    transfersIntro:
      "Поездка из аэропорта Тбилиси (TBS) до Гудаури/Monte занимает около 2–2,5 ч (зависит от погоды и трафика) по Военно-Грузинской дороге (E117). Вот лучшие варианты:",
    transferOptions: {
      shuttleTitle: "🚐 Трансфер-шаттл",
      shuttleText: "Групповой трансфер в день свадьбы — требуется предварительная запись.",
      shuttleNote: "Координация шаттла (WhatsApp)",
      taxiTitle: "🚕 Такси / частный водитель",
      taxiText: "Комфортные частные трансферы или местные такси прямо в аэропорту.",
      taxiPrice: "Около 200–300 GEL за поездку (в зависимости от сезона/погоды).",
      rentTitle: "🚗 Аренда автомобиля",
      rentText:
        "Удобно для самостоятельных поездок. Аренда доступна прямо в аэропорту Тбилиси.",
      rentNote:
        "В пути ~2–2,5 ч по E117 — зимой могут потребоваться цепи.",
      busTitle: "🚌 Общественные автобусы",
      busText:
        "Отправление с автостанции Дидубе (Тбилиси). В пути 2–3 часа, стоимость ~20–30 GEL (наличные).",
      busMap: "Открыть автовокзал в Google Картах",
    },
  },
};

// ======================================================
// Google-Kalender-Link
// ======================================================
const startUtc = new Date(DATUM.iso)
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(".000Z", "Z");

const endUtc = new Date(new Date(DATUM.iso).getTime() + 6 * 60 * 60 * 1000)
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(".000Z", "Z");

export const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `Hochzeit ${PAAR.braut} & ${PAAR.braeutigam}`
)}&dates=${startUtc}%2F${endUtc}&location=${encodeURIComponent(
  ORT.name
)}&details=${encodeURIComponent("Wir freuen uns auf euch!")}`;

// ======================================================
// Tagesablauf + Helper
// ======================================================
export const PROGRAMM = [
  {
    time: "14:00",
    title: { de: "Freie Trauung", en: "Wedding ceremony", ru: "Церемония" },
    place: { de: "Panorama-Bereich", en: "Panorama area", ru: "Панорамная зона" },
  },
  {
    time: "15:30",
    title: { de: "Sektempfang", en: "Reception", ru: "Фуршет" },
    place: { de: "Hotel-Lounge", en: "Hotel lounge", ru: "Лаунж отеля" },
  },
  {
    time: "18:00",
    title: { de: "Dinner", en: "Dinner", ru: "Ужин" },
    place: { de: "Restaurant", en: "Restaurant", ru: "Ресторан" },
  },
  {
    time: "20:30",
    title: { de: "Eröffnungstanz & Party", en: "First dance & party", ru: "Первый танец и вечеринка" },
    place: { de: "Saal", en: "Hall", ru: "Зал" },
  },
  {
    time: "23:00",
    title: { de: "Überraschung", en: "Surprise", ru: "Сюрприз" },
    place: { de: "Terrasse", en: "Terrace", ru: "Терраса" },
  },
];

export const getProgramm = (lang = "de") =>
  PROGRAMM.map((p) => ({
    time: p.time,
    title: p.title?.[lang] ?? p.title?.de ?? "",
    place: p.place?.[lang] ?? p.place?.de ?? "",
  }));
