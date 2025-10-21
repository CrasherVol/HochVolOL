// src/data/calendar.js
import { DATUM, ORT, PAAR } from "./constants";

const startUtc = new Date(DATUM.iso).toISOString().replace(/[-:]/g, "").replace(".000Z", "Z");
const endUtc = new Date(new Date(DATUM.iso).getTime() + 6 * 60 * 60 * 1000)
  .toISOString().replace(/[-:]/g, "").replace(".000Z", "Z");

export const googleCalUrl =
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Hochzeit ${PAAR.braut} & ${PAAR.braeutigam}`
  )}&dates=${startUtc}%2F${endUtc}&location=${encodeURIComponent(ORT.name)}&details=${encodeURIComponent("Wir freuen uns auf euch!")}`;
