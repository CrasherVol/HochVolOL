// api/admin-list.js – Testversion ohne Redis

export default async function handler(req, res) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  // Leere Liste zurückgeben, damit das Admin-Frontend glücklich ist
  return res.status(200).json({ items: [] });
}
