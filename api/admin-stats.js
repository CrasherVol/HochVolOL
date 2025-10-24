// api/admin-stats.js
import { Redis } from "@upstash/redis";
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

export default async function handler(req, res) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
    return res.status(401).json({ error: "unauthorized" });
  const yes = Number((await redis.get("rsvp:yes")) || 0);
  const no  = Number((await redis.get("rsvp:no"))  || 0);
  res.status(200).json({ yes, no, total: yes + no });
}
