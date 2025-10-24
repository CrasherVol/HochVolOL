// api/admin-list.js
import { Redis } from "@upstash/redis";
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

export default async function handler(req, res) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
    return res.status(401).json({ error: "unauthorized" });

  const emails = (await redis.smembers("rsvp:emails")) || [];
  const items = [];
  for (const em of emails) {
    const row = await redis.hgetall(`rsvp:data:${em}`);
    if (row) items.push(row);
  }
  // neueste zuerst
  items.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  res.status(200).json({ items, count: items.length });
}
