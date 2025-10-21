// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// 1) Tailwind (nur diese 3 Direktiven in src/index.css)
import "./index.css";

// 2) Dein eigenes CSS (überschreibt ggf. Tailwind)
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
