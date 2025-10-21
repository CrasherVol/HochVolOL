import React from "react";


export default function Card({ title, children }) {
  return (
    <section style={{
      background:"#fff", border:"1px solid #eee", borderRadius:"14px",
      padding:"1rem", boxShadow:"0 2px 10px rgba(0,0,0,.04)", marginBottom:"1rem"
    }}>
      {title && <h3 style={{ marginTop:0, marginBottom:".75rem", color:"var(--accent)" }}>{title}</h3>}
      {children}
    </section>
  );
}
