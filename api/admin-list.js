// api/admin-list.js
import { listEntries } from "./_rsvpStore.js";

export default async function handler(req, res) {
  try {
    const entries = await listEntries();
    return res.status(200).json({ entries });
  } catch (e) {
    console.error("admin-list error:", e);
    return res.status(500).json({ error: "server error" });
  }
}
