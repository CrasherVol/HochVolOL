import React from "react";


export default function Section({ title, subtitle, icon, children }) {
  return (
    <div style={{ margin:"2rem 0" }}>
      <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".25rem" }}>
        {icon}
        <h2 style={{ margin:0 }}>{title}</h2>
      </div>
      {subtitle && <p style={{ marginTop:0, color:"#6b7280" }}>{subtitle}</p>}
      {children}
    </div>
  );
}
