import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx"; // ⭐ Für Excel-Export
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".4rem",
        padding: ".25rem .6rem",
        borderRadius: "999px",
        background: "rgba(255,255,255,.6)",
        border: "1px solid rgba(0,0,0,.06)",
        backdropFilter: "blur(6px)",
        fontSize: ".9rem",
      }}
    >
      {children}
    </span>
  );
}

export default function AdminPage({ lang = "de", setLang }) {
  const [keyInput, setKeyInput] = useState(
    () => sessionStorage.getItem("adminKey") || ""
  );
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("adminKey"));
  const [stats, setStats] = useState({ yes: 0, no: 0, total: 0 });
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function fetchAll(k) {
    const h = { "x-admin-key": k };
    const [st, ls] = await Promise.all([
      fetch("/api/admin-stats", { headers: h }).then((r) => r.json()),
      fetch("/api/admin-list", { headers: h }).then((r) => r.json()),
    ]);
    if (st?.error || ls?.error) throw new Error("auth");
    setStats(st);
    setRows(ls.items || []);
  }

 function onLogin(e) {
  e.preventDefault();
  const trimmed = keyInput.trim();
  if (!trimmed) return;

  fetchAll(trimmed)
    .then(() => {
      sessionStorage.setItem("adminKey", trimmed);
      setAuthed(true);
    })
    .catch(() => {
      sessionStorage.removeItem("adminKey");
      setAuthed(false);
      alert("Admin-Key falsch");
    });
  }

  function onLogout() {
    sessionStorage.removeItem("adminKey");
    setAuthed(false);
    setRows([]);
    setStats({ yes: 0, no: 0, total: 0 });
  }

  useEffect(() => {
    const k = sessionStorage.getItem("adminKey");
    if (k) fetchAll(k).catch(() => onLogout());
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = rows;

    if (term) {
      list = list.filter(
        (r) =>
          (r.name || "").toLowerCase().includes(term) ||
          (r.email || "").toLowerCase().includes(term) ||
          (r.message || "").toLowerCase().includes(term) ||
          (r.extraGuests || "").toLowerCase().includes(term)
      );
    }

    if (statusFilter === "yes") {
      list = list.filter((r) => r.attend === "yes");
    } else if (statusFilter === "no") {
      list = list.filter((r) => r.attend === "no");
    }

    return list;
  }, [rows, q, statusFilter]);

  // 🔹 CSV-Export
  function toCSV() {
    const head = [
      "name",
      "email",
      "people",
      "extraGuests",
      "diet",
      "message",
      "attend",
      "createdAt",
      "updatedAt",
    ];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const body = filtered
      .map((r) => head.map((k) => esc(r[k])).join(","))
      .join("\n");
    const blob = new Blob([head.join(",") + "\n" + body], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvp-admin-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // 🔹 Excel-Export (.xlsx)
 function toExcel() {
  // Hilfsfunktion: Weitere Personen nummerieren (wie in der Tabelle)
  const formatExtraGuests = (extra) => {
    if (!extra) return "";
    return extra
      .split(/[\n\r,]+/)            // an Kommas ODER Zeilenumbrüchen trennen
      .map((s) => s.trim())
      .filter(Boolean)
      .map((g, index) => `${index + 1}. ${g}`) // Nummerierung
      .join("\n");                  // Zeilenumbrüche für Excel-Zelle
  };

  const rowsData = filtered.map((r) => ({
    Name: r.name || "",
    Email: r.email || "",
    Personen: r.people || "",
    Weitere_Personen: formatExtraGuests(r.extraGuests),
    Kinder_Diaet: r.diet || "",
    Nachricht: r.message || "",
    Attend: r.attend || "",
    CreatedAt: r.createdAt || "",
    UpdatedAt: r.updatedAt || "",
  }));

  const ws = XLSX.utils.json_to_sheet(rowsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "RSVPs");

  XLSX.writeFile(wb, "rsvp-admin-export.xlsx");
}


  async function handleDelete(email) {
    const ok = window.confirm(`Eintrag mit E-Mail ${email} wirklich löschen?`);
    if (!ok) return;

    const adminKey = sessionStorage.getItem("adminKey");
    if (!adminKey) {
      alert("Kein Admin-Key gefunden, bitte neu anmelden.");
      onLogout();
      return;
    }

    const res = await fetch("/api/rsvp-delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ email }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch (e) {}

   if (!res.ok || data.error) {
  alert(
    "Löschen fehlgeschlagen.\n\n" +
    "Status: " + res.status + "\n" +
    "Fehler: " + (data.error || "unbekannt")
  );
  return;
}


    const row = rows.find((r) => r.email === email);

    setRows((prev) => prev.filter((r) => r.email !== email));

    if (row) {
      setStats((prev) => {
        const deltaYes = row.attend === "yes" ? -1 : 0;
        const deltaNo = row.attend === "no" ? -1 : 0;
        return {
          yes: prev.yes + deltaYes,
          no: prev.no + deltaNo,
          total: Math.max(0, prev.total - 1),
        };
      });
    }
  }

  return (
    <Layout lang={lang} setLang={setLang}>
      <Section
        title="RSVP Admin"
        subtitle="Übersicht & Export"
        icon={<span>🔐</span>}
      >
        {!authed ? (
          <Card title="Login" className="hover-react">
            <form
              onSubmit={onLogin}
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <input
                type="password"
                className="input"
                placeholder="Admin Key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                style={{ maxWidth: 300 }}
              />
              <button className="btn-chip" type="submit">
                Anmelden
              </button>
            </form>
          </Card>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "1rem",
              }}
            >
              <Card title="Zähler" className="hover-react">
                <div
                  style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}
                >
                  <Pill>
                    ✅ Ja: <strong>{stats.yes}</strong>
                  </Pill>
                  <Pill>
                    ❌ Nein: <strong>{stats.no}</strong>
                  </Pill>
                  <Pill>
                    Σ Total: <strong>{stats.total}</strong>
                  </Pill>
                </div>
              </Card>

              <Card title="Werkzeuge" className="hover-react">
                <div
                  style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}
                >
                  <input
                    className="input"
                    placeholder="Suchen (Name, E-Mail, Nachricht, weitere Personen)"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    style={{ minWidth: 240 }}
                  />

                  <select
                    className="input"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ minWidth: 140 }}
                  >
                    <option value="all">Alle</option>
                    <option value="yes">Nur Ja</option>
                    <option value="no">Nur Nein</option>
                  </select>

                  <button className="btn-chip" onClick={toCSV}>
                    CSV exportieren
                  </button>
                  <button className="btn-chip" onClick={toExcel}>
                    Excel exportieren
                  </button>
                  <button className="btn-chip" onClick={onLogout}>
                    Abmelden
                  </button>
                </div>
              </Card>
            </div>

            <Card title={`Einträge (${filtered.length})`} className="hover-react">
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    tableLayout: "auto",
                    border: "2px solid #555",
                  }}
                >
                  <thead>
                    <tr>
                      {[
                        "Status",
                        "Name",
                        "E-Mail",
                        "Personen",
                        "Weitere Personen",
                        "Kinder/Diät",
                        "Nachricht",
                        "Erstellt",
                        "Aktualisiert",
                        "Aktionen",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: ".5rem",
                            border: "1px solid #555",
                            background: "rgba(0,0,0,0.07)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.email || i}>
                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.attend === "yes" ? "✅ Ja" : "❌ Nein"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.name || "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.email || "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.people || "—"}
                        </td>

                        <td
                          style={{
                            padding: ".5rem",
                            border: "1px solid #555",
                            wordBreak: "break-word",
                          }}
                        >
                          {r.extraGuests
                            ? r.extraGuests
                                .split(/[\n\r,]+/)
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .map((g, index) => (
                                  <div key={index}>
                                    {index + 1}. {g}
                                  </div>
                                ))
                            : "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.diet || "—"}
                        </td>

                        <td
                          style={{
                            padding: ".5rem",
                            border: "1px solid #555",
                            wordBreak: "break-word",
                            maxWidth: "260px",
                          }}
                        >
                          {r.message || "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleString()
                            : "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          {r.updatedAt
                            ? new Date(r.updatedAt).toLocaleString()
                            : "—"}
                        </td>

                        <td style={{ padding: ".5rem", border: "1px solid #555" }}>
                          <button
                            className="btn-chip"
                            onClick={() => handleDelete(r.email)}
                          >
                            Löschen
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </Section>
    </Layout>
  );
}
