// src/components/GELConversionBox.jsx
import React, { useEffect, useState } from "react";
import {
  Car,
  MountainSnow,
  Snowflake,
  Beer,
  Martini,
  CupSoda,
  UtensilsCrossed,
  Coins,
  ArrowLeftRight,
} from "lucide-react";

export default function GELConversionBox({ lang = "de" }) {
  const [rateEUR, setRateEUR] = useState(null); // 1 GEL in EUR
  const [rateRUB, setRateRUB] = useState(null); // 1 GEL in RUB
  const [customGel, setCustomGel] = useState(100);
  const [error, setError] = useState(null); // optional für Fallback-Hinweis

  // Live-Kurse laden (oder Fallback)
  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const res = await fetch(
          "https://latest.currency-api.pages.dev/v1/currencies/gel.json"
        );

        if (!res.ok) {
          throw new Error("HTTP-Fehler: " + res.status);
        }

        const data = await res.json();
        console.log("GEL API Daten:", data);

        const eur = data?.gel?.eur;
        const rub = data?.gel?.rub;

        if (!cancelled && typeof eur === "number" && typeof rub === "number") {
          // echte Live-Werte
          setRateEUR(eur);
          setRateRUB(rub);
          setError(null);
        } else if (!cancelled) {
          // Fallback: feste Richtwerte
          setRateEUR(0.32);
          setRateRUB(30);
          setError("fallback");
        }
      } catch (err) {
        console.error("Fehler beim Laden der Wechselkurse:", err);
        if (!cancelled) {
          setRateEUR(0.32);
          setRateRUB(30);
          setError("fallback");
        }
      }
    }

    loadRates();

    return () => {
      cancelled = true;
    };
  }, []);

  const amountsGEL = [10, 20, 30, 50, 100, 120, 150, 200];

  const texts = {
    de: {
      title: "Umrechnung Georgischer Lari (GEL)",
      subtitle: "Praktische Richtwerte für Preise in Georgien",
      currentRate: "Aktueller Wechselkurs",
      gel: "Betrag (GEL)",
      eur: "≈ Euro (EUR)",
      rub: "≈ Russischer Rubel (RUB)",
      customLabel: "Eigener Betrag in GEL",
      customHint: "Gib einen Betrag ein, um die Umrechnung zu sehen.",
      fallbackNote:
        "Hinweis: Wechselkurse konnten nicht live geladen werden – Werte sind geschätzte Richtwerte.",
      typicalTitle: "Typische Ausgaben (ca.)",
      typicalNote:
        "Richtwerte – Preise können je nach Saison, Ort und Anbieter variieren.",
    },
    en: {
      title: "Georgian Lari (GEL) conversion",
      subtitle: "Useful reference values for prices in Georgia",
      currentRate: "Current exchange rate",
      gel: "Amount (GEL)",
      eur: "≈ Euro (EUR)",
      rub: "≈ Russian Ruble (RUB)",
      customLabel: "Custom amount in GEL",
      customHint: "Enter an amount to see the conversion.",
      fallbackNote:
        "Note: Live rates could not be loaded – using approximate fallback values.",
      typicalTitle: "Typical expenses (approx.)",
      typicalNote:
        "Approximate values – prices vary by season, location and provider.",
    },
    ru: {
      title: "Конвертация грузинского лари (GEL)",
      subtitle: "Полезные ориентиры цен в Грузии",
      currentRate: "Текущий курс",
      gel: "Сумма (GEL)",
      eur: "≈ Евро (EUR)",
      rub: "≈ Российский рубль (RUB)",
      customLabel: "Своя сумма в GEL",
      customHint: "Введите сумму, чтобы увидеть конвертацию.",
      fallbackNote:
        "Примечание: Онлайн-курсы недоступны — используются ориентировочные значения.",
      typicalTitle: "Типичные расходы (примерно)",
      typicalNote:
        "Ориентировочные значения — цены зависят от сезона, места и поставщика.",
    },
  };

  const t = texts[lang] || texts.de;

  // Typische Ausgaben (GEL) – ca. Werte für Gudauri/Tbilisi
  const typicalItems = [
    {
      key: "taxiAirportCity",
      gel: 60,
      icon: <Car size={16} />,
      label: {
        de: "Taxi Flughafen Tbilisi → Stadtzentrum",
        en: "Taxi Tbilisi Airport → City Center",
        ru: "Такси аэропорт Тбилиси → центр города",
      },
    },
    {
      key: "taxiTbilisiGudauri",
      gel: 220,
      icon: <Car size={16} />,
      label: {
        de: "Taxi Tbilisi → Gudauri (eine Strecke)",
        en: "Taxi Tbilisi → Gudauri (one way)",
        ru: "Такси Тбилиси → Гудаури (в одну сторону)",
      },
    },
    {
      key: "skipassDay",
      gel: 120,
      icon: <MountainSnow size={16} />,
      label: {
        de: "Tages-Skipass Gudauri (Erwachsener)",
        en: "Day ski pass Gudauri (adult)",
        ru: "Ски-пасс на день, Гудаури (взрослый)",
      },
    },
    {
      key: "skiRentDay",
      gel: 80,
      icon: <Snowflake size={16} />,
      label: {
        de: "Skiverleih pro Tag",
        en: "Ski rental per day",
        ru: "Аренда лыж в день",
      },
    },
    {
      key: "snowboardRentDay",
      gel: 80,
      icon: <Snowflake size={16} />,
      label: {
        de: "Snowboardverleih pro Tag",
        en: "Snowboard rental per day",
        ru: "Аренда сноуборда в день",
      },
    },
    {
      key: "beer",
      gel: 12,
      icon: <Beer size={16} />,
      label: {
        de: "Bier (0,5 l im Restaurant/Bar)",
        en: "Beer (0.5 l in restaurant/bar)",
        ru: "Пиво (0,5 л в баре/ресторане)",
      },
    },
    {
      key: "aperol",
      gel: 22,
      icon: <Martini size={16} />,
      label: {
        de: "Aperol Spritz",
        en: "Aperol Spritz",
        ru: "Апероль Спритц",
      },
    },
    {
      key: "cola",
      gel: 7,
      icon: <CupSoda size={16} />,
      label: {
        de: "Cola (0,5 l im Restaurant)",
        en: "Cola (0.5 l in restaurant)",
        ru: "Кола (0,5 л в ресторане)",
      },
    },
    {
      key: "breakfast",
      gel: 35,
      icon: <UtensilsCrossed size={16} />,
      label: {
        de: "Frühstück (durchschnittlich, pro Person)",
        en: "Breakfast (average, per person)",
        ru: "Завтрак (в среднем, на человека)",
      },
    },
  ];

  const formatNumber = (value, digits = 2) =>
    new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);

  // Tabelle für feste GEL-Beträge
  const renderTableBody = () => {
    if (rateEUR == null || rateRUB == null) return null;

    return amountsGEL.map((gel, idx) => (
      <tr
        key={gel}
        style={{
          background: idx % 2 === 0 ? "rgba(248,250,252,0.95)" : "white",
        }}
      >
        <td
          style={{
            padding: "0.25rem 0.35rem",
            borderBottom: "1px solid rgba(226,232,240,0.8)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatNumber(gel, 0)}
        </td>
        <td
          style={{
            padding: "0.25rem 0.35rem",
            textAlign: "right",
            borderBottom: "1px solid rgba(226,232,240,0.8)",
            borderLeft: "1px solid rgba(226,232,240,0.9)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatNumber(gel * rateEUR)}
        </td>
        <td
          style={{
            padding: "0.25rem 0.35rem",
            textAlign: "right",
            borderBottom: "1px solid rgba(226,232,240,0.8)",
            borderLeft: "1px solid rgba(226,232,240,0.9)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatNumber(gel * rateRUB)}
        </td>
      </tr>
    ));
  };

  const renderTypicalList = () => {
    if (rateEUR == null || rateRUB == null) return null;

    return (
      <div
        style={{
          marginTop: "1rem",
          padding: "0.9rem",
          borderRadius: "0.9rem",
          background: "rgba(239,246,255,0.95)",
          border: "1px solid rgba(191,219,254,0.9)",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            marginBottom: "0.35rem",
            fontSize: "0.9rem",
            color: "#0f172a",
          }}
        >
          {t.typicalTitle}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#64748b",
            marginBottom: "0.6rem",
          }}
        >
          {t.typicalNote}
        </div>

        {/* 📱 Scroll-Wrapper, damit es auf Handy nicht gequetscht wird */}
        <div className="typical-expenses-scroll">
          <div
            className="typical-expenses-table"
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid rgba(209,213,219,0.9)",
              background: "rgba(255,255,255,0.98)",
            }}
          >
            {/* Header-Zeile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "auto minmax(0, 2.4fr) minmax(0, 0.9fr) minmax(0, 0.9fr) minmax(0, 0.9fr)",
                gap: "0.4rem",
                alignItems: "center",
                padding: "0.4rem 0.7rem",
                background: "rgba(219,234,254,0.95)",
                borderBottom: "1px solid rgba(209,213,219,0.9)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              <span />
              <span>
                {lang === "de"
                  ? "Kategorie"
                  : lang === "ru"
                  ? "Категория"
                  : "Category"}
              </span>
              <span
                style={{
                  textAlign: "right",
                  borderLeft: "1px solid rgba(209,213,219,0.9)",
                  paddingLeft: "0.6rem",
                }}
              >
                GEL
              </span>
              <span
                style={{
                  textAlign: "right",
                  borderLeft: "1px solid rgba(209,213,219,0.9)",
                  paddingLeft: "0.6rem",
                }}
              >
                EUR
              </span>
              <span
                style={{
                  textAlign: "right",
                  borderLeft: "1px solid rgba(209,213,219,0.9)",
                  paddingLeft: "0.6rem",
                }}
              >
                RUB
              </span>
            </div>

            {/* Datenzeilen */}
            {typicalItems.map((item, index) => {
              const label =
                item.label[lang] ||
                item.label.de ||
                Object.values(item.label)[0];
              const eur = item.gel * rateEUR;
              const rub = item.gel * rateRUB;

              return (
                <div
                  key={item.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "auto minmax(0, 2.4fr) minmax(0, 0.9fr) minmax(0, 0.9fr) minmax(0, 0.9fr)",
                    gap: "0.4rem",
                    alignItems: "center",
                    padding: "0.45rem 0.7rem",
                    fontSize: "0.85rem",
                    background:
                      index % 2 === 0
                        ? "rgba(248,250,252,0.96)"
                        : "rgba(255,255,255,0.98)",
                    borderTop:
                      index === 0
                        ? "none"
                        : "1px solid rgba(229,231,235,0.9)",
                  }}
                >
                  <span
                    style={{
                      width: "1.8rem",
                      height: "1.8rem",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(219,234,254,0.9)",
                      color: "#0f172a",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>

                  <span
                    style={{
                      color: "#0f172a",
                      minWidth: 0,
                    }}
                  >
                    {label}
                  </span>

                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#111827",
                      fontWeight: 600,
                      borderLeft: "1px solid rgba(209,213,219,0.9)",
                      paddingLeft: "0.6rem",
                    }}
                  >
                    {formatNumber(item.gel, 0)} GEL
                  </span>

                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#1f2937",
                      borderLeft: "1px solid rgba(209,213,219,0.9)",
                      paddingLeft: "0.6rem",
                    }}
                  >
                    {formatNumber(eur)}
                  </span>

                  <span
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: "#1f2937",
                      borderLeft: "1px solid rgba(209,213,219,0.9)",
                      paddingLeft: "0.6rem",
                    }}
                  >
                    {formatNumber(rub)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- RENDER ----------
  return (
    <div
      style={{
        marginTop: "1.25rem",
        marginBottom: "1.25rem",
        padding: "1.25rem 1.4rem",
        borderRadius: "1rem",
        background:
          "linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(191, 219, 254, 0.95))",
        border: "1px solid rgba(148, 163, 184, 0.5)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
      }}
    >
      {/* Überschrift */}
      <h3
        style={{
          margin: 0,
          marginBottom: "0.35rem",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {t.title}
      </h3>

      {/* Untertitel */}
      <p
        style={{
          margin: 0,
          marginBottom: "0.55rem",
          fontSize: "0.9rem",
          color: "#1f2937",
        }}
      >
        {t.subtitle}
      </p>

      {/* Hinweis, falls Fallback genutzt wird */}
      {error === "fallback" && (
        <p
          style={{
            color: "#64748b",
            fontSize: "0.8rem",
            marginBottom: "0.45rem",
          }}
        >
          {t.fallbackNote}
        </p>
      )}

      {/* aktueller Wechselkurs – kompakt */}
      {rateEUR != null && rateRUB != null && (
        <p
          style={{
            fontSize: "0.82rem",
            marginBottom: "0.6rem",
            color: "#0f172a",
            background: "rgba(255,255,255,0.9)",
            padding: "0.35rem 0.6rem",
            borderRadius: "999px",
            display: "inline-block",
          }}
        >
          <strong>{t.currentRate}:</strong>{" "}
          1 GEL ≈ {formatNumber(rateEUR, 4)} EUR · 1 GEL ≈{" "}
          {formatNumber(rateRUB, 2)} RUB
        </p>
      )}

      {/* GEL-Tabelle + Eingabefeld nebeneinander */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginBottom: "1rem",
          marginTop: "0.4rem",
        }}
      >
        {/* Linke Spalte: feste GEL-Beträge */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: "420px",
            overflowX: "auto",
            borderRadius: "0.75rem",
            background: "rgba(255,255,255,0.96)",
            border: "1px solid rgba(226,232,240,0.9)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.78rem",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(219,234,254,0.95)",
                  color: "#0f172a",
                }}
              >
                <th
                  style={{
                    padding: "0.25rem 0.35rem",
                    textAlign: "left",
                    borderBottom: "1px solid rgba(191,219,254,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.gel}
                </th>
                <th
                  style={{
                    padding: "0.25rem 0.35rem",
                    textAlign: "right",
                    borderBottom: "1px solid rgba(191,219,254,0.9)",
                    borderLeft: "1px solid rgba(191,219,254,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.eur}
                </th>
                <th
                  style={{
                    padding: "0.25rem 0.35rem",
                    textAlign: "right",
                    borderBottom: "1px solid rgba(191,219,254,0.9)",
                    borderLeft: "1px solid rgba(191,219,254,0.9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.rub}
                </th>
              </tr>
            </thead>

            <tbody>
              {rateEUR == null || rateRUB == null ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "0.4rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      color: "#64748b",
                    }}
                  >
                    {lang === "de"
                      ? "Wechselkurse werden geladen …"
                      : lang === "ru"
                      ? "Курсы загружаются…"
                      : "Loading exchange rates…"}
                  </td>
                </tr>
              ) : (
                renderTableBody()
              )}
            </tbody>
          </table>
        </div>

        {/* Rechte Spalte: Eingabe + Ergebnis */}
        <div
          style={{
            flex: "1 1 230px",
            maxWidth: "270px",
            padding: "0.9rem 1rem",
            marginTop: "0.4rem",
            borderRadius: "0.9rem",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(219,234,254,0.95))",
            border: "1px solid rgba(191,219,254,0.9)",
            color: "#0f172a",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            boxShadow: "0 8px 20px rgba(15,23,42,0.12)",
          }}
        >
          {/* Kopfzeile mit Icon & Untertitel */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.1rem",
            }}
          >
            <span
              style={{
                width: "1.8rem",
                height: "1.8rem",
                borderRadius: "999px",
                background: "rgba(191,219,254,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Coins size={16} />
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.8rem",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                {lang === "de"
                  ? "Deine Umrechnung"
                  : lang === "ru"
                  ? "Ваша конвертация"
                  : "Your conversion"}
              </span>
              <span style={{ color: "#64748b" }}>{t.customHint}</span>
            </div>
          </div>

          {/* Label + Eingabefeld */}
          <label
            style={{
              fontSize: "0.82rem",
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            {t.customLabel}
            <input
              type="number"
              value={customGel}
              min="0"
              onChange={(e) => setCustomGel(e.target.value)}
              style={{
                padding: "0.4rem 0.65rem",
                borderRadius: "0.55rem",
                border: "1px solid rgba(148,163,184,0.9)",
                fontSize: "0.9rem",
                width: "100%",
                background: "white",
              }}
            />
          </label>

          {/* Ergebnisanzeige mit Icon */}
          {rateEUR != null && rateRUB != null ? (
            <div
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.45,
                background: "rgba(219,234,254,0.7)",
                border: "1px solid rgba(191,219,254,0.9)",
                padding: "0.6rem 0.7rem",
                borderRadius: "0.7rem",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "0.4rem",
                rowGap: "0.25rem",
                alignItems: "center",
              }}
            >
              <ArrowLeftRight size={16} />
              <div>
                <div>
                  <strong>{formatNumber(customGel * rateEUR)}</strong> EUR
                </div>
                <div>
                  <strong>{formatNumber(customGel * rateRUB)}</strong> RUB
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
              Loading…
            </div>
          )}
        </div>
      </div>

      {/* Typische Ausgaben (Liste unten) */}
      {renderTypicalList()}
    </div>
  );
}
