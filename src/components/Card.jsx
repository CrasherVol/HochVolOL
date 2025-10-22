// src/components/Card.jsx
import React from "react";

export default function Card({ title, children, className = "", style = {} }) {
  return (
    <div className={`frost-card ${className}`} style={style}>
      {title && (
        <h3 className="card-title" style={{ marginBottom: ".75rem" }}>
          {title}
        </h3>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
}
