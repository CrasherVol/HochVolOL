// src/components/ExternalLink.jsx
import React from "react";

export default function ExternalLink({ href, children, ...props }) {
  // absolute URL absichern (http/https), sonst https davorsetzen
  const url = /^https?:\/\//i.test(href) ? href : `https://${href}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
