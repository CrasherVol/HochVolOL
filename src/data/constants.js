// src/data/constants.js
export const PAAR = { braut: "Olga", braeutigam: "Volker" };
export const DATUM = { text: "Samstag, 28. Februar 2026", iso: "2026-02-28T14:00:00+04:00" };


export const IMAGES = {
  heroBg: "/gallery/Georgien_Landschaft.jpg",
  heroCouple: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
  tbilisiAerial: "/gallery/Tiflis_Altstadt2.jpg",
  sulfurBaths: "/gallery/Schwefelbäder _Abanotubani.jpg",
  narikala: "/gallery/Narikala_Festung.jpg",
  bridgeOfPeace: "/gallery/Bridge_of-Peace-Georgien.jpg",
  sighnaghi: "/gallery/georgia-Sighnaghi.jpg",
  alaverdi: "/gallery/Kloster_Alaverdi.jpg",
  telavi: "/gallery/Telavi_Georgien_Bild.jpg",
  vineyard: "https://cdn.pixabay.com/photo/2020/02/02/15/07/wine-4813260_1280.jpg",
 hotelHeroLocal: "/Hotel-Chateau-Mephis-Kalaki.jpg", // dein lokales Bild im /public/
  hotelOfficial1: "https://places.georgia.travel/_next/image?q=75&url=https%3A%2F%2Fapi-places.georgia.travel%2Fstorage%2Fimages%2F970x620%2F1%2812%29.webp&w=1920",
  hotelOfficial2: "https://places.georgia.travel/_next/image?q=75&url=https%3A%2F%2Fapi-places.georgia.travel%2Fstorage%2Fimages%2F970x620%2F5%281%29.webp&w=1920",
  hotelOfficial3: "https://places.georgia.travel/_next/image?q=75&url=https%3A%2F%2Fapi-places.georgia.travel%2Fstorage%2Fimages%2F970x620%2F3%289%29.webp&w=1920",
};

export const LINKS = {
  maps: {
    tbilisiOldTown:  "https://www.google.com/maps/search/?api=1&query=Tbilisi%20Old%20Town",
    sulfurBaths:     "https://www.google.com/maps/search/?api=1&query=Abanotubani%20Sulfur%20Baths",
    narikala:        "https://www.google.com/maps/search/?api=1&query=Narikala%20Fortress",
    bridgeOfPeace:   "https://www.google.com/maps/search/?api=1&query=Bridge%20of%20Peace%20Tbilisi",
    sighnaghi:       "https://www.google.com/maps/search/?api=1&query=Sighnaghi",
    alaverdi:        "https://www.google.com/maps/search/?api=1&query=Alaverdi%20Monastery",
    telavi:          "https://www.google.com/maps/search/?api=1&query=Telavi",
    kakhetiVines:    "https://www.google.com/maps/search/?api=1&query=Kakheti%20vineyards",
    methisKalaki:    "https://www.google.com/maps/search/?api=1&query=Chateau%20Methis%20Kalaki",
    tbilisiAirport:  "https://www.google.com/maps/search/?api=1&query=Tbilisi%20International%20Airport",
    didubeStation:   "https://www.google.com/maps/search/?api=1&query=Didube%20Bus%20Station%20Tbilisi",
    ortachalaStation:"https://www.google.com/maps/search/?api=1&query=Ortachala%20Bus%20Station%20Tbilisi",
    telaviBus:       "https://www.google.com/maps/search/?api=1&query=Telavi%20Bus%20Station"
  },
  flights: [
    { name: "Skyscanner",     url: "https://www.skyscanner.de/" },
    { name: "Google Flights", url: "https://www.google.com/travel/flights" }
  ],
  taxiApps: [
    { name: "Bolt",     url: "https://bolt.eu" },
    { name: "Yandex Go", url: "https://taxi.yandex.com" }
],
  booking: {
    methis: "https://www.booking.com/hotel/ge/chateau-mephis-kalaki.html", // direkter Booking-Link
  },
  phone: {
    methisMain: "+995 371 22 03 00",   // von Georgia Travel
    methisMobile: "+995 599 64 80 08", // von Georgia Travel
  },
};

