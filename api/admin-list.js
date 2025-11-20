// api/admin-list.js
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Alle E-Mail-Adressen, die wir beim RSVP speichern
    const emails = await redis.smembers("rsvp:emails");

    if (!emails || emails.length === 0) {
      return res.status(200).json({ items: [] });
    }

    const items = [];

    for (const email of emails) {
      const key = `rsvp:data:${email}`;
      const record = await redis.hgetall(key);

      if (!record) continue;

      const item = {
        // wir geben beides zurück, falls das Frontend "status" oder "attend" erwartet
        attend: record.attend,     // "yes" | "no"
        status: record.attend,
        name: record.name || "",
        email: record.email || email,
        people: record.people || "",
        diet: record.diet || "",
        message: record.message || "",
        createdAt: record.createdAt || null,
        updatedAt: record.updatedAt || null,
      };

      items.push(item);
    }

    // z.B. neueste zuerst
    items.sort((a, b) => {
      if (!a.updatedAt || !b.updatedAt) return 0;
      return b.updatedAt.localeCompare(a.updatedAt);
    });

    res.status(200).json({ items });
  } catch (err) {
    console.error("admin-list error:", err);
    res.status(500).json({ error: "server error" });
  }
}
