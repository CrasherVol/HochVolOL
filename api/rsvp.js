// api/rsvp.js
import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ✉️ Gmail-Transport
const transporter = nodemailer.createTransport({
  service: "gmail", // nutzt automatisch smtp.gmail.com
  auth: {
    user: process.env.EMAIL_USER, // deine gmail-Adresse
    pass: process.env.EMAIL_PASS, // das App-Passwort
  },
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // extraGuests kommt jetzt mit
    const { attend, email, name, people, diet, message, extraGuests } =
      req.body || {};

    // Debug-Log, damit man im Vercel-Log sieht, was ankommt
    console.log("RSVP BODY:", req.body);

    // attend MUSS boolean sein
    if (typeof attend !== "boolean") {
      return res.status(400).json({ error: "attend boolean required" });
    }

    const normEmail = (email || "").trim().toLowerCase();
    if (!normEmail) {
      return res.status(400).json({ error: "email required" });
    }

    const yesKey = "rsvp:yes";
    const noKey = "rsvp:no";
    const stateKey = `rsvp:user:${normEmail}`;

    // 🧮 idempotent zählen (pro E-Mail-Adresse)
    const prev = await redis.get(stateKey); // "yes" | "no" | null

    if (prev === "yes" && !attend) {
      await redis.decr(yesKey);
      await redis.incr(noKey);
    } else if (prev === "no" && attend) {
      await redis.decr(noKey);
      await redis.incr(yesKey);
    } else if (!prev) {
      await (attend ? redis.incr(yesKey) : redis.incr(noKey));
    }

    await redis.set(stateKey, attend ? "yes" : "no");

    // 📦 Datensatz mit Timestamps in Redis speichern
    const now = new Date().toISOString();
    const key = `rsvp:data:${normEmail}`;
    const existing = await redis.hgetall(key);

    // extraGuests als kommaseparierte Liste speichern
    const extraGuestsString = Array.isArray(extraGuests)
      ? extraGuests.map((g) => String(g).trim()).filter(Boolean).join(", ")
      : existing?.extraGuests || "";

    const record = {
      name: name || existing?.name || "",
      email: normEmail,
      people: String(people ?? existing?.people ?? ""),
      diet: diet ?? existing?.diet ?? "",
      message: message ?? existing?.message ?? "",
      attend: attend ? "yes" : "no",
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      extraGuests: extraGuestsString,
    };

    await redis.hset(key, record);
    await redis.sadd("rsvp:emails", normEmail);

    // 📧 E-Mail-Benachrichtigung schicken
    const attendingText = attend ? "nimmt teil ✅" : "nimmt NICHT teil ❌";

    const mailText = `
Neue RSVP:

Name:    ${record.name}
E-Mail:  ${record.email}
Status:  ${attendingText}
Personen: ${record.people}
Weitere Personen: ${record.extraGuests || "-"}
Kinder/Diät: ${record.diet || "-"}
Nachricht:
${record.message || "-"}
    `.trim();

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `Neue RSVP: ${record.name} (${attend ? "kommt" : "kommt nicht"})`,
        text: mailText,
      });
    } catch (mailErr) {
      console.error("RSVP mail error:", mailErr);
      // Trotzdem 200, weil die Zusage gespeichert ist
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("RSVP handler error:", e);
    res.status(500).json({ error: "server error" });
  }
}