// ------------------------------------------------------
// Fakten
// ------------------------------------------------------
export const FACTS = [
  { key: "population", icon: "👥", value: "≈ 3,7 Mio.", label: { de: "Einwohner", en: "Population", ru: "Население" } },
  { key: "area",       icon: "🗺️", value: "≈ 69.700 km²", label: { de: "Fläche", en: "Area", ru: "Площадь" } },
  { key: "capital",    icon: "🏛️", value: "Tiflis (Tbilisi)", label: { de: "Hauptstadt", en: "Capital", ru: "Столица" } },
  { key: "timezone",   icon: "🕒", value: "UTC+4", label: { de: "Zeitzone", en: "Time zone", ru: "Часовой пояс" } },
  { key: "currency",   icon: "💶", value: "GEL (Lari)", label: { de: "Währung", en: "Currency", ru: "Валюта" } },
  { key: "language",   icon: "🗣️", value: "Georgisch", label: { de: "Amtssprache", en: "Official language", ru: "Офиц. язык" } },
  { key: "dial",       icon: "☎️", value: "+995", label: { de: "Vorwahl", en: "Dial code", ru: "Тел. код" } },
  { key: "power",      icon: "🔌", value: "220 V · Typ C/F", label: { de: "Strom", en: "Power", ru: "Электросеть" } },
  { key: "peak",       icon: "⛰️", value: "Schchara 5.193 m", label: { de: "Höchster Gipfel", en: "Highest peak", ru: "Высшая точка" } },
  { key: "unesco",     icon: "🏺", value: "Qvevri-Weintradition", label: { de: "UNESCO", en: "UNESCO", ru: "ЮНЕСКО" } },
  { key: "weatherFeb", icon: "🌡️", value: "Tiflis ≈ 5 / −1 °C", label: { de: "Ø Feb (Tag/Nacht)", en: "Avg Feb (day/night)", ru: "Сред. февр. (д/н)" } },

  // ➕ Zusatzinfos
  { key: "visa",       icon: "🛂", value: "Oft visumfrei; prüfen", label: { de: "Einreise/Visum", en: "Entry/Visa", ru: "Виза" } },
  { key: "drive",      icon: "🚗", value: "Rechtsverkehr", label: { de: "Verkehr", en: "Driving", ru: "Движение" } },
  { key: "emergency",  icon: "🚑", value: "112", label: { de: "Notruf", en: "Emergency", ru: "Экстренный" } },
  { key: "tips",       icon: "💁", value: "≈ 10 % üblich", label: { de: "Trinkgeld", en: "Tipping", ru: "Чаевые" } },
  { key: "sim",        icon: "📶", value: "Prepaid ~5–15 GEL", label: { de: "SIM (Magti/Beeline)", en: "SIM (Magti/Beeline)", ru: "SIM (Magti/Beeline)" } },
  { key: "best",       icon: "📅", value: "Mai–Jun • Sep–Okt", label: { de: "Beste Reisezeit", en: "Best months", ru: "Лучшее время" } },
  { key: "flight",     icon: "✈️", value: "DE–TBS ≈ 4–5 h (direkt)", label: { de: "Flugdauer", en: "Flight time", ru: "Перелёт" } },
  { key: "pay",        icon: "💳", value: "Karte meist ok; Bargeld praktisch", label: { de: "Zahlen", en: "Payments", ru: "Оплата" } },
];

export const ORT = {
  name: "Chateau Methis Kalaki, Georgien",
  adresse: "Methis Kalaki, Region Kachetien, Georgien",
  googleMapsUrl: LINKS.maps.methisKalaki,
  stadtKurzinfo:
    "Das Chateau Methis Kalaki liegt in der Weinregion Kachetien – sanfte Hügel, Weinberge, georgische Gastfreundschaft.",
  mustSees: [
    {
      title: "Weinverkostung im Methis Kalaki",
      url: LINKS.maps.methisKalaki,
      desc: { de: "Probiert lokale Weine direkt im Weingut – mit Blick über die Hügel Kachetiens." }
    },
    {
      title: "Spaziergang durch die Weinberge",
      url: LINKS.maps.kakhetiVines,
      desc: { de: "Gemütlicher Spaziergang zwischen sonnenverwöhnten Reben rund um das Chateau." }
    },
    {
      title: "Telavi Altstadt",
      url: LINKS.maps.telavi,
      desc: { de: "Charmante Hauptstadt Kachetiens mit Märkten und historischer Architektur." }
    }
  ],
};

