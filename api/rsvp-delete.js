// api/rsvp-delete.js
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Optional: gleicher Admin-Schutz wie bei admin-stats
  const adminKey = req.headers["x-admin-key"];
if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
  return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { email } = req.body || {};
    const normEmail = (email || "").trim().toLowerCase();

    if (!normEmail) {
      return res.status(400).json({ error: "email required" });
    }

    const key = `rsvp:data:${normEmail}`;
    const stateKey = `rsvp:user:${normEmail}`;

    const record = await redis.hgetall(key);

    if (!record) {
      return res.status(404).json({ error: "not found" });
    }

    // Ja/Nein-Zähler korrigieren
    if (record.attend === "yes") {
      await redis.decr("rsvp:yes");
    } else if (record.attend === "no") {
      await redis.decr("rsvp:no");
    }

    // Datensatz & Hilfsstrukturen löschen
    await redis.del(key);
    await redis.srem("rsvp:emails", normEmail);
    await redis.del(stateKey);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("rsvp-delete error:", err);
    return res.status(500).json({ error: "server error" });
  }
}
