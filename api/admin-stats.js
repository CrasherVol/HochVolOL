// api/admin-stats.js
import { getStats } from "./_rsvpStore.js";

export default async function handler(req, res) {
  try {
    const stats = await getStats();
    return res.status(200).json(stats);
  } catch (e) {
    console.error("admin-stats error:", e);
    return res.status(500).json({ error: "server error" });
  }
}