export const LOCATION_DETAILS = {
  name: "Chateau Methis Kalaki",
  adresse: "Methis Kalaki Estate, Kachetien, Georgien",
  website: "https://methis.ge/",               // ← NEU (falls noch nicht gesetzt)
  bookingUrl: "https://www.booking.com/hotel/ge/chateau-mephis-kalaki.de.html?aid=356980&label=gog235jc-10CAsoUkIVY2hhdGVhdS1tZXBoaXMta2FsYWtpSAdYA2g7iAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALajePHBsACAdICJGQxYzdkYWE0LTFiNjYtNGY3Yi04M2FhLWNmOTdjYjY2M2QwNdgCAeACAQ&sid=e2ba0613dd6dba067c7f9e8c4aedfb36&dest_id=-2325862&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1761134306&srpvid=2a26542d5dcd02eb&type=total&ucfs=1&",      // ← NEU (setze hier die echte Hotel-URL)
  kurzbeschreibung:
    "Elegantes Weingut-Hotel mit Restaurant, Terrasse und Blick auf die Weinberge. Perfekt für eine gemütliche Winterhochzeit — drinnen warm, draußen eindrucksvolle Natur.",
  hinweise: [
    "Trauung & Feier direkt im Chateau (Garten & Weinterrasse).",
    "Dresscode: elegant, gerne in warmen Tönen – abends kann es frisch werden.",
    "Shuttles ab Tbilisi International Airport (TBS).",
  ],
  galerie: [IMAGES.vineyard, IMAGES.alaverdi, IMAGES.sighnaghi, IMAGES.telavi],
  website: "https://www.mephiskalaki.ge/",
  bookingUrl: LINKS.booking.methis,
  galerie: [IMAGES.hotelOfficial1, IMAGES.hotelOfficial2, IMAGES.hotelOfficial3, IMAGES.hotelHeroLocal],
};

export const ANREISE = {
  naechsterFlughafen: "Tbilisi International Airport (TBS)",
  alternative: ["Kutaisi (KUT)"],
  bahnhof: "Tbilisi Central Station",

  // Klar & konkret:
transferHinweis: {
     de: "Vom Flughafen Tiflis ca. 90 Min. bis zum Chateau (je nach Verkehr). Sammeltransfers je nach Anzahl der Freunde im Flieger.",
    en: "From Tbilisi Airport, about 90 minutes to the chateau (depending on traffic). Group transfers are possible depending on how many friends arrive together.",
    ru: "От аэропорта Тбилиси примерно 90 минут до шато (в зависимости от трафика). Возможны групповые трансферы, если прилетает несколько гостей вместе.",
  },




  flugSucheLinks: LINKS.flights,

  // Kurze, nützliche Tipps mit echten Werten
  tipps: [
    "TBS → Innenstadt per Bolt/Yandex: ca. 25–35 GEL – vermeidet teure Airport-Taxis.",
    "SIM vor Ort: Magti/Silknet – Touristen-SIM ab ~10–30 GEL; Ausweis mitnehmen.",
    "Visum: Deutsche Staatsbürger i. d. R. bis zu 365 Tage visumfrei (Reisepass).",
  ],

  transfers: {
    shuttle: {
      contactName: "Shuttle-Koordination (Platzhalter)",
      phone: "+995 5XX XXX XXX",
      note: "Sammeltransfer am Hochzeitstag – Uhrzeiten & Treffpunkte folgen per E-Mail.",
    },

    taxis: [
      { name: "Lokales Taxi 1 (Platzhalter)", phone: "+995 5XX XXX XXX" },
      { name: "Lokales Taxi 2 (Platzhalter)", phone: "+995 5XX XXX XXX" },
    ],

    // Öffis mit echten Tbilisi→Telavi-Infos
    bus: [
      {
        route: "Tbilisi → Telavi (Marshrutka/Bus)",
        from: "Ortachala oder Samgori",
        stations: [
          { label: "Ortachala Bus Station", url: LINKS.maps.ortachalaStation },
          { label: "Samgori Bus Station", url: LINKS.maps.ortachalaStation.replace("Ortachala", "Samgori") },
        ],
        to: { label: "Telavi Bus Station", url: LINKS.maps.telaviBus },
        note:
          "Abfahrten tagsüber häufig: Ortachala alle ~45 Min. (08:15–17:00), Samgori alle ~40 Min. (09:30–16:45). Fahrzeit 2–3 Std., ca. 12–15 GEL (bar).",
      },
    ],
  },

  // Bonus: Alternative via Kutaisi – hilfreich, wenn Gäste dort landen
  kutaisiHinweis:
    "KUT → Tbilisi per Shuttle/Train ~4–4,5 Std.; Taxi/Transfer ~3–3,5 Std. (Preis je nach Anbieter).",
};


