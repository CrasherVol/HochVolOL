// api/rsvp.js
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { attend, email, name, people, diet, message } = req.body || {};
    if (typeof attend !== "boolean") return res.status(400).json({ error: "attend boolean required" });

    const yesKey = "rsvp:yes";
    const noKey  = "rsvp:no";
    const normEmail = (email || "").trim().toLowerCase();
    const stateKey  = normEmail ? `rsvp:user:${normEmail}` : null;

    // idempotent zählen
    if (stateKey) {
      const prev = await redis.get(stateKey); // "yes" | "no" | null
      if (prev === "yes" && !attend) {
        await redis.decr(yesKey); await redis.incr(noKey);
      } else if (prev === "no" && attend) {
        await redis.decr(noKey); await redis.incr(yesKey);
      } else if (!prev) {
        await (attend ? redis.incr(yesKey) : redis.incr(noKey));
      }
      await redis.set(stateKey, attend ? "yes" : "no");
    } else {
      await (attend ? redis.incr(yesKey) : redis.incr(noKey));
    }

    // Datensatz mit Timestamps
    const now = new Date().toISOString();
    if (normEmail) {
      const key = `rsvp:data:${normEmail}`;
      const existing = await redis.hgetall(key);
      await redis.hset(key, {
        name: name || existing?.name || "",
        email: normEmail,
        people: String(people ?? existing?.people ?? ""),
        diet: diet ?? existing?.diet ?? "",
        message: message ?? existing?.message ?? "",
        attend: attend ? "yes" : "no",
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      });
      await redis.sadd("rsvp:emails", normEmail);
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
}
