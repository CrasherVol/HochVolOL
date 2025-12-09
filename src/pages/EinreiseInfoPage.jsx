import Layout from "../components/Layout.jsx";

const TEXTS_ENTRY = {
  de: {
    title: "Einreise nach Georgien ab 1. Januar 2026",
    intro: (
      <>
        Ab dem <strong>01.01.2026</strong> gilt für alle touristischen
        Reisenden nach Georgien eine{" "}
        <strong>Pflicht-Krankenversicherung</strong>.
      </>
    ),
    bullets: [
      "Die Versicherung muss die gesamte Reisedauer in Georgien abdecken.",
      "Ambulante und stationäre Behandlungskosten müssen eingeschlossen sein.",
      "Ein Nachweis der Versicherung kann bei der Einreise verlangt werden.",
      "Empfohlene Deckung: ca. 5.000 € für ambulante und 30.000 € für stationäre Behandlungen.",
      "Ideal ist eine Versicherungspolice auf Englisch (digital und als Ausdruck).",
    ],
    sourceText:
      "Quelle: Gesetzesänderung des georgischen Parlaments (2024/2025), Ankündigung der Georgian National Tourism Administration (GNTA).",
    gntaLabel: "Offizielle Infos der GNTA",
    parlLabel: "Gesetzesportal des Parlaments Georgiens",
  },
  en: {
    title: "Entry to Georgia from 1 January 2026",
    intro: (
      <>
        From <strong>01/01/2026</strong>, all tourists travelling to Georgia
        are required to have valid <strong>health insurance</strong>.
      </>
    ),
    bullets: [
      "The insurance must cover the entire duration of your stay in Georgia.",
      "Outpatient and inpatient medical treatment must be included.",
      "Proof of insurance may be requested upon entry.",
      "Recommended coverage: approx. €5,000 for outpatient and €30,000 for inpatient treatment.",
      "Ideally, bring your policy in English, both digital and printed.",
    ],
    sourceText:
      "Source: Amendments adopted by the Parliament of Georgia (2024/2025), announcement by the Georgian National Tourism Administration (GNTA).",
    gntaLabel: "Official information – GNTA",
    parlLabel: "Legislative portal – Parliament of Georgia",
  },
  ru: {
    title: "Въезд в Грузию с 1 января 2026 года",
    intro: (
      <>
        С <strong>01.01.2026</strong> для всех туристов, въезжающих в Грузию,
        обязательна <strong>медицинская страховка</strong>.
      </>
    ),
    bullets: [
      "Страховка должна покрывать весь период вашего пребывания в Грузии.",
      "Должны быть включены амбулаторное и стационарное лечение.",
      "Страховой полис могут потребовать при въезде в страну.",
      "Рекомендуемое покрытие: примерно 5 000 € для амбулаторного и 30 000 € для стационарного лечения.",
      "Лучше всего иметь полис на английском языке (в электронном виде и на бумаге).",
    ],
    sourceText:
      "Источник: изменения в законодательстве, принятые Парламентом Грузии (2024/2025), объявление Грузинской национальной администрации по туризму (GNTA).",
    gntaLabel: "Официальная информация GNTA",
    parlLabel: "Законодательный портал Парламента Грузии",
  },
};

export default function EinreiseInfoPage({ lang, setLang }) {
  const t = TEXTS_ENTRY[lang] || TEXTS_ENTRY.de;

  return (
    <Layout lang={lang} setLang={setLang}>
      <section className="section-card" style={{ padding: "2rem 1rem" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          {t.title}
        </h1>

        <p style={{ marginBottom: "1rem" }}>{t.intro}</p>

        <ul>
          {t.bullets.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>

        <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.7 }}>
          {t.sourceText}
        </p>

        {/* Offizielle / offizielle Links – gleich für alle Sprachen, nur Label ändert sich */}
        <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
          <p>
            🔗 {t.gntaLabel}:{" "}
            <a
              href="https://gnta.ge"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#c62828", textDecoration: "underline" }}
            >
              https://gnta.ge
            </a>
          </p>

          <p>
            🔗 {t.parlLabel}:{" "}
            <a
              href="https://parliament.ge"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#c62828", textDecoration: "underline" }}
            >
              https://parliament.ge
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
