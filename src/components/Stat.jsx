// src/components/Stat.jsx
import React from "react";

export default function Stat({ label, value, icon }) {
  return (
    <div className="stat-box">
      {icon ? <div className="icon">{icon}</div> : null}
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}