export const UNTERKUNFT = [
  {
    name: "Chateau Methis Kalaki Hotel",
    details:
      "Boutique-Zimmer direkt am Weingut – kurze Wege zur Feier; Außenbereiche & Weinterrasse ideal für einen entspannten Abend.",
    url: "https://methis.ge/",
  },
  {
    name: "Telavi Inn Boutique Hotel",
    details:
      "~20 Min. entfernt; Pool, Spa & Restaurant – gute Option für größere Gruppen.",
    url: "https://www.telaviinn.ge/",
  },
];


// ------------------------------------------------------
// NEU: Packliste (Februar in Georgien)
// ------------------------------------------------------
// Mehrsprachige Packliste
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
// Mehrsprachige Texte (i18n)
// ======================================================
export const TEXTS = {
  de: {
    nav: {
      start: "Start",
      flights: "Flüge/Anreise",
      region: "Infos zur Region",
      location: "Location",
      rsvp: "RSVP",
      calendar: "Kalender",
      gallery: "Galerie",
    },
    heroIntro: "Wir heiraten in Kachetien, Georgien",
    heroThanks: "Wir freuen uns riesig, wenn möglichst viele von euch mit uns feiern!",
    dateLabel: "Hochzeitsdatum",
    sectionFeier: "Die Feier",
    feierSub: "Wichtige Eckdaten",
    stimmung: "Stimmung aus Georgien",
    stimmungSub: "Weinberge, Altstädte & Ausblicke – unsere Inspiration",
    flightsTitle: "Flüge & Anreise",
    flightsSub: "Ziel: Tbilisi (TBS) – Hochzeit am 28.02.2026",
    transfersTitle: "Transfers & Wege",
    regionTitle: "Region & Ausflüge",
    locationTitle: "Die Location",
    locationSub: "Chateau Methis Kalaki – Wein, Aussicht & Feier",
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
    // --- NEU: Packliste-Strings
    packlistTitle: "🎒 Packliste (Februar in Georgien)",
    packlistIntro: "Im Februar ist es winterlich (Tbilisi ~5 °C, Telavi ~0–8 °C). In höheren Lagen teils Schnee – diese Liste hilft beim Packen:",
    bookEarlyNote: "🔔 Bitte frühzeitig buchen – rund um den Hochzeitstermin sind Unterkünfte gefragt.",
    place: {
      kakhetiVineyards: "Kachetien Weinberge",
      tbilisi: "Tiflis Altstadt",
      sulfurBaths: "Schwefelbäder Abanotubani",
      narikala: "Narikala Festung",
      bridgeOfPeace: "Bridge of Peace",
      sighnaghi: "Sighnaghi",
      alaverdi: "Kloster Alaverdi",
      telavi: "Telavi",
      // Homepage (Start)
heroLogoAlt: "Olga & Volker – Hochzeitslogo",
heroEyebrow: "Große Party in Tachetien in Georgien !!!",
heroTitle: "Wir heiraten!",
name1: "Olga",
name2: "Volker",
heroSub:
  "Willkommen – hier findet ihr alles zu Anreise, Location, Ablauf und am wichtigsten - Die Anmeldung. Wir freuen uns riesig, wenn möglichst viele von euch mit uns feiern!",

cta1: "1. RSVP ausfüllen",
cta2: "2. Flug buchen",
cta3: "3. Ort merken",

quickRegion: "Kachetien (Telavi/Sighnaghi)",
quickFood: "Georgische Küche & Wein",
quickCeremony: "Freie Trauung & Dinner",

sectionCelebration: "Die Feier",
sectionCelebrationSub: "Alles Wichtige auf einen Blick – Ort, Zeitplan, Kontakt & Highlights.",

cardVenueTitle: "Ort & Ablauf",
venueLead: "Trauung & Dinner im",
venueName: "Chateau Methis Kalaki",
venueTail: "Dresscode: elegant, winterfest. Musik & Tanz bis in die Nacht.",
mapsOpen: "Adresse in Google Maps öffnen",

hlWine: "Qvevri-Weinverkostung",
hlMusic: "Musik & Tanz",
hlWinter: "Winterliche Stimmung",

cardTimelineTitle: "Zeitplan",
tl14: "Freie Trauung",
tl1530: "Sektempfang & Weinverkostung",
tl18: "Dinner",
tlEveningTime: "abends",
tlEve: "Musik, Tanz & Überraschungen",

cardContactTitle: "Kontakt",
contactLead: "Fragen zu Anreise, Unterkunft oder Allergien?",
contactEmailLabel: "love@example.com",

accommodationIntro: "Das Chateau Methis Kalaki ist ein Boutique-Weingut in Kachetien – mit eleganten Zimmern, Restaurant, Terrasse, Wellness-Optionen und Blick über die Weinberge.",
bookingCta: "→ Auf Booking.com ansehen",
hotelFeatures: {
  rooms: "Komfortable Zimmer",
  winery: "Weingut & Verkostung",
  restaurant: "Restaurant & Terrasse",
  pool: "Außenpool (Sommer)",
  wifi: "WLAN inklusive",
  parking: "Parkplätze am Haus",
  breakfast: "Frühstück & Bar",
  view: "Weitblick über Kachetien",
},
openMap: "Auf Karte öffnen",

transfersIntro:
  "Der Weg vom Tbilisi International Airport (TBS) zum Chateau Methis Kalaki in Upper Chocheti, Kachetien dauert etwa 90 Minuten. Hier sind die besten Möglichkeiten:",
transferOptions: {
  shuttleTitle: "🚐 Shuttle-Service",
  shuttleText: "Sammeltransfer am Hochzeitstag – bitte vorher anmelden.",
  shuttleNote: "Shuttle-Koordination (WhatsApp verfügbar)",
  taxiTitle: "🚕 Taxi / Fahrer",
  taxiText: "Komfortable Privattransfers oder lokale Taxis direkt am Flughafen.",
  taxiPrice: "Preis ca. 120–150 GEL (≈ 40–50 €) pro Strecke.",
  rentTitle: "🚗 Mietwagen",
  rentText:
    "Ideal, wenn ihr flexibel reisen möchtet. Mietwagen sind direkt am Flughafen Tbilisi verfügbar.",
  rentNote: "Fahrzeit: ca. 1 h 30 min über Kakheti Hwy (S5) – gute Straße.",
  busTitle: "🚌 Öffentliche Busse",
  busText:
    "Abfahrt von Ortachala oder Samgori Bus Station in Tbilisi. Fahrzeit 2–3 Stunden, Preis ca. 15 GEL (bar).",
  busMap: "Busstation auf Google Maps öffnen",
},


    },
  },

// ========= EN (English) =========
en: {
  nav: {
    start: "Home",
    flights: "Flights & Arrival",
    region: "About the Region",
    location: "Venue",
    rsvp: "RSVP",
    calendar: "Calendar",
    gallery: "Gallery",
  },

  // Hero / Home
  heroIntro: "We’re getting married in Kakheti, Georgia",
  heroThanks: "We’d be so happy if many of you could join us to celebrate!",
  dateLabel: "Wedding Date",
  heroLogoAlt: "Olga & Volker — wedding logo",
  heroEyebrow: "Big party in Kakheti, Georgia!!!",
  heroTitle: "We're getting married!",
  name1: "Olga",
  name2: "Volker",
  heroSub:
    "Welcome—here you'll find everything about travel, venue, timeline, and most importantly—the RSVP. We can’t wait to celebrate with as many of you as possible!",

  // CTA buttons
  cta1: "1. Fill out RSVP",
  cta2: "2. Book flights",
  cta3: "3. Save the venue",

  // Quick facts
  quickRegion: "Kakheti (Telavi/Sighnaghi)",
  quickFood: "Georgian food & wine",
  quickCeremony: "Non-religious ceremony & dinner",

  // Sections / pages
  sectionFeier: "The Celebration",
  feierSub: "Key Details",
  stimmung: "Impressions of Georgia",
  stimmungSub: "Vineyards, old towns & breathtaking views – our inspiration",
  flightsTitle: "Flights & Arrival",
  flightsSub: "Destination: Tbilisi (TBS) – Wedding on 28 Feb 2026",
  transfersTitle: "Transfers & Directions",
  regionTitle: "Region & Highlights",
  locationTitle: "The Location",
  locationSub: "Chateau Methis Kalaki – wine, views & celebration",
  rsvpTitle: "RSVP – Confirm or Decline",
  rsvpSub: "Please reply by November 24, 2025",
  contact: "Contact",
  addToCal: "Add to Calendar",
  planTrip: "Plan Your Trip",
  rsvpBtn: "RSVP Now",
  hospitality: "Georgian Hospitality",
  wine: "Wine & Supra",
  mapOpen: "Open in Google Maps",

  // Venue / Flow / Form
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

  // Form strings
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

  // Packing list
  packlistTitle: "🎒 Packing List (February in Georgia)",
  packlistIntro:
    "February is wintry (Tbilisi ~5 °C, Telavi ~0–8 °C). Mountain areas may have snow — here’s a handy list:",
  bookEarlyNote:
    "🔔 Please book early — accommodation tends to fill up around the wedding date.",

  // Places captions
  place: {
    kakhetiVineyards: "Kakheti Vineyards",
    tbilisi: "Tbilisi Old Town",
    sulfurBaths: "Abanotubani Sulfur Baths",
    narikala: "Narikala Fortress",
    bridgeOfPeace: "Bridge of Peace",
    sighnaghi: "Sighnaghi",
    alaverdi: "Alaverdi Monastery",
    telavi: "Telavi",
  },

  // Home cards
  sectionCelebration: "The Celebration",
  sectionCelebrationSub:
    "All the essentials—location, timeline, contact & highlights.",
  cardVenueTitle: "Venue & Plan",
  venueLead: "Ceremony & dinner at",
  venueName: "Chateau Methis Kalaki",
  venueTail:
    "Dress code: elegant, winter-ready. Music & dancing into the night.",
  mapsOpen: "Open address in Google Maps",
  hlWine: "Qvevri wine tasting",
  hlMusic: "Music & dancing",
  hlWinter: "Cozy winter vibes",
  cardTimelineTitle: "Timeline",
  tl14: "Ceremony",
  tl1530: "Reception & wine tasting",
  tl18: "Dinner",
  tlEveningTime: "evening",
  tlEve: "Music, dancing & surprises",
  cardContactTitle: "Contact",
  contactLead: "Questions about travel, accommodation or allergies?",
  contactEmailLabel: "love@example.com",

  // Accommodation (Flights page)
  accommodationIntro:
    "Chateau Methis Kalaki is a boutique winery-hotel in Kakheti with elegant rooms, a restaurant and terrace, wellness options and sweeping vineyard views.",
  bookingCta: "→ View on Booking.com",
  hotelFeatures: {
    rooms: "Comfortable rooms",
    winery: "Winery & tasting",
    restaurant: "Restaurant & terrace",
    pool: "Outdoor pool (summer)",
    wifi: "Free Wi-Fi",
    parking: "On-site parking",
    breakfast: "Breakfast & bar",
    view: "Wide views over Kakheti",
  },
  openMap: "Open on map",

  // Transfers (Flights page)
  transfersIntro:
    "The trip from Tbilisi International Airport (TBS) to Chateau Methis Kalaki in Upper Chocheti, Kakheti takes about 90 minutes. Here are the best transfer options:",
  transferOptions: {
    shuttleTitle: "🚐 Shuttle Service",
    shuttleText: "Group transfer on the wedding day — please register in advance.",
    shuttleNote: "Shuttle coordination (WhatsApp available)",
    taxiTitle: "🚕 Taxi / Private Driver",
    taxiText: "Comfortable private transfers or local taxis available at the airport.",
    taxiPrice: "Approx. 120–150 GEL (~€40–50) per trip.",
    rentTitle: "🚗 Car Rental",
    rentText:
      "Perfect if you prefer flexibility. Rental cars available directly at Tbilisi Airport.",
    rentNote: "Travel time: about 1 h 30 min via Kakheti Hwy (S5) — paved, scenic road.",
    busTitle: "🚌 Public Buses",
    busText:
      "Depart from Ortachala or Samgori bus stations in Tbilisi. Travel time 2–3 hours, fare about 15 GEL (cash).",
    busMap: "Open bus station on Google Maps",
   },
}, // <<< WICHTIG: EN-Block schließen und MIT KOMMA beenden!

// ========= RU (Русский) =========
ru: {
  nav: {
    start: "Главная",
    flights: "Рейсы и прибытие",
    region: "О регионе",
    location: "Локация",
    rsvp: "RSVP",
    calendar: "Календарь",
    gallery: "Галерея",
  },

  // Hero / Startseite
  heroIntro: "Мы женимся в Кахетии, Грузия",
  heroThanks: "Мы будем счастливы, если вы сможете отпраздновать с нами этот день!",
  dateLabel: "Дата свадьбы",
  heroLogoAlt: "Логотип свадьбы Ольги и Фолькера",
  heroEyebrow: "Большая вечеринка в Кахетии, Грузия!!!",
  heroTitle: "Мы женимся!",
  name1: "Ольга",
  name2: "Фолькер",
  heroSub:
    "Добро пожаловать — здесь вы найдёте всё про дорогу, место, программу и самое важное — регистрацию (RSVP). Мы безумно рады, если как можно больше из вас отпразднует с нами!",

  // CTA-Buttons (Hero)
  cta1: "1. Заполнить RSVP",
  cta2: "2. Купить билеты",
  cta3: "3. Сохранить адрес",

  // Quick facts
  quickRegion: "Кахетия (Телави/Сигнахи)",
  quickFood: "Грузинская кухня и вино",
  quickCeremony: "Выездная церемония и ужин",

  // Sektionen / Seiten
  sectionFeier: "Празднование",
  feierSub: "Основная информация",
  stimmung: "Атмосфера Грузии",
  stimmungSub: "Виноградники, старые города и захватывающие виды — наше вдохновение",
  flightsTitle: "Рейсы и прибытие",
  flightsSub: "Пункт назначения: Тбилиси (TBS) — свадьба 28.02.2026",
  transfersTitle: "Трансферы и маршруты",
  regionTitle: "О регионе и достопримечательности",
  locationTitle: "Место проведения",
  locationSub: "Chateau Methis Kalaki — вино, вид и праздник",
  rsvpTitle: "Подтверждение участия (RSVP)",
  rsvpSub: "Пожалуйста, дайте нам знать до 24 ноября 2025 года.",
  contact: "Контакт",
  addToCal: "Добавить в календарь",
  planTrip: "Спланировать поездку",
  rsvpBtn: "Подтвердить или отказаться",
  hospitality: "Грузинское гостеприимство",
  wine: "Вино и Супра",
  mapOpen: "Открыть в Google Картах",

  // Venue / Ablauf / Form
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

  // Formular
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

  // Fakten / Packliste
  factsTitle: "Грузия в цифрах",
  packlistTitle: "🎒 Список вещей (февраль в Грузии)",
  packlistIntro:
    "В феврале зима (Тбилиси ~5 °C, Телави ~0–8 °C). В горах возможен снег — этот список поможет собрать вещи:",
  bookEarlyNote:
    "🔔 Пожалуйста, бронируйте заранее — в даты свадьбы жильё быстро разбирают.",

  // Orte (Bildunterschriften etc.)
  place: {
    kakhetiVineyards: "Виноградники Кахетии",
    tbilisi: "Старый город Тбилиси",
    sulfurBaths: "Серные бани Абанотубани",
    narikala: "Крепость Нарикала",
    bridgeOfPeace: "Мост Мира",
    sighnaghi: "Сигнахи",
    alaverdi: "Монастырь Алаверди",
    telavi: "Телави",
  },

  // Startseite – Karten / Texte
  sectionCelebration: "Праздник",
  sectionCelebrationSub: "Всё важное: место, расписание, контакты и главное.",
  cardVenueTitle: "Место и программа",
  venueLead: "Церемония и ужин в",
  venueName: "Chateau Methis Kalaki",
  venueTail: "Дресс-код: элегантно, по-зимнему. Музыка и танцы до ночи.",
  mapsOpen: "Открыть адрес в Google Maps",
  hlWine: "Дегустация вина из квеври",
  hlMusic: "Музыка и танцы",
  hlWinter: "Зимнее настроение",
  cardTimelineTitle: "Расписание",
  tl14: "Церемония",
  tl1530: "Фуршет и дегустация вина",
  tl18: "Ужин",
  tlEveningTime: "вечером",
  tlEve: "Музыка, танцы и сюрпризы",
  cardContactTitle: "Контакты",
  contactLead: "Вопросы по дороге, проживанию или аллергиям?",
  contactEmailLabel: "love@example.com",

  // Unterkunft (auf Flüge/Anreise)
  accommodationIntro:
    "Chateau Methis Kalaki — бутик-отель-винодельня в Кахетии: элегантные номера, ресторан с террасой, варианты SPA/Wellness и виды на виноградники.",
  bookingCta: "→ Открыть на Booking.com",
  hotelFeatures: {
    rooms: "Уютные номера",
    winery: "Винодельня и дегустации",
    restaurant: "Ресторан и терраса",
    pool: "Открытый бассейн (летом)",
    wifi: "Бесплатный Wi-Fi",
    parking: "Парковка на территории",
    breakfast: "Завтрак и бар",
    view: "Панорамы Кахетии",
  },
  openMap: "Открыть на карте",

  // Transfers (auf Flüge/Anreise)
  transfersIntro:
    "Поездка из международного аэропорта Тбилиси (TBS) до Chateau Methis Kalaki в Верхнем Чочети (Кахетия) занимает около 90 минут. Вот лучшие варианты трансфера:",
  transferOptions: {
    shuttleTitle: "🚐 Трансфер-шаттл",
    shuttleText: "Групповой трансфер в день свадьбы — требуется предварительная запись.",
    shuttleNote: "Координация шаттла (доступен WhatsApp)",
    taxiTitle: "🚕 Такси / частный водитель",
    taxiText: "Удобные частные трансферы или местные такси прямо в аэропорту.",
    taxiPrice: "Стоимость около 120–150 GEL (~40–50 €) в одну сторону.",
    rentTitle: "🚗 Аренда автомобиля",
    rentText:
      "Подходит, если вы хотите путешествовать самостоятельно. Аренда доступна прямо в аэропорту Тбилиси.",
    rentNote: "В пути около 1 ч 30 мин по трассе Kakheti Hwy (S5) — отличная дорога.",
    busTitle: "🚌 Общественные автобусы",
    busText:
      "Отправление со станций Ортачала или Самгори в Тбилиси. В пути 2–3 часа, стоимость около 15 GEL (наличные).",
    busMap: "Открыть автобусную станцию в Google Картах",
  },
   },
};

