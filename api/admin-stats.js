// api/admin-stats.js
import { getStats } from "./_rsvpStore.js";

export default async function handler(req, res) {
  // 🛡 Schutz einbauen
  const adminKey = req.headers["x-admin-key"];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const stats = await getStats();
    return res.status(200).json(stats);
  } catch (e) {
    console.error("admin-stats error:", e);
    return res.status(500).json({ error: "server error" });
  }
}
