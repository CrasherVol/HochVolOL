// api/_rsvpStore.js
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// gleiche Keys wie in api/rsvp.js verwenden!
const YES_KEY = "rsvp:yes";
const NO_KEY = "rsvp:no";

export async function getStats() {
  const [yesRaw, noRaw] = await redis.mget(YES_KEY, NO_KEY);

  const yes = Number(yesRaw ?? 0);
  const no = Number(noRaw ?? 0);
  const total = yes + no;

  return { yes, no, total };
}

export async function listEntries() {
  const emails = await redis.smembers("rsvp:emails"); // Menge aller E-Mails
  const list = [];

  if (Array.isArray(emails)) {
    for (const email of emails) {
      const data = await redis.hgetall(`rsvp:data:${email}`);
      if (data) {
        // ein bisschen aufräumen / Typen
        list.push({
          status: data.attend === "yes" ? "yes" : "no",
          name: data.name || "",
          email: data.email || email,
          people: data.people || "",
          diet: data.diet || "",
          message: data.message || "",
          createdAt: data.createdAt || "",
          updatedAt: data.updatedAt || "",
        });
      }
    }
  }

  // nach Erstellungsdatum sortieren (neueste oben)
  list.sort((a, b) => {
    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return db - da;
  });

  return list;
}
