import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import Card from "../components/Card.jsx";

function Pill({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: ".4rem",
      padding: ".25rem .6rem", borderRadius: "999px",
      background: "rgba(255,255,255,.6)", border: "1px solid rgba(0,0,0,.06)",
      backdropFilter: "blur(6px)", fontSize: ".9rem"
    }}>{children}</span>
  );
}

export default function AdminPage({ lang="de", setLang }) {
  const [keyInput, setKeyInput] = useState(() => sessionStorage.getItem("adminKey") || "");
  const [authed, setAuthed] = useState(!!sessionStorage.getItem("adminKey"));
  const [stats, setStats] = useState({ yes: 0, no: 0, total: 0 });
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  async function fetchAll(k) {
    const h = { "x-admin-key": k };
    const [st, ls] = await Promise.all([
      fetch("/api/admin-stats", { headers: h }).then(r => r.json()),
      fetch("/api/admin-list",  { headers: h }).then(r => r.json()),
    ]);
    if (st?.error || ls?.error) throw new Error("auth");
    setStats(st);
    setRows(ls.items || []);
  }

  function onLogin(e) {
    e.preventDefault();
    if (!keyInput.trim()) return;
    fetchAll(keyInput.trim())
      .then(() => { sessionStorage.setItem("adminKey", keyInput.trim()); setAuthed(true); })
      .catch(() => alert("Admin-Key falsch"));
  }

  function onLogout() {
    sessionStorage.removeItem("adminKey");
    setAuthed(false);
    setRows([]); setStats({ yes:0, no:0, total:0 });
  }

  useEffect(() => {
    const k = sessionStorage.getItem("adminKey");
    if (k) fetchAll(k).catch(() => onLogout());
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.name||"").toLowerCase().includes(term) ||
      (r.email||"").toLowerCase().includes(term) ||
      (r.message||"").toLowerCase().includes(term) ||
      (r.extraGuests||"").toLowerCase().includes(term)
    );
  }, [rows, q]);

  function toCSV() {
    const head = ["name","email","people","extraGuests","diet","message","attend","createdAt","updatedAt"];
    const esc = v => `"${String(v ?? "").replace(/"/g,'""')}"`;
    const body = filtered.map(r => head.map(k => esc(r[k])).join(",")).join("\n");
    const blob = new Blob([head.join(",")+"\n"+body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "rsvp-admin-export.csv"; a.click();
    URL.revokeObjectURL(url);
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
    } catch (e) {
      // ignore
    }

    if (!res.ok || data.error) {
      console.error("Löschen fehlgeschlagen:", data);
      alert("Löschen fehlgeschlagen.");
      return;
    }

    // betroffene Zeile finden, um Zähler zu aktualisieren
    const row = rows.find(r => r.email === email);

    setRows(prev => prev.filter(r => r.email !== email));

    if (row) {
      setStats(prev => {
        const deltaYes = row.attend === "yes" ? -1 : 0;
        const deltaNo  = row.attend === "no"  ? -1 : 0;
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
      <Section title="RSVP Admin" subtitle="Übersicht & Export" icon={<span>🔐</span>}>
        {!authed ? (
          <Card title="Login" className="hover-react">
            <form onSubmit={onLogin} style={{display:"flex", gap:".5rem", alignItems:"center"}}>
              <input
                type="password"
                className="input"
                placeholder="Admin Key"
                value={keyInput}
                onChange={e=>setKeyInput(e.target.value)}
                style={{maxWidth:300}}
              />
              <button className="btn-chip" type="submit">Anmelden</button>
            </form>
          </Card>
        ) : (
          <>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem"}}>
              <Card title="Zähler" className="hover-react">
                <div style={{display:"flex", gap:".5rem", flexWrap:"wrap"}}>
                  <Pill>✅ Ja: <strong>{stats.yes}</strong></Pill>
                  <Pill>❌ Nein: <strong>{stats.no}</strong></Pill>
                  <Pill>Σ Total: <strong>{stats.total}</strong></Pill>
                </div>
              </Card>
              <Card title="Werkzeuge" className="hover-react">
                <div style={{display:"flex", gap:".5rem", flexWrap:"wrap"}}>
                  <input
                    className="input"
                    placeholder="Suchen (Name, E-Mail, Nachricht, weitere Personen)"
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    style={{minWidth:240}}
                  />
                  <button className="btn-chip" onClick={toCSV}>CSV exportieren</button>
                  <button className="btn-chip" onClick={onLogout}>Abmelden</button>
                </div>
              </Card>
            </div>

            <Card title={`Einträge (${filtered.length})`} className="hover-react">
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{textAlign:"left"}}>
                      <th style={{padding:".5rem"}}>Status</th>
                      <th style={{padding:".5rem"}}>Name</th>
                      <th style={{padding:".5rem"}}>E-Mail</th>
                      <th style={{padding:".5rem"}}>Personen</th>
                      <th style={{padding:".5rem"}}>Weitere Personen</th>
                      <th style={{padding:".5rem"}}>Kinder/Diät</th>
                      <th style={{padding:".5rem"}}>Nachricht</th>
                      <th style={{padding:".5rem"}}>Erstellt</th>
                      <th style={{padding:".5rem"}}>Aktualisiert</th>
                      <th style={{padding:".5rem"}}>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r,i)=>(
                      <tr key={r.email || i} style={{borderTop:"1px solid rgba(0,0,0,.06)"}}>
                        <td style={{padding:".5rem", whiteSpace:"nowrap"}}>{r.attend==="yes"?"✅ Ja":"❌ Nein"}</td>
                        <td style={{padding:".5rem"}}>{r.name || "—"}</td>
                        <td style={{padding:".5rem"}}>{r.email || "—"}</td>
                        <td style={{padding:".5rem"}}>{r.people || "—"}</td>
                        <td style={{padding:".5rem"}}>{r.extraGuests || "—"}</td>
                        <td style={{padding:".5rem"}}>{r.diet || "—"}</td>
                        <td style={{padding:".5rem"}}>{r.message || "—"}</td>
                        <td style={{padding:".5rem", whiteSpace:"nowrap"}}>{r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}</td>
                        <td style={{padding:".5rem", whiteSpace:"nowrap"}}>{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "—"}</td>
                        <td style={{padding:".5rem", whiteSpace:"nowrap"}}>
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
