// api/admin-stats.js (Testversion, ohne Redis)

export default async function handler(req, res) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  // Test-Daten (damit der Login funktioniert)
  return res.status(200).json({ yes: 0, no: 0, total: 0 });
}