// ======================================================
// Google-Kalender-Link automatisch generieren
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

// --- Mehrsprachiger Tagesablauf + Helper ---
export const PROGRAMM = [
  {
    time: "14:00",
    title: { de: "Freie Trauung", en: "Wedding ceremony", ru: "Церемония" },
    place: { de: "Garten des Chateaus", en: "Chateau garden", ru: "Сад шато" },
  },
  {
    time: "15:30",
    title: { de: "Sektempfang & Weinverkostung", en: "Reception & wine tasting", ru: "Фуршет и дегустация вина" },
    place: { de: "Weinterrasse", en: "Wine terrace", ru: "Винная терраса" },
  },
  {
    time: "18:00",
    title: { de: "Dinner", en: "Dinner", ru: "Ужин" },
    place: { de: "Restaurant", en: "Restaurant", ru: "Ресторан" },
  },
  {
    time: "20:30",
    title: { de: "Eröffnungstanz & Party", en: "First dance & party", ru: "Первый танец и вечеринка" },
    place: { de: "Innenhof", en: "Courtyard", ru: "Внутренний двор" },
  },
  {
    time: "23:00",
    title: { de: "Überraschung", en: "Surprise", ru: "Сюрприз" },
    place: { de: "Terrasse", en: "Terrace", ru: "Терраса" },
  },
];

// Liefert den Ablauf in der gewünschten Sprache (Fallback: DE)
export const getProgramm = (lang = "de") =>
  PROGRAMM.map((p) => ({
    time: p.time,
    title: p.title?.[lang] ?? p.title?.de ?? "",
    place: p.place?.[lang] ?? p.place?.de ?? "",
  }));
